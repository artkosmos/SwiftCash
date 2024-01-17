import renderService from '@/core/services/render.service'
import template from './contacts.template.html'
import styles from './contacts.module.scss'
import { Heading } from '@/components/ui/heading/heading.component'
import ChildComponent from '@/core/base-screen/child.component'
import { Transfer } from '@/components/screens/home/contacts/transfer/transfer.component'
import { Store } from '@/store/store'
import { UserService } from '@/api/user.service'
import { $SQuery } from '@/core/customQuery/query.lib'
import { UserItem } from '@/components/ui/user-item/user-item.component'
import { formatCardNumber } from '@/core/utils/format-card-number'

export class Contacts extends ChildComponent {
	constructor() {
		super()

		this.element = null
		this.store = Store.getInstance()
		this.userService = new UserService()
	}

	fetchData() {
		this.userService.getUsers('', data => {
			if (!data) {
				return
			}

			for (const user of data) {
				$SQuery(this.element)
					.find('#contacts-list')
					.append(new UserItem(user, true, () => {
						$SQuery('[name="card-number"]').value(formatCardNumber(user.cardInfo.cardNumber))
					}).render())
			}

			$SQuery(this.element)
				.find('#contacts-list').findAll('button').forEach(element => element.addClassName(styles['fade-in']))
		})
	}


	render() {
		this.element = renderService.createElement({
			html: template, styles, components: [Transfer, new Heading('Transfer money')]
		})

		if(this.store.state.user) {
			setTimeout(() => {
				this.fetchData()
			}, [])
		}

		return this.element
	}
}