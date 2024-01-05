import { BaseScreen } from '@/core/base-screen'
import template from './home.template.html'
import styles from './home.module.scss'
import renderService from '@/core/services/render.service'
import { Actions } from '@/components/screens/home/actions/action.component'
import { CardInfo } from '@/components/screens/home/card-info/card-info.component'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
		this.element = null
	}

	render() {
		this.element = renderService.createElement({ html: template, styles, components: [Actions, CardInfo] })

		return this.element
	}
}