import { type FC } from 'react'

import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'

import { useLoaderData } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Manage Event',
    },
  ]
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (params.id === undefined) throw new Error()

  // TODO: get event by id

  return json({ id: +params.id })
}

const PageComponent: FC = () => {
  const { id } = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>Manage Event {id}</h1>
      <p>Event ID: {id}</p>
    </div>
  )
}

export default PageComponent
