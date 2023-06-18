import { BaseEndpoint } from '../base-endpoint';

export class BoardEndpoint extends BaseEndpoint {
    async deleteBoard(id: string) {
        return this.delete(`/1/boards/${id}?`);
    }
 
    /** Creates new board. */
    async createBoard(params: any) {
        const urlParams = new URLSearchParams(params).toString();

        return this.post(`/1/boards/?${urlParams}`, null);
    }

    /** Creates a new list for given Board ID. */
    async createList(boardID: string, params: any) {
        const urlParams = new URLSearchParams(params).toString();

        return this.post(`/1/boards/${boardID}/lists?${urlParams}`, null);
    }
}
