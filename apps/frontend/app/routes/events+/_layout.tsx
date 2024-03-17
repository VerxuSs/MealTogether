import { type LoaderFunctionArgs, redirect } from '@remix-run/node'

import { Outlet, json, useLoaderData, Link } from '@remix-run/react'

import storage from '~/server/storage/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // TODO: get user sub from backend
  const sub = {
    free: true,
    remaining: '5 days',
    updated: '2022-01-01',
  }

  const session = await storage.extractSession(request)

  if (session.state.get('context') === undefined) {
    return redirect('/identity/login')
  }

  return json({
    sub,
    name: 'Kilian Houpeurt',
  })
}

const PageComponent = () => {
  const data = useLoaderData<typeof loader>()

  return (
    <>
      <header className="my-5 flex gap-x-5 justify-between h-20">
        {/** this is a title */}
        <div>
          <img className="h-20" alt="logo" src="/logo.png" />
        </div>
        <div className="flex gap-x-5 justify-end h-20">
          <div className="h-20 w-70 flex flex-col">
            <div className="h-10 flex flex-row justify-between items-center">
              <h1 className="mr-4 inline-block text-2xl">{data.name}</h1>
              {data.sub.free ? (
                <span className="h-8 text-sm rounded-full py-2 px-2 bg-orange-400 text-white">
                  freemium
                </span>
              ) : (
                <span className="h-8 text-sm rounded-full py-2 px-2 bg-emerald-400 text-white">
                  premium
                </span>
              )}
            </div>
            <Link
              to={{
                pathname: '/identity/logout',
              }}
            >
              Sign Out
            </Link>
          </div>
          <img
            alt="profile"
            className="w-20 h-20 object-cover"
            src="/profile_photo_example.jpg"
          />
        </div>
      </header>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default PageComponent
