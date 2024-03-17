import type { FC } from 'react'

import type { LoaderFunctionArgs } from '@remix-run/node'

import {
  Link,
  Outlet,
  json,
  useLoaderData,
  useNavigate,
} from '@remix-run/react'

import { apiClient } from '~/client/api'

import storage from '~/server/storage/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await storage.extractSession(request)

  const hosting = await apiClient(request).GET('/events/hosting', {
    headers: {
      Authorization: `Bearer ${session.requireValue('context').token}`,
    },
  })

  const attending = await apiClient(request).GET('/events/attending', {
    headers: {
      Authorization: `Bearer ${session.requireValue('context').token}`,
    },
  })

  return json({
    hosting: hosting.data ?? [],
    attending: attending.data ?? [],
  })
}

const PageComponent: FC = () => {
  const data = useLoaderData<typeof loader>()

  const navigate = useNavigate()

  return (
    <>
      <Outlet />
      <section>
        <h1 className="text-2xl mb-4">Events</h1>
        <div className="flex flex-row justify-center gap-x-6 gap-y-5">
          <article className="grow">
            <h2 className="text-xl mb-3">Hosting</h2>
            <ul className="list-none">
              {data.hosting.map((event) => {
                const spots = event.slots - event.participants

                return (
                  <li
                    key={event.id}
                    onClick={() => {
                      navigate(`/events/${event.id}`)
                    }}
                    className="cursor-pointer mb-2 px-4 py-3 flex justify-between border-2 border-slate-800 bg-slate-50 hover:scale-[101%] transition-colors duration-200"
                  >
                    <div>
                      <h1 className="font-bold">{event.name}</h1>
                      <h2 className="font-serif">{spots} spots remaining</h2>
                    </div>
                    <span>{new Date(event.startDate).toDateString()}</span>
                  </li>
                )
              })}
            </ul>
            <Link
              to={{
                pathname: '/events/dash/create',
              }}
            >
              Create Event
            </Link>
          </article>
          <article className="grow">
            <h2 className="text-xl mb-3">Attending</h2>
            <ul className="list-none">
              {data.attending.map((event) => {
                const spots = event.slots - event.participants

                return (
                  <li
                    key={event.id}
                    onClick={() => {
                      navigate(`/events/${event.id}`)
                    }}
                    className="cursor-pointer mb-2 px-4 py-3 flex justify-between border-2 border-slate-800 bg-slate-50 hover:scale-[101%] transition-colors duration-200"
                  >
                    <div>
                      <h1 className="font-bold">{event.name}</h1>
                      <h2 className="font-serif">{spots} spots remaining</h2>
                    </div>
                    <span>{new Date(event.startDate).toDateString()}</span>
                  </li>
                )
              })}
            </ul>
            <Link
              to={{
                pathname: '/events/dash/attend',
              }}
            >
              Attend Event
            </Link>
          </article>
        </div>
      </section>
    </>
  )
}

export default PageComponent
