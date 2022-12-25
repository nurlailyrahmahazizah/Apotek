// panggil si express
const express = require(`express`)

// buat object nama app
const app = express()

// minta izin untuk membaca data yang dikirimkan melalui form
app.use(express.urlencoded({extended:true}))

// panggil contoller customer
const apotekerController = require(`../controllers/apoteker.controller`)

// panggil authorization
const authorization = require(`../middleware/authorization`)

// define route  untuk akses data customer 
app.get(`/`, authorization.cekUser, apotekerController.showDataApoteker)

// define route untuk nampilin form customer
app.get(`/add`, authorization.cekUser, apotekerController.showTambahApoteker)

// define route untuk memproses tambah data customer
app.post(`/add`, authorization.cekUser, apotekerController.prosesTambahData)

// define route untuk menampilkan form-customer dengan dgn data yg akan diubah
app.get(`/edit/:id`, authorization.cekUser, apotekerController.showEditApoteker)

// define route untuk memproses perubahan data 
app.post(`/edit/:id`, authorization.cekUser, apotekerController.prosesUbahData)

// define route untuk meproses penghapusan data
app.get(`/delete/:id`, authorization.cekUser, apotekerController.processDelete)

// export object app
module.exports = app
