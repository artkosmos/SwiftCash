import renderService from '@/core/services/render.service'
import template from './search.template.html'
import styles from './search.module.scss'
import { $SQuery } from '@/core/customQuery/query.lib'
import ChildComponent from '@/core/base-screen/child.component'
import { UserService } from '@/api/user.service'
import { UserItem } from '@/components/ui/user-item/user-item.component'
import { debounce } from '@/core/utils/debounce'
import { formatCardNumber } from '@/core/utils/format-card-number'

export class Search extends ChildComponent {
	constructor() {
		super()
		this.element = null
		this.userService = new UserService()
	}

	async #handleSearch(event) {
		const search = event.target.value
		const displayResultElement = $SQuery(this.element).find('#search-results')
		if (!search) {
			displayResultElement.html('')
		}

		await this.userService.getUsers(search, (users) => {
			displayResultElement.html('')
			users.forEach((user, index) => {
				const userItem = new UserItem(
					user, true, () => {
						$SQuery('[name="card-number"]').value(formatCardNumber(user.cardInfo.cardNumber))

						displayResultElement.html('')
					}).render()
				$SQuery(userItem).addClassName(styles.item).style('transition-delay', `${index * 0.1}s`)
				displayResultElement.append(userItem)
				setTimeout(() => {
					$SQuery(userItem).addClassName(styles.visible)
				}, 0)
			})
		})
	}

	render() {
		this.element = renderService.createElement({ html: template, styles, components: [] })

		const debouncedSearch = debounce(this.#handleSearch.bind(this), 300)

		$SQuery(this.element)
			.find('input')
			.setInput({ type: 'search', name: 'search', placeholder: 'Search contacts...' })
			.addListener('input', debouncedSearch)

		return this.element
	}
}