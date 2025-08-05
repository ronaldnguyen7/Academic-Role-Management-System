const request = require('supertest');
const app = require('../app');
const clearModel = require('../utilities/clearModels');
const testUtil = require('../utilities/testUtility');

beforeAll(async () => {
    clearModel.clearModels();
    await testUtil
        .addUser('Carter Herman', 'carter@example.com', 'COMPUTER SCIENCE');
    await testUtil
        .addUser('ex2', 'ex', 'COMPUTER SCIENCE');
    await testUtil
        .addUser('ex3', 'ex3', 'DESIGN');
    await testUtil
        .addRole('Software Engineer', 'Amazon', ['COMPUTER SCIENCE', 'MATH']);
    await testUtil
        .addRole('UX Designer', 'Sandbox', 'DESIGN');

    await testUtil
        .addReview(1, 1, 30, 5, 1, "I had a great time and learned a lot!");
    await testUtil.addReview(2, 1, 25, 3, 1, "Terrible :/");
    await testUtil.addReview(3, 1, 28, 4, 1, "It was ok");
})

describe('GET /roles/role-match/:userId', () => {
    it('gets roles suggested for a user', async () => {
        const res = await request(app).get(`/roles/role-match/${1}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Roles successfully matched.')
        expect(res.body).toHaveProperty('matchingRoles',[1]);
    })
})

describe('GET /roles/role-trend/:roleId', () => {
    it('gets the trend of a role', async () => {
        const res = await request(app).get(`/roles/role-trend/${1}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('roleId', 1);
        expect(res.body).toHaveProperty('pay', {
            'avgPay' : 28,
            'minPay' : 25,
            'maxPay' : 30
        });
        expect(res.body).toHaveProperty('avgRating', 4);
        expect(res.body).toHaveProperty('avgCoop', 1);
    })
})
