import renderService from '@/core/services/render.service'
import template from './notification.template.html'
import styles from './notification.module.scss'
import ChildComponent from '@/core/base-screen/child.component'

export class Notification extends ChildComponent {
	constructor() {
		super()
		this.element = null
	}

	render() {
		this.element = renderService.createElement({ html: template, styles, components: [] })

		return this.element
	}
}