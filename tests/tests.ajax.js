var xhr, requests;

module('Ajax Tests', {
  setup: function () {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];

    xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  },
  teardown: function () {
    xhr.restore();
  }
});



test('ajax success no settings', function () {
  var source = Rx.DOM.ajax('/products');

  source.subscribe(
    function (x) {
      // Ensure GET by default
      equal('GET', x.xhr.method);

      // Ensure status
      equal(200, x.status);

      // Ensure async
      ok(x.xhr.async);

      // Assert equality for the message
      var resp = JSON.parse(x.xhr.responseText);
      equal(123, resp[0].id);
    },
    function () {
      ok(false);
    },
    function () {
      ok(true);
    }
  );

  requests[0].respond(200, { 'Content-Type': 'application/json' }, '[{ "id": 123 }]');
});

test('ajax failure no settings', function () {
  var source = Rx.DOM.ajax('/products');

  source.subscribe(
    function () {
      // Should not happen
      ok(false);
    },
    function (x) {
      // Ensure GET by default
      equal('GET', x.xhr.method);

      // Ensure status
      equal(500, x.status);

      // Ensure async
      ok(x.xhr.async);

      // Assert equality for the message
      equal('error', x.xhr.responseText);

      // Assert type of error
      equal('error', x.type);
    },
    function () {
      ok(false);
    }
  );

  requests[0].respond(500, { 'Content-Type': 'application/json' }, 'error');
});

test('ajax failure settings', function () {
  var source = Rx.DOM.ajax({
    url: '/products',
    method: 'POST',
    headers: {
      'X-Requested-With': 'RxJS',
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: { id: 123 }
  });

  source.subscribe(
    function () {
      ok(false);
    },
    function (x) {
      // Ensure POST
      equal('POST', x.xhr.method);

      // Ensure headers
      equal('RxJS', x.xhr.requestHeaders['X-Requested-With']);
      equal('application/json;charset=utf-8', x.xhr.requestHeaders['Content-Type']);

      // Ensure status
      equal(500, x.status);

      // Ensure async
      ok(x.xhr.async);

      // Assert equality for the message
      ok('error', x.xhr.responseText);

      // Assert type of error
      equal('error', x.type);
    },
    function () {
      ok(false);
    }
  );

  requests[0].respond(500, { 'Content-Type': 'application/json' }, 'error');
});


test('get success', function () {
  var source = Rx.DOM.get('/products');

  source.subscribe(
    function (x) {
      // Ensure GET by default
      equal('GET', x.xhr.method);

      // Ensure status
      equal(200, x.status);

      // Ensure async
      ok(x.xhr.async);

      // Assert equality for the message
      var resp = JSON.parse(x.xhr.responseText);
      equal(123, resp[0].id);
    },
    function () {
      ok(false);
    },
    function () {
      ok(true);
    }
  );

  requests[0].respond(200, { 'Content-Type': 'application/json' }, '[{ "id": 123 }]');
});

test('get failure', function () {
  var source = Rx.DOM.get('/products');

  source.subscribe(
    function () {
      // Should not happen
      ok(false);
    },
    function (x) {
      // Ensure GET by default
      equal('GET', x.xhr.method);

      // Ensure status
      equal(500, x.status);

      // Ensure async
      ok(x.xhr.async);

      // Assert equality for the message
      equal('error', x.xhr.responseText);

      // Assert type of error
      equal('error', x.type);
    },
    function () {
      ok(false);
    }
  );

  requests[0].respond(500, { 'Content-Type': 'application/json' }, 'error');
});


test('post success', function () {
  var source = Rx.DOM.post('/products', { id: 123 });

  source.subscribe(
    function (x) {
      // Ensure GET by default
      equal('POST', x.xhr.method);

      // Ensure body
      equal(123, x.xhr.requestBody.id);

      // Ensure status
      equal(200, x.status);

      // Ensure async
      ok(x.xhr.async);

      // Assert equality for the message
      var resp = JSON.parse(x.xhr.responseText);
      equal(123, resp[0].id);
    },
    function () {
      ok(false);
    },
    function () {
      ok(true);
    }
  );

  requests[0].respond(200, { 'Content-Type': 'application/json' }, '[{ "id": 123 }]');
});

test('post failure', function () {
  var source = Rx.DOM.post('/products', { id: 123 });

  source.subscribe(
    function () {
      // Should not happen
      ok(false);
    },
    function (x) {
      // Ensure GET by default
      equal('POST', x.xhr.method);

      // Ensure body
      equal(123, x.xhr.requestBody.id);

      // Ensure status
      equal(500, x.status);

      // Ensure async
      ok(x.xhr.async);

      // Assert equality for the message
      equal('error', x.xhr.responseText);

      // Assert type of error
      equal('error', x.type);
    },
    function () {
      ok(false);
    }
  );

  requests[0].respond(500, { 'Content-Type': 'application/json' }, 'error');
});


test('getJSON success', function () {
  var source = Rx.DOM.getJSON('/products');

  source.subscribe(
    function (x) {
      equal(123, x[0].id);
    },
    function () {
      ok(false);
    },
    function () {
      ok(true);
    }
  );

  requests[0].respond(200, { 'Content-Type': 'application/json' }, '[{ "id": 123 }]');
});

test('getJSON failure', function () {
  var source = Rx.DOM.getJSON('/products');

  source.subscribe(
    function () {
      // Should not happen
      ok(false);
    },
    function (x) {
      // Ensure GET by default
      equal('GET', x.xhr.method);

      // Ensure status
      equal(500, x.xhr.status);

      // Ensure async
      ok(x.xhr.async);

      // Assert equality for the message
      equal('error', x.xhr.responseText);

      // Assert type of error
      equal('error', x.type);
    },
    function () {
      ok(false);
    }
  );

  requests[0].respond(500, { 'Content-Type': 'application/json' }, 'error');
});
