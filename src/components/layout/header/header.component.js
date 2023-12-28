import ChildComponent from '@/core/base-screen/child.component'
import renderService from '@/core/services/render.service'
import styles from './header.module.scss'
import template from './header.template.html'
import unknown_user from '@/components/ui/user-item/unknown_avatar.jpg'
import { UserItem } from '@/components/ui/user-item/user-item.component'
import { LogoutButton } from '@/components/layout/header/logout-button/logout-button.component'
import { Logo } from '@/components/layout/header/logo/logo.component'
import { Search } from '@/components/layout/header/search/search.component'
import { Store } from '@/store/store'
import { $SQuery } from '@/core/customQuery/query.lib'
import { USER_STORAGE_KEY } from '@/constants'

export class Header extends ChildComponent {
	constructor({ router }) {
		super()
		this.store = Store.getInstance()
		this.store.addObserver(this)
		this.user = null
		this.router = router
		this.currentUser = new UserItem(
			{
				avatar: unknown_user,
				username: localStorage.getItem(USER_STORAGE_KEY).replace(/"/g, '')
			}, false)
	}

	update() {
		this.user = this.store.state.user

		const privateElements = $SQuery(this.element).find('#auth-side')

		if (this.user && this.router.getCurrentPath() === '/login') {
			privateElements.show()
			this.currentUser.update(this.user)
			this.router.navigate('/')
		} else {
			privateElements.hide()
		}
	}

	render() {
		this.element = renderService.createElement({
			html: template, styles, components: [
				this.currentUser,
				new LogoutButton({ router: this.router }),
				Logo,
				Search
			]
		})

		// line below causes problem with building app
		// this.update()

		return this.element
	}
}