import { useState, type FC, useEffect, type PropsWithChildren } from 'react'

import { useLoaderData } from '@remix-run/react'

import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'

import { Tooltip } from 'flowbite-react'

import { faWheatAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import MenuTooltipIcon from '~/shared/MenuTooltipIcon'

import storage from '~/server/storage/session.server'

import { apiClient } from '~/client/api'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Event',
    },
  ]
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  if (params.id === undefined) throw new Error()

  const session = await storage.extractSession(request)

  const eventId = +params.id

  const token = session.requireValue('context').token

  const event = await apiClient(request).GET('/events/{eventId}', {
    params: {
      path: {
        eventId,
      },
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const choice = await apiClient(request).GET('/events/{eventId}/menu', {
    params: {
      path: {
        eventId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  if (event.data) {
    const menus = event.data.menus.map(async ({ id }) => {
      const { data } = await apiClient(request).GET('/menus/{menuId}', {
        params: {
          path: {
            menuId: id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })

      return { id, ...data }
    })

    return json({
      event: event.data,
      choice: choice.data,
      menus: (await Promise.all(menus)).filter(Boolean),
    })
  }

  throw new Error()
}

const PageComponent: FC = () => {
  const { event, choice, menus } = useLoaderData<typeof loader>()

  const [selection, setSelection] = useState(choice)

  useEffect(() => {
    setSelection(choice)
  }, [choice])

  return (
    <>
      <header className="my-10 w-full flex flex-row justify-center items-center">
        <h1 className="text-2xl mx-4">{event.name}</h1>
        <h2>{event.startDate}</h2>
      </header>
      <div className="px-3 w-full flex flex-row justify-center">
        <div>
          <div className="grid gap-2 sm:grid-cols-1 lg:grid-cols-2 max-w-2xl m-1">
            {menus.map((menu) => {
              const selected = menu.id === selection
              return (
                <div key={menu.id}>
                  <div
                    className={
                      selected
                        ? 'border-4 border-pink-400'
                        : 'border-4 border-zinc-50'
                    }
                    onClick={() => setSelection(menu.id)}
                  >
                    <article
                      key={menu.id}
                      className={
                        'flex flex-col w-80 hover:opacity-75 hover:cursor-pointer'
                      }
                    >
                      <Tooltip content={menu.description}>
                        <div className="bg-sky-500 h-10 w-80 flex flex-row justify-center items-center">
                          <span className="text-white font-thin mx-4">
                            {menu.name}
                          </span>
                          <MenuTooltipIcon />
                        </div>
                      </Tooltip>
                      {menu.dishes?.map((dish) => (
                        <div
                          key={dish.id}
                          className="border border-black h-10 w-80 border-t-0 flex flex-row justify-center items-center m-0 p-0"
                        >
                          <span className="text-black font-thin mx-4">
                            {dish.name}
                          </span>
                        </div>
                      ))}
                    </article>
                  </div>
                  {menu.diets?.map((diet) => {
                    return (
                      <DietConstraint key={diet.id} dietConstraint={diet.name}>
                        <FontAwesomeIcon icon={faWheatAlt} />
                        <span className={'opacity-100 font-thin mx-4 text-sm'}>
                          {diet.name}
                        </span>
                      </DietConstraint>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
        <div className="w-80 flex flex-col justify-start items-center mx-10">
          {menus.map((menu) => {
            if (menu.id !== selection) {
              return
            }
            return (
              <div key={menu.id}>
                <div className="text-2xl my-2">{menu.name}</div>
                <div>{menu.description}</div>
                {menu.dishes?.map((dish) => (
                  <>
                    <div className="flex flex-col justify-center w-80 my-3">
                      <div className="flex flex-row justify-start items-center">
                        <span className="text-black font-thin text-lg">
                          {dish.name}
                        </span>
                      </div>
                      <div className="flex flex-row justify-start items-center">
                        <span className="text-black font-thin text-xs">
                          {dish.description}
                        </span>
                      </div>
                    </div>

                    {dish.ingredients.map((ingredient) => {
                      return (
                        <div key={ingredient.id}>
                          <FontAwesomeIcon icon={faWheatAlt} />
                          <span
                            className={'opacity-100 font-thin mx-4 text-sm'}
                          >
                            {ingredient.name}
                          </span>
                        </div>
                      )
                    })}
                  </>
                ))}
                <div className="w-full flex flex-row justify-start my-10">
                  <button className="p-1 bg-[#0e1729] text-white font-thin w-52 text-sm hover:opacity-75">
                    Submit
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

const DietConstraint: FC<
  PropsWithChildren<{
    dietConstraint: string
  }>
> = ({ children, dietConstraint }) => {
  if (dietConstraint !== 'Gluten') {
    return (
      <div
        className={
          'text-black h-10 w-80 border-t-0 opacity-100 flex flex-row justify-start items-center m-0 p-0'
        }
      >
        {children}
      </div>
    )
  }
  return (
    <div
      className={
        'text-red-600 h-10 w-80 border-t-0 opacity-100 flex flex-row justify-start items-center m-0 p-0'
      }
    >
      {children}
    </div>
  )
}

export default PageComponent
