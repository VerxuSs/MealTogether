const manageEventPageFixture = {
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
}

const viewEventFixture = {
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
}

const availableIngredientsFixture = [
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
  {
    id: 4,
    name: 'Broccoli',
  },
  {
    id: 5,
    name: 'Carrots',
  },
  {
    id: 6,
    name: 'Bell peppers',
  },
  {
    id: 7,
    name: 'Soy sauce',
  },
  {
    id: 8,
    name: 'Chicken breast',
  },
  {
    id: 9,
    name: 'Ground beef',
  },
  {
    id: 10,
    name: 'Cheese',
  },
  {
    id: 11,
    name: 'Garlic',
  },
  {
    id: 12,
    name: 'Spinach',
  },
  {
    id: 13,
    name: 'Lettuce',
  },
  {
    id: 14,
    name: 'Corn',
  },
  {
    id: 15,
    name: 'Rice',
  },
  {
    id: 16,
    name: 'Pasta',
  },
  {
    id: 17,
    name: 'Olive oil',
  },
  {
    id: 18,
    name: 'Salt',
  },
  {
    id: 19,
    name: 'Pepper',
  },
]

export { manageEventPageFixture, viewEventFixture, availableIngredientsFixture }
