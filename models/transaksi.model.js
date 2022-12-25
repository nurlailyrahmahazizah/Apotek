/** model file for obat contains CRUD process */

/** call object 'connection'
 * from config.js
 */
 const connection = require(`../config`)

 /** set table name to manage in this model file */
 const tableName = `transaksi`
 
 /** ----------------------------------------------------------------------- 
  * create and export 
  * function to get data from table */
 exports.findAll = () => {
     return new Promise((resolve, rejected) => {
         /** define query to get all data */
         let query = `select transaksi.*,customer.nama_customer,
         apoteker.nama_apoteker from ${tableName} 
         join apoteker on apoteker.id = transaksi.id_apoteker 
         join customer on customer.id = transaksi.id_customer`
 
         /** show query as log in console */
         console.log(`Run: ${query}`)
 
         /** run query */
         connection.query(query, (error, result) => {
             if (error) {
                 /** reject with error message */
                 rejected(error)
             }
 
             /** return resolve with data */
             resolve(result)
         })
     })
 }
 
 /** ----------------------------------------------------------------------- 
  * create and export 
  * function to get data from table with specific criteria */
 exports.findByCriteria = (parameter) => {
     return new Promise((resolve, rejected) => {
         
         let params = Object
             .keys(parameter)
             .map(key => `${key}="${parameter[key]}"`)
             .join(" and ")
         /** result:
          * params = ' nama_obat="Obat 1" and harga="1000" '
          * ------------------------------------------------
          */
 
         /** define query to get all data */
         let query = `select * from ${tableName} where ${params}`
 
         /** show query as log in console */
         console.log(`Run: ${query}`)
 
         /** run query */
         connection.query(query, (error, result) => {
             if (error) {
                 /** reject with error message */
                 rejected(error)
             }
 
             /** return resolve with data */
             resolve(result)
         })
     })
 }
 
 /** ----------------------------------------------------------------------- 
  * create and export 
  * function to insert new data to table */
 exports.add = (dataObject) => {
     return new Promise((resolve, rejected) => {
         
         let columns = Object.keys(dataObject).join()
         
         let values = Object.values(dataObject)
             .map(value => `"${value}"`).join()
         
         let query = `insert into ${tableName} (${columns}) values (${values})`
 
         /** show query as log in console */
         console.log(`Run: ${query}`)
 
         /** run query */
         connection.query(query, (error, result) => {
             if (error) {
                 /** reject with error message */
                 rejected(error.message)
             }
 
             /** return resolve with data */
             resolve(result)
         })
     })
 }
 
 /** ----------------------------------------------------------------------- 
  * create and export 
  * function to update data of table */
 exports.update = (dataObject, parameter) => {
     return new Promise((resolve, rejected) => {
         
         let updateData = Object
             .keys(dataObject)
             .map(key => `${key}="${dataObject[key]}"`)
             .join()
         
         let params = Object
             .keys(parameter)
             .map(key => `${key}="${parameter[key]}"`)
             .join(" and ")
         
         let query = `update ${tableName} set ${updateData} where ${params}`
 
         /** show query as log in console */
         console.log(`Run: ${query}`)
 
         /** run query */
         connection.query(query, (error, result) => {
             if (error) {
                 /** reject with error message */
                 rejected(error.message)
             }
 
             /** return resolve with data */
             resolve(result)
         })
     })
 }
//    function to delete data of table */
 exports.delete = (parameter) => {
     return new Promise((resolve, rejected) => {
         
         let params = Object
             .keys(parameter)
             .map(key => `${key}="${parameter[key]}"`)
             .join(" and ")
         
         /** create query for delete */
         let query = `delete from ${tableName} where ${params}`
 
         /** show query as log in console */
         console.log(`Run: ${query}`)
 
         /** run query */
         connection.query(query, (error, result) => {
             if (error) {
                 /** reject with error message */
                 rejected(error.message)
             }
 
             /** return resolve with data */
             resolve(result)
         })
     })
 }
 