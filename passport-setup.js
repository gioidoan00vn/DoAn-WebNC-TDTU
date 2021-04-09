const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const flash = require("connect-flash");


passport.serializeUser(function(user,done){

passport.deserializeUser(function(user,done){
  done(null,user)
})
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback:true
  },
  function(request, accessToken, refreshToken, profile, done) {
    //console.log(profile)
    if (profile._json.hd !== 'student.tdtu.edu.vn'){
      return done(null, false);
    }
  }
));

passport.use(new LocalStrategy(
  function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));