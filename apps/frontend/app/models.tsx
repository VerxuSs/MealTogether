class Ingredient {
  id: number
  name: string

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }
}

// Define class for dishes
class Dish {
  id: number
  name: string
  description: string
  ingredients: Ingredient[]

  constructor(
    id: number,
    name: string,
    description: string,
    ingredients: Ingredient[],
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.ingredients = ingredients
  }
}

// Define class for menus
class Menu {
  id: number
  name: string
  description: string
  dishes: Dish[]
  allergens: string[]

  constructor(
    id: number,
    name: string,
    description: string,
    dishes: Dish[],
    allergens: string[],
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.dishes = dishes
    this.allergens = allergens
  }
}

export { Menu, Dish, Ingredient }
