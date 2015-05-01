var Qux = (function () {
  'use strict';

  function Qux () {
    this.events = {};
  }

  var uid = -1;

  Qux.prototype.publish = function (ev, data) {
    if (typeof this.events[ev] === 'undefined') {
      return false;
    }

    var q = this.events[ev];
    var len = q.length;

    for (var i = 0; i < len; i++) {
      q[i].fn(ev, data);
    }
    return true;
  };

  Qux.prototype.subscribe = function (ev, fn) {
    // if event not already registered, add it
    if (typeof this.events[ev] === 'undefined') {
      this.events[ev] = [];
    }

    var token = ++uid;

    this.events[ev].push({
      token: token,
      fn: fn
    });
  };

  Qux.prototype.unsubscribe = function (token) {
    for (var e in this.events) {
      var q = this.events[e];
      for (var i = 0; i < q.length; i++) {
        if (q[i].token === token) {
          q.splice(i, 1);
        }
      }
    }
  };

  return Qux;
})();

