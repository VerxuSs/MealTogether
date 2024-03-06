import type { LoaderFunctionArgs } from '@remix-run/node'

import { Outlet, json, useLoaderData } from '@remix-run/react'

import storage from '~/server/storage/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // TODO: get user sub from backend
  const sub = {
    free: true,
    remaining: '5 days',
    updated: '2022-01-01',
  }

  const session = await storage.extractSession(request)

  return json({
    name: 'Kilian Houpeurt',
    sub,
    session: JSON.stringify(session.state.data),
  })
}

const PageComponent = () => {
  const data = useLoaderData<typeof loader>()

  return (
    <>
      <header className="py-5 flex gap-x-5 justify-end h-28">
        {/** this is a title */}

        <div className="h-28 w-90 flex flex-col">
          <div className="h-14 flex flex-row justify-between items-center">
            <h1 className="mr-4 inline-block text-2xl">{data.name}</h1>
            {data.sub.free ? (
                <span className="h-10 text-sm rounded-full py-2 px-2 bg-orange-400 text-white">
              freemium
            </span>
            ) : (
                <span className="h-10 text-sm rounded-full py-2 px-2 bg-emerald-400 text-white">
              premium
            </span>
            )}
          </div>

          <div className="h-14 w-90">
            <button className="bg-zinc-300 h-full w-full hover:bg-zinc-400">Sign Out</button>
          </div>

        </div>
        <img
            alt="profile"
            className="w-28 h-28 object-cover"
            src="/profile_photo_example.jpg"
        />
      </header>
      <div>
        <Outlet/>
      </div>
    </>
  )
}

export default PageComponent
