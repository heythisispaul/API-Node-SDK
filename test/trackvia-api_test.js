const chai = require('chai');
const expect = chai.expect;
const TrackviaAPI = require('../src/trackvia-api');

const USERNAME = 'mike.scherer+prod_test@trackvia.com';
const PASSWORD = 'Test1234';
const KEY = '06e44182a2304049fa8fab34251d8db5';
const ACCOUNT = 22223;
const APP = 9;
const TABLE = 38;
const VIEW = 52;

const api = new TrackviaAPI(KEY);

describe('TrackVia', () => {
    describe('constructor method', () => {
        it('should throw error if API key is not passed in', () => {
            expect(() => new TrackviaAPI()).to.Throw(Error, 'Must provide API key to TrackviaAPI constructor');
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
            const notUsername = 'notmyusername';
            return api.login(notUsername, PASSWORD)
                .catch((err) => {
                    expect(err).to.be.instanceOf(Error);
                });
        });
        it('should throw error with incorrect password', () => {
            const notPassword = 'notmypassword';
            return api.login(USERNAME, notPassword)
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
        it('should throw error with no password', () => {
            return api.login(USERNAME)
                .catch((err) => {
                    expect(err).to.be.instanceOf(Error);
                });
        });
        it('should throw error with no username and password', () => {
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
                const newAccessToken = 'abc123';
                api.setAccessToken(newAccessToken);
                const accessToken = api.getAccessToken();
                expect(accessToken).to.equal(newAccessToken);
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
                const appName = 'For Testing *** DO NOT DELETE ***';
                return api.getAppByName(appName)
                    .then(result => {
                        expect(result).to.be.a('array');
                        expect(result).to.have.lengthOf(1);
                    })
            });
            it('should return the matching app record', () => {
                const appName = 'For Testing *** DO NOT DELETE ***';                                
                return api.getAppByName(appName)
                    .then(result => {
                        expect(result[0].name).to.equal(appName);
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
            it('should return objects in structure array', () => {
                return api.getUsers()
                    .then(results => {
                        expect(results.structure).to.have.length.above(0);
                        expect(results.structure).to.be.a('array');
                    })
            });
            it('should return objects in data array', () => {
                return api.getUsers()
                    .then(results => {
                        expect(results.data).to.have.length.above(0);
                        expect(results.data).to.be.a('array');
                    })
            });
            it('should return number in totalCount', () => {
                return api.getUsers()
                    .then(results => {
                        expect(results.totalCount).to.be.above(0);
                        expect(results.totalCount).to.be.a('number');
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
                const viewName = 'Default WEB SDK TESTING View';
                return api.getViewByName(viewName)
                    .then(results => {
                        expect(results).to.be.a('array');
                        expect(results).to.have.lengthOf(1);
                    })
            });
            it('should return the matching view record', () => {
                const viewName = 'Default WEB SDK TESTING View';
                const appName = 'For Testing *** DO NOT DELETE ***';                
                return api.getViewByName(viewName)
                    .then(results => {
                        expect(results[0].name).to.equal(viewName);
                        expect(results[0].applicationName).to.equal(appName);
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
            it('should return objects in structure array', () => {
                return api.getView(52)
                    .then(results => {
                        expect(results.structure).to.have.length.above(0);
                        expect(results.structure).to.be.a('array');
                    })
            });
            it('should return objects in data array', () => {
                return api.getView(52)
                    .then(results => {
                        expect(results.data).to.have.length.above(0);
                        expect(results.data).to.be.a('array');
                    })
            });
            it('should return number in totalCount', () => {
                return api.getView(52)
                    .then(results => {
                        expect(results.totalCount).to.be.above(0);
                        expect(results.totalCount).to.be.a('number');
                    })
            });
            it('should get a view with a query', () => {
                return api.getView(52, {}, 'abc')
                    .then(results => {
                        expect(results.data).to.have.length.above(0);
                    })
            });
            it('should get one view with paging', () => {
                const paging = {
                    start: 0,
                    max: 1
                };
                return api.getView(52, paging)
                    .then(results => {
                        expect(results.data).to.have.lengthOf(1);
                    })
            });
            it('should get one view with paging and a query', () => {
                const paging = {
                    start: 0,
                    max: 1
                };
                return api.getView(52, paging, 'abc')
                    .then(results => {
                        expect(results.data).to.have.lengthOf(1);
                    })
            });
            it('should fail without a viewId', () => {
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
            const viewId = 52;
            const recordId = 4;
            it('should get a record and return object with keys of structure and data', () => {
                return api.getRecord(viewId, recordId)
                    .then(results => {
                        expect(results).to.have.all.keys(['structure', 'data']);
                    })
            });
            it('should return an array in the structure property', () => {
                return api.getRecord(viewId, recordId)
                    .then(results => {
                        expect(results.structure).to.be.a('array');
                        expect(results.structure).to.have.length.above(0);
                    })
            });
            it('should return a record object in the data property', () => {
                return api.getRecord(viewId, recordId)
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
            const viewId = 52;

            it('should add a record', () => {
                const recordData = {
                    'TEST FIELD': 'abc123'
                };
                return api.addRecord(viewId, recordData)
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
                    return api.addRecord(viewId, parentDetails)
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
                return api.addRecord(viewId, recordData)
                    .catch(err => {
                        expect(err.body.message).to.equal('DENIED!!! - field "WONT WORK" either does not exist or you do not have access to it.');
                    })
            });
        });
        describe('updateRecord method', () => {
            const viewId = 52;
            const recordId = 4;
            const validRecordData = {
                'TEST FIELD': 'new data'
            };
            const invalidRecordData = {
                notHere: 'data'
            };
            it('should update the record', () => {
                const recordData = {
                    'TEST FIELD': 'new data'
                };
                return api.updateRecord(viewId, recordId, validRecordData)
                    .then(results => {
                        expect(results).to.have.all.keys(['structure', 'data', 'totalCount']);
                        expect(results.data[0]['TEST FIELD']).to.equal('new data');
                    })
            })
            it('should throw error if no view id is supplied', () => {
                const noViewId = () => api.updateRecord(undefined, recordId, invalidRecordData);
                expect(noViewId).to.Throw(Error, 'view id must be supplied to updateRecord');
            });
            it('should throw error if no record id is supplied', () => {
                const noRecordId = () => api.updateRecord(viewId, undefined, invalidRecordData);
                expect(noRecordId).to.Throw(Error, 'record id must be supplied to updateRecord');
            });
        });
        describe('updateRecords', () => {
            const recordData = {
                'TEST FIELD': 'hi'
            };
            // before(() => {
            //     return api.addRecord(52, {'TEST FIELD': 'hello'})
            //         .then(result => {
            //             console.log(result.data) 
            //         })
            // })

            it('should exist', () => {
                // return api.updateRecords(ACCOUNT, APP, TABLE, recordData)
                    // .then(results => {
                    //     console.log(results);
                    // })
            });
        });
        describe('deleteAllRecordsInView', () => {
            it('should throw error if no view id is supplied', () => {
                const noViewId = () => api.deleteAllRecordsInView();
                expect(noViewId).to.Throw(Error, 'view id must be supplied to deleteAllRecordsInView');
            });
        });
        describe('deleteRecord method', () => {
            let idToDelete;
            before(() => {
                const recordData = {
                    'TEST FIELD': 'I will be deleted!'
                };
                return api.addRecord(VIEW, recordData)
                    .then((result) => {
                        idToDelete = result.data[0].id;
                    })
            });
            it('the record to delete should exist', () => {
                return api.getRecord(VIEW, idToDelete)
                    .then(result => {
                        expect(result.data).to.be.a('object');
                        expect(result.data).to.not.be.undefined;
                    })
            });
            it('should delete the record', () => {
                return api.deleteRecord(VIEW, idToDelete)
                    .then(result => {
                        expect('no errors thrown').to.equal('no errors thrown');
                    })  
            });
            it('the record to delete should be gone', () => {
                return api.getRecord(VIEW, idToDelete)
                    .catch(err => {
                        const errorBody = JSON.parse(err.body);
                        expect(errorBody.message).to.equal(`DENIED!!! - Record: ${idToDelete} either does not exist or you do not have access to it.`);
                    })
            });
            it('should throw error if no view id is supplied', () => {
                const noViewId = () => api.deleteRecord(undefined, 4);
                expect(noViewId).to.Throw(Error, 'view id must be supplied to deleteRecord');
            });
            it('should throw error if no record id is supplied', () => {
                const noRecordId = () => api.deleteRecord(52, undefined);
                expect(noRecordId).to.Throw(Error, 'record id must be supplied to deleteRecord');
            });
        });
    });
    describe('File Methods', () => {
        let recordId;
        const viewId = 52;
        const fieldName = 'Doc Field';
        const filePath = __dirname + '/test.pdf';

        before(() => {
            return api.login(USERNAME, PASSWORD);
        });
        before(() => {
            const recordData = {
                'TEST FIELD': 'abc123'
            };
            return api.addRecord(viewId, recordData)
                .then(result => {
                    recordId = result.data[0].id
                })
        });
        describe('attachFile', () => {
            it('should attach a file', () => {
                return api.attachFile(viewId, recordId, fieldName, filePath)
                    .then(result => {
                        expect(JSON.parse(result)).to.have.all.keys(['structure', 'data']);
                    })
            });
            it('should throw error if no view id is supplied', () => {
                const noViewId = () => api.attachFile(undefined, recordId, fieldName, filePath);
                expect(noViewId).to.throw('view id must be supplied to attachFile');
            });
            it('should throw error if no record id is supplied', () => {
                const noRecordId = () => api.attachFile(viewId, undefined, fieldName, filePath);
                expect(noRecordId).to.throw('record id must be supplied to attachFile');
            });
            it('should throw error if no field name is supplied', () => {
                const noFieldName = () => api.attachFile(viewId, recordId, undefined, filePath);
                expect(noFieldName).to.throw('field name must be supplied to attachFile');
            });
            it('should throw error if no field path is supplied', () => {
                const noFieldPath = () => api.attachFile(viewId, recordId, fieldName, undefined);
                expect(noFieldPath).to.throw('file path must be supplied to attachFile');
            });
        });
        describe('getFile', () => {
            it('should get a file', () => {
                return api.getFile(viewId, recordId, 'Doc Field')
                    .then(result => {
                        expect(result).to.not.be.undefined;
                    })
            });
            it('should throw error if no view id is supplied', () => {
                const noViewId = () => api.getFile(undefined, recordId, fieldName);
                expect(noViewId).to.throw('view id must be supplied to downloadFile');
            });
            it('should throw error if no record id is supplied', () => {
                const noRecordId = () => api.getFile(viewId, undefined, fieldName);
                expect(noRecordId).to.throw('record id must be supplied to downloadFile');
            });
            it('should throw error if no field name is supplied', () => {
                const noFieldName = () => api.getFile(viewId, recordId, undefined);
                expect(noFieldName).to.throw('field name must be supplied to downloadFile');
            });
        });
        describe('deleteFile', () => {
            it('should delete a file', () => {
                return api.deleteFile(viewId, recordId, 'Doc Field')
                    .then(() => {
                        return api.getFile(viewId, recordId, 'Doc Field')
                            .catch(err => {
                                const errorBody = JSON.parse(err.body);
                                expect(errorBody.message).to.equal('The resource you requested could not be found.File does not exist.');
                                expect(errorBody.name).to.equal('notFound');
                                expect(errorBody.code).to.equal('404');
                            })
                    });
            });
            it('should throw error if no view id is supplied', () => {
                const noViewId = () => api.deleteFile(undefined, recordId, fieldName);
                expect(noViewId).to.throw('view id must be supplied to deleteFile');
            });
            it('should throw error if no record id is supplied', () => {
                const noRecordId = () => api.deleteFile(viewId, undefined, fieldName);
                expect(noRecordId).to.throw('record id must be supplied to deleteFile');
            });
            it('should throw error if no field name is supplied', () => {
                const noFieldName = () => api.deleteFile(viewId, recordId, undefined);
                expect(noFieldName).to.throw('field name must be supplied to deleteFile');
            });
        });
    });
});