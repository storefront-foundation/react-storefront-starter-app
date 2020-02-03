import getSubcategory from './s/[subcategoryId]'

export default async function search(req, res) {
  return getSubcategory(req, res)
}
