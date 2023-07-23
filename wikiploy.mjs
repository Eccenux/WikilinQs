/**
 * Dev/staging deploy.
 */
import {DeployConfig, WikiployLite, verlib} from 'wikiploy';

import * as botpass from './bot.config.mjs';
const ployBot = new WikiployLite(botpass);

// default site
ployBot.site = 'en.wikipedia.org';

(async () => {
	// custom summary
	const version = await verlib.readVersion('./package.json');
	ployBot.summary = () => {
		return `v${version}: from git`;
	}

	// deployment config
	const configs = [];
	configs.push(new DeployConfig({
		src: 'WikilinQs.js',
	}));
	await ployBot.deploy(configs);
})().catch(err => {
	console.error(err);
	process.exit(1);
});