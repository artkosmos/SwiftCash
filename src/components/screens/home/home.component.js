import { BaseScreen } from 'src/core/base-screen'

export class Home extends BaseScreen {
	constructor() {
		super({title: 'Home'})
	}

	render() {
		return '<p>Home page</p>'
	}
}