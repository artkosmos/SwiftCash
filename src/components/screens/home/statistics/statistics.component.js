import template from './statistics.template.html'
import styles from './statistics.module.scss'
import renderService from '@/core/services/render.service'
import ChildComponent from '@/core/base-screen/child.component'
import { Heading } from '@/components/ui/heading/heading.component'
import { Store } from '@/store/store'
import { TRANSACTION_COMPLETED } from '@/constants'
import { $SQuery } from '@/core/customQuery/query.lib'
import { StatisticService } from '@/api/statistic.service'
import { StatisticItem } from '@/components/screens/home/statistics/statistic-item/statistic-item.component'

export class Statistics extends ChildComponent {
	constructor() {
		super()
		this.element = null
		this.store = Store.getInstance()
		this.statisticService = new StatisticService()
		this.element = renderService.createElement({ html: template, styles, components: [new Heading('General statistic')] })
		this.#addListeners()
	}

	#addListeners() {
		document.addEventListener(TRANSACTION_COMPLETED, this.#onTransactionCompleted)
	}

	#removeListeners() {
		document.removeEventListener(TRANSACTION_COMPLETED, this.#onTransactionCompleted)
	}

	#onTransactionCompleted = () => {
		this.fetchData()
	}

	#destroy() {
		this.#removeListeners()
	}

	fetchData() {
		this.statisticService.getStatistic(data => {

			console.log(data)

			const statisticItems = $SQuery(this.element).find('#statistic-items')
			statisticItems.text('')

			// const statisticCircle = $SQuery(this.element).find('#circle-statistic')
			// statisticItems.text('')

			console.log(typeof data.statistic.income)

			statisticItems
				.append(new StatisticItem('Income:', String(data.statistic.income), 'green').render())
				.append(new StatisticItem('Expense:', String(data.statistic.expense), 'purple').render())
		})
	}

	render() {
		if (this.store.state.user) {
			setTimeout(() => {
				this.fetchData()
			}, 0)
		}

		return this.element
	}
}