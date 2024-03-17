import { type FC } from 'react'

import { Form, useActionData, useNavigate } from '@remix-run/react'

import { type ActionFunctionArgs, type MetaFunction } from '@remix-run/node'

import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import { Dialog } from '@fastack/ui-layout'

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
  code: Type.Integer({
    description: 'The event code',
    minimum: 0,
  }),
})

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await storage.extractSession(request)

  const form = await request.formData()

  const body = Value.Decode(ActionBody, form.entries())

  await apiClient(request).POST('/events/{eventId}/join', {
    params: {
      path: {
        eventId: body.code,
      },
    },
    headers: {
      Authorization: `Bearer ${session.requireValue('context').token}`,
    },
  })
}

const PageComponent: FC = () => {
  const navigate = useNavigate()

  const data = useActionData<typeof action>()

  const open = data === undefined

  return (
    <Dialog
      title={<h1>Attend an event</h1>}
      open={open}
      close={() => {
        navigate('../', {
          replace: true,
          relative: 'route',
        })
      }}
    >
      <Form method="POST" className="flex gap-x-4">
        <Input type="text" name="code" title="code" placeholder="Code" />
        <Submit>Attend</Submit>
      </Form>
    </Dialog>
  )
}

export default PageComponent
