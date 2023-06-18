import { Page, expect } from "@playwright/test";

export class CardPage {
    protected page: Page
    readonly selectors = {
        newCommentInput: '[data-testid="card-back-new-comment-input-skeleton"]',
        commentTextArea: '[data-testid="card-back-comment-editor-container"] [data-testid="click-wrapper"]',
        commentSaveButtion: '[data-testid="card-back-comment-save-button"]',
        commentContainer: 'div.card-detail-window div[class="comment-container"]',
    };

    constructor(page: Page) {
        this.page = page;
    }

    /** Adds new comment to card. */
    async addNewComment(commentText: string) {
        await this.page.waitForSelector(this.selectors.newCommentInput, { state:"visible" });
        await this.page.click(this.selectors.newCommentInput);
        await this.page.locator(this.selectors.commentTextArea).type(commentText);
        // await this.page.fill(this.selectors.newCommentInput, commentText);
        await this.page.click(this.selectors.commentSaveButtion);
        await this.page.waitForLoadState('load');
    }

    /** Verifies total comment count within card. */
    async verifyCommentCount(expectedCount: number) {
        await this.page.waitForSelector(this.selectors.newCommentInput, { state:"visible" });
        const count = await this.page.locator(this.selectors.commentContainer).count();
        expect(count).toBe(expectedCount);
    }
}
