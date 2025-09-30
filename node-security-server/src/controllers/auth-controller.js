import * as userValidator from '../validators/user-registration-validation-schema.js';
import * as userService from '../services/user-service.js';
import { ApiError } from '../exceptions/api-error.js';
import passport from 'passport';
import { UserDto } from '../dtos/user-Dto.js';

export const register = async (req,res,next) => {
    try {
        const { error } = userValidator.userRegistrationSchema.validate(req.body);
        if (error) throw new ApiError(400, error.details[0].message);

        const userDto = await userService.register(req.body);
        res.status(201).json(userDto);

    } catch (error) {
        next(error)
    }
}

export const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: info?.message || 'Unauthorized' });
        req.login(user, { session: false }, (loginErr) => {
            if (loginErr) return next(loginErr);
            return res.json(new UserDto(user));
            
        });
    })(req, res, next);
}