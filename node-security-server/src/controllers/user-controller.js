import * as userService from '../services/user-service.js';

export const getCurrentUser =async (req,res)=>{
    const user = await userService.getUserById(req.userId);
    res.json(user);
}