/**
 * Format date to mmmm.dd.yyyy and time
 * @param {string} date
 * @returns {string}
 */
export function formatDate(date) {
	const options = {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	};

	return new Date(date).toLocaleDateString('en-US', options)
}