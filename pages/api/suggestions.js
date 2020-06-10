import { searchSuggestions } from 'react-storefront-connector'

export default async function searchSuggestionsPage(req, res) {
  const { q } = req.query
  res.json(await searchSuggestions(q, req, res))
}
