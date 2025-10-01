import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import * as userRepo from '../repositories/user-repositories.js'
import { UserDto } from '../dtos/user-Dto.js';

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