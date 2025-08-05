const request = require('supertest');
const app = require('../app');
const clearModel = require('../utilities/clearModels');
const tU = require('../utilities/testUtility');

const statusCode = res => tU.statusCode(res, 'Roles obtained successfully.');

const r = tU.roles;

// Resets the database for the unit tests
beforeAll(async () => {
    clearModel.clearModels();
    await tU.createTestRoles();
});

describe('/GET roles', () => {
    it('gets roles in the database', async () => {
        const res = await request(app).get('/roles');
        statusCode(res);
        expect(res.body).toHaveProperty('roles', r);
    })
})

describe('/GET roles', () => {
    it('gets roles that are for CS majors', async () => {
        const res = await request(app).get('/roles').query({
            suggestedMajors : 'COMPUTER SCIENCE'
        });
        statusCode(res);
        expect(res.body).toHaveProperty('roles', r.slice(1,5))
    })
})

describe('/GET roles', () => {
    it('gets roles that are for CS AND Design majors', async () => {
        const res = await request(app).get('/roles').query({
            suggestedMajors : ['COMPUTER SCIENCE', 'DESIGN']
        });
        statusCode(res);
        expect(res.body).toHaveProperty('roles', [r[3]])
    })
})

describe('/GET roles', () => {
    it('gets roles that have ids 1,4,5', async () => {
        const res = await request(app).get('/roles').query({
            roleIds : [1,4,5]
        });
        statusCode(res);
        expect(res.body).toHaveProperty('roles', [r[0], r[3], r[4]])
    })
})

describe('/GET roles', () => {
    it('gets roles that have ids 1,4,5 and for computer science majors', async () => {
        const res = await request(app).get('/roles').query({
            suggestedMajors : 'COMPUTER SCIENCE',
            roleIds : [1,4,5]
        });
        statusCode(res);
        expect(res.body).toHaveProperty('roles', [r[3], r[4]])
    })
})

describe('/GET roles', () => {
    it('gets roles that are offered by Amazon or Apple', async () => {
        const res = await request(app).get('/roles').query({
            companies : ['Apple', 'Amazon']
        });
        statusCode(res);
        expect(res.body).toHaveProperty('roles', [r[1], r[2]])
    })
})

describe('/GET roles', () => {
    it('gets roles that are software engineers', async () => {
        const res = await request(app).get('/roles').query({
            roles : 'Software Engineer'
        });
        statusCode(res);
        expect(res.body).toHaveProperty('roles', [r[1]])
    })
})

describe('/GET roles', () => {
    it('gets roles that are software engineers and offered by Meta', async () => {
        const res = await request(app).get('/roles').query({
            roles : 'Software Engineer',
            companies : 'Meta'
        });
        statusCode(res);
        expect(res.body).toHaveProperty('roles', [])
    })
})