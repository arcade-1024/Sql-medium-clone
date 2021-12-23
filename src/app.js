const express = require("express");
const app = express();
const router = express.Router();
app.use(express.json());
const postModel = require('./model/postModel')
const userModel = require('./model/userModel')
const commentModel = require('./model/commentModel')
const db = require('./config/initalizeDb')

postModel.belongsTo(userModel, {constraints: true, onDelete: 'CASCADE'})
userModel.hasMany(postModel)
postModel.hasMany(commentModel)
commentModel.belongsTo(userModel, {constraints: true, onDelete: 'CASCADE'})

db.sync().then(() => console.log("DB Synced !!")).catch((e) => console.log(e))


require("dotenv").config();


const passport = require("passport");
const session = require("express-session");
require("./config/passport")(passport);

app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

const User = require('./user');
const Post = require('./post');
const Auth = require('./auth');
const Comment = require('./comment');
const user = new User()
const {controller: userController} = user
const {rootRoute: userRootRoute, routes: userRoutes} = userController.initializeRouter()

const post = new Post();
const {controller: postController} = post
const {rootRoute: postRootRoute, routes: postRoutes} = postController.initializeRouter()

const auth = new Auth();
const {controller: authController} = auth;
const {rootRoute: authRootRoute, routes: authRoutes} = authController.initializeAuthRouter()

const comment = new Comment();
const {controller: commentController} = comment;
const {rootRoute: commentRootRoute, routes: commentRoutes} = commentController.initializeRouter();

const createRoutes = (rootRoute, route) =>
    router[route.method.toLowerCase()](
        `${rootRoute}${route.route}`,
        ...[...route.middleware, route.function]
    );

userRoutes.forEach((route) => createRoutes(userRootRoute, route));
postRoutes.forEach((route) => createRoutes(postRootRoute, route));
authRoutes.forEach((route) => createRoutes(authRootRoute, route));
commentRoutes.forEach((route) => createRoutes(commentRootRoute, route))

app.use(router);

const port = process.env.PORT;

app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
})