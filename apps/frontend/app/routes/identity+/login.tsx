import type { FC } from 'react'

import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node'

import { Form, Link, redirect } from '@remix-run/react'

import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import storage from '~/server/storage/session.server'

import { apiClient } from '~/client/api'

import Input from '~/client/components/commons/forms/Input'
import Submit from '~/client/components/commons/forms/Submit'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Login',
    },
  ]
}

const ActionBody = Type.Object({
  email: Type.String({
    format: 'email',
  }),
  password: Type.String({
    minLength: 8,
  }),
})

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData()

  const body = Value.Decode(ActionBody, form.entries())

  const user = await apiClient(request).POST('/users/connect', {
    body: {
      email: body.email,
      password: body.password,
    },
  })

  if (user.data) {
    const session = await storage.extractSession(request)

    session.state.set('context', {
      token: user.data.token,
    })

    return redirect('/dashboard', {
      headers: {
        'Set-Cookie': await storage.commitSession(session.state),
      },
    })
  }

  return redirect('/identity/login')
}

const PageComponent: FC = () => {
  return (
    <section className="m-auto">
      <Form method="POST">
        <div className="flex gap-y-3">
          <Input type="text" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />
        </div>
        <div>
          <Submit>Login</Submit>
        </div>
      </Form>
      <Link
        to={{
          pathname: '/identity/register',
        }}
      >
        Register
      </Link>
    </section>
  )
}

export default PageComponent
