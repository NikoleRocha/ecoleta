//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que irá fazer operações no banco de dados

const db = new sqlite3.Database("./src/database/database.db")

db.serialize(() => {
  //criar uma tabela
  //   db.run(`
  //   CREATE TABLE IF NOT EXISTS places (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     name TEXT,
  //     image TEXT,
  //     adress TEXT,
  //     adress2 TEXT,
  //     state TEXT,
  //     city TEXT,
  //     items TEXT
  //   );
  //   `)

  //   const query = `
  //   INSERT INTO places (
  //     name,
  //     image,
  //     adress,
  //     adress2,
  //     state,
  //     city,
  //     items
  //   ) VALUES (?,?,?,?,?,?,?);
  //   `

  //   const values = [
  //     "Colectoria",
  //     "http://localhost:3000/assets/1629930403-290w_1recycle1.png",
  //     "Ana Vitoria Santos, Jardim Froes",
  //     "N°121",
  //     "Santa Catarina",
  //     "Rio do Sul",
  //     "Resíduos Eletrônicos, Lâmpadas"
  //   ]

  //   function afterInsertData(err) {
  //     if (err) {
  //       return console.log(err)
  //     }
  //     console.log("Cadastrado com sucesso")
  //     console.log(this)

  //   }
  //   db.run(query, values, afterInsertData)

  //   //   db.run(query, values, afterInsertData)

  // db.run(`DELETE FROM places WHERE id=?`, [5], function (err) {
  //   if (err) {
  //     return console.log(err)
  //   }
  //   console.log("Registro deletado com sucesso")
  // })

  //   db.all(`SELECT * FROM places`, function (err, rows) {
  //     if (err) {
  //       return console.log(err)
  //     }

  //     console.log("Aqui estão seus registros:")
  //     console.log(rows)

  //   })

})

module.exports = db