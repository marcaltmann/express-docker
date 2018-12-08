const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = 8080;
const HOST = '0.0.0.0';

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI || 'mongodb://mongo/test');
const db = mongoose.connection;

let Kitten;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  var kittySchema = new mongoose.Schema({
    name: String,
  });
  Kitten = mongoose.model('Kitten', kittySchema);
  var silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'

  silence.save(function (err, silence) {
    if (err) {
      return console.error(err);
    }
  });
});

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', (req, res) => {
  Kitten.find(function (err, kittens) {
    if (err) {
      return console.error(err)
    };
    const firstKitten = kittens[0];
    const name = firstKitten.name;
    const length = kittens.length;
    res.render('index', { title: `Hey ${name}`, message: `${length} mal gestartet!` });
  });
});

app.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${PORT}`));
