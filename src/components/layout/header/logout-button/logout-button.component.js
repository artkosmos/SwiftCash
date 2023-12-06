import ChildComponent from '@/core/base-screen/child.component'
import renderService from '@/core/services/render.service'
import template from './logout-button.template.html'
import styles from './logout-button.module.scss'
import { $SQuery } from '@/core/customQuery/query.lib'

export class LogoutButton extends ChildComponent {
	constructor({ router }) {
		super()
		this.router = router
	}

	render() {
		this.element = renderService.createElement({ html: template, styles, components: [] })

		$SQuery(this.element).find('button').onClick(() => this.router.navigate('/login'))

		return this.element
	}
}