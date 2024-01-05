import ChildComponent from '@/core/base-screen/child.component'
import renderService from '@/core/services/render.service'
import template from './card-info.template.html'
import styles from './card-info.module.scss'
import { Store } from '@/store/store'
import { CardService } from '@/api/card.service'
import { $SQuery } from '@/core/customQuery/query.lib'
import { formatCardNumberStars } from '@/core/utils/format-card-number'
import { CODE } from '@/constants'
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
	}

	#copyCardNumber(e) {
		navigator.clipboard.writeText(e.target.innerText).then(() => {
			e.target.innerText = 'Card number copied'
			setTimeout(() => {
				e.target.innerText = formatCardNumberStars(this.card.number)
			}, 2000)
		})
	}

	#toggleCVC(cvcElement) {
		const text = cvcElement.text()
		text === CODE ? cvcElement.text(853) : cvcElement.text(CODE) // this.card.cvcElement
	}

	fetchData() {
		this.cardService.myCard(data => {
			if (data?.id) {
				this.card = data
				this.fillElements()
				this.store.updateCard(data)
			} else {
				this.store.updateCard(null)
			}
		})
	}

	fillElements() {
		$SQuery(this.element).html(renderService.createElement({ html: template, styles, components: [] }).innerHTML)

		$SQuery(this.element).findAll(':scope > div').forEach(child => {
			child.addClassName('fade-in')
		})

		$SQuery(this.element)
			.find('#card-number')
			.text(formatCardNumberStars('4567874534782537')) // this.card.number
			.onClick(this.#copyCardNumber.bind(this))

		$SQuery(this.element).find('#card-expire-date').text('02/24') //this.card.expireDate

		const cvcElement = $SQuery(this.element).find('#card-cvc')
		cvcElement.text(CODE).style('width', '35px')

		$SQuery(this.element).find('#toggle-cvc').onClick(this.#toggleCVC.bind(this, cvcElement))

		$SQuery(this.element).find('#card-balance').text(formatCurrency(3285)) //this.card.balance
	}

	render() {
		// if (this.store.state.user) {
		// 	this.fetchData()
		// }
		this.fillElements()
		return this.element
	}
}

