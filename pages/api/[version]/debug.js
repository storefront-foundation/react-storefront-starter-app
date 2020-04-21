export default function debug(req, res) {
  const host = req.headers['host']

  res.json(req.headers)
}
