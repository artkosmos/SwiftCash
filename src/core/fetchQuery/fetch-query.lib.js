import { extractErrorMessage } from '@/core/fetchQuery/extract-error-message'

/**
 * Custom library providing a convenient way to interact with API
 * @param {Object} options
 * @param {('GET'|'DELETE'|'POST'|'PATCH'|'PUT')} [options.method]
 * @param {Object} [options.body=null]
 * @param {Object} [options.headers={}]
 * @param {Function} [options.isSuccess=null]
 * @param {Function} [options.isError=null]
 * @returns {Promise<{isLoading: boolean, error: string | null, data: any | null}>}
 */
export async function fetchQuery({ path, method = 'GET', body = null, headers = {}, isError = null, isSuccess = null }) {
	let isLoading = true
	let error = null
	let data = null
	const url = `http://localhost:4200/api${path}`
	const accessToken = ''

	const options = {
		method,
		headers: {
			'Content-Type': 'application/json',
			...headers
		}
	}

	if (accessToken) {
		options.headers.Authorization = `Bearer ${accessToken}`
	}

	if (body) {
		options.body = JSON.stringify(body)
	}

	try {
		const response = await fetch(url, options)
		if (response.ok) {
			data = await response.json()
			if (isSuccess) {
				isSuccess(data)
			}
		} else {
			const errorData = response.json()
			const errorMessage = extractErrorMessage(errorData)
			error = errorMessage
			if (isError) {
				isError(errorMessage)
			}
		}
	} catch (e) {
		const errorMessage = extractErrorMessage(e)
		if (isError) {
			isError(errorMessage)
		}
		error = errorMessage
	}
	finally {
		isLoading = false
	}

	return {isLoading, error, data}
}