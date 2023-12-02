import { NotFound } from '@/components/screens/not-found'
import { ROUTES } from '@/routes/routes.data'
import { Layout } from '@/components/layout/layout.component'

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
		//обработка событий вперед\назад в браузере
		window.addEventListener('popstate', () => {
			this.#handleCurrentPath()
		})
	}

	getCurrentPath() {
		return window.location.href
	}

	#render() {
		const component = new this.#currentRoute.component()
		if (!this.#layout) {
			this.#layout = new Layout({ router: this, children: component.render() })
			document.getElementById('app').innerHTML = this.#layout.render()
		} else {
			document.getElementById('main').innerHTML = component.render()
		}
	}

	#handleLink() {
		document.addEventListener('click', event => {
			const target = event.target.closest('a')

			if (target) {
				event.preventDefault()
				this.#navigate(target.href)
			}
		})
	}

	#navigate(path) {
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