const request = require('supertest');
const app = require('../app');
const clearModel = require('../utilities/clearModels');
const tU = require('../utilities/testUtility');

const statusCode = res => tU.statusCode(res, 'Trend successfully received.');

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

describe('GET /roles/role-trend/:roleId', () => {
    it('gets the trend of role id 1', async () => {
        const res = await request(app).get(`/roles/role-trend/${1}`);
        statusCode(res);
        expect(res.body).toHaveProperty('roleId', 1);
        expect(res.body).toHaveProperty('pay', {
            avgPay: 33,
            minPay: 30,
            maxPay: 35
        });
        expect(res.body).toHaveProperty('avgRating', 4);
        expect(res.body).toHaveProperty('avgCoop', 2);        
    })
})

describe('GET /roles/role-trend/:roleId', () => {
    it('gets the trend of role id 2', async () => {
        const res = await request(app).get(`/roles/role-trend/${2}`);
        statusCode(res);
        expect(res.body).toHaveProperty('roleId', 2);
        expect(res.body).toHaveProperty('pay', {
            avgPay: 42,
            minPay: 39,
            maxPay: 45
        });
        expect(res.body).toHaveProperty('avgRating', 5);
        expect(res.body).toHaveProperty('avgCoop', 1);             
    })
})

describe('GET /roles/role-trend/:roleId', () => {
    it('gets the trend of role id 3', async () => {
        const res = await request(app).get(`/roles/role-trend/${3}`);
        statusCode(res);
        expect(res.body).toHaveProperty('roleId', 3);
        expect(res.body).toHaveProperty('pay', {
            avgPay: 38,
            minPay: 36,
            maxPay: 40
        });
        expect(res.body).toHaveProperty('avgRating', 3);
        expect(res.body).toHaveProperty('avgCoop', 2);                    
    })
})

describe('GET /roles/role-trend/:roleId', () => {
    it('gets the trend of role id 4', async () => {
        const res = await request(app).get(`/roles/role-trend/${4}`);
        statusCode(res);
        expect(res.body).toHaveProperty('roleId', 4);
        expect(res.body).toHaveProperty('pay', {
            avgPay: 36,
            minPay: 32,
            maxPay: 40
        });
        expect(res.body).toHaveProperty('avgRating', 3);
        expect(res.body).toHaveProperty('avgCoop', 3);
    })
})

describe('GET /roles/role-trend/:roleId', () => {
    it('gets the trend of role id 5', async () => {
        const res = await request(app).get(`/roles/role-trend/${5}`);
        statusCode(res);
        expect(res.body).toHaveProperty('roleId', 5);
        expect(res.body).toHaveProperty('pay', {
            avgPay: 38,
            minPay: 35,
            maxPay: 41
        });
        expect(res.body).toHaveProperty('avgRating', 4);
        expect(res.body).toHaveProperty('avgCoop', 2);        
    })
})

describe('GET /roles/role-trend/:roleId', () => {
    it('gets the trend of roleid (6) that does not exist', async () => {
        const res = await request(app).get(`/roles/role-trend/${6}`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'Role doesn\'t exist');
    })
})
