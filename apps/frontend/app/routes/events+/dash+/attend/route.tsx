import { type FC } from 'react'

import { useFetcher, useNavigate } from '@remix-run/react'

import {
  type ActionFunctionArgs,
  type MetaFunction,
  redirect,
} from '@remix-run/node'

import { Modal } from 'flowbite-react'

import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import storage from '~/server/storage/session.server'

import Input from '~/client/components/commons/forms/Input'
import Submit from '~/client/components/commons/forms/Submit'

import { apiClient } from '~/client/api'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Attend Event',
    },
  ]
}

const ActionBody = Type.Object({
  code: Type.String({
    description: 'The event code',
    minimum: 0,
  }),
})

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await storage.extractSession(request)

  const form = await request.formData()

  const body = Value.Decode(ActionBody, Object.fromEntries(form.entries()))

  await apiClient(request).POST('/events/{eventId}/join', {
    params: {
      path: {
        eventId: +body.code,
      },
    },
    headers: {
      Authorization: `Bearer ${session.requireValue('context').token}`,
    },
  })

  return redirect('/events/dash')
}

const PageComponent: FC = () => {
  const navigate = useNavigate()

  const fetcher = useFetcher<typeof action>()

  return (
    <Modal
      show
      onClose={() => {
        navigate('../', {
          replace: true,
        })
      }}
    >
      <Modal.Header>Attend an event</Modal.Header>
      <Modal.Body>
        <fetcher.Form method="POST" className="flex gap-x-4">
          <Input type="text" name="code" title="code" placeholder="Code" />
          <Submit>Attend</Submit>
        </fetcher.Form>
      </Modal.Body>
    </Modal>
  )
}

export default PageComponent
