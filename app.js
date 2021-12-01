const express  = require('express')
const cors = require("cors")
const app  = express()
const db = require('./models')

app.use(cors());

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to library" });
});

require("./routes/bookroute")(app)
require("./routes/authorroute")(app)
require("./routes/genreroute")(app)
require("./routes/book_author_route")(app)

app.listen(5000, async() => {
  console.log('server started on http://localhost:5000')
  await db.sequelize.sync()
  console.log('Database Authenticated');
})
