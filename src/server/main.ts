import express from 'express';
import fetch from 'node-fetch'
import path from 'path';
import { pagesRouter } from './routes/pages-router';
import { staticsRouter } from './routes/statics-router';
import * as config from './config';

console.log(`*******************************************`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`config: ${JSON.stringify(config, null, 2)}`);
console.log(`*******************************************`);

const app = express();
app.set('view engine', 'ejs');

app.get('/search', async (req, res) => {
  const { term } = req.query
  const result = await fetch(`https://itunes.apple.com/search?term=${term}`)

  const json = await result.json()

  res.json({ status: 'ok', json }).end()
})

app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
app.use(staticsRouter());
app.use(pagesRouter());

app.listen(config.SERVER_PORT, () => {
  console.log(`App listening on port ${config.SERVER_PORT}!`);
});
