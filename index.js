const express = require('express');
const app = express();

const PORT = 8080;
const HOST = '0.0.0.0';

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

app.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${PORT}`));
