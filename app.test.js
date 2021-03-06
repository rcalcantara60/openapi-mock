// These are mainly integration tests as openapi-mock mainly exists as an integration of external tools
const request = require('supertest');
const express = require('express');
const initapp = require('./app');
const assert = require('assert');

describe('app', () => {
  let app;
  before(async() => {
    app = await initapp({
      mock: './example/mocks'
    });
  });

  after(() => {app.close()});

  it('should return Content-Type=json for a valid api request', done => {
    request(app)
      .get('/v2/store/order/1')
      .expect('Content-Type', /json/)
      .expect(200, done)//TODO: remove?
  });
  it('should return status 200 for a valid api request', done => {
    request(app)
      .get('/v2/store/order/1')
      .expect(200, done)
  });
  it('should return a generated response matching spec for endpoints without an example', done => {
    request(app)
      .get('/v2/pet/1')
      .expect(res => {
        // TODO: full spec check
        assert.ok(res.body.name.length > 0)
      })
      .expect(200, done)
  });
  it.skip('should return example JSON for endpoints with an example', done => {
    console.error('TODO:');
    assert.ok(false);
  });
})
