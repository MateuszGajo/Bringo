import Axios from "axios";
import cookies from "next-cookies";
import Router from "next/router";
import jwt_deocde from "jwt-decode";
import { SERVER_URL } from "./configs";
import GET_WORD from "./features/queries/wordQuery";
import GET_SESSION from "./features/queries/sessionQuery";
import GET_SCORE_USER from "./features/queries/scoreUserQuery";

export const isLogged = async (ctx, redirectPath) => {
  const { res } = ctx;
  const { token } = cookies(ctx);
  const checkToken = await Axios.get(SERVER_URL + "/auth/me", {
    headers: {
      Authorization: token || "",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  const isAuthorized = checkToken.data.success;
  const redirectPage = redirectPath == "/" ? isAuthorized : !isAuthorized;

  if (res && redirectPage) {
    res.writeHead(302, {
      Location: redirectPath
    });
    res.end();
  } else if (redirectPage) {
    Router.push(redirectPath);
  }
};

export const loadSession = async ctx => {
  let response = null;
  let isSession = false;
  let sessionInfo;
  const { res } = ctx;
  const { token } = cookies(ctx);
  const userInfo = jwt_deocde(token);

  const getSession = async () =>
    await ctx.apolloClient.query({
      query: GET_SESSION,
      variables: { userId: userInfo.id }
    });

  const getWords = async () =>
    await ctx.apolloClient.query({
      query: GET_WORD,
      variables: { level: userInfo.difficulty, number: 2, userId: userInfo.id }
    });

  response = await getSession();
  if (
    response.data.getSession.sessionInfo !== null &&
    response.data.getSession.words.length === 0
  ) {
    if (res) {
      res.writeHead(302, {
        Location: "/resume"
      });
      return res.end();
    } else {
      return Router.push("/resume");
    }
  }
  if (response.data.getSession.words.length > 0) {
    isSession = true;
    response = response.data.getSession;
    sessionInfo = response.sessionInfo;
  }

  if (!isSession) {
    response = await getWords();
    response = response.data.getWords;
    sessionInfo = response.sessionInfo;
  }
  return {
    userInfo,
    words: response.words,
    sessionInfo
  };
};

export const getSession = async ctx => {
  let { token } = cookies(ctx);
  const userInfo = jwt_deocde(token);

  const session = await ctx.apolloClient.query({
    query: GET_SESSION,
    variables: { userId: userInfo.id }
  });

  const { sessionInfo, words } = session.data.getSession;
  const isSession = sessionInfo !== null && words.length > 0 ? true : false;
  const isSessionEnd = sessionInfo !== null && words.length == 0 ? true : false;

  return {
    isSession,
    isSessionEnd,
    sessionInfo,
    userInfo
  };
};

export const getScoreUser = async ctx => {
  let { token } = cookies(ctx);
  const userInfo = jwt_deocde(token);

  const user = await ctx.apolloClient.query({
    query: GET_SCORE_USER,
    variables: { userId: userInfo.id }
  });
  return {
    score: user.data.getScoreUser.score
  };
};

export const verifyLogging = (data, dispatch, setCookie) => {
  const { token, emailError, passwordError, connectionError } = data.login;

  if (emailError)
    return dispatch({ type: "LOGIN_EMAIL_ERROR", msg: emailError });
  else if (passwordError)
    return dispatch({
      type: "LOGIN_PASSWORD_ERROR",
      msg: passwordError
    });
  else if (connectionError)
    return dispatch({
      type: "LOGIN_CONNECTION_ERROR",
      msg: connectionError
    });

  dispatch({ type: "LOGIN_SUCCESS" });
  setCookie("token", token);
  Router.push("/");
};

export const verifyRegistering = (data, dispatch, setCookie) => {
  const { token, userError, connectionError } = data.createUser;

  if (userError) return dispatch({ type: "EMAIL_ERROR", msg: userError });
  else if (connectionError)
    return dispatch({
      type: "REGISTER_CONNECTION_ERROR",
      msg: connectionError
    });

  dispatch({ type: "REGISTER_SUCCESS" });
  setCookie("token", token);
  Router.push("/");
};

export const scoreTable = level => {
  const table = {
    A1: 2,
    A2: 4,
    B1: 8,
    B2: 12,
    C1: 24,
    C2: 30
  };
  return table[level];
};

export const levelScoreTable = (userScore, sessionScore, difficulty) => {
  const levelTable = {
    0: "A1",
    800: "A2",
    2500: "B1",
    10000: "B2",
    50000: "C1",
    250000: "C2"
  };
  const scoreArray = [200, 800, 2500, 10000, 50000, 250000];
  let i = 0;
  const allScore = Number(userScore) + sessionScore;

  while (scoreArray[i] < userScore && i < scoreArray.length - 1) {
    if (scoreArray[i + 1] > userScore) {
      if (allScore >= scoreArray[i + 1]) {
        return {
          level: levelTable[scoreArray[i + 1]]
        };
      }
    }
    i++;
  }
  return {
    level: null
  };
};
