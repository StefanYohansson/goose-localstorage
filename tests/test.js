var should = require("should");
var Goose = require("../lib/index.js");

var localStorage = {
  "lang": "ko"
};
var migrations = [
  storage => {
    var langs = ["en_US", "pt_BR", "de"];
    var default_lang = "en_US";

    if (storage.lang in langs)
      return storage;

    return Object.assign(storage, {
      lang: default_lang
    }, {});
  },
  storage => storage,
];

describe("Goose", function() {
  it("should migrate", function() {
    var goose = new Goose(localStorage, migrations);
    goose.migrate();
    localStorage = goose.storage();
    localStorage.should.be.eql({
      lang: "en_US"
    });
  })

  it("should add migrate on the fly", function() {
    var goose = new Goose(localStorage, migrations);
    goose.migrate();
    localStorage = goose.storage();
    localStorage.should.be.eql({
      lang: "en_US"
    });

    goose.addMigration(storage => {
      if (storage.name)
        return storage;

      return Object.assign(storage, {
        name: ""
      }, {});
    });
    goose.migrate();
    localStorage = goose.storage();
    localStorage.should.be.eql({
      lang: "en_US",
      name: ""
    });
  })
});
