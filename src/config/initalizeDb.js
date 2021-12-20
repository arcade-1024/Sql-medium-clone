const {Sequelize} = require('sequelize');
const db = new Sequelize('test', 'postgres', 'root', {
    host: "db", dialect: "postgres"
})
db.authenticate().then(() => console.log("Db connected !!!!")).catch((e) => console.log("error",e))

module.exports = db