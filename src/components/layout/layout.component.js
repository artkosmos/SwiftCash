import renderService from '@/core/services/render.service'
import template from './layout.template.html'
import styles from './layout.module.scss'
import { $SQuery } from '@/core/customQuery/query.lib'
import { Header } from '@/components/layout/header/header.component'
import { Notification } from '@/components/layout/notification/notification.components'

export class Layout {
	#router
	#children
	#element

	constructor({ router, children }) {
		this.#router = router
		this.#children = children
		this.#element = null
	}

	render() {
		this.element = renderService.createElement({ html: template, styles, components: [Notification] })

		const content = $SQuery(this.element).find('#content')
		content.append(this.#children)

		const mainHTML = $SQuery(this.element).find('main')
		mainHTML.before(new Header({router: this.#router}).render()).append(content.element)

		return this.element
	}
}