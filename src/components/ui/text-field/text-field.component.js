import ChildComponent from '@/core/base-screen/child.component'
import renderService from '@/core/services/render.service'
import template from './text-field.template.html'
import styles from './text-field.module.scss'
import { $SQuery } from '@/core/customQuery/query.lib'

export class Field extends ChildComponent {
	constructor({ placeholder, type = 'text', value = '', name, variant }) {
		super()
		this.element = null
		this.name = name
		this.type = type
		this.value = value
		this.placeholder = placeholder
		this.variant = variant
	}

	render() {
		this.element = renderService.createElement({ html: template, styles, components: [] })

		const inputHTML = $SQuery(this.element).find('input').setInput({
			rest: {
				placeholder: this.placeholder,
				type: this.type,
				value: this.value,
				name: this.name
			}
		})

		if (this.type === 'number') {
			inputHTML.numberInput()
		}

		if (this.variant === 'credit-card') {
			inputHTML.creditCardInput()
		}

		return this.element
	}
}