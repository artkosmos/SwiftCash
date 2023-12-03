import { getPageTitle } from '@/utils'

export class BaseScreen {
	/**
	 * @param {Object} options
	 * @param {string} options.title
	 */
	constructor({ title }) {
		document.title = getPageTitle(title)
	}

	render() {
		throw new Error('Render method must be implemented in the child class')
	}
}