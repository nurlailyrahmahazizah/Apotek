// load model apoteker
const apotekerModel = require(`../models/apoteker.model`)

// load crypt
const crypt = require(`../crypt`)
const { request, response } = require("../routes/auth.route")

// fungsi untuk menampilkan halaman login
exports.showLogin = (request,response) => {
    try {
        return response.render(`../views/pages/login`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
// fungsi untuk proses authentication
exports.authentication = async (request,response) => {
    try {
        // tampung data username dan password yg diisikan
        let username = request.body.username
        let password = request.body.password

        // cek kecocokan username nya dulu
        let result = await apotekerModel.ambilDataDenganParameter({username: username})

        // cek keberadaaan data apoteker
        if(result.length > 0){
            // cek dulu kecocokan password nya
            if (password === crypt.deskripsi(result[0].password)) { 
                // (=) adalah assignment
                // (==) adalah compare value
                // (===) adalah compare value and type
                
                // login berhasil
                // menyimpan data user ke session
                request.session.dataUser = result[0]
                // `dataUser` = label of session

                // definisi cart di session
                request.session.cart = []

                return response.redirect(`/obat`)
            } else {
                // login gagal
                return response.redirect(`/auth`)
            }
        } else {
            // data apoteekr tidak ada
            return response.redirect(`/auth`)
        }
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// membuat function untuk logout
exports.logout = async (request,response) => {
    try {
        // menghapus data user dari session
        request.session.dataUser = undefined
        // kembali ke halaman login
        return response.redirect(`/auth`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}