import { BoardEndpoint } from './services/trello/endpoints/board';

describe('Backend', () => {
    test('Should be able to create board', async() => {
        const boardEndpoint = new BoardEndpoint();

        const boardName = 'testBoard';
        const res = await boardEndpoint.createBoard(boardName);
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('id');
        expect(res.data.name).toBe(boardName);
    });
});
