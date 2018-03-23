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
        it('should return array of apps', () => {
            return api.getApps()
                .then(results => {
                    expect(results).to.be.a('array');
                    expect(results).to.have.length.above(0);
                })
        });
        it('should return app objects', () => {
            return api.getApps()
                .then(results => {
                    expect(results[0]).to.have.property('name');
                    expect(results[0]).to.have.property('id');
                })
        })
    });

    describe('getAppByName method', () => {
        it('should return one app in an array', () => {
            return api.getAppByName('For Testing *** DO NOT DELETE ***')
                .then(result => {
                    expect(result).to.be.a('array');
                    expect(result).to.have.length(1);
                })
        });
        it('should return the matching app record', () => {
            return api.getAppByName('For Testing *** DO NOT DELETE ***')
                .then(result => {
                    expect(result[0].name).to.equal('For Testing *** DO NOT DELETE ***');
                    expect(result[0].id).to.equal(9);
                })
        })
    });

    describe('getUsers method', () => {
        it('should return array of users', () => {
            return api.getUsers()
                .then((results) => {
                    expect(results.structure).to.have.length.above(0);
                    expect(results.structure).to.be.a('array');
                });
        });
        it('should return user objects', () => {
            return api.getUsers()
                .then(results => {
                    expect(results.structure[0]).to.be.a('object');
                    expect(results.structure[0]).to.have.property('name');
                    expect(results.structure[0]).to.have.property('type');
                    expect(results.structure[0]).to.have.property('required');
                    expect(results.structure[0]).to.have.property('unique');
                    expect(results.structure[0]).to.have.property('canRead');
                    expect(results.structure[0]).to.have.property('canUpdate');
                    expect(results.structure[0]).to.have.property('canCreate');
                    expect(results.structure[0]).to.have.property('relationshipSize');
                    expect(results.structure[0]).to.have.property('propertyName');
                })
        });
    });
});