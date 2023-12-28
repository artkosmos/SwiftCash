import { BaseScreen } from '@/core/base-screen'
import renderService from '@/core/services/render.service'
import template from './auth.template.html'
import styles from './auth.module.scss'
import { AuthService } from '@/api/auth.service'
import { Button } from '@/components/ui/button/button.component'
import { $SQuery } from '@/core/customQuery/query.lib'
import { Field } from '@/components/ui/text-field/text-field.component'
import formService from '@/core/services/form.service'
import validationService from '@/core/services/validation.service'

export class Auth extends BaseScreen {
	#isLoginForm = true

	constructor() {
		super({ title: 'Auth' })
		this.authService = new AuthService()
		this.element = null
	}

	#registerHandler(event) {
		event.preventDefault()

		$SQuery(this.element).find('h1').text(this.#isLoginForm ? 'Register' : 'Sign In')
		event.target.innerText = this.#isLoginForm ? 'Sign In' : 'Register'
		this.#isLoginForm = !this.#isLoginForm
	}

	/**
	 * Validation input
	 * @param {Object} formValues
	 * @param {string} formValues.email
	 * @param {string} formValues.password
	 * @returns {boolean}
	 */
	#validate(formValues) {
		const emailField = $SQuery(this.element).find('label:first-child')
		const passwordField = $SQuery(this.element).find('label:last-child')

		if (!formValues.email) {
			validationService.showError(emailField)
		}

		if (!formValues.password) {
			validationService.showError(passwordField)
		}

		return formValues.email !== '' && formValues.password !== ''
	}

	#submitHandler(event) {
		const formValues = formService.getFormValues(event.target)
		if (!this.#validate(formValues)) return
		const type = this.#isLoginForm ? 'login' : 'register'
		console.log(formValues)
		if (type === 'login') {
			this.authService.logIn(formValues)
		} else {
			this.authService.signUp(formValues)
		}
	}

	render() {
		this.element = renderService.createElement({
			html: template,
			styles,
			components: [new Button({ children: 'Submit' })]
		})

		$SQuery(this.element).find('#auth-inputs')
			.append(new Field({
				placeholder: 'Enter email',
				type: 'email',
				name: 'email'
			}).render())
			.append(new Field({
				placeholder: 'Enter password',
				type: 'password',
				name: 'password'
			}).render())

		$SQuery(this.element).find('#register').onClick(this.#registerHandler.bind(this))

		$SQuery(this.element).find('form').submit(this.#submitHandler.bind(this))

		return this.element
	}
}