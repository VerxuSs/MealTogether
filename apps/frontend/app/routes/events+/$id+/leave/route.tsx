import { type FC } from 'react'

import { useFetcher, useNavigate } from '@remix-run/react'

import {
  type ActionFunctionArgs,
  type MetaFunction,
  redirect,
} from '@remix-run/node'

import { Modal } from 'flowbite-react'

import storage from '~/server/storage/session.server'

import Submit from '~/client/components/commons/forms/Submit'

import { apiClient } from '~/client/api'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Leave Event',
    },
  ]
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  if (params.id === undefined) throw new Error()

  const session = await storage.extractSession(request)

  await apiClient(request).DELETE('/events/{eventId}/leave', {
    params: {
      path: {
        eventId: +params.id,
      },
    },
    headers: {
      Authorization: `Bearer ${session.requireValue('context').token}`,
    },
  })

  return redirect('/events/dash')
}

const PageComponent: FC = () => {
  const fetcher = useFetcher<typeof action>()

  const navigate = useNavigate()

  return (
    <Modal
      show
      onClose={() => {
        navigate('../', {
          replace: true,
        })
      }}
    >
      <Modal.Header>Are you sure to leave the event?</Modal.Header>
      <Modal.Body>
        <fetcher.Form method="POST" className="flex gap-x-4">
          <Submit>Leave the event</Submit>
        </fetcher.Form>
      </Modal.Body>
    </Modal>
  )
}

export default PageComponent
