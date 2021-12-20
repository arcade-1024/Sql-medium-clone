const express = require("express");
const app = express();
const router = express.Router();
app.use(express.json());
const db = require('./config/initalizeDb')

const User = require('./user');
const user = new User(db)
const {controller: userController} = user
const {rootRoute: userRootRoute, routes: userRoutes} = userController.initializeRouter()


const createRoutes = (rootRoute, route) =>
    router[route.method.toLowerCase()](
        `${rootRoute}${route.route}`,
        ...[...route.middleware, route.function]
    );


userRoutes.forEach((route) => createRoutes(userRootRoute, route));

app.use(router);
// const User = db.define('User', {
//     firstName: {
//         type: DataTypes.STRING
//     }, lastName: {
//         type: DataTypes.STRING
//     }
// });
//
// const addUser = async (firstName, lastName) => {
//     await User.create({
//         firstName: firstName,
//         lastName: lastName
//     });
// }
// (async () =>{
//     await addUser("rithick122", "jaluthria");
//     await addUser("rithick", "jaluthria");
// })();
//

const port = process.env.PORT;

app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
})

