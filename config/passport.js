const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Account = require("../models/AccountModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/admin/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await Account.findOne({ email: email });

        if (!user) {
          user = new Account({
            email: email,
            fullName: profile.displayName,
            token: Date.now().toString(),
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await Account.findById(id);
  done(null, user);
});

module.exports = passport;
