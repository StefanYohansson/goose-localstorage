/*global module */

function identity(f) {
  return f;
}

function composeF(f,g) {
  return function(value) {
    return g(f(value));
  }
}

function Goose(storage, migrations, opts) {
  if (!(this instanceof Goose)) {
    return new Goose(storage, migrations, opts);
  }

  return {
    migrate: function() {
      storage = migrations.reduce(composeF, identity)(storage);
    },
    addMigration: function(migration) {
      migrations.push(migration);
    },
    storage: function() {
      return storage;
    }
  };
}

if (typeof module !== "undefined") {
  module.exports = Goose;
}
