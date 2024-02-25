const { WikidataLinks, logTag } = require("./WikidataLinks");

// WD instance
const wdLinks = new WikidataLinks();

// run hook
mw.hook('userjs.wikilinqs.ready').fire(wdLinks);

// prep. tool
mw.loader.using(["mediawiki.util"]).then( function() {
	var portletId = mw.config.get('skin') === 'timeless' ? 'p-pagemisc' : 'p-tb';
	var linkLabel = '🇶 Show WD-Q';
	var itemId = 'wikilinqs-tool';
	var item = mw.util.addPortletLink(portletId, '#', linkLabel, itemId);
	item.title = 'WikilinQs: Show WD ids beside wiki-links.'
	$(item).on('click', (evt) => {
		evt.preventDefault();
		wdLinks.all();
	});
});