import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as TwitterStrategy } from "passport-twitter";
import User from "../model/user.model.js";

export default function configurePassport() {
  
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        avatar: profile.photos[0].value
      });
    }
    return done(null, user);
  }));

//   passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "/auth/facebook/callback",
//     profileFields: ["id", "displayName", "emails", "photos"]
//   }, async (accessToken, refreshToken, profile, done) => {
//     let user = await User.findOne({ facebookId: profile.id });
//     if (!user) {
//       user = await User.create({
//         facebookId: profile.id,
//         email: profile.emails[0].value,
//         name: profile.displayName,
//         avatar: profile.photos[0].value
//       });
//     }
//     return done(null, user);
//   }));

  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CLIENT_ID,
    consumerSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: "/auth/twitter/callback"
  }, async (token, tokenSecret, profile, done) => {
    let user = await User.findOne({ twitterId: profile.id });
    if (!user) {
      user = await User.create({
        twitterId: profile.id,
        name: profile.displayName,
        avatar: profile.photos[0]?.value
      });
    }
    return done(null, user);
  }));
}
