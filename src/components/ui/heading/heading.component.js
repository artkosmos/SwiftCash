import ChildComponent from '@/core/base-screen/child.component'
import renderService from '@/core/services/render.service'
import template from './heading.template.html'
import styles from './heading.module.scss'
import { $SQuery } from '@/core/customQuery/query.lib'

export class Heading extends ChildComponent {
	constructor(title) {
		super()
		this.title = title
	}

	render() {
		this.element = renderService.createElement({ html: template, styles, components: [] })

		$SQuery(this.element).text(this.title)

		return this.element
	}
}