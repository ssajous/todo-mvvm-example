import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];

test.describe('New Todo', () => {
  test('should allow me to add todo items', async ({ page }) => {
    // Create 1st todo.
    await page.locator('.new-todo').fill(TODO_ITEMS[0]);
    await page.locator('.new-todo').press('Enter');

    // Make sure the list only has one todo item.
    await expect(page.locator('.view label')).toHaveText([
      TODO_ITEMS[0]
    ]);

    // Create 2nd todo.
    await page.locator('.new-todo').fill(TODO_ITEMS[1]);
    await page.locator('.new-todo').press('Enter');

    // Make sure the list now has two todo items.
    await expect(page.locator('.view label')).toHaveText([
      TODO_ITEMS[0],
      TODO_ITEMS[1]
    ]);
  });

  test('should clear text input field when an item is added', async ({ page }) => {
    // Create one todo item.
    await page.locator('.new-todo').fill(TODO_ITEMS[0]);
    await page.locator('.new-todo').press('Enter');

    // Check that input is empty.
    await expect(page.locator('.new-todo')).toBeEmpty();
  });

  test('should append new items to the bottom of the list', async ({ page }) => {
    // Create 3 items.
    await createDefaultTodos(page);

    // Check test using different methods.
    await expect(page.locator('.todo-count')).toHaveText('3 items left');
    await expect(page.locator('.todo-count')).toContainText('3');
    await expect(page.locator('.todo-count')).toHaveText(/3/);

    // Check all items in one call.
    await expect(page.locator('.view label')).toHaveText(TODO_ITEMS);
  });
});

test.describe('Item', () => {

  test('should allow me to mark items as complete', async ({ page }) => {
    await page.getByRole('link', { name: 'All' }).click();
    // Create two items.
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await page.locator('.new-todo').fill(item);
      await page.locator('.new-todo').press('Enter');
    }

    // Check first item.
    const firstTodo = page.locator('.todo-list li').first();
    await firstTodo.locator('.toggle').check();

    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(page.locator('.todo-list li .toggle').first()).toBeChecked();

    // Check second item.
    await page.getByRole('link', { name: 'All' }).click();
    const secondTodo = page.locator('.todo-list li').nth(1);
    await secondTodo.locator('.toggle').check();

    // Assert completed class.
    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(page.locator('.todo-list li .toggle').nth(1)).toBeChecked();
  });

  test('should allow me to un-mark items as complete', async ({ page }) => {
    // Create two items.
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await page.locator('.new-todo').fill(item);
      await page.locator('.new-todo').press('Enter');
    }

    await page.getByRole('link', { name: 'All' }).click();
    const firstItem = page.locator('li:has-text("buy some cheese") input[type="checkbox"]');
    const secondItem = page.locator('li:has-text("feed the cat") input[type="checkbox"]');
    await firstItem.check();
    await secondItem.check();

    await expect(firstItem).toBeChecked();
    await expect(secondItem).toBeChecked();

    await secondItem.uncheck();
    await page.getByRole('link', { name: 'Active' }).click();

    await expect(secondItem).not.toBeChecked();
  });
});

test.describe('Counter', () => {
  test('should display the current number of todo items', async ({ page }) => {
    await page.locator('.new-todo').fill(TODO_ITEMS[0]);
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.todo-count')).toContainText('1');

    await page.locator('.new-todo').fill(TODO_ITEMS[1]);
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.todo-count')).toContainText('2');
  });

  test('should display the current number of unchecked todo items', async ({ page }) => {
    await page.getByRole('link', { name: 'All' }).click();
    await page.locator('.new-todo').fill(TODO_ITEMS[0]);
    await page.locator('.new-todo').press('Enter');
    await page.locator('.new-todo').fill(TODO_ITEMS[1]);
    await page.locator('.new-todo').press('Enter');
    await page.locator('li:has-text("buy some cheese") input[type="checkbox"]').check();

    await expect(page.locator('.todo-count')).toContainText('1');
  });
});

test.describe('Clear completed button', () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
  });

  test('should display the correct text', async ({ page }) => {
    await expect(page.locator('.clear-completed')).toHaveText('Clear completed');
  });

  test('should remove completed items when clicked', async ({ page }) => {
    await page.getByRole('link', { name: 'All' }).click();
    await page.locator('li:has-text("buy some cheese") input[type="checkbox"]').check();

    await page.getByRole('button', { name: 'Clear completed' }).click();

    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(2);
    await expect(todoItems).toHaveText([TODO_ITEMS[1], TODO_ITEMS[2]]);
  });
});

async function createDefaultTodos(page: Page) {
  for (const item of TODO_ITEMS) {
    await page.locator('.new-todo').fill(item);
    await page.locator('.new-todo').press('Enter');
  }
}
