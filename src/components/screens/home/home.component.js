import { BaseScreen } from '@/core/base-screen'
import template from './home.template.html'
import styles from './home.module.scss'
import renderService from '@/core/services/render.service'

export class Home extends BaseScreen {
	constructor() {
		super({title: 'Home'})
	}

	render() {
		const element = renderService.createElement({html: template, styles, components: []})
		return element.outerHTML
	}
}