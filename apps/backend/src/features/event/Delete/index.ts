import { Featured } from '../../../fastify'

import { Schema } from './schema'
import { Handler } from './handler'

export default Featured('event.delete', Schema, Handler)
