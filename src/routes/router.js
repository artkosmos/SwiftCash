import { NotFound } from '@/components/screens/not-found'
import { ROUTES } from '@/routes/routes.data'
import { Layout } from '@/components/layout/layout.component'
import { $SQuery } from '@/core/customQuery/query.lib'

export class Router {
	#routes
	#currentRoute
	#layout

	constructor() {
		this.#routes = ROUTES
		this.#currentRoute = null
		this.#layout = null
		this.#handleCurrentPath()
		this.#handleLink()
	}

	getCurrentPath() {
		return window.location.pathname
	}

	#render() {
		const component = new this.#currentRoute.component().render()
		if (!this.#layout) {
			this.#layout = new Layout({ router: this, children: component})
			$SQuery('#app').append(this.#layout.render())
		} else {
			$SQuery('#content').html('').append(component)
		}
	}

	#handleLink() {
		document.addEventListener('click', event => {
			const target = event.target.closest('a')

			if (target) {
				event.preventDefault()
				this.navigate(target.href)
			}
		})
	}

	navigate(path) {
		if (path !== this.getCurrentPath()) {
			window.history.pushState({}, '', path)
			this.#handleCurrentPath()
		}
	}

	#handleCurrentPath() {
		const path = this.getCurrentPath() || '/'
		let route = this.#routes.find(route => route.path === path)

		if (!route) {
			route = { component: NotFound }
		}

		this.#currentRoute = route
		this.#render()
	}
}