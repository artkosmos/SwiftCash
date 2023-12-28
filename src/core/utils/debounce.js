export function debounce(callBack, duration) {
	let timeout

	return function(...args) {
		const cancel = () => {
			clearTimeout(timeout)
			callBack.apply(this, args)
		}
		clearTimeout(timeout)
		timeout = setTimeout(cancel, duration)
	}
}