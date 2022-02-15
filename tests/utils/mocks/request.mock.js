const supertest = require('supertest');

const { app } = require('../../../src/app');


export default supertest(app);
