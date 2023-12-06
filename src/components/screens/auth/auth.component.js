import { BaseScreen } from '@/core/base-screen'
import renderService from '@/core/services/render.service'
import template from './auth.template.html'
import { Heading } from '@/components/ui/heading/heading.component'

export class Auth extends BaseScreen {
	constructor() {
		super({ title: 'Auth' })
		this.element = null
	}

	render() {
		this.element = renderService.createElement({ html: template, styles: {}, components: [new Heading('Authorization')] })

		return this.element
	}
}