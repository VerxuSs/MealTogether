import createClient from 'openapi-fetch'

import type { paths } from 'types/api'

export const apiClient = ({ signal }: Pick<Request, 'signal'>) => {
  return createClient<paths>({
    signal,
    baseUrl: process.env.MY_BACKEND_URL,
  })
}
