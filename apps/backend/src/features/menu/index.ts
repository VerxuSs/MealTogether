export * from './Choose'
export * from './Create'
export * from './Delete'
export * from './GetById'

import Choose from './Choose'
import Create from './Create'
import Delete from './Delete'
import GetById from './GetById'

const Menu = {
  Create,
  Choose,
  Delete,
  GetById,
}

export { Menu }
export default Menu
