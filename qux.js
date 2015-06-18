(function () {
  'use strict';

  var root = this;
  var uid = -1;

  function Qux () {
    this.topics = {};
  }

  Qux.prototype.publish = function (topic, data) {
    if (typeof this.topics[topic] === 'undefined') {
      return false;
    }

    var queue = this.topics[topic];
    var len = queue.length;

    for (var i = 0; i < len; i++) {
      queue[i].cb(data);
    }
    return true;
  };

  Qux.prototype.subscribe = function (topic, cb) {
    var token = ++uid;

    // if event not already registered, add it
    if (typeof this.topics[topic] === 'undefined') {
      this.topics[topic] = [];
    }

    this.topics[topic].push({
      token: token,
      cb: cb
    });

    return token;
  };

  Qux.prototype.unsubscribe = function (token) {
    for (var topic in this.topics) {
      var queue = this.topics[topic];
      for (var i = 0; i < queue.length; i++) {
        if (queue[i].token === token) {
          queue.splice(i, 1);
          return true;
        }
      }
    }
    return false;
  };

  if (typeof module !== 'undefined' &&
      typeof module.exports !== 'undefined') {
    module.exports = Qux;
  }
  else {
    root.Qux = Qux;
  }
}).call(this);
