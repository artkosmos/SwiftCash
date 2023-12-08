import renderService from '@/core/services/render.service'
import template from './search.template.html'
import styles from './search.module.scss'
import { $SQuery } from '@/core/customQuery/query.lib'
import ChildComponent from '@/core/base-screen/child.component'

export class Search extends ChildComponent {
	constructor() {
		super()
		this.element = null
	}

	render() {
		this.element = renderService.createElement({ html: template, styles, components: [] })

		const element = $SQuery(this.element).find('input')
		element.setInput({type: 'search', name: 'search', placeholder: 'Search contacts...'})

		return this.element
	}
}