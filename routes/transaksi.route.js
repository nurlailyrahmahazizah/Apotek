// manggil si express
const express = require(`express`)

// buat object dari express
const app = express()

// izin membaca data dari request.body
app.use(express.urlencoded({extended:true}))

// panggil controller transaksi
const transaksiController = require(`../controllers/transaksi.controller`)

// panggil middleware untuk authorization
const authorization = require(`../middleware/authorization`)

// buat route untuk menampilkan form transaksi
app.get(`/add`, authorization.cekUser, transaksiController.showFormTransaksi)

// route untuk menyimpan data transaksi
app.post(`/add`, authorization.cekUser, transaksiController.simpanTransaksi)

// route untuk menampilkan data transaksi 
app.get(`/`, authorization.cekUser, transaksiController.showTransaksi)

/** route utk menghapus data transaksi */
app.get(`/:id`, authorization.cekUser, transaksiController.hapusTransaksi)

// export object app
module.exports = app