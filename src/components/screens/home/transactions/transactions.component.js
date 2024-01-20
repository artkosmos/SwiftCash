import template from './transactions.template.html'
import styles from './transactions.module.scss'
import renderService from '@/core/services/render.service'
import ChildComponent from '@/core/base-screen/child.component'
import { Heading } from '@/components/ui/heading/heading.component'
import { Store } from '@/store/store'
import { TransactionService } from '@/api/transaction.service'
import { TRANSACTION_COMPLETED } from '@/constants'
import { $SQuery } from '@/core/customQuery/query.lib'
import { TransactionItem } from '@/components/screens/home/transactions/transaction-item/transaction-item.component'
import { Loader } from '@/components/ui/loader/loader.component'

export class Transactions extends ChildComponent {
	constructor() {
		super()
		this.store = Store.getInstance()
		this.transactionService = new TransactionService()
		this.element = renderService.createElement({ html: template, styles, components: [new Heading('Recent transactions')] })
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
		this.transactionService.getTransactions(data => {

			const listOfTransactions = $SQuery(this.element).find('#transactions-list')
			listOfTransactions.text('')

			if (data.transactions.length) {
				for (let i = data.transactions.length - 1; i >= 0; i--) {
					listOfTransactions.append(new TransactionItem(data.transactions[i]).render())
				}
			} else {
				listOfTransactions.text('Transactions have not found')
			}
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