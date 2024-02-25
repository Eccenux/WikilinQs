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
	/**
	 * Read and show all WD ids beside wiki-links.
	 */
	async all() {
		const links = document.querySelectorAll('.mw-parser-output a[href^="/wiki"]');
		if (!links.length) {
			return;
		}

		// CSS
		this.addStyle();

		// read Q from links and show Q beside them
		const promki = [];
		for (const link of links) {
			promki.push(this.readAndShowQ(link));
		}
		console.log(logTag, 'scheduled %d requests', links.length);
		// wait
		await Promise.all(promki);
		console.log(logTag, 'done');
	}

	/** @private Add CSS. */
	addStyle() {
		const styleId = 'wikilinqs-css';
		if (document.getElementById(styleId)) {
			console.warn(logTag, 'addStyle repeat');
			return;
		}
		const css = /*css*/`
			.wikilinqs {
				display: inline-block;
				vertical-align: super;
				font-size: 80%;
				padding-left: .2em;
				color: mediumvioletred;
				background: white;
			}
		`;
		document.body.insertAdjacentHTML('beforeend', `<style id='${styleId}'>${css}</style>`);
	}

	/**
	 * Show WD item for the atricle link.
	 * 
	 * @private
	 * 
	 * @param {Element} link Article link element.
	 */
	async readAndShowQ(link) {
		const wd = await this.readQ(link);
		this.addQ(wd);
		console.log(logTag, wd);
	}

	/** @private Show Q beside link. */
	addQ(wd) {
		wd.el.insertAdjacentHTML('afterend', `<div class="wikilinqs">${wd.q}</div>`);
		return wd;
	}

	/** @private get WD id from API. */
	async readQ(el) {
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
}

// export
if (typeof module === 'object' && module.exports) {
	module.exports.WikidataLinks = WikidataLinks;
	module.exports.logTag = logTag;
}
// </nowiki>