import { Home } from '@/components/screens/home'
import { About } from '@/components/screens/about'
import { Auth } from '@/components/screens/auth/auth.component'

export const ROUTES = [
	{ path: '/', component: Home },
	{ path: '/about', component: About },
	{ path: '/login', component: Auth }
]