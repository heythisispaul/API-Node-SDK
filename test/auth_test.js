'use strict';
const chai = require('chai');
const expect = chai.expect;
const Auth = require('../src/lib/auth');

describe('Auth Functions', () => {
    describe('setUserKey', () => {
        it('should set the userKey', () => {
            const userKey = 'hello';
            Auth.setUserKey(userKey);
            expect(Auth.userKey).to.equal(userKey);
        });
    });
    describe('getUserKey', () => {
        it('should return the userKey', () => {
            const userKey = Auth.getUserKey();
            expect(userKey).to.be.a('string');
        });
    });
    describe('setAccessToken', () => {
        it('should set the access token', () => {
            const accessToken = 'IamanAccessToken';
            Auth.setAccessToken(accessToken);
            expect(Auth.accessToken).to.equal(accessToken);
        });
    });
    describe('getAccessToken', () => {
        it('should return the access token', () => {
            const accessToken = Auth.getAccessToken();
            expect(accessToken).to.be.a('string');
        });
    });
    describe('setRefreshToken', () => {
        it('should set a refreshToken property', () => {
            const refreshToken = 'refreshToken';
            Auth.setRefreshToken(refreshToken, 1000);
            expect(Auth.refreshToken).to.equal(refreshToken);
        })
        it('should create a method that will execute 15 sec before expiration', () => {
            expect(Auth.refreshTimer).to.not.be.undefined;
        });
    });
    describe('getRefreshToken', () => {
        it('should return the refresh token', () => {
            const refreshToken = Auth.getRefreshToken();
            expect(refreshToken).to.be.a('string');
        });
    });
    describe('doRefreshToken', () => {
        it('should be a function', () => {
            expect(Auth.doRefreshToken).to.be.a('function');
        });
        it('should return a promise', () => {
            const result = Auth.doRefreshToken();
            expect(result).to.be.a('promise');
        });
    });
});