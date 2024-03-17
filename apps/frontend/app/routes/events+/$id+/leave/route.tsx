import { type FC } from 'react'

import { Form, useActionData, useNavigate, redirect } from '@remix-run/react'

import { type ActionFunctionArgs, type MetaFunction } from '@remix-run/node'

import { Dialog } from '@fastack/ui-layout'

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

  await apiClient(request).POST('/events/{eventId}/join', {
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
  const navigate = useNavigate()

  const data = useActionData<typeof action>()

  const open = data === undefined

  return (
    <Dialog
      title={<h1>Are you sure</h1>}
      open={open}
      close={() => {
        navigate('../', {
          replace: true,
          relative: 'route',
        })
      }}
    >
      <Form method="POST" className="flex gap-x-4">
        <Submit>Leave the event</Submit>
      </Form>
    </Dialog>
  )
}

export default PageComponent
