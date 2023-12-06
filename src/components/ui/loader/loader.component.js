import ChildComponent from '@/core/base-screen/child.component'
import renderService from '@/core/services/render.service'
import template from './loader.template.html'
import { $SQuery } from '@/core/customQuery/query.lib'

export const LOADER_SELECTOR = ['data-component="loader"']

export class Loader extends ChildComponent {
	constructor(width = 100, height = 10) {
		super()
		this.width = width
		this.height = height
		this.element = null
	}

	render() {
		this.element = renderService.createElement({ html: template, styles: {}, components: [] })

		$SQuery(this.element)
			.style('width', `${this.width}`)
			.style('height', `${this.height}`)
			.addClassName('bounce')

		return this.element
	}
}