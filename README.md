WikilinQs
==========================

Wiki gadget that shows Wikidata item id (Q) for links.

At the moment you can use it manually:
```js
mw.hook('userjs.wikilinqs.ready').add(function (wdLinks) {
	wdLinks.showWd();
});
```
