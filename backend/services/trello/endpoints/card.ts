import { BaseEndpoint } from '../base-endpoint';

export class CardEndpoint extends BaseEndpoint {
    /** Creates new card. */
    async createCard(params: any) {
        const urlParams = new URLSearchParams(params).toString();

        return this.post(`/1/cards?${urlParams}`, null);
    }

    /** Updates card. */
    async updateCard(cardID: string, params: any) {
        const urlParams = new URLSearchParams(params).toString();

        return this.put(`/1/cards/${cardID}?${urlParams}`, null);
    }

    /** Delete card with Card ID. */
    async deleteCard(id: string) {
        return this.delete(`/1/cards/${id}?`);
    }

    /** Add new comment to card. */
    async addComment(id: string, txt: string) {
        return this.post(`/1/cards/${id}/actions/comments?text=${txt}`, null);
    }

    /** Get card information with card id. */
    async getCard(id: string) {
        return this.get(`/1/cards/${id}?`);
    }
}
