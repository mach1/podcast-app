import fetch from 'node-fetch'
import express from 'express'

const app = express()
const PORT = 3000

app.use(express.static('./static'))

app.get('/search', async (req, res) => {
  const { term } = req.query
  const result = await fetch(`https://itunes.apple.com/search?term=${term}`)

  const json = await result.json()

  res.json({ status: 'ok', json }).end()
})

app.listen(PORT)

console.log(`Running on http://localhost:${PORT}`)