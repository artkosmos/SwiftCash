import ChildComponent from '@/core/base-screen/child.component'
import renderService from '@/core/services/render.service'
import template from './user-item.template.html'
import styles from './user-item.module.scss'
import { $SQuery } from '@/core/customQuery/query.lib'

export class UserItem extends ChildComponent {
	constructor(user, isGray = false, onClick) {
		super()
		if (!user) throw new Error('User don\'t exist')
		if (!user?.name) throw new Error('Invalid user data')
		if (!user?.avatar) throw new Error('Invalid user data')

		this.user = user
		this.onClick = onClick
		this.isGray = isGray
	}

	#preventDefault(event) {
		event.preventDefault()
	}

	update(user) {
		if (user.avatar && user.name) {
			$SQuery(this.element)
				.find('img')
				.attribute('src', user.avatar)
				.attribute('alt', user.name)

			$SQuery(this.element).find('span').text(user.name)
		}
	}


	render() {
		this.element = renderService.createElement({ html: template, styles, components: [] })

		this.update(this.user)

		$SQuery(this.element).onClick(this.onClick || this.#preventDefault)

		if (!this.onClick) {
			$SQuery(this.element).attribute('disabled', true)
		}

		if (this.isGray) {
			$SQuery(this.element).addClassName(styles.gray)
		}

		return this.element
	}
}