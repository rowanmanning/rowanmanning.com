import { baseUrl } from '@params';
import lunr from 'lunr';

let pages;
let pagesMap;
let lunrIndex;

// Lazy-load pages
async function getPages() {
	if (pages) {
		return pages;
	}
	pages = await fetch(`${baseUrl}index.lunr.json`).then((response) => response.json());
	return pages;
}

// Lazy-load pages map
async function getPagesMap() {
	if (pagesMap) {
		return pagesMap;
	}
	pagesMap = await getPages().then((result) => {
		return Object.fromEntries(result.map((page) => [page.url, page]));
	});
	return pagesMap;
}

// Lazy-load the Lunr index
async function getLunrIndex() {
	if (lunrIndex) {
		return lunrIndex;
	}
	pages = await getPages();
	lunrIndex = lunr(function () {
		this.ref('url');
		this.field('title', { boost: 1.4 });
		this.field('tags', { boost: 1.2 });
		this.field('description', { boost: 1.1 });
		this.field('content');

		this.metadataWhitelist.push('position');

		for (const page of pages) {
			this.add(page);
		}
	});
	return lunrIndex;
}

// Return a search function which adds the page data to results
export default async function search(query) {
	const pageMap = await getPagesMap();
	const index = await getLunrIndex();
	return index.search(query).map(({ ref, matchData, score }) => {
		return {
			ref,
			matchData,
			score,
			page: pageMap[ref]
		};
	});
}
