import { BaseScreen } from '@/core/base-screen'
import template from './home.template.html'
import styles from './home.module.scss'
import renderService from '@/core/services/render.service'
import { Actions } from '@/components/screens/home/actions/action.component'
import { CardInfo } from '@/components/screens/home/card-info/card-info.component'
import { Contacts } from '@/components/screens/home/contacts/contacts.component'
import { Transactions } from '@/components/screens/home/transactions/transactions.component'
import { Statistics } from '@/components/screens/home/statistics/statistics.component'
import { Store } from '@/store/store'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
		this.user = null
		this.element = null
		this.store = Store.getInstance()
		this.components = {
			cardInfo: null,
			transactions: null,
			statistics: null,
		}
	}

	createOrUpdateComponent(component, componentName) {
		if (this.components[componentName]) {
			this.components[componentName].destroy()
		}
		this.components[componentName] = new component()
		return this.components[componentName]
	}

	update() {
		this.user = this.store.state.user
	}

	render() {
	const componentsToRender = [
		this.createOrUpdateComponent(CardInfo, 'cardInfo'),
		this.createOrUpdateComponent(Transactions, 'transactions'),
		this.createOrUpdateComponent(Statistics, 'statistics'),
		Actions,
		Contacts
	]

		this.element = renderService.createElement({html: template, styles, components: componentsToRender})

		setTimeout(() => {
			this.update()
		}, 0)

		return this.element
	}
}