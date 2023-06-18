import { BoardEndpoint } from './services/trello/endpoints/board';
import { CardEndpoint } from './services/trello/endpoints/card';

let boardID: string;
let listID: string;
let boardEndpoint: BoardEndpoint;
let cardEndpoint: CardEndpoint;

describe('Backend', () => {
    // prepare initial data before all tests begin.. 
    beforeAll(async () => {
        boardEndpoint = new BoardEndpoint();
        cardEndpoint = new CardEndpoint();

        // create a new board..
        const boardRes = await boardEndpoint.createBoard({ name: 'testBoard' });
        expect(boardRes.status).toBe(200);
        boardID = boardRes.data.id;

        // create a new list..
        const listRes = await boardEndpoint.createList(boardID, { name: 'testList' });
        expect(listRes.status).toBe(200);
        listID = listRes.data.id;
    });

    // delete board. Trello allows certain amount of max boards at a time..
    afterAll(async () => {
        const res = await boardEndpoint.deleteBoard(boardID);

        expect(res.status).toBe(200);
    });

    test('Should be able to create a new card', async() => {
        // create a new card..
        const params = { idList: listID, name: 'testCard' };
        const res = await cardEndpoint.createCard(params);

        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('id');
        expect(res.data.name).toBe(params.name);
    });

    test('Should be able to update card', async() => {
        // create a new card..
        const cardRes = await cardEndpoint.createCard({ idList: listID, name: 'testCard' });

        // update the card..
        const params  = { name: 'newCardName' };
        const res = await cardEndpoint.updateCard(cardRes.data.id, params);

        expect(res.status).toBe(200);
        expect(res.data.name).toBe(params.name);
    });

    test('Should be able to delete card', async() => {
        // create a new card..
        const cardRes = await cardEndpoint.createCard({ idList: listID, name: 'testCard' });
        const cardID = cardRes.data.id;

        // delete card..
        const res = await cardEndpoint.deleteCard(cardID);
        expect(res.status).toBe(200);

        // check card doesnt exist..
        const getCardRes = await cardEndpoint.getCard(cardID);
        expect(getCardRes.status).toBe(404);
    });

    test('Should be able to add comment to card', async () => {
        // create a new card..
        const cardRes = await cardEndpoint.createCard({ idList: listID, name: 'testCard' });

        // add comment to card..
        const commentText = 'test automation comment';
        const res = await cardEndpoint.addComment(cardRes.data.id, commentText);
        expect(res.status).toBe(200);

        // check if comment exists..
        const filterEntities = res.data.entities.filter(f => f.type === 'comment' && f.text === commentText);
        expect(filterEntities.length).toBe(1);
    });
});
