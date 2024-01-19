import template from './transaction-item.template.html'
import styles from './transaction-item.module.scss'
import renderService from '@/core/services/render.service'
import ChildComponent from '@/core/base-screen/child.component'
import { $SQuery } from '@/core/customQuery/query.lib'
import { formatDate } from '@/core/utils/formate-date'
import { formatCurrency } from '@/core/utils/format-currency'

export class TransactionItem extends ChildComponent {
	constructor(transaction) {
		super()
		this.transaction = transaction
	}

	render() {

		this.element = renderService.createElement({ html: template, styles, components: [] })

		const isIncome = this.transaction.type === 'pop-up'
		const name = isIncome  ? 'Income' : 'Expense'

		if (isIncome) {
			$SQuery(this.element).addClassName(styles.income)
		}

		$SQuery(this.element).find('#transaction-name').text(name)
		$SQuery(this.element).find('#transaction-date').text(formatDate(this.transaction.createdAt))
		$SQuery(this.element).find('#transaction-amount').text(formatCurrency(this.transaction.amount))

		return this.element
	}
}