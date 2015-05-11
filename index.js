(function () {
  'use strict';

  var DEFAULT_EMPTY = '';

  var connectionStringTemplate = 'mongodb://{{auth}}{{hostname}}/{{database}}{{authSource}}';
  var authTemplate = '{{username}}:{{password}}@';
  var hostnameTemplate = '{{host}}{{port}}';
  var portTemplate = ':{{port}}';
  var authSourceTemplate = '?authSource={{authSource}}';

  $(function () {
    $('#inputDatabase').on('keyup', createConnectionString);

    $('#inputHost').on('keyup', createConnectionString);
    $('#inputPort').on('keyup', createConnectionString);

    $('#inputUserName').on('keyup', createConnectionString);
    $('#inputUserPassword').on('keyup', createConnectionString);
    $('#inputAuthSource').on('keyup', createConnectionString);

    createConnectionString();
  });

  function createConnectionString() {
    var connectionString = connectionStringTemplate;

    var database = $('#inputDatabase').val() || DEFAULT_EMPTY;

    connectionString = connectionString.replace('{{database}}', database);
    connectionString = connectionString.replace('{{auth}}', createAuthConnectionString());
    connectionString = connectionString.replace('{{hostname}}', createHostnameConnectionString());
    connectionString = connectionString.replace('{{authSource}}', createAuthSourceConnectionString());

    $('#outputConnectionString').val(connectionString);
  }

  function createAuthConnectionString() {
    var connectionString = authTemplate;

    var username = $('#inputUserName').val()     || DEFAULT_EMPTY;
    var password = $('#inputUserPassword').val() || DEFAULT_EMPTY;

    if(username === DEFAULT_EMPTY || password === DEFAULT_EMPTY) {
      return '';
    }

    connectionString = connectionString.replace('{{username}}', username);
    connectionString = connectionString.replace('{{password}}', encodeURIComponent(password));

    return connectionString;
  }

  function createHostnameConnectionString() {
    var connectionString = hostnameTemplate;

    var host = $('#inputHost').val() || DEFAULT_EMPTY;

    connectionString = connectionString.replace('{{host}}', host);
    connectionString = connectionString.replace('{{port}}', createPortConnectionString());

    return connectionString;
  }

  function createPortConnectionString() {
    var connectionString = portTemplate;

    var port = $('#inputPort').val() || DEFAULT_EMPTY;

    if(port === DEFAULT_EMPTY) {
      return '';
    }

    connectionString = connectionString.replace('{{port}}', port);

    return connectionString;
  }

  function createAuthSourceConnectionString() {
    var connectionString = authSourceTemplate;

    var authSource = $('#inputAuthSource').val() || DEFAULT_EMPTY;

    if(authSource === DEFAULT_EMPTY) {
      return '';
    }

    connectionString = connectionString.replace('{{authSource}}', authSource);

    return connectionString;
  }
}());
