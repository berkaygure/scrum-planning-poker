import Passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import user from './user';

//Called during login/sign up.
Passport.use(new LocalStrategy((user as any).authenticate()));

//called while after logging in / signing up to set user details in req.user
Passport.serializeUser((user as any).serializeUser());
