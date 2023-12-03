import { BaseScreen } from 'src/core/base-screen'

export class NotFound extends BaseScreen {
	constructor() {
		super({title: '404'})
	}

	render() {
		return '<p>404 Page not found</p>'
	}
}