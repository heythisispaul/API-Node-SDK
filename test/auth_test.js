const chai = require('chai');
const expect = chai.expect;
const Auth = require('../src/lib/auth');

describe('Auth Functions', () => {
    describe('setUserKey', () => {
        it('should set the userKey', () => {
            Auth.setUserKey('hello');
            expect(Auth.userKey).to.equal('hello');
        });
    });
    describe('getUserKey', () => {
        it('should retun the userKey', () => {
            const userKey = Auth.getUserKey();
            expect(userKey).to.be.a('string');
        });
    });
    describe('setAccessToken', () => {
        it('should set the access token', () => {
            Auth.setAccessToken('IamanAccessToken');
            expect(Auth.accessToken).to.equal('IamanAccessToken');
        });
    });
    describe('getAccessToken', () => {
        it('should return the access token', () => {
            const accessToken = Auth.getAccessToken();
            expect(accessToken).to.be.a('string');
        });
    });
    describe('getRefreshToken', () => {
        it('should return the refresh token', () => {
            const refreshToken = Auth.getRefreshToken();
            expect(refreshToken).to.be.a('string');
        });
    });
    describe('setRefreshToken', () => {
        it('should create a method that will execute 15 sec before expiration', () => {
            expect(Auth.refreshTimer).to.be.undefined;
            Auth.setRefreshToken('refreshToken', 1000);

        });
    });
    describe('doRefreshToken', () => {

    });
});