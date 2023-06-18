import { BaseEndpoint } from '../base-endpoint';

export class CardEndpoint extends BaseEndpoint {
    async createCard(params: any) {
        const urlParams = new URLSearchParams(params).toString();

        return this.post(`/1/cards?${urlParams}`, null);
    }

    async updateCard(cardID: string, params: any) {
        const urlParams = new URLSearchParams(params).toString();

        return this.put(`/1/cards/${cardID}?${urlParams}`, null);
    }

    async deleteCard(id: string) {
        return this.delete(`/1/cards/${id}?`);
    }

    async addComment(id: string, txt: string) {
        return this.post(`/1/cards/${id}/actions/comments?text=${txt}`, null);
    }

    async getCard(id: string) {
        return this.get(`/1/cards/${id}?`);
    }
}
