const request = require('supertest');
const app = require('../app');
const clearModel = require('../utilities/clearModels');

// Resets the database for the unit tests
beforeAll(async () => {
    clearModel.clearModels();
});

// User Unit Tests
describe('GET /users', () => {
    it('gets an empty array (no users)', async () => {
        const res = await request(app).get('/users');
        expect(res.body).toHaveProperty('message', 'Users obtained successfully.');
        expect(res.body).toHaveProperty('users', []);
    });
});

describe('POST /users', () => {
    it('returns an error due to not being given a name', async () => {
        const newUser = {
            name: "",
            email: "bob@gmail.com",
            major: "COMPUTER SCIENCE"
        };

        const res = await request(app).post('/users').send(newUser);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Please make sure all fields are filled out.');
    });
});

describe('POST /users', () => {
    it('returns an error due to not being given an email', async () => {
        const newUser = {
            name: "bob",
            email: "",
            major: "COMPUTER SCIENCE"
        };

        const res = await request(app).post('/users').send(newUser);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Please make sure all fields are filled out.');
    });
});

describe('POST /users', () => {
    it('returns an error due to not being given an major', async () => {
        const newUser = {
            name: "bob",
            email: "bob@gmail.com",
            major: ""
        };

        const res = await request(app).post('/users').send(newUser);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Please make sure all fields are filled out.');
    });
});

describe('POST /users', () => {
    it('returns an error due to not being given an valid major', async () => {
        const newUser = {
            name: "bob",
            email: "bob@gmail.com",
            major: "BIOLOGY"
        };

        const res = await request(app).post('/users').send(newUser);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Invalid major: BIOLOGY.');
    });
});

describe('POST /users', () => {
    it('returns an error due to be given an invalid major along with a valid major', async () => {
        const newUser = {
            name: "bob",
            email: "bob@gmail.com",
            major: "COMPUTER SCIENCE & BIOLOGY"
        };

        const res = await request(app).post('/users').send(newUser);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Invalid major: BIOLOGY.');
    });
});

describe('POST /users', () => {
    it('returns an error due to be given an invalid major along with a valid major', async () => {
        const newUser = {
            name: "bob",
            email: "bob@gmail.com",
            major: "BIOLOGY & COMPUTER SCIENCE"
        };

        const res = await request(app).post('/users').send(newUser);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Invalid major: BIOLOGY.');
    });
});

describe('POST /users', () => {
    it('creates a new user successfully', async () => {
        const newUser = {
            name: "Bob",
            email: "bob@gmail.com",
            major: "COMPUTER SCIENCE"
        };

        const res = await request(app).post('/users').send(newUser);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'User added successfully.');
        expect(res.body).toHaveProperty('user', {
            'email' : 'bob@gmail.com',
            'userId' : 1,
            'major' : 'COMPUTER SCIENCE',
            'name' : 'Bob'
        });
    });
});

describe('POST /users', () => {
    it('returns an error due to being given an email already in the database', async () => {
        const newUser = {
            name: "bob2",
            email: "bob@gmail.com",
            major: "MATH"
        };

        const res = await request(app).post('/users').send(newUser);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'A user with this email already exists.');
    });
});

describe('POST /users', () => {
    it('creates a new user successfully', async () => {
        const newUser = {
            name: "Ronald Nguyen",
            email: "rn@gmail.com",
            major: "COMPUTER SCIENCE & DESIGN"
        };

        const res = await request(app).post('/users').send(newUser);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'User added successfully.');
        expect(res.body).toHaveProperty('user', {
            email : "rn@gmail.com",
            userId : 2,
            major : "COMPUTER SCIENCE & DESIGN",
            name : "Ronald Nguyen"
        });
    });
});

describe('POST /users', () => {
    it('creates a new user successfully', async () => {
        const newUser = {
            name: "Paulo Martinez Amezaga",
            email: "pma@outlook.com",
            major: "MATH & DESIGN"
        };

        const res = await request(app).post('/users').send(newUser);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'User added successfully.');
        expect(res.body).toHaveProperty('user', {
            email: "pma@outlook.com",
            userId: 3,
            major: "MATH & DESIGN",
            name: "Paulo Martinez Amezaga",
        });
    });
});

describe('POST /users', () => {
    it('creates a new user successfully', async () => {
        const newUser = {
            name: "Brayden Rumack",
            email: "br@yahoo.com",
            major: "MATH & DESIGN & COMPUTER SCIENCE"
        };

        const res = await request(app).post('/users').send(newUser);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'User added successfully.');
        expect(res.body).toHaveProperty('user', {
            name: "Brayden Rumack",
            userId: 4,
            email: "br@yahoo.com",
            major: "MATH & DESIGN & COMPUTER SCIENCE"
        });
    });
});

describe('POST /users', () => {
    it('creates a new user successfully', async () => {
        const newUser = {
            name: "Alex Rhonemus",
            email: "ar@gmail.com",
            major: "MATH & DESIGN"
        };

        const res = await request(app).post('/users').send(newUser);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'User added successfully.');
        expect(res.body).toHaveProperty('user', {
            name: "Alex Rhonemus",
            userId: 5,
            email: "ar@gmail.com",
            major: "MATH & DESIGN"
        });
    });
});

describe('POST /users', () => {
    it('creates a new user successfully', async () => {
        const newUser = {
            name: "Tyler Go",
            email: "tg@northeastern.edu",
            major: "MATH & COMPUTER SCIENCE"
        };

        const res = await request(app).post('/users').send(newUser);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'User added successfully.');
        expect(res.body).toHaveProperty('user', {
            name: "Tyler Go",
            userId: 6,
            email: "tg@northeastern.edu",
            major: "MATH & COMPUTER SCIENCE"
        });
    });
});

describe('POST /users', () => {
    it('creates a new user successfully', async () => {
        const newUser = {
            name: "Lucas Fu",
            email: "lf@aol.com",
            major: "MATH"
        };

        const res = await request(app).post('/users').send(newUser);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'User added successfully.');
        expect(res.body).toHaveProperty('user', {
            name: "Lucas Fu",
            userId: 7,
            email: "lf@aol.com",
            major: "MATH"
        });
    });
});

describe('POST /users', () => {
    it('creates a new user successfully', async () => {
        const newUser = {
            name: "Lucas Fu",
            email: "lf@gmail.com",
            major: "MATH"
        };

        const res = await request(app).post('/users').send(newUser);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'User added successfully.');
        expect(res.body).toHaveProperty('user', {
            name: "Lucas Fu",
            userId : 8,
            email: "lf@gmail.com",
            major: "MATH"
        });
    });
});