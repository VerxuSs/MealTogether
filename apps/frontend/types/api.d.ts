/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/diets/linked': {
    /** @description Get the user's linked diets */
    get: {
      responses: {
        /** @description Array of the diets linked to the user */
        200: {
          content: {
            'application/json': {
              /** @description id of the diet */
              id: number
              /** @description name of diet */
              name: string
            }[]
          }
        }
      }
    }
  }
  '/diets/{dietId}/link': {
    /** @description Unlink a diet from the user's account */
    post: {
      parameters: {
        path: {
          /** @description id of the diet */
          dietId: number
        }
      }
      responses: {
        /** @description Default Response */
        200: {
          content: never
        }
      }
    }
  }
  '/diets/{dietId}/unlink': {
    /** @description Unlink a diet from the user's account */
    delete: {
      parameters: {
        path: {
          /** @description diet's id to remove */
          dietId: number
        }
      }
      responses: {
        /** @description Default Response */
        200: {
          content: never
        }
      }
    }
  }
  '/dishes/{dishId}/delete': {
    /** @description Delete a dish */
    delete: {
      parameters: {
        path: {
          /** @description The dish's id */
          dishId: number
        }
      }
      responses: {
        /** @description Default Response */
        200: {
          content: never
        }
      }
    }
  }
  '/events/create': {
    /** @description Create an event */
    post: {
      requestBody: {
        content: {
          'application/json': {
            /** @description The event's name */
            readonly name: string
            /** @description The event's maximum participant */
            readonly slots: number
            /** @description The event's start date in UNIX timestamp format (milliseconds) */
            readonly startDate: number
            /** @description The event's end date in UNIX timestamp format (milliseconds) */
            readonly endDate: number
          }
        }
      }
      responses: {
        /** @description Default Response */
        200: {
          content: {
            'application/json': {
              /** @description The event's id */
              readonly id: number
            }
          }
        }
      }
    }
  }
  '/events/{eventId}': {
    /** @description get one event */
    get: {
      parameters: {
        path: {
          /** @description event's id that the user want to display */
          eventId: number
        }
      }
      responses: {
        /** @description Default Response */
        200: {
          content: {
            'application/json': {
              /** @description id of event */
              readonly id: number
              /** @description name of event */
              readonly name: string
              readonly slots: number
              /** @description start date of the event */
              readonly startDate: number
              /** @description end date of the event */
              readonly endDate: number
              /** @description id of the author */
              readonly authorId: number
              /** @description array of participants attending the event */
              readonly participants: number[]
              /** @description array of menus for the event */
              readonly menus: {
                /** @description id of the menu */
                id: number
                /** @description name of the menu */
                name: string
              }[]
            }
          }
        }
      }
    }
  }
  '/events/hosting': {
    /** @description get all events of the connected user */
    get: {
      responses: {
        /** @description array of event where connected user is the author */
        200: {
          content: {
            'application/json': {
              /** @description id of event */
              id: number
              /** @description name of event */
              name: string
              /** @description start date of the event */
              startDate: number
              /** @description number of maximum participants */
              slots: number
              /** @description number of participants */
              participants: number
            }[]
          }
        }
      }
    }
  }
  '/events/attending': {
    /** @description get all events of the connected user */
    get: {
      responses: {
        /** @description array of event where connected user is the author */
        200: {
          content: {
            'application/json': {
              /** @description id of event */
              id: number
              /** @description name of event */
              name: string
              /** @description id of the author */
              authorId: number
              /** @description start date of the event */
              startDate: number
              /** @description number of maximum participants */
              slots: number
              /** @description number of participants */
              participants: number
            }[]
          }
        }
      }
    }
  }
  '/events/{eventId}/menu': {
    /** @description Get the event's menu */
    get: {
      parameters: {
        path: {
          /** @description The event's id */
          eventId: number
        }
      }
      responses: {
        /** @description Default Response */
        200: {
          content: {
            'application/json': {
              /** @description The menu's id */
              readonly id?: number
            }
          }
        }
      }
    }
    /** @description Create a menu */
    post: {
      parameters: {
        path: {
          /** @description The event's id */
          eventId: number
        }
      }
      requestBody: {
        content: {
          'application/json': {
            /** @description The menu's name */
            readonly name: string
            /** @description The menu's description */
            readonly description: string
            readonly diets: number[]
          }
        }
      }
      responses: {
        /** @description Default Response */
        200: {
          content: {
            'application/json': {
              /** @description The menu's Id */
              readonly id: number
            }
          }
        }
      }
    }
  }
  '/events/{eventId}/join': {
    /** @description Make an user participate to an event and menu */
    post: {
      parameters: {
        path: {
          eventId: string
        }
      }
      requestBody: {
        content: {
          'application/json': {
            /** @description Event's id that the user want to participate */
            readonly eventId: number
          }
        }
      }
      responses: {
        /** @description Default Response */
        200: {
          content: never
        }
      }
    }
  }
  '/events/{eventId}/leave': {
    /** @description Delete the participation of the user */
    delete: {
      parameters: {
        path: {
          eventId: string
        }
      }
      responses: {
        /** @description Default Response */
        200: {
          content: {
            'application/json': {
              /** @description The event's id */
              readonly eventId: number
              /** @description Menu's id selected, null if menu isn't selected for moment */
              readonly menuId: number
            }
          }
        }
      }
    }
  }
  '/hooks/sse': {
    /** @description Subscribe to server sent events */
    get: {
      responses: {
        /** @description Default Response */
        200: {
          content: never
        }
      }
    }
  }
  '/ingredients': {
    /** @description Get all of the ingredients */
    get: {
      responses: {
        /** @description Default Response */
        200: {
          content: {
            'application/json': {
              /** @description The ingredient's id */
              id: number
              /** @description The ingredient's name */
              name: string
            }[]
          }
        }
      }
    }
  }
  '/menus/{menuId}': {
    /** @description Get a menu */
    get: {
      parameters: {
        path: {
          /** @description The menu's id */
          menuId: number
        }
      }
      responses: {
        /** @description Default Response */
        200: {
          content: {
            'application/json': {
              /** @description The menu's name */
              readonly name: string
              /** @description The menu's description */
              readonly description?: string
              readonly diets: {
                /** @description The diet's constraint name */
                name: string
                /** @description The diet's constraint Id */
                id: number
              }[]
              readonly dishes: {
                /** @description The dish's id */
                id: number
                /** @description The dish's description */
                description?: string
                /** @description The ingredient's price */
                price: number
                /** @description The dish's name */
                name: string
                ingredients: {
                  /** @description The ingredient's id */
                  id: number
                  /** @description The ingredient's name */
                  name: string
                  /** @description The ingredient's description */
                  description?: string
                  /** @description The ingredient's price */
                  price: number
                }[]
              }[]
            }
          }
        }
      }
    }
  }
  '/menus/{menuId}/dish': {
    /** @description Create a dish */
    post: {
      parameters: {
        path: {
          /** @description The menu's id */
          menuId: number
        }
      }
      requestBody: {
        content: {
          'application/json': {
            /** @description The menu's name */
            readonly name: string
            /** @description The menu's description */
            readonly description?: string
            readonly ingredients: {
              /** @description The ingredient's id */
              id: number
              /** @description The ingredient's quantity */
              quantity?: number
              /** @description The ingredient's unit price */
              unitPrice?: number
            }[]
          }
        }
      }
      responses: {
        /** @description Default Response */
        200: {
          content: {
            'application/json': {
              /** @description The dish's Id */
              readonly id: number
            }
          }
        }
      }
    }
  }
  '/menus/{menuId}/choose': {
    /** @description Choose a menu for an event */
    put: {
      parameters: {
        path: {
          /** @description Menu's id that the user want to choose */
          menuId: number
        }
      }
      requestBody?: {
        content: {
          'application/json': Record<string, never>
        }
      }
      responses: {
        /** @description Default Response */
        200: {
          content: never
        }
      }
    }
  }
  '/menus/{menuId}/delete': {
    /** @description Delete a menu */
    delete: {
      parameters: {
        path: {
          /** @description The menu's id */
          menuId: number
        }
      }
      responses: {
        /** @description Default Response */
        200: {
          content: never
        }
      }
    }
  }
  '/users/register': {
    /** @description Create a user */
    post: {
      requestBody: {
        content: {
          'application/json': {
            /**
             * Format: email
             * @description The user's email
             */
            readonly email: string
            /** @description The user's name */
            readonly firstname: string
            /** @description The user's last name */
            readonly lastname: string
            /** @description The user's password */
            readonly password: string
          }
        }
      }
      responses: {
        /** @description Default Response */
        200: {
          content: {
            'application/json': {
              /** @description The user's id */
              readonly id: number
            }
          }
        }
      }
    }
  }
  '/users/connect': {
    /** @description Connect User */
    post: {
      requestBody: {
        content: {
          'application/json': {
            /**
             * Format: email
             * @description The user's email
             */
            readonly email: string
            /** @description The user's password */
            readonly password: string
          }
        }
      }
      responses: {
        /** @description Default Response */
        200: {
          content: {
            'application/json': {
              /** @description The user's id */
              readonly id: number
              /** @description The user's token */
              readonly token: string
            }
          }
        }
      }
    }
  }
}

export type webhooks = Record<string, never>

export interface components {
  schemas: {}
  responses: never
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}

export type $defs = Record<string, never>

export type external = Record<string, never>

export type operations = Record<string, never>
