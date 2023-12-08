import { BaseScreen } from '@/core/base-screen'
import template from './home.template.html'
import styles from './home.module.scss'
import renderService from '@/core/services/render.service'
import { Heading } from '@/components/ui/heading/heading.component'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
		this.element = null
	}

	render() {
		this.element = renderService.createElement({ html: template, styles, components: [new Heading('Home')] })

		return this.element
	}
}