const request = require('supertest');
const app = require('../app');
const clearModel = require('../utilities/clearModels');
const tU = require('../utilities/testUtility');

const statusCode = res => tU.statusCode(res, 'Role added successfully.');

// Resets the database for the unit tests
beforeAll(async () => {
    clearModel.clearModels();
});

// Role Unit Tests
describe('GET /roles', () => {
    it('gets an empty array (no roles)', async () => {
        const res = await request(app).get('/roles');
        expect(res.body).toHaveProperty('message', 'Roles obtained successfully.');
        expect(res.body).toHaveProperty('roles', []);
    });
});

describe('POST /roles', () => {
    it('Attempts to add a role with no title to the model', async () => {
        const newRole = {
            role : '',
            company : 'Amazon',
            suggestedMajors : ['MATH', 'DESIGN']
        };

        const res = await request(app).post('/roles').send(newRole);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Company, role title, and suggested majors are required fields.');
    });
});

describe('POST /roles', () => {
    it('Attempts to add a role with no company to the model', async () => {
        const newRole = {
            role : 'Software Engineer',
            company : '',
            suggestedMajors : ['MATH', 'DESIGN']
        };

        const res = await request(app).post('/roles').send(newRole);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Company, role title, and suggested majors are required fields.');
    });
});

describe('POST /roles', () => {
    it('Attempts to add a role with no suggested majors to the model', async () => {
        const newRole = {
            role : 'Software Engineer',
            company : 'Amazon',
            suggestedMajors : []
        };

        const res = await request(app).post('/roles').send(newRole);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Company, role title, and suggested majors are required fields.');
    });
});

describe('POST /roles', () => {
    it('Attempts to add a role with invalid major to the model', async () => {
        const newRole = {
            role : 'Software Engineer',
            company : 'Amazon',
            suggestedMajors : ['BIOLOGY']
        };

        const res = await request(app).post('/roles').send(newRole);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Invalid major: BIOLOGY.');
    });
});

describe('POST /roles', () => {
    it('Attempts to add a role with invalid and then valid major to the model', async () => {
        const newRole = {
            role : 'Software Engineer',
            company : 'Amazon',
            suggestedMajors : ['BIOLOGY', 'COMPUTER SCIENCE']
        };

        const res = await request(app).post('/roles').send(newRole);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Invalid major: BIOLOGY.');
    });
});

describe('POST /roles', () => {
    it('Attempts to add a role with valid and then invalid major to the model', async () => {
        const newRole = {
            role : 'Software Engineer',
            company : 'Amazon',
            suggestedMajors : ['COMPUTER SCIENCE', 'BIOLOGY']
        };

        const res = await request(app).post('/roles').send(newRole);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Invalid major: BIOLOGY.');
    });
});

describe('POST /roles', () => {
    it('Attempts to add a valid role to the model', async () => {
        const newRole = {
            role : 'UI/UX Designer',
            company : 'Meta',
            suggestedMajors : ['DESIGN']
        };

        const res = await request(app).post('/roles').send(newRole);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Role added successfully.');
        expect(res.body).toHaveProperty('role', 
            {
                'roleId' : 1,
                'role' : 'UI/UX Designer',
                'company' : 'Meta',
                'suggestedMajors' : ['DESIGN']
            }
        );
    });
});

describe('POST /roles', () => {
    it('Attempts to add a valid role to the model', async () => {
        const newRole = {
            role : 'Software Engineer',
            company : 'Amazon',
            suggestedMajors : ['COMPUTER SCIENCE']
        };

        const res = await request(app).post('/roles').send(newRole);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Role added successfully.');
        expect(res.body).toHaveProperty('role', 
            {
                'roleId' : 2,
                'role' : 'Software Engineer',
                'company' : 'Amazon',
                'suggestedMajors' : ['COMPUTER SCIENCE']
            }
        );
    });
});

describe('POST /roles', () => {
    it('Attempts to add a valid role to the model', async () => {
        const newRole = {
            role : 'Software Engineer',
            company : 'Apple',
            suggestedMajors : ['COMPUTER SCIENCE', 'MATH']
        };

        const res = await request(app).post('/roles').send(newRole);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Role added successfully.');
        expect(res.body).toHaveProperty('role', 
            {
                'roleId' : 3,
                'role' : 'Software Engineer',
                'company' : 'Apple',
                'suggestedMajors' : ['COMPUTER SCIENCE', 'MATH']
            }
        );
    });
});

describe('POST /roles', () => {
    it('Attempts to add a valid role to the model', async () => {
        const newRole = {
            role : 'Full-Stack Engineer',
            company : 'Netflix',
            suggestedMajors : ['COMPUTER SCIENCE', 'DESIGN']
        };

        const res = await request(app).post('/roles').send(newRole);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Role added successfully.');
        expect(res.body).toHaveProperty('role', 
            {
                'roleId' : 4,
                'role' : 'Full-Stack Engineer',
                'company' : 'Netflix',
                'suggestedMajors' : ['COMPUTER SCIENCE', 'DESIGN']
            }
        );
    });
});

describe('POST /roles', () => {
    it('Attempts to add a valid role to the model', async () => {
        const newRole = {
            role : 'Data Engineer',
            company : 'Google',
            suggestedMajors : ['COMPUTER SCIENCE', 'MATH']
        };

        const res = await request(app).post('/roles').send(newRole);
        statusCode(res);
        expect(res.body).toHaveProperty('role', 
            {
                'roleId' : 5,
                'role' : 'Data Engineer',
                'company' : 'Google',
                'suggestedMajors' : ['COMPUTER SCIENCE', 'MATH']
            }
        );
    });
});

describe('POST /roles', () => {
    it('Attempts to add a valid role to the model', async () => {
        const newRole = {
            role : 'Data Engineer',
            company : 'Amazon',
            suggestedMajors : ['COMPUTER SCIENCE', 'MATH']
        };

        const res = await request(app).post('/roles').send(newRole);
        statusCode(res);
        expect(res.body).toHaveProperty('role', 
            {
                roleId : 6,
                role : 'Data Engineer',
                company : 'Amazon',
                suggestedMajors : ['COMPUTER SCIENCE', 'MATH']
            }
        );
    });
});