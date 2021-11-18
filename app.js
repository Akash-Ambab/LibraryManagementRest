const express  = require('express')
const app  = express()
const { sequelize, Book } = require('./models')

app.use(express.json())

app.post('/books', async(req, res) => {
  const {
    bookName,
    description,
    authorName,
    genre,
    price,
    language,
    totalPages,
    rating,
    edition,
    publication,
    released_on
  } = req.body

  try {
    const user = await Book.create({
      bookName,
      description,
      authorName,
      genre,
      price,
      language,
      totalPages,
      rating,
      edition,
      publication,
      released_on
    })

    return res.json(user)
  }
  catch(err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.listen(5000, async() => {
  console.log('server started on http://localhost:5000')
  await sequelize.authenticate()
  console.log('Database Authenticated');
})
