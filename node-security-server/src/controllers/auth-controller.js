import * as userValidator from '../validators/user-registration-validation-schema.js';
import * as userService from '../services/user-service.js';
import { ApiError } from '../exceptions/api-error.js';

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