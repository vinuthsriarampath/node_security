import { User } from "../models/user-model.js"

// Find user by email
export const findByEmail = async (email) => {
    return User.findOne({ email });
  };
  
  // Find by provider
  export const findByProvider = async (provider, providerId) => {
    return User.findOne({ 'providers.provider': provider, 'providers.providerId': providerId });
  };
  
  // Create user
  export const create = async (userData) => {
    const user = new User(userData);
    return user.save();
  };
  
  // Add provider to user
  export const addProvider = async (userId, provider, providerId) => {
    return User.updateOne({ _id: userId }, { $push: { providers: { provider, providerId } } });
  };
  
  // Update user
  export const update = async (userId, updates) => {
    return User.updateOne({ _id: userId }, updates);
  };
  
  // Find user by id
  export const findById = async (userId) => {
    return User.findById(userId);
  }