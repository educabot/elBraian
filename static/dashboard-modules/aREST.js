// Device definition
function Device(address) {
  this.address = address;

  this.pinMode = function(pin, state) {
    $.ajaxq('queue', {
      url: 'http://' + this.address + '/mode/' + pin + '/o',
      crossDomain: true
    }).done(function(data) {
      //console.log(data);
    });
  };

  this.digitalWrite = function(pin, state) {
    $.ajaxq('queue', {
      url: 'http://' + this.address + '/digital/' + pin + '/' + state,
      crossDomain: true
    }).done(function(data) {
      //console.log(data);
    });
  };

  this.analogWrite = function(pin, state) {
    $.ajaxq('queue', {
      url: 'http://' + this.address + '/analog/' + pin + '/' + state,
      crossDomain: true
    }).done(function(data) {
      //console.log(data);
    });
  };

  this.analogRead = function(pin, callback) {
  //  let url = 'http://' + this.address + '/analog/' + pin;
  //  httpGetAsync(url)
    $.ajaxq('queue', {
      url: 'http://' + this.address + '/analog/' + pin,
      crossDomain: true
    }).done(function(data) {
      callback(data);
    });
  };
  //----------------------

  function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }
  //-----------------------

  this.digitalRead = function(pin, callback) {
    $.ajaxq('queue', {
      url: 'http://' + this.address + '/digital/' + pin,
      crossDomain: true
    }).done(function(data) {
      callback(data);
    });
  };

  this.getVariable = function(variable, callback) {
    $.ajaxq('queue', {
      url: 'http://' + this.address + '/' + variable,
      crossDomain: true
    }).done(function(data) {
      callback(data);
    });
  };

  this.callFunction = function(called_function, parameters, callback) {
    $.ajaxq('queue', {
      url: 'http://' + this.address + '/' + called_function + '?params=' + parameters,
      crossDomain: true
    }).done(function(data) {
      if (callback != null) {callback(data);}
    });
  };
}
