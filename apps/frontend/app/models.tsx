class Ingredient {
  id: number
  name: string

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }
}

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

class Menu {
  id: number
  name: string
  description: string
  dishes: Dish[]
  constraints: Constraint[]

  constructor(
    id: number,
    name: string,
    description: string,
    dishes: Dish[],
    constraints: Constraint[],
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.dishes = dishes
    this.constraints = constraints
  }
}

class Constraint {
  id: number
  name: string
  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }
}

export { Menu, Dish, Ingredient, Constraint }
