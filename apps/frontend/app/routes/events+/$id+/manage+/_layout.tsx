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
import { Dropdown, Modal } from 'flowbite-react'
import { Dish, Ingredient, Menu, Constraint } from '~/models'
import {
  manageEventPageFixture,
  availableIngredientsFixture,
  availableConstraintsFixture
} from '~/fixtures'

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
  return json(manageEventPageFixture)
}

const PageComponent: FC = () => {
  const { event, menus } = useLoaderData<typeof loader>()
  const [typingNewMenu, setTypingNewMenu] = useState(false)
  const [newMenuName, setNewMenuName] = useState('')
  const [newMenus, setNewMenus] = useState<Menu[]>(menus)
  const [newMenuDescription, setNewMenuDescription] = useState('')
  const [openDishModal, setOpenDishModal] = useState(false)
  const [addDishMenuId, setAddDishMenuId] = useState(-1)
  const [newDishIngredients, setNewDishIngredients] = useState<Ingredient[]>([])
  const [availableIngredients, setNewAvailableIngredients] = useState<Ingredient[]>(availableIngredientsFixture)
  const [newDishName, setNewDishName] = useState('')
  const [newDishDescription, setNewDishDescription] = useState('')

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

  const handleAddDishToMenuModalOpen = (menuId: number) => {
    setAddDishMenuId(menuId)
    setOpenDishModal(true)
  }

  const handleAddDishToMenuModalClose = (closedWithSubmit: boolean) => {
    if (!closedWithSubmit) {
      setOpenDishModal(false)
      return
    }

    // TODO: call backend to add dish to menu (id = addDishMenuId)
    // TODO: if response in range 200-300 do the following

    const newDishId = Math.random() * 100000
    const newDish = new Dish(
      newDishId,
      newDishName,
      newDishDescription,
      newDishIngredients,
    )

    setNewMenus((prevMenus) => {
      return prevMenus.map((menu) => {
        if (menu.id === addDishMenuId) {
          menu.dishes.push(newDish)
        }
        return menu
      })
    })

    clearDishForm();
    setAddDishMenuId(-1)
    setOpenDishModal(false)
  }


  const deleteDishFromMenu = (menuId: number, dishId: number) => {
    // TODO: call backend to delete dish from menu
    // TODO: if response is 204 do the following
    setNewMenus((prevMenus) => {
      return prevMenus.map((menu) => {
        if (menu.id === menuId) {
          menu.dishes = menu.dishes.filter((dish) => dish.id !== dishId)
        }
        return menu
      })
    })
  }

  const clearDishForm = () => {
    setNewDishDescription('')
    setNewDishName('')
    setNewDishIngredients([])
  }

  const removeIngredientFromAvailableIngredients = (ingredient: Ingredient) => {
    setNewAvailableIngredients((prevIngredients: Ingredient[]) => {
      return prevIngredients.filter((i) => i.id !== ingredient.id)
    })
  }

  const addIngredientToDish = (ingredient: Ingredient) => {
    // no intermediary backend call needed
    setNewDishIngredients((prevIngredients: Ingredient[]) => [
      ...prevIngredients,
      ingredient,
    ])
    removeIngredientFromAvailableIngredients(ingredient);
  }

  const addConstraintToMenu = (constraint: Constraint, menuId: number) => {
    // TODO: call backend to add constraint to menu
    // TODO: if response is 201 do the following


    setNewMenus((prevMenus) => {
        return prevMenus.map((menu) => {
            if (menu.id === menuId) {
              // check if constraint is already in the menu
                if (menu.constraints.includes(constraint)) {
                    return menu
                }
                menu.constraints.push(constraint)
            }
            return menu
        })
    })
  }

  const removeConstraintFromMenu = (constraint: Constraint, menuId: number) => {
    setNewMenus((prevMenus) => {
        return prevMenus.map((menu) => {
            if (menu.id === menuId) {
                menu.constraints = menu.constraints.filter((c) => c !== constraint)
            }
            return menu
        })
    })
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
                            onClick={() => deleteDishFromMenu(menu.id, dish.id)}
                          />
                        </div>
                      ))}
                    </article>
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <Dropdown
                        className="font-thin text-sm h-40 overflow-auto"
                        label="add constraint"
                        renderTrigger={() => (
                            <span className="text-gray-400 mx-2 font-thin hover:cursor-pointer hover:text-black text-left">
                              + add constraint
                            </span>
                        )}
                    >
                      {availableConstraintsFixture.map((constraint) => (
                          <>
                            <Dropdown.Item
                                onClick={() => addConstraintToMenu(constraint, menu.id)}
                                key={constraint.id}
                            >
                              {constraint.name}
                            </Dropdown.Item>
                          </>
                      ))}
                    </Dropdown>
                    <span
                      className="text-gray-400 font-thin mx-2 hover:cursor-pointer hover:text-black"
                      onClick={() => handleAddDishToMenuModalOpen(menu.id)}
                    >
                      + add dish
                    </span>
                  </div>

                  {menu.constraints.map((constraint) => {
                    return (
                      <DietConstraint key={constraint.id} dietConstraint={constraint.name}>
                        <FontAwesomeIcon icon={faWheatAlt} />
                        <span className={'opacity-100 font-thin mx-4 text-sm'}>
                          {constraint.name}
                        </span>
                        <div
                            className="text-gray-400 hover:text-black hover:cursor-pointer font-thin text-xs"
                            onClick={() => removeConstraintFromMenu(constraint, menu.id)}
                        >
                          remove
                        </div>
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
      <Modal show={openDishModal} onClose={() => setOpenDishModal(false)}>
        <Modal.Header>
          Add dish to menu
        </Modal.Header>
        <Modal.Body>
          <input
            className="w-full text-black text-2xl font-thin bg-transparent mb-3"
            placeholder="name"
            value={newDishName}
            onChange={($event) => setNewDishName($event.target.value)}
          ></input>
          <input
            className="w-full text-black text-sm font-thin bg-transparent mb-3"
            placeholder="description"
            value={newDishDescription}
            onChange={($event) => setNewDishDescription($event.target.value)}
          ></input>
          {newDishIngredients.map((ingredient) => {
            return (
              <div>
                <div key={ingredient.id}>
                  <FontAwesomeIcon icon={faWheatAlt} />
                  <span className={'opacity-100 font-thin mx-4 text-sm'}>
                    {ingredient.name}
                  </span>
                </div>
              </div>
            )
          })}
          <div className="mt-5"></div>
          <Dropdown
            className="font-thin text-sm h-40 overflow-auto"
            label="Add ingredient"
            renderTrigger={() => (
              <span className="text-gray-400 hover:text-black hover:cursor-pointer font-thin">
                + Add ingredient
              </span>
            )}
          >
            {availableIngredients.map((ingredient) => (
              <>
                <Dropdown.Item
                  onClick={() => addIngredientToDish(ingredient)}
                  key={ingredient.id}
                >
                  {ingredient.name}
                </Dropdown.Item>
              </>
            ))}
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="my-4 p-1 bg-[#0e1729] text-white font-thin w-40 text-sm hover:opacity-75"
            onClick={() => {
              handleAddDishToMenuModalClose(true)
            }}
          >
            Submit
          </button>
          <button
            className="my-4 p-1 bg-gray-200 text-black font-thin w-40 text-sm hover:bg-gray-300"
            onClick={() => {
              handleAddDishToMenuModalClose(false)
            }}
          >
            Close
          </button>
          <button
            className="p-1 text-gray-400 font-thin w-20 text-sm hover:text-black"
            onClick={() => {
              clearDishForm()
            }}
          >
            Clear
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PageComponent
