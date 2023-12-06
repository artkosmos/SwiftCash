import ChildComponent from '@/core/base-screen/child.component'
import renderService from '@/core/services/render.service'
import styles from './logo.module.scss'
import template from './logo.template.html'

export class Logo extends ChildComponent {
	render() {
		this.element = renderService.createElement({ html: template, styles, components: [] })

		return this.element
	}
}