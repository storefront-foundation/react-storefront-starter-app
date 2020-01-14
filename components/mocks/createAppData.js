import createMenu from './createMenu'

export default function createAppData() {
  return Promise.resolve({ menu: createMenu() })
}
