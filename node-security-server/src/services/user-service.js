import { UserDto } from '../dtos/user-Dto.js';
import * as userRepo from '../repositories/user-repositories.js'

export const getUserById = async (userId) => {
    const user =await  userRepo.findById(userId);
    return new UserDto(user);
}