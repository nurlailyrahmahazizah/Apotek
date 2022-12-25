// panggil model customer
const { request, response } = require("express")
const customerModel = require(`../models/customer.model`)

// request -> melihat data customer 
// response -> menampilkan data customer melalui view
exports.showDataCustomer = async (request, response) => {
    try {
        // ambil data customer menggunakan model
        let dataCustomer = await customerModel.ambilDataCustomer()
        // passing ke view
        let sendData = {
            page: `customer`,
            data: dataCustomer,
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
exports.showTambahCustomer = async(request, response) => {
    try {
        // prepare data yang akan di passing ke view
        let sendData = {
            nama_customer : ``,
            alamat : ``,
            telepon : ``,
            page : `form-customer`,
            targetRoute : `/pelanggan/add`,
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
            nama_customer : request.body.nama_customer,
            alamat : request.body.alamat,
            telepon : request.body.telepon
        }
        // eksekusi tambah data
        await customerModel.tambahCustomer(newData)
        // dialihkan ke tampilan data pelanggan
        return response.redirect(`/pelanggan`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi untuk menampilkan data customer yg akan diubah
exports.showEditCustomer = async (request, response) => {
    try {
        // mendapatkan id dari customer yang akan diubah
        let id = request.params.id

        // menampung id kedalam object 
        let parameter = {
            id: id
        }

        // ambil data sesuai parameteer
        let customer = await customerModel.ambilDataDenganParameter(parameter)

        // prepare data yg akan ditampilkan view
        let sendData = {
            nama_customer: customer[0].nama_customer,
            alamat: customer[0].alamat,
            telepon: customer[0].telepon,
            page:`form-customer`,
            targetRoute: `/pelanggan/edit/${id}`,
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
            nama_customer: request.body.nama_customer,
            alamat: request.body.alamat,
            telepon: request.body.telepon
        }

        // eksekusi perubahan data nya
        await customerModel.ubahCustomer(perubahan, parameter)

        // direct ke tampilan data customer
        return response.redirect(`/pelanggan`)
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

        await customerModel.delete(parameter)

        return response.redirect(`/pelanggan`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}