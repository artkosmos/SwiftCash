import ChildComponent from '@/core/base-screen/child.component'
import renderService from '@/core/services/render.service'
import template from './logout-button.template.html'
import styles from './logout-button.module.scss'
import { $SQuery } from '@/core/customQuery/query.lib'
import { Store } from '@/store/store'

export class LogoutButton extends ChildComponent {
	constructor({ router }) {
		super()
		this.store = Store.getInstance()
		this.user = this.store.state.user
		this.router = router
	}

	render() {
		this.element = renderService.createElement({ html: template, styles, components: [] })

		$SQuery(this.element).find('button').onClick(() => {
			this.store.logOut() // temporary
			this.router.navigate('/login')
		})

		return this.element
	}
}