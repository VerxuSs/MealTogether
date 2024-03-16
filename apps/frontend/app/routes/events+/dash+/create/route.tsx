import { type FC } from 'react'

import { Form, json, useActionData, useNavigate } from '@remix-run/react'

import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node'

import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import { Dialog } from '@fastack/ui-layout'

import storage from '~/server/storage/session.server'

import Input from '~/client/components/commons/forms/Input'
import Submit from '~/client/components/commons/forms/Submit'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Create Event',
    },
  ]
}

const ActionBody = Type.Object({
  name: Type.String({
    minLength: 8,
    maxLength: 64,
  }),
  date: Type.String({}),
  time: Type.String({}),
  participants: Type.Number({
    minimum: 1,
    maximum: 100,
  }),
})

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await storage.extractSession(request)

  void session // TODO: create event

  const form = await request.formData()

  const body = Value.Decode(ActionBody, form.entries())

  void body // TODO: create event

  return json({ id: 0 })
}

const PageComponent: FC = () => {
  const navigate = useNavigate()

  const data = useActionData<typeof action>()

  const open = data === undefined

  return (
    <Dialog
      title={<h1>Create an event</h1>}
      open={open}
      close={() => {
        // create new event in backend,
        // request event id from backend
        // navigate to the update page with the newly created event id as get parameter
        navigate('../', {
          replace: true,
          relative: 'route',
        })
      }}
    >
      <Form method="POST" className="flex flex-col gap-y-4">
        <Input type="text" name="name" placeholder="Name" />
        <Input type="number" name="participants" placeholder="Participants" />
        <div className="flex flex-col gap-y-3">
          <Input type="date" name="date" placeholder="Date" />
          <Input type="time" name="time" placeholder="Time" />
        </div>
        <Submit>Create</Submit>
      </Form>
    </Dialog>
  )
}

export default PageComponent
