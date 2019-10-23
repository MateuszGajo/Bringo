const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const { ApolloServer } = require('apollo-server-express');
const mongoose = require("mongoose");
const app = express();
const { mongodb: { mongoURI } } = require("./config/keys")
const { typeDefs, resolvers } = require("./schema/schema");
const authRoutes = require('./route/auth-route');
const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


app.use(cors());

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('db')
})

app.use('/auth', authRoutes)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // let authToken = null;
    // let currentUser = null;
    // try {
    //   authToken = req.headers.authorization;

    //   if (authToken) {
    //     authToken = "verified"
    //   }
    // } catch (e) {
    //   console.warn(`Unable to authenticate using auth token: ${authToken}`);
    // }

    // return {
    //   authToken,
    // };
  }
});

server.applyMiddleware({ app });


app.listen(({ port: 4000 }), () => {
  console.log(`Server working`);
});
