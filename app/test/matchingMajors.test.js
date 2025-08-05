const request = require('supertest');
const app = require('../app');
const clearModel = require('../utilities/clearModels');
const tU = require('../utilities/testUtility');

const statusCode = res => tU.statusCode(res, 'Roles successfully matched.');

const r = tU.roles;

beforeAll(async () => {
    clearModel.clearModels();
    await tU.createTestUsers();
    await tU.createTestRoles();
    await tU.createTestReviews();
})

describe('GET /users', () => {
    it('Gets all users in the database', async () => {
        const res = await request(app).get('/users');
        expect(res.body).toHaveProperty('message', 'Users obtained successfully.');
        expect(res.body).toHaveProperty('users', tU.users);
    });
});

describe('GET /roles', () => {
    it('gets all the roles in the database', async () => {
        const res = await request(app).get('/roles');
        expect(res.body).toHaveProperty('message', 'Roles obtained successfully.');
        expect(res.body).toHaveProperty('roles', tU.roles);
    });
});

describe('GET /reviews', () => {
    it('retrieves all reviews in the database', async () => {
        const res = await request(app).get('/reviews');
        expect(res.body).toHaveProperty('message', 'Reviews obtained successfully.');
        expect(res.body).toHaveProperty('reviews', tU.reviews);
    })
})

describe('GET /roles/role-match/:userId', () => {
    it('gets matching roles for user 1', async () => {
        const res = await request(app).get(`/roles/role-match/${1}`);
        statusCode(res);
        expect(res.body).toHaveProperty('matchingRoles', [
            2,3,4,5
        ])
    })
})

describe('GET /roles/role-match/:userId', () => {
    it('gets matching roles for user 2', async () => {
        const res = await request(app).get(`/roles/role-match/${2}`);
        statusCode(res);
        expect(res.body).toHaveProperty('matchingRoles', [
            1,3,4,5
        ])
    })
})

describe('GET /roles/role-match/:userId', () => {
    it('gets matching roles for user 3', async () => {
        const res = await request(app).get(`/roles/role-match/${3}`);
        statusCode(res);
        expect(res.body).toHaveProperty('matchingRoles', [
            2,3,4,5
        ])
    })
})

describe('GET /roles/role-match/:userId', () => {
    it('gets matching roles for user 4', async () => {
        const res = await request(app).get(`/roles/role-match/${4}`);
        statusCode(res);
        expect(res.body).toHaveProperty('matchingRoles', [
            3,5
        ])
    })
})

describe('GET /roles/role-match/:userId', () => {
    it('gets matching roles for user 5', async () => {
        const res = await request(app).get(`/roles/role-match/${5}`);
        statusCode(res);
        expect(res.body).toHaveProperty('matchingRoles', [
            2,3,4,5
        ])
    })
})

describe('GET /roles/role-match/:userId', () => {
    it('gets matching roles for user 6', async () => {
        const res = await request(app).get(`/roles/role-match/${6}`);
        statusCode(res);
        expect(res.body).toHaveProperty('matchingRoles', [
            1,4
        ])
    })
})

describe('GET /roles/role-match/:userId', () => {
    it('gets matching roles for a userid (7) who doesn\' exist', async () => {
        const res = await request(app).get(`/roles/role-match/${7}`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'User does not exist.');
    })
})