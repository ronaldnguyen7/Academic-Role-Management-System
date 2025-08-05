const request = require('supertest');
const app = require('../app');
const clearModel = require('../utilities/clearModels');
const tU = require('../utilities/testUtility');

const statusCode = res => tU.statusCode(res, 'Users obtained successfully.')

const u = tU.users;

// Resets the database for the unit tests
beforeAll(async () => {
    clearModel.clearModels();
    await tU.createTestUsers();
});

describe('GET /users', () => {
    it('gets all users in the database', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Users obtained successfully.');
        expect(res.body).toHaveProperty('users', tU.users);
    })
})

describe('GET /users', () => {
    it('gets all users in the database with a Computer Science major', async () => {
        const res = await request(app).get('/users').query({ 
            majors: 'COMPUTER SCIENCE' 
        })
        statusCode(res);
        expect(res.body).toHaveProperty('users', [u[0], u[2], u[4]]);
    })
})

describe('GET /users', () => {
    it('gets all users in the database with a Computer Science OR Design major', async () => {
        const res = await request(app).get('/users').query({ 
            majors: ['COMPUTER SCIENCE', 'DESIGN']
        })
        statusCode(res);
        expect(res.body).toHaveProperty('users', [u[0], u[1], u[2], u[4], u[5]]);
    })
})

describe('GET /users', () => {
    it('gets all users in the database with a Computer Science AND MATH major', async () => {
        const res = await request(app).get('/users').query({ 
            majors: ['COMPUTER SCIENCE & MATH']
        })
        statusCode(res);
        expect(res.body).toHaveProperty('users', [u[0]]);
    })
})

describe('GET /users', () => {
    it('gets all users with the name Lucas Fu', async () => {
        const res = await request(app).get('/users').query({
            names : 'Lucas Fu'
        })
        statusCode(res);
        expect(res.body).toHaveProperty('users', [u[5]]);
    })
})

describe('GET /users', () => {
    it('gets all users with the name Lucas Fu OR Ronald Nguyen', async () => {
        const res = await request(app).get('/users').query({
            names : ['Lucas Fu', 'Ronald Nguyen']
        })
        statusCode(res);
        expect(res.body).toHaveProperty('users', [u[2], u[5]]);
    })
})

describe('GET /users', () => {
    it('gets all users with the name Lucas Fu OR Ronald Nguyen that have a CS Major', async () => {
        const res = await request(app).get('/users').query({
            names : ['Lucas Fu', 'Ronald Nguyen'],
            majors : 'COMPUTER SCIENCE'
        })
        statusCode(res);
        expect(res.body).toHaveProperty('users', [u[2]]);
    })
})

describe('GET /users', () => {
    it('gets all users with the email address rn@northeastern.edu', async () => {
        const res = await request(app).get('/users').query({
            emails : 'rn@northeastern.edu'
        })
        statusCode(res);
        expect(res.body).toHaveProperty('users', [u[2]]);
    })
})

describe('GET /users', () => {
    it('gets all users with the email address rn@northeastern.edu and have a design major', async () => {
        const res = await request(app).get('/users').query({
            emails : 'rn@northeastern.edu',
            majors : 'DESIGN'
        })
        statusCode(res);
        expect(res.body).toHaveProperty('users', []);
    })
})

describe('GET /users', () => {
    it('gets all users ids 1, 3, 4', async () => {
        const res = await request(app).get('/users').query({
            userIds : [1,3,4]
        })
        statusCode(res);
        expect(res.body).toHaveProperty('users', [u[0], u[2], u[3]]);
    }) 
})