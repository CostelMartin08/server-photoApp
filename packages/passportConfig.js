const User = require("../schema/userSchema");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    passport.use(
        new localStrategy(async (username, password, done) => {
            try {
                const user = await User.findOne({ username: username });
                if (!user) return done(null, false);
                const result = await bcrypt.compare(password, user.password);
                if (result === true) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                throw error;
            }
        }));


    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    passport.deserializeUser(async (id, cb) => {
        try {
            const user = await User.findOne({ _id: id });
            const userInformation = {
                username: user.username,
            };
            cb(null, userInformation);
        } catch (error) {
            cb(error, null);
        }
    });

};