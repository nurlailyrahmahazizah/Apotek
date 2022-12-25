// panggil model customer
const { request, response } = require("express")
const apotekerModel = require(`../models/apoteker.model`)
// memanggil file crypt.js
const crypt = require(`../crypt`)

// request -> melihat data customer 
// response -> menampilkan data customer melalui view
exports.showDataApoteker = async (request, response) => {
    try {
        // ambil data customer menggunakan model
        let dataApoteker = await apotekerModel.ambilDataApoteker()
        // passing ke view
        let sendData = {
            page: `apoteker`,
            data: dataApoteker,
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi untuk menampilkan form customer untuk tambah data
exports.showTambahApoteker = async(request, response) => {
    try {
        // prepare data yang akan di passing ke view
        let sendData = {
            nama_apoteker : ``,
            username: ``,
            password: ``,
            page : `form-apoteker`,
            targetRoute : `/apoteker/add`,
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi untuk memproses data customer baru'
exports.prosesTambahData = async(request, response) => {
    try {
        // membaca data dari yg diisikan user
        let newData = {
            nama_apoteker : request.body.nama_apoteker,
            username : request.body.username,
            password : crypt.enkripsi(request.body.password)
        }
        // eksekusi tambah data
        await apotekerModel.tambahApoteker(newData)
        // dialihkan ke tampilan data pelanggan
        return response.redirect(`/apoteker`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi untuk menampilkan data customer yg akan diubah
exports.showEditApoteker = async (request, response) => {
    try {
        // mendapatkan id dari customer yang akan diubah
        let id = request.params.id

        // menampung id kedalam object 
        let parameter = {
            id: id
        }

        // ambil data sesuai parameteer
        let apoteker = await apotekerModel.ambilDataDenganParameter(parameter)

        // prepare data yg akan ditampilkan view
        let sendData = {
            nama_apoteker: apoteker[0].nama_apoteker,
            username: apoteker[0].username,
            password: apoteker[0].password,
            page:`form-apoteker`,
            targetRoute: `/apoteker/edit/${id}`,
            deskripsi: crypt.deskripsi,
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi untuk memproses data yg diedit
exports.prosesUbahData = async (request, response) => {
    try {
        // mendapatkan id yg diubah
        let id = request.params.id
        
        // membungkus id ke bentuk object
        let parameter = {
            id: id
        }

        // menampung perubahan data ke dalam object
        let perubahan = {
            nama_apoteker: request.body.nama_apoteker,
            username: request.body.username,
            password: crypt.enkripsi(request.body.password)
        }

        // eksekusi perubahan data nya
        await apotekerModel.ubahApoteker(perubahan, parameter)

        // direct ke tampilan data customer
        return response.redirect(`/apoteker`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.processDelete = async (request, response) => {
    try {
        let id = request.params.id

        let parameter = {
            id: id 
        }

        await apotekerModel.delete(parameter)

        return response.redirect(`/apoteker`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}