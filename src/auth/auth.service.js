class AuthService {
    constructor(userModel) {
        this.userModel = userModel
    }
    ensureAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.send({ error: "please authenticate" });
    };
}

module.exports = AuthService