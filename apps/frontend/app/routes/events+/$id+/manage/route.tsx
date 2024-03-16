import { type FC, useState } from 'react'

import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'

import { useLoaderData } from '@remix-run/react'
import DietConstraint from '~/shared/DietConstraintInMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWheatAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Menu } from '~/models'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Manage Event',
    },
  ]
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (params.id === undefined) throw new Error()

  // TODO: get event by id

  // mock json
  return json({
    event: {
      id: 10,
      title: 'Grosse soiree alcool',
      date: '12.12.2024',
      participants: 10,
      time: '4:20',
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
    ],
  })
}

const PageComponent: FC = () => {
  const { event, menus } = useLoaderData<typeof loader>()
  const [typingNewMenu, setTypingNewMenu] = useState(false)
  const [existingMenus, setMenus] = useState(menus)
  const [newMenuName, setNewMenuName] = useState('')
  const [newMenus, setNewMenus] = useState<Menu[]>([]) // Initialize newMenus state as an empty array
  const [newMenuDescription, setNewMenuDescription] = useState('')

  /**
   * handles new menu creation
   */
  const addNewMenu = () => {
    // TODO: backend call to create menu, then get id and create a new menu with it
    // TODO: replace this line with the id from the backend
    const newlyCreatedMenuId = menus.length

    const newMenu = new Menu(
      newlyCreatedMenuId,
      newMenuName,
      newMenuDescription,
      [],
      [],
    )

    // Update the state with the new menu
    setNewMenus((prevNewMenus) => [...prevNewMenus, newMenu])

    // Reset input fields and flags
    setNewMenuName('')
    setNewMenuDescription('')
    setTypingNewMenu(false)
  }

  const deleteNewMenuById = (id: number) => {
    // TODO: backend call to delete menu
    // TODO: if received 204: perform the following
    setNewMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== id))
  }

  const deleteMenuById = (id: number) => {
    // TODO: backend call to delete menu
    // TODO: if received 204: perform the following
    setMenus((prevMenus: Menu[]) => prevMenus.filter((menu) => menu.id !== id))
  }

  return (
    <>
      <header className="my-10 w-full flex flex-row justify-center items-center">
        <h1 className="text-2xl mx-4">Manage {event.title}</h1>
        <h2>{event.date}</h2>
      </header>
      <div className="px-3 w-full flex flex-row justify-center">
        <div>
          <div className="grid gap-2 sm:grid-cols-1 lg:grid-cols-2 max-w-2xl m-1">
            {existingMenus.map((menu) => {
              return (
                <div key={menu.id}>
                  <div className={'border-4 border-zinc-50'}>
                    <article key={menu.id} className={'flex flex-col w-80'}>
                      <div className="bg-sky-500 h-10 w-80 flex flex-row justify-between items-center">
                        <div className="ml-2"></div>
                        <span className="text-white font-thin mx-4">
                          {menu.name}
                        </span>
                        <FontAwesomeIcon
                          className="mr-2 hover:cursor-pointer"
                          icon={faTrash}
                          onClick={() => deleteMenuById(menu.id)}
                        />
                      </div>
                      {menu.dishes.map((dish) => (
                        <div
                          key={dish.id}
                          className="border border-black h-10 w-80 border-t-0 flex flex-row justify-between items-center m-0 p-0"
                        >
                          <div className="ml-2"></div>
                          <span className="text-black font-thin mx-4">
                            {dish.name}
                          </span>
                          <FontAwesomeIcon
                            className="mr-2 hover:cursor-pointer"
                            icon={faTrash}
                          />
                        </div>
                      ))}
                    </article>
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <span className="text-gray-400 font-thin mx-2">
                      {' '}
                      + add constraint
                    </span>
                    <span className="text-gray-400 font-thin mx-2">
                      {' '}
                      + add dish
                    </span>
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
            {newMenus.map((menu) => {
              return (
                <div key={menu.id}>
                  <div className={'border-4 border-zinc-50'}>
                    <article key={menu.id} className={'flex flex-col w-80'}>
                      <div className="bg-sky-500 h-10 w-80 flex flex-row justify-between items-center">
                        <div className="ml-2"></div>
                        <span className="text-white font-thin mx-4">
                          {menu.name}
                        </span>
                        <FontAwesomeIcon
                          className="mr-2 hover:cursor-pointer"
                          icon={faTrash}
                          onClick={() => deleteNewMenuById(menu.id)}
                        />
                      </div>
                      {menu.dishes.map((dish) => (
                        <div
                          key={dish.id}
                          className="border border-black h-10 w-80 border-t-0 flex flex-row justify-between items-center m-0 p-0"
                        >
                          <div className="ml-2"></div>
                          <span className="text-black font-thin mx-4">
                            {dish.name}
                          </span>
                          <FontAwesomeIcon
                            className="mr-2 hover:cursor-pointer"
                            icon={faTrash}
                          />
                        </div>
                      ))}
                    </article>
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <span className="text-gray-400 font-thin mx-2">
                      {' '}
                      + add constraint
                    </span>
                    <span className="text-gray-400 font-thin mx-2">
                      {' '}
                      + add dish
                    </span>
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
            {typingNewMenu && (
              <div
                className={
                  'w-80 h-40 flex flex-col justify-start items-center border-4 border-solid border-zinc-50'
                }
              >
                <div className="bg-sky-500 h-10 w-80 flex flex-row justify-between items-center opacity-60">
                  <input
                    className="w-full align-middle text-white font-thin mx-4 bg-transparent"
                    placeholder="Name"
                    value={newMenuName}
                    onChange={($event) => setNewMenuName($event.target.value)}
                  ></input>
                </div>
                <div className="h-10 w-80 flex flex-row justify-between items-center opacity-60">
                  <input
                    className="w-full text-black text-xs font-thin mx-4 bg-transparent"
                    placeholder="description"
                    value={newMenuDescription}
                    onChange={($event) =>
                      setNewMenuDescription($event.target.value)
                    }
                  ></input>
                </div>
                <button
                  className="my-4 p-1 bg-[#0e1729] text-white font-thin w-40 text-sm hover:opacity-75"
                  onClick={() => {
                    addNewMenu()
                  }}
                >
                  Submit
                </button>
              </div>
            )}
            {!typingNewMenu && (
              <div>
                <div
                  className={
                    'w-80 h-40 flex flex-col justify-center ' +
                    'items-center hover:opacity-50 hover:bg-zinc-200 ' +
                    'text-gray-400 hover:text-black hover:cursor-pointer'
                  }
                  onClick={() => setTypingNewMenu(true)}
                >
                  <span className="m-auto font-thin text-[60px]">+</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default PageComponent
