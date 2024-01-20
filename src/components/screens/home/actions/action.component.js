import ChildComponent from '@/core/base-screen/child.component'
import renderService from '@/core/services/render.service'
import template from './actions.template.html'
import styles from './actions.module.scss'
import { Store } from '@/store/store'
import { CardService } from '@/api/card.service'
import { NotificationService } from '@/core/services/notification.service'
import { Field } from '@/components/ui/text-field/text-field.component'
import { $SQuery } from '@/core/customQuery/query.lib'
import { Button } from '@/components/ui/button/button.component'
import validationService from '@/core/services/validation.service'
import { BALANCE_UPDATED, TRANSACTION_COMPLETED } from '@/constants'

export class Actions extends ChildComponent {
	constructor() {
		super()
		this.store = Store.getInstance()
		this.cardService = new CardService()
		this.notifications = new NotificationService()
	}

	updateBalance(event, type) {
		event.preventDefault()

		if (!this.store.state.user) {
			this.notifications.showNotification('error', 'You are not authorized')
		}

		const currentElement = event.target

		const currentInput = $SQuery(this.element).find('input')
		const amount = currentInput.value()

		if (!amount) {
			validationService.showError($SQuery(this.element).find('label'))
			return
		}

		$SQuery(currentElement).text('Sending...').attribute('disabled', true)

		this.cardService.updateBalance(amount, type, () => {
			currentInput.value('')

			$SQuery(currentElement).text(type === 'pop-up' ? 'Top-up' : 'Withdraw').removeAttribute('disabled')

			const balanceUpdatedEvent = new Event(BALANCE_UPDATED)
			const transactionCompletedEvent = new Event(TRANSACTION_COMPLETED)
			document.dispatchEvent(balanceUpdatedEvent)
			document.dispatchEvent(transactionCompletedEvent)
		})
	}

	render() {
		this.element = renderService.createElement({
			html: template,
			styles,
			components: [new Field({ name: 'amount', placeholder: 'Enter amount', type: 'number' })]
		})

		$SQuery(this.element)
			.find('#action-buttons')
			.append(new Button({children: 'Top-up', variant: 'green', onClick: e => this.updateBalance(e, 'pop-up')}).render())
			.append(new Button({children: 'Withdraw', variant: 'purple', onClick: e => this.updateBalance(e, 'withdraw')}).render())

		return this.element
	}
}

