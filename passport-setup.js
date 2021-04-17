const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const mongoose= require('mongoose');
const User= require('./models/User')


passport.serializeUser(function(user,done){
  done(null,user)
})

passport.deserializeUser( (id, done) => {
  User.findById(id, (err, user) => {
      done(err,user);
  });
});
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback:true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    console.log(profile)
    if (profile._json.hd !== 'student.tdtu.edu.vn'){
      return done(null, false);
    }
    const newUser= {
      googleID: profile.id,
      email:profile.emails[0].value,
      displayName:profile.displayName,
      firstName:profile.name.givenName,
      lastName:profile.name.familyName,
      image:profile.photos[0].value,
      
    }
    try {
      let user= await User.find({googleID:profile.id})
      if(user){
        user= await User.create(newUser)
        console.log('work')
        done(null,user)
      }
    } catch (err) {
      console.log(err)
    }
  }
));

// passport.use(new LocalStrategy(
//   function(email, password, done) {
//     User.findOne({ email: email }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));