const express  = require('express')
const cors = require("cors")
const app  = express()
const db = require('./models')

app.use(cors());

app.use(express.json())

app.use(express.urlencoded({ extended: true }));
// db.sequelize.sync().then(() => console.log("DB Drop"))

app.get("/", (req, res) => {
  res.json({ message: "Welcome to library" });
});

require("./routes/bookroute")(app)
require("./routes/authorroute")(app)
require("./routes/genreroute")(app)
// app.post('/books', async(req, res) => {
//   const {
//     bookName,
//     description,
//     authorName,
//     genre,
//     price,
//     language,
//     totalPages,
//     rating,
//     edition,
//     publication,
//     released_on
//   } = req.body

//   try {
//     const user = await Book.create({
//       bookName,
//       description,
//       authorName,
//       genre,
//       price,
//       language,
//       totalPages,
//       rating,
//       edition,
//       publication,
//       released_on
//     })

//     return res.json(user)
//   }
//   catch(err) {
//     console.log(err)
//     return res.status(500).json(err)
//   }
// })

app.listen(5000, async() => {
  console.log('server started on http://localhost:5000')
  await db.sequelize.sync()
  console.log('Database Authenticated');
})
