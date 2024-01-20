import ChildComponent from '@/core/base-screen/child.component'
import { Store } from '@/store/store'
import { CardService } from '@/api/card.service'
import { NotificationService } from '@/core/services/notification.service'
import renderService from '@/core/services/render.service'
import template from './transfer.template.html'
import styles from './transfer.module.scss'
import { $SQuery } from '@/core/customQuery/query.lib'
import validationService from '@/core/services/validation.service'
import { BALANCE_UPDATED, TRANSACTION_COMPLETED } from '@/constants'
import { Field } from '@/components/ui/text-field/text-field.component'
import { Button } from '@/components/ui/button/button.component'

export class Transfer extends ChildComponent {
	constructor() {
		super()

		this.element = null
		this.store = Store.getInstance()
		this.cardService = new CardService()
		this.notification = new NotificationService()
	}

	transferHandler(event) {
		event.preventDefault()

		if (!this.store.state.user) {
			this.notifications.showNotification('error', 'You are not authorized')
		}

		$SQuery(event.target).text('Handling...').attribute('disabled', true)

		const inputElement = $SQuery(this.element).find('input')
		const cardNumber = inputElement.value().replaceAll('-', '')

		const reset = () => {
			$SQuery(event.target).removeAttribute('disabled').text('Send')
		}

		if (!cardNumber) {
			validationService.showError($SQuery(this.element).find('label'))
			reset()
			return
		}

		if (!inputElement.value()) {
			validationService.showError($SQuery(this.element).find('label'))
			return
		}

		let amount = prompt('Enter transfer amount below')

		if (!amount) {
			reset()
			return
		}

		this.cardService.transfer({ amount, cardNumber }, () => {
			inputElement.value('')
			amount = ''

			document.dispatchEvent(new Event(TRANSACTION_COMPLETED))
			document.dispatchEvent(new Event(BALANCE_UPDATED))
		})

		reset()
	}

	render() {
		this.element = renderService.createElement({
			html: template, styles, components: [
				new Field({ name: 'card-number', placeholder: 'XXXX-XXXX-XXXX-XXXX', variant: 'credit-card' }),
				new Button({ children: 'Send', variant: 'purple', onClick: this.transferHandler.bind(this) })
			]
		})

		return this.element
	}
}