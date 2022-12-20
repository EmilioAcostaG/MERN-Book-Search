const { AuthenticationError, ApolloError } = require("apollo-server-express");
const { saveBook } = require("../controllers/user-controller");

const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id })
      }

      throw new AuthenticationError('Must be logged in!')
    }
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const existingUser = await User.findOne({ email });

    if(!user) {
      throw new AuthenticationError('No user with that email was found');
    }

    const passwordMatch = await existingUser.isCorrectPassword(password);

    if(!passwordMatch) {
      throw new AuthenticationError('incorrect password')
    }
    
    const token = signToken(existingUser);
    return { token, existingUser };

    },

    addUser: async (parent, {username, email, passowrd }) => {

    },

    saveBook: async (parent, { userId, book }, context) => {

    },

    removeBook: async (parent, args, context) => {
      
    }
  }
};

module.exports = resolvers;