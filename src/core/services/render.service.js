import ChildComponent from '@/core/base-screen/child.component'

class RenderService {
	/**
	 * Creates HTML element
	 * @param {Object} options
	 * @param {string} options.html
	 * @param {Array} options.components
	 * @param {Object} options.styles
	 * @returns {HTMLElement || ChildNode}
	 */
	createElement(options) {
		const template = document.createElement('template')
		template.innerHTML = options.html.trim()
		const element = template.content.firstChild

		if (options.styles) {
			this.#applyModuleStyles(options.styles, element)
		}

		this.#replaceComponentTag(element, options.components)

		return element
	}

	/**
	 * Replace custom tags to an appropriate components
	 * @param {HTMLElement || ChildNode} parentElement
	 * @param {Array} components
	 */
	#replaceComponentTag(parentElement, components) {
		const tagTemplate = /^component-/
		const allElements = parentElement.getElementsByTagName('*')
		for (const element of allElements) {
			const currentTagName = element.tagName.toLowerCase()
			if (tagTemplate.test(currentTagName)) {
				const newComponent = currentTagName
					.replace('component-', '')
					.replace(/-/g, '')

				const foundComponent = components.find(Component => {
					const instance = Component instanceof ChildComponent
						? Component
						: new Component()
					return instance.constructor.name.toLowerCase() === newComponent
				})

				if (foundComponent) {
					const content = foundComponent instanceof ChildComponent
						? foundComponent.render()
						: new foundComponent().render()
					element.replaceWith(content)
				} else {
					throw new Error(`Component "${newComponent}" not found in the provided components array`)
				}
			}
		}
	}

	/**
	 * Replace default classes to custom ones like module approach
	 * @param {Object} styles
	 * @param {HTMLElement || ChildNode} element
	 * @returns {void}
	 */
	#applyModuleStyles(styles, element) {
		if (!element) return

		const apply = (element) => {
			for (const [key, value] of Object.entries(styles)) {
				if (element.classList.contains(key)) {
					element.classList.remove(key)
					element.classList.add(value)
				}
			}
		}

		if (element.getAttribute('class')) {
			apply(element)
		}

		const nestedElements = element.querySelectorAll('*')
		nestedElements.forEach(apply)
	}
}

export default new RenderService()