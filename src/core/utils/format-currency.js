/**
 * Format a number to currency symbol
 * @param {number} number
 * @returns {string}
 */

export function formatCurrency(number) {
	return new Intl.NumberFormat('by-BY', {
		currency: 'BYN',
		style: 'currency'
	}).format(number)
}