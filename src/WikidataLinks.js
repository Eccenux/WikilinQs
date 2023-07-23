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

/** API url */
var wdUrl = (title) => `/w/api.php?action=query&prop=pageprops&ppprop=wikibase_item&redirects=1&format=json&formatversion=2&titles=${title}`;

/**
 * Main links.
 */
class WikidataLinks {
	async getWd(el) {
		var title = el.href.replace(/.+\.org\/wiki\//, '');

		var url = wdUrl(title);

		var re = await fetch(url);
		var data = await re.json();
		//console.log(data);

		var page = data.query.pages.pop();
		return {
			title: page.title,
			q: page.pageprops.wikibase_item,
			el: el,
		};
	}

	async showWd() {
		var links = document.querySelectorAll('.mw-parser-output a[href^="/wiki"]');
		var promki = [];
		for (link of links) {
			promki.push(this.getShow(link));
		}
		console.log('scheduled %d requests', links.length);
		await Promise.all(promki);
		console.log('done');
	}

	async getShow(link) {
		var wd = await getWd(link);
		this.show(wd);
		console.log(wd);
	}

	show(wd) {
		wd.el.insertAdjacentHTML('beforebegin', `<div style="display:inline-block">${wd.q}</div> `);
		return wd;
	}

}

// </nowiki>