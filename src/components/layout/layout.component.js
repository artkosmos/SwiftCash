import renderService from '@/core/services/render.service'
import template from './layout.template.html'
import styles from './layout.module.scss'
import { $SQuery } from '@/core/customQuery/query.lib'
import { Header } from '@/components/layout/header/header.component'

export class Layout {
	#router
	#children

	constructor({ router, children }) {
		this.#router = router
		this.#children = children
	}

	render() {
		this.element = renderService.createElement({ html: template, styles, components: [] })

		const content = $SQuery(this.element).find('#content')
		content.append(this.#children)

		const mainHTML = $SQuery(this.element).find('main')
		mainHTML.before(new Header().render()).append(content.element)

		return this.element
	}
}