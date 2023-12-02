export class Layout {
	#router
	#children

	constructor({ router, children }) {
		this.#router = router
		this.#children = children
	}

	render() {
		return `
			<header>
			Header layout
			<a href='/'>Home</a>
			<a href='/about'>About</a>
			</header>
			<main id='main'>
				${this.#children}
			</main>
		`
	}
}