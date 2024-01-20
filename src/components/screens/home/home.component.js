import { BaseScreen } from '@/core/base-screen'
import template from './home.template.html'
import styles from './home.module.scss'
import renderService from '@/core/services/render.service'
import { Actions } from '@/components/screens/home/actions/action.component'
import { CardInfo } from '@/components/screens/home/card-info/card-info.component'
import { Contacts } from '@/components/screens/home/contacts/contacts.component'
import { Transactions } from '@/components/screens/home/transactions/transactions.component'
import { Statistics } from '@/components/screens/home/statistics/statistics.component'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
		this.element = null
	}

	render() {
		this.element = renderService.createElement({ html: template, styles, components: [Actions, CardInfo, Contacts, Transactions, Statistics] })

		return this.element
	}
}