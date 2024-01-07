import ChildComponent from '@/core/base-screen/child.component'
import renderService from '@/core/services/render.service'
import template from './card-info.template.html'
import styles from './card-info.module.scss'
import { Store } from '@/store/store'
import { CardService } from '@/api/card.service'
import { $SQuery } from '@/core/customQuery/query.lib'
import { formatCardNumberSpace } from '@/core/utils/format-card-number'
import { BALANCE_UPDATED, CODE } from '@/constants'
import { formatCurrency } from '@/core/utils/format-currency'

export class CardInfo extends ChildComponent {
	constructor() {
		super()
		this.card = null
		this.store = Store.getInstance()
		this.cardService = new CardService()
		this.element = renderService.createElement({
			html: template,
			styles,
			components: []
		})
		this.#addListeners()
	}

	#addListeners() {
		document.addEventListener(BALANCE_UPDATED, this.#onBalanceUpdated)
	}

	#removeListeners() {
		document.removeEventListener(BALANCE_UPDATED, this.#onBalanceUpdated)
	}

	#onBalanceUpdated = () => {
		this.fetchData()
	}

	#destroy() {
		this.#removeListeners()
	}

	#copyCardNumber(e) {
		navigator.clipboard.writeText(e.target.innerText).then(() => {
			e.target.innerText = 'Card number copied'
			e.target.style.color = 'seagreen';
			e.target.style.fontSize = '14px';

			setTimeout(() => {
				e.target.innerText = formatCardNumberSpace(this.card.cardNumber)
				e.target.style.color = 'white';
				e.target.style.fontSize = '18px';
			}, 2000)
		})
	}

	#toggleCVC(cvcElement) {
		const text = cvcElement.text()
		text === CODE ? cvcElement.text(this.card.cvv) : cvcElement.text(CODE)
	}

	fetchData() {
		setTimeout(() => {
			this.cardService.myCard(data => {
				if (data?._id) {
					this.card = data
					this.fillElements()
					this.store.updateCard(data)
				}
			})
		}, 0)
	}

	fillElements() {
		$SQuery(this.element).html(renderService.createElement({ html: template, styles, components: [] }).innerHTML)

		$SQuery(this.element).findAll(':scope > div').forEach(child => {
			child.addClassName(styles['fade-in'])
		})

		$SQuery(this.element)
			.find('#card-number')
			.text(formatCardNumberSpace(this.card.cardNumber))
			.onClick(this.#copyCardNumber.bind(this))

		$SQuery(this.element).find('#card-expire-date').text(this.card.expirationDate)

		const cvcElement = $SQuery(this.element).find('#card-cvc')
		cvcElement.text(CODE).style('width', '35px')

		$SQuery(this.element).find('#toggle-cvc').onClick(this.#toggleCVC.bind(this, cvcElement))

		$SQuery(this.element).find('#card-balance').text(formatCurrency(this.card.balance))
	}

	render() {
		if (this.store.state.user) {
			this.fetchData()
		}
		return this.element
	}
}

