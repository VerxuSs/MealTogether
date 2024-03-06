import { useState, type FC } from 'react'

import { json, useFetcher, useNavigate } from '@remix-run/react'

import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node'

import { Type, type Static } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import { Dialog } from '@fastack/ui-layout'

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
  name: Type.String({
    minLength: 8,
    maxLength: 64,
  }),
  ingredients: Type.Array(
    Type.Object({
      id: Type.Number({}),
      quantity: Type.Number({}),
      unitPrice: Type.Number({}),
    }),
  ),
})

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await storage.extractSession(request)

  void session // TODO: create dish

  const form = await request.formData()

  const body = Value.Decode(ActionBody, form.entries())

  void body // TODO: create dish

  return json({ id: 0 })
}

const PageComponent: FC = () => {
  const navigate = useNavigate()

  const fetcher = useFetcher<typeof action>()

  const open = fetcher.data === undefined

  const [ingredients, setIngredients] = useState<
    Static<typeof ActionBody>['ingredients']
  >([])

  const [names, setNames] = useState<Record<number, string>>([])

  const [autocomplete, setAutocomplete] = useState<
    Array<{ id: number; name: string }>
  >([])

  return (
    <Dialog
      title={<h1>Add a dish</h1>}
      open={open}
      close={() => {
        navigate('../', {
          replace: true,
          relative: 'route',
        })
      }}
    >
      <fetcher.Form method="POST" className="flex flex-col gap-y-4">
        <Input type="text" name="name" placeholder="Name" />
        <Input type="number" name="participants" placeholder="Participants" />
        <div className="flex flex-col gap-y-3">
          <Input type="text" name="name" placeholder="Name" />

          {ingredients.map((ingredient, index) => (
            <div key={ingredient.id} className="flex flex-col gap-y-3">
              <Input
                hidden
                type="number"
                value={ingredient.id}
                name={`ingredients[${index}].id`}
              />
              <h1>{names[ingredient.id]}</h1>
              <Input
                type="number"
                placeholder="Quantity"
                value={ingredient.quantity}
                name={`ingredients[${index}].quantity`}
              />
              <Input
                type="number"
                placeholder="Unit Price"
                value={ingredient.unitPrice}
                name={`ingredients[${index}].unitPrice`}
              />
              <button
                onClick={() => {
                  setIngredients((old) =>
                    old.filter((value) => value.id !== ingredient.id),
                  )
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <Input
          type="text"
          name="ingredient"
          placeholder="Ingredient"
          onChange={() => {
            // TODO: fetch ingredients by name (autocomplet 20 ? 15 ?)
            setAutocomplete([])
          }}
        />
        <select>
          <option value="">Select an ingredient</option>
          {autocomplete.map((ingredient) => (
            <option
              key={ingredient.id}
              value={ingredient.name}
              onClick={() => {
                setNames((old) => ({
                  ...old,
                  [ingredient.id]: ingredient.name,
                }))

                setIngredients((old) => [
                  ...old,
                  {
                    id: ingredient.id,
                    quantity: 0,
                    unitPrice: 0,
                  },
                ])
              }}
            >
              {ingredient.name}
            </option>
          ))}
        </select>
        <Submit>Create</Submit>
      </fetcher.Form>
    </Dialog>
  )
}

export default PageComponent
