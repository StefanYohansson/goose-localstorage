/*global module */

function Goose(storage, migrations, opts) {
  if (!(this instanceof Goose)) {
    return new Goose(storage, migrations, opts);
  }

  return {
    migrate: function() {
      storage = migrations.reduce(function(previous, current, index, array) {
        if (typeof previous === 'function') {
          return current(previous(storage));
        }
        return current(previous);
      }, {});
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
