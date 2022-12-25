/** load library express */
const express = require(`express`)

// load library express-session
const session = require(`express-session`)

/** instance "app" object */
const app = express()

/** define port for the server */
const PORT = `8000`

/** set view engine to ejs */
app.set(`view engine`, `ejs`)

// session configurasi
app.use(session({
    secret:`sayang mama papa kakak pacar`,
    resave: false,
    saveUninitialized: false
}))

/** load routes (menentukan prefix define routes) */
const obat = require(`./routes/obat.route`)
const customer = require(`./routes/customer.route`)
const apoteker = require(`./routes/apoteker.route`)
const auth = require(`./routes/auth.route`)
const transaksi = require(`./routes/transaksi.route`)
const cart = require(`./routes/cart.route`)

/** define prefix for route  */
app.use(`/obat`, obat)
app.use(`/pelanggan`, customer)
app.use(`/apoteker`,apoteker)
app.use(`/auth`, auth)
app.use(`/transaksi`, transaksi)
app.use(`/cart`, cart)

/** running web server based on defined PORT */
app.listen(PORT, () => {
    console.log(`Server Apotek is running on port ${PORT}`);
})

// url => http://localhost:8000/pelanggan