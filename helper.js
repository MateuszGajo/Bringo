const UserModel = require("./models/user.model");
const WordModel = require("./models/word.model");
const SessionModel = require("./models/session.model");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");

const verifyLogging = (user, email, password) => {
  if (user) {
    if (UserModel().comparePassword(password, user.password)) {
      const payload = {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        difficulty: user.difficulty
      };
      const token = jwt.sign(payload, secret, { expiresIn: "12h" });
      return {
        token
      };
    } else {
      return {
        passwordError: "Podane hasło jest błędne"
      };
    }
  } else {
    return {
      emailError: "Użytkownik nie istnieje"
    };
  }
};

const createSession = args => {
  const { level, number, userId } = args;

  return WordModel.findOne({ level }).then(words => {
    const randomNumbers = [];
    const wordsArray = [];

    while (randomNumbers.length < number) {
      const r = Math.floor(Math.random() * 2);
      if (randomNumbers.indexOf(r) === -1) randomNumbers.push(r);
    }

    for (i = 0; i < randomNumbers.length; i++) {
      wordsArray.unshift({
        pl: words.words[randomNumbers[i]].pl,
        en: words.words[randomNumbers[i]].en
      });
    }
    const newSessionInfo = {
      sessionInfo: {
        amounts: {
          correctWords: 0,
          discorrectWords: 0,
          totalNumberOfWords: 0,
          procentCorrectness: 0,
          score: 0
        }
      }
    };

    new SessionModel({
      userId,
      words: wordsArray,
      ...newSessionInfo
    }).save();

    return {
      words: wordsArray,
      ...newSessionInfo
    };
  });
};

const createUser = (user, args) => {
  const { email, password, firstName, lastName, phoneNumber } = args.user;

  if (!user) {
    const hashPassword = UserModel().hashPassword(password);
    return new UserModel({
      email,
      password: hashPassword,
      firstName,
      lastName,
      phoneNumber,
      difficulty: "A1",
      score: 0
    })
      .save()
      .then(resp => {
        payload = {
          id: resp._id,
          email: resp.email,
          firstName: resp.firstName,
          lastName: resp.lastName,
          phoneNumber: resp.phoneNumber,
          difficulty: resp.difficulty
        };
        const token = jwt.sign(payload, secret, { expiresIn: "12h" });
        return {
          token
        };
      })
      .catch(err => {
        return {
          connectionError: "Błąd łącznia z bazą danych. Spróbuj za później"
        };
      });
  } else {
    return {
      userError: "Użytkownik już istnieje"
    };
  }
};

const updateSession = args => {
  const {
    word,
    userId,
    correctWords,
    discorrectWords,
    procentCorrectness,
    totalNumberOfWords,
    score
  } = args;

  let newSessionInfo = {
    amounts: {
      correctWords,
      discorrectWords,
      procentCorrectness,
      totalNumberOfWords,
      score
    }
  };
  return SessionModel.findOne({ userId })
    .then(session => {
      const newWordsArray = session.words.filter(item => word !== item.en);
      session.updateOne(
        { words: newWordsArray, sessionInfo: newSessionInfo },
        (err, res) => {
          if (err) return new Error("Can't update array");
        }
      );
      return {
        words: newWordsArray
      };
    })
    .catch(err => new Error("Can't find this user"));
};

const updateSessionStatistics = args => {
  const {
    userId,
    correctWords,
    discorrectWords,
    procentCorrectness,
    totalNumberOfWords,
    score
  } = args;

  let newSessionInfo = {
    amounts: {
      correctWords,
      discorrectWords,
      procentCorrectness,
      totalNumberOfWords,
      score
    }
  };

  return SessionModel.findOne({ userId })
    .then(session => {
      session.updateOne({ sessionInfo: newSessionInfo }, (err, res) => {
        if (err) return new Error("can't update");
      });
      return {
        isUpdated: true
      };
    })
    .catch(err => new Error("can't update statistics"));
};

module.exports = {
  verifyLogging,
  createSession,
  createUser,
  updateSession,
  updateSessionStatistics
};
