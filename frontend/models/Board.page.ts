import { Page } from "@playwright/test";

export class BoardPage {
    protected page: Page
    readonly selectors = {
        card: '[data-testid="trello-card"]',
        boardNameContainer: '[data-testid="board-name-container"]',
        badgeCardComment: '[data-testid="badge-card-comments"]',
        boardCanvas: 'div.board-canvas',
        list: '[data-testid="list"]'
    };

    constructor(page: Page) {
        this.page = page;
    }

    /** Navigates to board url and waits for page to load. */
    async navigateToBoard(boardURL: string) {
        await this.page.goto(boardURL);
        await this.page.waitForSelector(this.selectors.boardNameContainer, { state: "visible" });
        await this.page.waitForSelector(this.selectors.boardCanvas, { state: "visible" });
    }

    /** Returns total count of cards within board */
    async getCardCount() {
        return this.page.locator(this.selectors.card).count();
    }

    /** Returns total count of cards within given list name */
    async getCardCountFromList(listName: string) {
        const doneListLocator = this.page.locator(this.selectors.list, { hasText: listName });
        return doneListLocator.locator(this.selectors.card).count();
    }
}
