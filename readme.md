Goose localStorage
====

Fix your local storage without headaches.

### Usage

- es6

```javascript
var migrations = [
  storage => {
    var langs = ["en_US", "pt_BR", "de"];
    var default_lang = "en_US";

    if (storage.lang in langs)
      return storage;

    return {
      ...storage,
      lang: default_lang
    };
  }
];

var goose = new Goose(localStorage, migrations);
goose.migrate();
localStorage = goose.storage();
```

- old school

```javascript
var migrations = [
  function(storage) {
    var langs = ["en_US", "pt_BR", "de"];
    var default_lang = "en_US";

    if (langs.indexOf(storage.lang) != -1)
      return storage;

    return Object.assign(storage, {
      lang: default_lang
    }, {});
  }
];

var goose = new Goose(localStorage, migrations);
goose.migrate();
localStorage = goose.storage();
```

### Installation

```
npm install goose-localstorage --save
```

### Development

```
git clone git@github.com:StefanYohansson/goose-localstorage.git
npm install
npm test
```
