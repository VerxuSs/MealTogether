import { useState, type FC, useEffect, type PropsWithChildren } from 'react'
import { Tooltip } from 'flowbite-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWheatAlt } from '@fortawesome/free-solid-svg-icons'
import MenuTooltipIcon from '~/shared/MenuTooltipIcon'

import { useLoaderData } from '@remix-run/react'

import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'

import storage from '~/server/storage/session.server'

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

  void session // TODO: get event

  return json({
    title: 'Soiree chez Kirill',
    date: '2022-01-01',
    choice: {
      dish: 0,
    },
    menus: [
      {
        id: 0,
        name: 'Vegetarian',
        description:
          'Vegetarianism is the practice of abstaining from the consumption of meat. It may also include abstaining ',
        dishes: [
          {
            id: 0,
            name: 'Chicken Alfredo',
            description: 'Creamy pasta with grilled chicken',
            ingredients: [
              {
                id: 0,
                name: 'Pasta',
              },
              {
                id: 1,
                name: 'Chicken',
              },
              {
                id: 2,
                name: 'Cream',
              },
              {
                id: 3,
                name: 'Parmesan cheese',
              },
            ],
          },
          {
            id: 1,
            name: 'Caprese Salad',
            description: 'Fresh mozzarella, tomatoes, and basil',
            ingredients: [
              {
                id: 0,
                name: 'Tomatoes',
              },
              {
                id: 1,
                name: 'Mozzarella cheese',
              },
              {
                id: 2,
                name: 'Basil',
              },
              {
                id: 3,
                name: 'Olive oil',
              },
            ],
          },
        ],
        allergens: ['Gluten', 'Dairy'],
      },
      {
        id: 1,
        name: 'Vegetarian',
        description:
          'Vegetarianism is the practice of abstaining from the consumption of meat.',
        dishes: [
          {
            id: 0,
            name: 'Grilled Salmon',
            description: 'Fresh salmon grilled to perfection',
            ingredients: [
              {
                id: 0,
                name: 'Salmon',
              },
              {
                id: 1,
                name: 'Lemon',
              },
              {
                id: 2,
                name: 'Garlic',
              },
              {
                id: 3,
                name: 'Butter',
              },
            ],
          },
          {
            id: 1,
            name: 'Vegetable Stir-Fry',
            description: 'Assorted vegetables stir-fried with soy sauce',
            ingredients: [
              {
                id: 0,
                name: 'Broccoli',
              },
              {
                id: 1,
                name: 'Carrots',
              },
              {
                id: 2,
                name: 'Bell peppers',
              },
              {
                id: 3,
                name: 'Soy sauce',
              },
            ],
          },
        ],
        allergens: ['Fish', 'Soy'],
      },
      {
        id: 2,
        name: 'Menu 3',
        description: 'An omnivore is an animal that has the ability to e',
        dishes: [
          {
            id: 0,
            name: 'Beef Lasagna',
            description: 'Layers of pasta, ground beef, and tomato sauce',
            ingredients: [
              {
                id: 0,
                name: 'Pasta',
              },
              {
                id: 1,
                name: 'Ground beef',
              },
              {
                id: 2,
                name: 'Tomato sauce',
              },
              {
                id: 3,
                name: 'Mozzarella cheese',
              },
            ],
          },
        ],
        allergens: ['Gluten', 'Dairy'],
      },
      {
        id: 3,
        name: 'Menu 4',
        description:
          'An omnivore is an animal that has the ability to eat and survive on both plant and anim',
        dishes: [
          {
            id: 0,
            name: 'Vegetarian Pizza',
            description: 'Pizza topped with assorted vegetables',
            ingredients: [
              {
                id: 0,
                name: 'Pizza dough',
              },
              {
                id: 1,
                name: 'Tomatoes',
              },
              {
                id: 2,
                name: 'Mushrooms',
              },
              {
                id: 3,
                name: 'Onions',
              },
            ],
          },
        ],
        allergens: ['Gluten'],
      },
    ],
  })
}

const PageComponent: FC = () => {
  const { title, choice, date, menus } = useLoaderData<typeof loader>()

  const [selection, setSelection] = useState(choice.dish)

  useEffect(() => {
    setSelection(choice.dish)
  }, [choice.dish])

  return (
    <>
      <header className="my-10 w-full flex flex-row justify-center items-center">
        <h1 className="text-2xl mx-4">{title}</h1>
        <h2>{date}</h2>
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
                      {menu.dishes.map((dish) => (
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
                  {menu.allergens.map((allergen) => {
                    return (
                      <DietConstraint key={allergen} dietConstraint={allergen}>
                        <FontAwesomeIcon icon={faWheatAlt} />
                        <span className={'opacity-100 font-thin mx-4 text-sm'}>
                          {allergen}
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
                {menu.dishes.map((dish) => (
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
                        <>
                          <div key={ingredient.id}>
                            <FontAwesomeIcon icon={faWheatAlt} />
                            <span
                              className={'opacity-100 font-thin mx-4 text-sm'}
                            >
                              {ingredient.name}
                            </span>
                          </div>
                        </>
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
