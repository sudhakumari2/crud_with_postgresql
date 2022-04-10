const sequelize = require('sequelize')
const express = require('express');
const port = 3000
const app = express()
const db = require('./connection/database')
const router = require('./routes/router')

app.use(express.json());
app.use('/', router)

// pool.authenticate().then(() => {
//     console.log('Database connected...');
// }).catch(err => {
//     console.log('Error: ' + err);
// })

db.sequelize.sync().then(() => {
    app.listen(port, (err) => {
        if (err) {
            throw err
        } else {
            console.log(`your app is running on PORT : ${port}`)
        }
    })
}).catch(err => console.log("Error: " + err));
// app.listen(port, () => {
//     console.log(`App running on port ${port}.`)
//   })

