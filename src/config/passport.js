const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/github/callback`,
  },
  (async (accessToken, refreshToken, profile, cb) => {
    // User.findOrCreate({ githubId: profile.id }, (err, user) => done(err, user));
    try {
      let user = await User.findOne({ githubId: profile.id });
      if (!user) {
        user = new User({
          githubId: profile.id,
          username: profile.username,
          avatarUrl: profile._json.avatar_url,
        });
      }

      await user.save();
      cb(null, user);
    } catch (e) {
      console.log(e);
      cb(e, null);
    }
  }),
));

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
  },
  (async (accessToken, refreshToken, profile, cb) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          googleId: profile.id,
          username: profile.displayName,
          avatarUrl: profile._json.picture,
        });
      }

      await user.save();
      cb(null, user);
    } catch (e) {
      console.log(e);
      cb(e, null);
    }
  }),
));

module.exports = passport;
