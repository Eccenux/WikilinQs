const { WikidataLinks, logTag } = require("./WikidataLinks");

// WD instance
const wdLinks = new WikidataLinks();

// run hook
mw.hook('userjs.wikilinqs.ready').fire(wdLinks);
console.log(logTag, 'wikilinqs.ready', wdLinks);
// usage
/*
mw.hook('userjs.wikilinqs.ready').add(function (wdLinks) {
	wdLinks.showWd();
});
*/
