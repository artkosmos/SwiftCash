import { BaseScreen } from 'src/core/base-screen'

export class About extends BaseScreen{
	constructor() {
		super({title: 'About'})
	}

	render() {
		return '<p>About us page</p>'
	}
}