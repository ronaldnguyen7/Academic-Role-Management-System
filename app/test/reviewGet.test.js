const request = require('supertest');
const app = require('../app');
const clearModel = require('../utilities/clearModels');
const tU = require('../utilities/testUtility');

const statusCode = res => tU.statusCode(res, 'Reviews obtained successfully.');

const r = tU.reviews;

// Resets the database for the unit tests
beforeAll(async () => {
    clearModel.clearModels();
    await tU.createTestRoles();
});
beforeAll(async () => {
    clearModel.clearModels();
    await tU.createTestUsers();
    await tU.createTestRoles();
    await tU.createTestReviews();
});

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
        statusCode(res);
        expect(res.body).toHaveProperty('reviews', r);
    })
})

describe('GET /reviews', () => {
    it('gets all reviews with ids 1,5,10', async () => {
        const res = await request(app).get('/reviews').query({
            reviewIds : [1,5,10]
        })
        statusCode(res);
        expect(res.body).toHaveProperty('reviews', [r[0], r[4], r[9]]);
    })
})

describe('GET /reviews', () => {
    it('gets all reviews from userid 2', async () => {
        const res = await request(app).get('/reviews').query({
            userIds : [2]
        })
        statusCode(res);
        expect(res.body).toHaveProperty('reviews', [r[3], r[4], r[5]]);
    })
})

describe('GET /reviews', () => {
    it('gets all reviews from userid 2 and 5', async () => {
        const res = await request(app).get('/reviews').query({
            userIds : [2, 5]
        })
        statusCode(res);
        expect(res.body).toHaveProperty('reviews', [r[3], r[4], r[5], r[12], r[13], r[14]]);
    })
})

describe('GET /reviews', () => {
    it('gets all reviews from roleid 2 and 5', async () => {
        const res = await request(app).get('/reviews').query({
            roleIds : [2, 5]
        })
        statusCode(res);
        expect(res.body).toHaveProperty('reviews', [
            r[0], r[1], r[4], r[6], r[8], r[9], r[12], r[17]
        ]);
    })
})

describe('GET /reviews', () => {
    it('gets all reviews from user\' first coop', async () => {
        const res = await request(app).get('/reviews').query({
            maxCoop : 1
        })
        statusCode(res);
        expect(res.body).toHaveProperty('reviews', [
            r[0], r[3], r[6], r[9], r[12], r[15]
        ]);
    })
})

describe('GET /reviews', () => {
    it('gets all reviews from user\' first coop and rated it a 5', async () => {
        const res = await request(app).get('/reviews').query({
            maxCoop : 1,
            minRating : 5
        })
        statusCode(res);
        expect(res.body).toHaveProperty('reviews', [
            r[0], r[3], r[6]
        ]);
    })
})

describe('GET /reviews', () => {
    it('gets all reviews from rating 5 and pay > 40', async () => {
        const res = await request(app).get('/reviews').query({
            minPay : 40,
            minRating : 5
        })
        statusCode(res);
        expect(res.body).toHaveProperty('reviews', [
            r[0], r[6]
        ]);
    })
})

describe('GET /reviews', () => {
    it('gets all reviews from rating 1 and pay > 40', async () => {
        const res = await request(app).get('/reviews').query({
            minPay : 40,
            maxRating : 1
        })
        statusCode(res);
        expect(res.body).toHaveProperty('reviews', []);
    })
})

describe('GET /reviews', () => {
    it('gets all reviews users 3rd coop and rating < 5', async () => {
        const res = await request(app).get('/reviews').query({
            minCoop : 3,
            maxRating : 4
        })
        statusCode(res);
        expect(res.body).toHaveProperty('reviews', [
            r[2], r[5], r[8], r[11], r[14], r[17]
        ]);
    })
})

describe('GET /reviews', () => {
    it('gets all reviews userids 1 2 and coop 2', async () => {
        const res = await request(app).get('/reviews').query({
            minCoop : 2,
            maxCoop : 2,
            userIds : [1,2]
        })
        statusCode(res);
        expect(res.body).toHaveProperty('reviews', [
            r[1], r[4]
        ]);
    })
})

describe('GET /reviews', () => {
    it('gets all reviews with pay <= 35', async () => {
        const res = await request(app).get('/reviews').query({
            maxPay: 35
        })
        statusCode(res);
        expect(res.body).toHaveProperty('reviews', [
            r[3], r[4], r[5], r[11], r[15], r[16]
        ])
    })
})

describe('GET /reviews', () => {
    it('handles single string value for userIds', async () => {
        const res = await request(app).get('/reviews').query({
            userIds: '2'
        });
        statusCode(res);
        expect(res.body).toHaveProperty('reviews', [r[3], r[4], r[5]]);
    })
})

describe('GET /reviews', () => {
    it('handles invalid userIds type gracefully', async () => {
        const res = await request(app).get('/reviews').query({
            userIds: { foo: 'bar' }
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('reviews', []);
    })
})