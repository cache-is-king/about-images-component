const ajax = require('../client/src/ajax.js');
const sinon = require('sinon');
const sampleData = require('../data/sampleData.js');

const BASE_URL = process.env.BASE_URL ? process.env.BASE_URL : '';

describe("with fake server", function() {
  const data = sampleData[0];
  let server;

  beforeEach(function () {
    server = sinon.fakeServer.create()
  });

  afterEach(function () {
    server.restore();
  });

  it("fetches with the correct id and url", function () {
    server.respondWith("GET", `${BASE_URL}/restaurants/90976`, [200, {"Content-Type":"application/json"}, JSON.stringify(data)]);
    const callback = jasmine.createSpy('callback');
    ajax.get(90976, callback);
    server.respond();
    var res = callback.calls.mostRecent().args[1];
    expect(callback).toHaveBeenCalled();
    expect(res.id).toBe(90976);
    expect(res.name).toBe("Beard Papa's");
  });
});
