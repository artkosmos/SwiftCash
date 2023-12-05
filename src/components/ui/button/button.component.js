import ChildComponent from '@/core/base-screen/child.component'
import renderService from '@/core/services/render.service'
import template from './button.template.html'
import styles from './button.module.scss'
import { $SQuery } from '@/core/customQuery/query.lib'

export class Button extends ChildComponent {
	constructor({ children, onClick, variant }) {
		super()
		this.element = null
		this.children = children
		this.onClick = onClick
		this.variant = variant

		if (!children) {
			throw new Error('Children is empty')
		}
	}

	render() {
		this.element = renderService.createElement({ html: template, styles, components: [] })

		$SQuery(this.element).html(this.children).onClick(this.onClick)

		if (this.variant) {
			$SQuery(this.element).addClassName(styles[this.variant])
		}

		return this.element
	}
}