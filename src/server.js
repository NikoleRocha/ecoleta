const express = require("express")
const server = express()

const db = require("./database/db")

//configuração da pasta public

server.use(express.static("public"))

server.use(express.urlencoded({
  extended: true
}))

//template engine

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

//req requisição
//res resposta

server.get("/", (req, res) => {
  return res.render("index.html", { title: "" })
})

server.get("/create-point", (req, res) => {

  console.log(req.query)
  return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

  const query = `
    INSERT INTO places (
      image,
      name,
      adress,
      adress2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
    `

  const values = [
    req.body.image,
    req.body.name,
    req.body.adress,
    req.body.adress2,
    req.body.state,
    req.body.city,
    req.body.items

  ]

  function afterInsertData(err) {
    if (err) {
      console.log(err)
      return res.send("Erro no cadastro!")
    }
    console.log("Cadastrado com sucesso")
    console.log(this)

    return res.render("create-point.html", { saved: true })

  }
  db.run(query, values, afterInsertData)

})

server.get("/search-results", (req, res) => {

  const search = req.query.search

  if (search == "") {
    return res.render("search-results.html", { total: 0 })
  }

  //pegar os dados do banco de dados
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err)
    }

    const total = rows.length

    return res.render('search-results.html', { places: rows, total })
  })
})

server.listen(3000)


