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
    describe('Auth Functions', () => {
        before(() => {
            return api.login(USERNAME, PASSWORD);
        });
        describe('setAccessToken', () => {
            it('should set access token', () => {
                api.setAccessToken('abc123');
                const accessToken = api.getAccessToken();
                expect(accessToken).to.equal('abc123');
            });
        });
        describe('getAccessToken', () => {
            it('should return access token', () => {
                const accessToken = api.getAccessToken();
                expect(accessToken).to.be.a('string');
            });
        });
        describe('getRefreshToken', () => {
            it('should return refresh token', () => {
                const refreshToken = api.getRefreshToken();
                expect(refreshToken).to.be.a('string');
            });
        });
        describe('getUserKey', () => {
            it('should return user key', () => {
                const userKey = api.getUserKey();
                expect(userKey).to.be.a('string');
                expect(userKey).to.equal(KEY);
            });
        });
    });
    describe('Interactive Functions', () => {
        before(() => {
            return api.login(USERNAME, PASSWORD);
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
                        expect(result).to.have.lengthOf(1);
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
            it('should return users', () => {
                return api.getUsers()
                    .then((results) => {
                        expect(results).to.have.all.keys('structure', 'data', 'totalCount');
                    });
            });
            it('should return user objects in array that is value of structure property', () => {
                return api.getUsers()
                    .then(results => {
                        expect(results.structure).to.have.length.above(0);
                        expect(results.structure).to.be.a('array');
                        expect(results.structure[0]).to.be.a('object');
                        expect(results.structure[0]).to.have.all.keys(['name', 'type', 'displayOrder', 'required', 'unique', 'canRead', 'canUpdate', 'canCreate', 'relationshipSize', 'propertyName']);
                    })
            });
        });
        describe('addUser method', () => {
            it('should give error message if no email is passed in', () => {
                const missingEmail = () => api.addUser({firstName: 'Katie', lastName: 'Scruggs'});
                expect(missingEmail).to.Throw(Error, 'email must be supplied when adding user');
            });
            it('should give error message if no firstName is passed in', () => {
                const missingFirstName = () => api.addUser({email: 'katie.scruggs@trackvia.com', lastName: 'Scruggs'});
                expect(missingFirstName).to.Throw(Error, 'firstName must be supplied when adding user');
            });
            it('should give error message if no lastName is passed in', () => {
                const missingLastName = () => api.addUser({email: 'katie.scruggs@trackvia.com', firstName: 'Katie'});
                expect(missingLastName).to.Throw(Error, 'lastName must be supplied when adding user');
            });
        });
        describe('getViews method', () => {
            it('should return all the views', () => {
                return api.getViews()
                    .then(results => {
                        expect(results).to.be.a('array');
                        expect(results).to.have.length.above(0);
                    })
            });
            it('should return view objects in that array', () => {
                return api.getViews()
                    .then(results => {
                        expect(results[0]).to.have.all.keys(['id', 'name', 'applicationName', 'default']);
                    })
            });
        });
        describe('getViewByName method', () => {
            it('should return an array of one view', () => {
                return api.getViewByName('Default WEB SDK TESTING View')
                    .then(results => {
                        expect(results).to.be.a('array');
                        expect(results).to.have.lengthOf(1);
                    })
            });
            it('should return the matching view record', () => {
                return api.getViewByName('Default WEB SDK TESTING View')
                    .then(results => {
                        expect(results[0].name).to.equal('Default WEB SDK TESTING View');
                        expect(results[0].applicationName).to.equal('For Testing *** DO NOT DELETE ***');
                        expect(results[0].default).to.equal(true);
                    })
            });
            it('should throw error if no name is passed in', () => {
                const missingNameParam = () => api.getViewByName();
                expect(missingNameParam).to.Throw(Error, 'name must be supplied when getting view by name');
            });
        });
        describe('getView method', () => {
            it('should get a view without paging or query', () => {
                return api.getView(52)
                    .then(results => {
                        expect(results).to.have.all.keys(['structure', 'data', 'totalCount']);
                    })
            });
            it('should get a view with a query', () => {
                return api.getView(52, {}, 'abc')
                    .then(results => {
                        expect(results.data).to.have.length.above(0);
                    })
            });
            it('should get a view with paging', () => {
                const paging = {
                    start: 0,
                    max: 1
                };
                return api.getView(52, paging)
                    .then(results => {
                        expect(results.data).to.have.lengthOf(1);
                    })
            });
            it('should get a view with paging and a query', () => {
                const paging = {
                    start: 0,
                    max: 1
                };
                return api.getView(52, paging, 'abc')
                    .then(results => {
                        expect(results.data).to.have.lengthOf(1);
                    })
            });
            it('should fail with a viewId', () => {
                return api.getView() 
                    .catch(err => {
                        expect(err).to.be.a('object');
                    })
            });
            it('should not find a bad query', () => {
                return api.getView(52, {}, 'zzzzz')
                    .then(results => {
                        expect(results.data).to.have.lengthOf(0);
                    })
            });
        });
        describe('getRecord method', () => {
            it('should get a record', () => {
                return api.getRecord(52, 4)
                    .then(results => {
                        expect(results).to.have.all.keys(['structure', 'data']);
                    })
            });
            it('should return a record object', () => {
                return api.getRecord(52, 4)
                    .then(results => {
                        expect(results.data).to.have.all.keys(['TEST FIELD', 'id', 'Last User', 'Updated', 'Created', 'Created By User', 'Last User(id)', 'Record ID', 'Created By User(id)']);
                    })
            });
            it('should throw an error without a viewId', () => {
                const noViewId = () => api.getRecord(undefined, 386);
                expect(noViewId).to.throw('view id must be supplied to getRecord');
            });
            it('should throw an error without a recordId', () => {
                const noRecordId = () => api.getRecord(386, undefined);
                expect(noRecordId).to.throw('record id must be supplied to getRecord');
            });
        });
        describe('addRecord method', () => {
            it('should add a record', () => {
                const recordData = {
                    'TEST FIELD': 'abc123'
                };
                return api.addRecord(52, recordData)
                    .then(results => {
                        expect(results).to.have.all.keys(['structure', 'data', 'totalCount']);
                        expect(results.totalCount).to.be.above(0);
                    })
            });
            it('should add a record with a link to parent', () => {
                let parentRecordId;
                before(() => {
                    const parentDetails = {
                        'TEST FIELD': 'abc123'
                    };
                    return api.addRecord(52, parentDetails)
                        .then(results => {
                            parentRecordId = results.data[0].id;
                        })
                });

                const recordData = {
                    'CHILD TEST FIELD': 'abc123',
                    'Link to WEB SDK TESTING': parentRecordId
                };
                return api.addRecord(53, recordData)
                    .then(results => {
                        expect(results).to.have.all.keys(['structure', 'data', 'totalCount']);
                        expect(results.totalCount).to.be.above(0);
                    })
            });
            it('should not add a record with a bad field', () => {
                const recordData = {
                    'WONT WORK': 'abc123'
                };
                return api.addRecord(52, recordData)
                    .catch(err => {
                        expect(err.body.message).to.equal('DENIED!!! - field "WONT WORK" either does not exist or you do not have access to it.');
                    })
            });
        });
        describe('updateRecord method', () => {
            it('should throw error if no view id is supplied', () => {
                const noViewId = () => api.updateRecord(undefined, 4, {record: 'data'});
                expect(noViewId).to.throw('view id must be supplied to updateRecord');
            });
            it('should throw error if no record id is supplied', () => {
                const noRecordId = () => api.updateRecord(52, undefined, {record: 'data'});
                expect(noRecordId).to.throw('record id must be supplied to updateRecord');
            });
        });
        describe('updateRecords', () => {
            //not sure how to test the functionality of these API calls
        });
        describe('deleteAllRecordsInView', () => {
            it('should throw error if no view id is supplied', () => {
                const noViewId = () => api.deleteAllRecordsInView();
                expect(noViewId).to.throw('view id must be supplied to deleteAllRecordsInView');
            });
        });
        describe('deleteRecord method', () => {
            it('should throw error if no view id is supplied', () => {
                const noViewId = () => api.deleteRecord(undefined, 4);
                expect(noViewId).to.throw('view id must be supplied to deleteRecord');
            });
            it('should throw error if no record id is supplied', () => {
                const noRecordId = () => api.deleteRecord(52, undefined);
                expect(noRecordId).to.throw('record id must be supplied to deleteRecord');
            });
        });
        describe('getFile', () => {
            it('should throw error if no view id is supplied', () => {
                const noViewId = () => api.getFile(undefined, 4, 'Field Name');
                expect(noViewId).to.throw('view id must be supplied to downloadFile');
            });
            it('should throw error if no record id is supplied', () => {
                const noRecordId = () => api.getFile(52, undefined, 'Field Name');
                expect(noRecordId).to.throw('record id must be supplied to downloadFile');
            });
            it('should throw error if no field name is supplied', () => {
                const noFieldName = () => api.getFile(52, 4, undefined);
                expect(noFieldName).to.throw('field name must be supplied to downloadFile');
            });
        });
        describe('attachFile', () => {
            it('should throw error if no view id is supplied', () => {
                const noViewId = () => api.attachFile(undefined, 4, 'Field Name', 'File Path');
                expect(noViewId).to.throw('view id must be supplied to attachFile');
            });
            it('should throw error if no record id is supplied', () => {
                const noRecordId = () => api.attachFile(52, undefined, 'Field Name', 'File Path');
                expect(noRecordId).to.throw('record id must be supplied to attachFile');
            });
            it('should throw error if no field name is supplied', () => {
                const noFieldName = () => api.attachFile(52, 4, undefined, 'File Path');
                expect(noFieldName).to.throw('field name must be supplied to attachFile');
            });
            it('should throw error if no field path is supplied', () => {
                const noFieldPath = () => api.attachFile(52, 4, 'Field Name', undefined);
                expect(noFieldPath).to.throw('file path must be supplied to attachFile');
            });
        });
        describe('deleteFile', () => {
            it('should throw error if no view id is supplied', () => {
                const noViewId = () => api.deleteFile(undefined, 4, 'Field Name');
                expect(noViewId).to.throw('view id must be supplied to deleteFile');
            });
            it('should throw error if no record id is supplied', () => {
                const noRecordId = () => api.deleteFile(52, undefined, 'Field Name');
                expect(noRecordId).to.throw('record id must be supplied to deleteFile');
            });
            it('should throw error if no field name is supplied', () => {
                const noFieldName = () => api.deleteFile(52, 4, undefined);
                expect(noFieldName).to.throw('field name must be supplied to deleteFile');
            });
        });
    });
});