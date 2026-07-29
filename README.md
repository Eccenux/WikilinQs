WikilinQs
==========================

Wiki gadget that shows the Wikidata item ID (Q) for all links in a Wikipedia article. You trigger it from the Tools menu: "🇶 Show WD-Q".

## Install
You could install the gadget locally (on Wikipedia), but it's probably best to do it by editing [your global.js on Meta](https://meta.wikimedia.org/wiki/Special:MyPage/global.js):
```js
if ( mw.config.get('wgNamespaceNumber') === 0 ) {
	importScript('meta:User:Nux/WikilinQs.js');
}
```

## Example

Article: https://en.wikipedia.org/wiki/Sport_Wales_National_Centre

<img src="https://raw.githubusercontent.com/Eccenux/WikilinQs/main/assets/screen.png" alt=" " />

Notice how Qids are shown beside links.