// function untuk CRUD

// load dulu connection dari config
const connection = require(`../config`)

const namaTable = `apoteker`

// funtion untuk ambil data customer
exports.ambilDataApoteker = () => {
    return new Promise((resolve,reject) => {
        // bikin query untk ambil data
        let query = `select*from apoteker`
        
        // dijalankan query nya
        connection.query(query, (error,result) =>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

// function untuk ambil data berdasarkan parameter khusus
exports.ambilDataDenganParameter = (parameter) => {
    return new Promise((resolve,reject) => {
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(` and `)

        let query = `select*from apoteker where ${params}`
        // dijalankan query nya
        connection.query(query, (error,result) =>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

// membuat funtion untuk menambah data customer baru
exports.tambahApoteker = (apoteker) => {
    return new Promise((resolve, reject) => {
        // ambil key dari object customer
        let key = Object
            .keys(apoteker) // [key1, key2, dst]
            .join() // "key1, key2, dst"  

        // ambil value dari object customer
        let value = Object
            .keys(apoteker) // [key1, key2, dst]
            .map(item => `"${apoteker[item]}"`) // ["value1", "value2", dst]
            .join() // `"value1", "value2", dst`
        
        let query = `insert into apoteker (${key}) values (${value})`

            // dijalankan query nya
        connection.query(query, (error,result) =>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

// buat fungsi untuk update data customer
exports.ubahApoteker = (data, parameter) => {
    return new Promise((resolve,reject) => {
        // menyusun string untuk query bagian perubahan data
        let perubahanData = Object
            .keys(data)
            .map(item => `${item}="${data[item]}"`)
            .join() // mengkonversi array menjadi string
        
        // menyusun string untuk query bagian penentu data yang akan diubah
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(` and `)

        // menyusun query
        let query = `update apoteker set ${perubahanData} where ${params}`

        // dijalankan query nya
        connection.query(query, (error,result) =>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

// buat fungsi untuk menghapus data
exports.delete = (parameter) => {
    return new Promise((resolve, rejected) => {
        
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(" and ")
        
        let query = `delete from apoteker where ${params}`

        console.log(`Run: ${query}`)

        connection.query(query, (error, result) => {
            if (error) {
                rejected(error.message)
            }
            resolve(result)
        })
    })
}