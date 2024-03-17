import { type FC } from 'react'

import { useFetcher, useNavigate } from '@remix-run/react'

import {
  type ActionFunctionArgs,
  type MetaFunction,
  redirect,
} from '@remix-run/node'

import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import { Modal } from 'flowbite-react'

import { apiClient } from '~/client/api'

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
  name: Type.String(),
  slots: Type.String(),
  endDate: Type.String(),
  startDate: Type.String(),
})

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await storage.extractSession(request)

  const form = await request.formData()

  const body = Value.Decode(ActionBody, Object.fromEntries(form.entries()))

  const event = await apiClient(request).POST('/events/create', {
    body: {
      name: body.name,
      slots: +body.slots,
      endDate: new Date(body.endDate).getTime(),
      startDate: new Date(body.startDate).getTime(),
    },
    headers: {
      Authorization: `Bearer ${session.requireValue('context').token}`,
    },
  })

  if (event.data === undefined) return null

  return redirect(`/events/${event.data.id}`)
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
      <Modal.Header>Create a menu</Modal.Header>
      <Modal.Body className="flex flex-col gap-y-3">
        <fetcher.Form method="POST" className="flex flex-col gap-y-4">
          <Input type="text" name="name" placeholder="Name" />
          <Input type="number" name="slots" placeholder="Slots" />
          <div className="flex flex-col gap-y-3">
            <label>Start date</label>
            <Input type="date" name="startDate" />
            <label>End date</label>
            <Input type="date" name="endDate" />
          </div>
          <Submit>Create</Submit>
        </fetcher.Form>
      </Modal.Body>
    </Modal>
  )
}

export default PageComponent
