import template from './statistic-item.template.html'
import styles from './statistic-item.module.scss'
import renderService from '@/core/services/render.service'
import ChildComponent from '@/core/base-screen/child.component'
import { $SQuery } from '@/core/customQuery/query.lib'
import { formatCurrency } from '@/core/utils/format-currency'

export class StatisticItem extends ChildComponent {
	/**
	 * Statistic item constructor
	 * @param {string} label
	 * @param {string} value
	 * @param {'purple' | 'green'} variant
	 */
	constructor(label, value, variant) {
		super()
		this.element = null

		if (!label || !value || !variant) {
			throw new Error('Not all arguments were passed')
		}

		this.label = label
		this.value = value
		this.variant = variant
	}

	render() {
		this.element = renderService.createElement({ html: template, styles, components: [] })

		$SQuery(this.element).addClassName(styles[this.variant]).addClassName(styles['fade-in'])
		$SQuery(this.element).find('#statistic-label').text(this.label)
		$SQuery(this.element).find('#statistic-value').text(formatCurrency(+this.value))

		return this.element
	}
}