import { BaseScreen } from '@/core/base-screen'

export class Auth extends BaseScreen{
	constructor() {
		super({title: 'Auth'})
	}

	render() {
		return '<p>Log in page</p>'
	}
}