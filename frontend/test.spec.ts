import { test, expect, type Page } from '@playwright/test';

import { LoginPage } from './models/Login.page';
import { BoardEndpoint } from '../backend/services/trello/endpoints/board';
import { CardEndpoint } from '../backend/services/trello/endpoints/card';
import { BoardPage } from './models/Board.page';
import { CardPage } from './models/Card.page';
import { getAppConfig } from '../data/config';

let loginPage: LoginPage;
let boardPage: BoardPage;
let cardPage: CardPage;
let boardURL: string;

// prepare test data via api..
test.beforeAll(async () => {
  const boardEndpoint = new BoardEndpoint();
  const cardEndpoint = new CardEndpoint();

  // create a new board..
  const boardRes = await boardEndpoint.createBoard({ name: 'playwrightTestBoard' });
  expect(boardRes.status).toBe(200);
  boardURL = boardRes.data.url;

  // create a new list..
  const listRes = await boardEndpoint.createList(boardRes.data.id, { name: 'testList' });
  expect(listRes.status).toBe(200);
  const listID = listRes.data.id;

  // create 2 new card..
  const params = { idList: listID, name: 'testCard' };
  await cardEndpoint.createCard(params);
  const cardRes = await cardEndpoint.createCard(params);

  // add comment to one of the cards..
  await cardEndpoint.addComment(cardRes.data.id, 'test automation comment');
});

// navigate to trello.
test.beforeEach(async ({ page }) => {
  const config = getAppConfig();
  await page.goto(config.trelloURL);

  loginPage = new LoginPage(page);
  boardPage = new BoardPage(page);
  cardPage = new CardPage(page);

  await loginPage.login(config.trelloUsername, config.trelloPassword);
});

test.describe('Cards', () => {
  test('Verify that there are 2 cards on the board', async ({ page }) => {
    await boardPage.navigateToBoard(boardURL);

    const totalCardCount = await boardPage.getCardCount();
    expect(totalCardCount).toBe(2);
  });

  test('Verify that there is 1 card with comment', async ({ page }) => {
    await boardPage.navigateToBoard(boardURL);

    const cardWithCommentsCount = await page.locator(boardPage.selectors.badgeCardComment).count();
    expect(cardWithCommentsCount).toBe(1);
  });

  test('Add new comment to cart',  async ({ page }) => {
    await boardPage.navigateToBoard(boardURL);

    await page.click(boardPage.selectors.badgeCardComment);
    await cardPage.verifyCommentCount(1);

    await cardPage.addNewComment('playwright test automation comment');
    await cardPage.verifyCommentCount(2);
  });

  test('Move ticket to Done', async ({ page }) => {
    await boardPage.navigateToBoard(boardURL);

    const listName = 'Done';
    const doneListLocator = page.locator(boardPage.selectors.list, { hasText: listName });
    await page.locator(boardPage.selectors.card).first().dragTo(doneListLocator);

    const count = await boardPage.getCardCountFromList(listName);
    expect(count).toBe(1);
  });
});
