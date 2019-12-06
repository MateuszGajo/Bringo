const UserModel = require("../models/user.model");
const SessionModel = require("../models/session.model");
const {
  verifyLogging,
  createSession,
  createUser,
  updateSession,
  updateSessionStatistics
} = require("../helper");

const resolvers = {
  Query: {
    login: (parent, args) => {
      const { email, password } = args;

      return UserModel.findOne({ email })
        .then(user => {
          return verifyLogging(user, email, password);
        })
        .catch(err => {
          return {
            connectionError: "Błąd łącznia z bazą danych. Spróbuj później"
          };
        });
    },

    getWords: (parent, args) => {
      return createSession(args);
    },

    getSession: (parent, args) => {
      const { userId } = args;

      return SessionModel.findOne({ userId })
        .then(session => {
          let words = [];
          let sessionInfo;

          if (session) {
            words = session.words;
            sessionInfo = session.sessionInfo;
          }

          return {
            words,
            sessionInfo
          };
        })
        .catch(err => new Error("can't  find a session"));
    },

    getRankings: (parent, args) => {
      return UserModel.find({}, ["firstName", "lastName", "score", "userId"], {
        sort: { score: -1 }
      })
        .then(resp => resp)
        .catch(err => new Error("can't find a users"));
    }
  },

  Mutation: {
    createUser: (parent, args) => {
      return UserModel.findOne({ email: args.user.email })
        .then(user => createUser(user, args))
        .catch(err => new Error("can't connect with database"));
    },

    updateSession: (parent, args) => {
      return updateSession(args);
    },

    removeSession: (parent, args) => {
      const { userId } = args;

      return SessionModel.deleteOne({ userId })
        .then(resp => {
          return { isDeleted: true };
        })
        .catch(err => new Error("can't delete document"));
    },

    updateSessionStatistics: (parent, args) => {
      return updateSessionStatistics(args);
    },

    updateUser: (parents, args) => {
      const { userId, score } = args;

      return UserModel.findOne({ _id: userId })
        .then(user => {
          user.updateOne({ $inc: { score } }, (err, res) => {
            if (err) new Error("can't update user");
          });
          return {
            isUpdated: true
          };
        })
        .catch(err => new Error("can't update user"));
    }
  }
};

module.exports = resolvers;
