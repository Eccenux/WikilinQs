/**
 * WikilinQs.
 * 
 * Show WD items id (Q) for links.
 * Show Q before links.
 * 
 * Repository (issues, pull requests):
 * https://github.com/Eccenux/WikilinQs
 * 
 * Authors:
 * Maciej Nux Jaros
 * 
 * Deployed with love using Wikiploy: [[Wikipedia:Wikiploy]]
 * 
 * <nowiki>
 */
var logTag = '[wdQs]';

/** API url */
var wdUrl = (title) => `/w/api.php?action=query&prop=pageprops&ppprop=wikibase_item&redirects=1&format=json&formatversion=2&titles=${title}`;

/**
 * Main links.
 */
class WikidataLinks {
	/** @private get WD id from API. */
	async getWd(el) {
		let title = el.href.replace(/.+\.org\/wiki\//, '');

		let url = wdUrl(title);

		const re = await fetch(url);
		const data = await re.json();
		//console.log(data);

		const page = data.query.pages.pop();
		return {
			title: page.title,
			q: page.pageprops.wikibase_item,
			el: el,
		};
	}

	/**
	 * Show WD ids on links.
	 */
	async showWd() {
		const links = document.querySelectorAll('.mw-parser-output a[href^="/wiki"]');
		const promki = [];
		for (const link of links) {
			promki.push(this.getShow(link));
		}
		console.log(logTag, 'scheduled %d requests', links.length);
		await Promise.all(promki);
		console.log(logTag, 'done');
	}

	/**
	 * Show WD item for the atricle link.
	 * 
	 * @param {Element} link Article link element.
	 */
	async getShow(link) {
		const wd = await getWd(link);
		this.show(wd);
		console.log(logTag, wd);
	}

	/** @private Show Q beside link. */
	show(wd) {
		wd.el.insertAdjacentHTML('beforebegin', `<div style="display:inline-block">${wd.q}</div> `);
		return wd;
	}

}

// export
if (typeof module === 'object' && module.exports) {
	module.exports.WikidataLinks = WikidataLinks;
	module.exports.logTag = logTag;
}
// </nowiki>