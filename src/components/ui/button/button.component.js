import ChildComponent from '@/core/base-screen/child.component'
import renderService from '@/core/services/render.service'
import template from './button.template.html'
import styles from './button.module.scss'
import { $SQuery } from '@/core/customQuery/query.lib'
import { Loader } from '@/components/ui/loader/loader.component'

export class Button extends ChildComponent {
	constructor({ children, onClick, variant, loader }) {
		super()
		this.element = null
		this.children = children
		this.onClick = onClick
		this.variant = variant
		this.loader = loader

		if (!children) {
			throw new Error('Children is empty')
		}
	}

	render() {
		this.element = renderService.createElement({ html: template, styles, components: [] })

		if (this.loader) {
			$SQuery(this.element).append(new Loader(30, 30).render())
		} else {
			$SQuery(this.element).html(this.children).onClick(this.onClick)
		}

		if (this.variant) {
			$SQuery(this.element).addClassName(styles[this.variant])
		}

		return this.element
	}
}