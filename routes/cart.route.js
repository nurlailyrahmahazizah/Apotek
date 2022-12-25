// panggil express
const express = require(`express`)

// bikin object express
const app = express()

// minta izin untuk membaca data
app.use(express.urlencoded({extended:true}))

// panggil controller transaksi
const transaksiController = require(`../controllers/transaksi.controller`)

// memanggil authorization dari middleware
const authorization = require(`../middleware/authorization`)

// define route untuk menambah isi cart 
app.post(`/`, authorization.cekUser, transaksiController.addToCart)

// define route untuk menghapus item pd cart
app.get(`/:id`, authorization.cekUser, transaksiController.hapusCart)

// export object app
module.exports = app