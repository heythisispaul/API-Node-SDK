const chai = require('chai');
const expect = chai.expect;
const TrackviaAPI = require('../src/trackvia-api');

const USERNAME = 'mike.scherer+prod_test@trackvia.com';
const PASSWORD = 'Test1234';
const KEY = '06e44182a2304049fa8fab34251d8db5';
const ACCOUNT = '22223';

const api = new TrackviaAPI(KEY);

describe('TrackVia', () => {
    describe('constructor method', () => {
        it('should throw error if API key is not passed in', () => {
            expect(() => new TrackviaAPI()).to.Throw(Error, 'Must provide API key to TRackviaAPI constructor');
        });
    });
    describe('Account Methods', () => {
        describe('login method', () => {
            it('should login with valid username and password', () => {
                return api.login(USERNAME, PASSWORD)
                    .then(() => {
                        expect(api.getAccessToken()).to.not.be.undefined;
                    })
            });
            it('should throw error with incorrect username', () => {
                return api.login('notmyusername', PASSWORD)
                    .catch((err) => {
                        expect(err).to.be.instanceOf(Error);
                    });
            });
            it('should throw error with incorrect password', () => {
                return api.login(USERNAME, 'notmypassword')
                    .catch((err) => {
                        expect(err).to.be.instanceOf(Error);
                    });
            });
            it('should throw error with no username', () => {
                return api.login(PASSWORD)
                    .catch((err) => {
                        expect(err).to.be.instanceOf(Error);
                    });
            });
            it('should not login with no password', () => {
                return api.login(USERNAME)
                    .catch((err) => {
                        expect(err).to.be.instanceOf(Error);
                    });
            });
            it('should not login with no username and password', () => {
                return api.login()
                    .catch((err) => {
                        expect(err).to.be.instanceOf(Error);
                    });
            });
        });
        describe('getApps method', () => {

        });
    });
});