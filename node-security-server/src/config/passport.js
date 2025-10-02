import dotenv from 'dotenv';
dotenv.config()
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import * as authService from '../services/auth-service.js';
import * as userRepo from '../repositories/user-repositories.js'
import { UserDto } from '../dtos/user-Dto.js';
import GoogleStrategy from 'passport-google-oauth20';

//No need the becuase here we don't use sessions following is only required if we are using sessions
// Serialize user to session (store ID) 
// passport.serializeUser((user, done) => done(null, user.id));

// Deserialize user from session (fetch by ID)
// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await userRepo.findById(id); 
//         done(null, new UserDto(user));
//     } catch (err) {
//         done(err);
//     }
// });

// Local strategy (email/password)
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await userRepo.findByEmail(email);
        if (!user || !user.password) return done(null, false, { message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: 'Invalid credentials' });

        done(null, new UserDto(user));
    } catch (err) {
        done(err);
    }
}));

// Google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        const user = await authService.handleSocialLogin('google', profile);
        done(null, user);
    } catch (err) {
        done(err);
    }
}));