const passport = require("passport");

class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    userLogout = async (req, res) => {
        req.logOut();
        res.send({message: "Log out successful"});
    };
    userLogin = async (req, res) => {
        try {
            const user = req.user
            if (!user) throw "Not Authenticated"
            else
                res.send({
                    message: "Login Successfully",
                    user: user
                })
        } catch (e) {
            res.status(404).send(e)
        }
    }
    passportAuthenticate = (req, res, next) => {
        passport.authenticate("local")(req, res, next);
    };
    initializeAuthRouter = () => {
        return {
            rootRoute: "/api/users",
            routes: [
                {
                    route: "/login",
                    method: "POST",
                    middleware: [this.passportAuthenticate],
                    function: this.userLogin,
                },
                {
                    route: "/logout",
                    method: "GET",
                    middleware: [],
                    function: this.userLogout,
                },
            ],
        };
    };
}

module.exports = AuthController