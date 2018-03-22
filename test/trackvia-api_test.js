const chai = require('chai');
const expect = chai.expect;
const TrackviaAPI = require('../src/trackvia-api');

const USERNAME = 'mike.scherer+prod_test@trackvia.com';
const PASSWORD = 'Test1234';
const KEY = '06e44182a2304049fa8fab34251d8db5';
const ACCOUNT = '22223';

const api = new TrackviaAPI(KEY);

describe('TrackVia', () => {
    describe('Account Functions', () => {
        describe('#login', () => {
            it('should login', () => {
                return api.login(USERNAME, PASSWORD)
                    .then(() => {
                        expect(api.getAccessToken()).to.not.be.undefined;
                    })
            });
            it('should not login', () => {
                return api.login(USERNAME, 'notmypassword')
                    .catch((err) => {
                        expect(err).to.be.instanceOf(Error);
                    });
            });
        });
    });
});