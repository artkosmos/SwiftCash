import { BaseScreen } from '@/core/base-screen'
import template from './home.template.html'
import styles from './home.module.scss'
import renderService from '@/core/services/render.service'
import { $SQuery } from '@/core/customQuery/query.lib'

export class Home extends BaseScreen {
	constructor() {
		super({title: 'Home'})
	}

	render() {
		const element = renderService.createElement({html: template, styles, components: []})
		$SQuery(element).find('h1').style('color', 'red')
		return element
	}
}