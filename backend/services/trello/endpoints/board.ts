import { BaseEndpoint } from '../base-endpoint';

export class BoardEndpoint extends BaseEndpoint {
    async createBoard(name: string) {
        return this.post(`/1/boards/?name=${name}`, null);
    }
}
