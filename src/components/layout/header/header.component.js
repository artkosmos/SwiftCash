import ChildComponent from '@/core/base-screen/child.component'
import renderService from '@/core/services/render.service'
import styles from './header.module.scss'
import template from './header.template.html'

export class Header extends ChildComponent {
	render() {
		this.element = renderService.createElement({ html: template, styles, components: [] })

		return this.element
	}
}