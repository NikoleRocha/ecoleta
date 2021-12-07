const express = require("express")
const server = express()

//configuração da pasta public

server.use(express.static("public"))

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
  return res.render("create-point.html")
})

server.get("/search-results", (req, res) => {
  return res.render("search-results.html")
})



server.listen(3000)