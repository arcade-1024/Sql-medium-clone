const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../model/userModel");

module.exports = function (passport) {
    passport.use(new LocalStrategy({usernameField: "email"}, (email, password, done) => {
        User.findOne({
            where: {
                email: email,
            }
        }).then((user) => {
            if (!user) {
                return done(null, false, {message: "That email is not registered"});
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    console.log(isMatch)
                    return done(null, user);
                } else {
                    return done(null, false, {message: "Password incorrect"});
                }
            });
        });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findByPk(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user, null);
            }
        });
    });
};
