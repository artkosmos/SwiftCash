import { MAIN_TITLE } from '@/constants'

export const getPageTitle = (title) => {
	return title ? `${title} | ${MAIN_TITLE}` : MAIN_TITLE
}