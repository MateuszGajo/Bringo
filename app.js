const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const next = require('next');
const {
  mongodb: { mongoURI }
} = require("./config/keys");
const { typeDefs, resolvers } = require("./schema/schema");
const authRoutes = require("./route/auth-route");

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler()

nextApp.prepare()
.then(() => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(cors());

  const db = mongoose.connect(
    mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    () => {
      console.log("db connected");
    }
  );

  app.use((req,res,next)=>{
    req.db = db;
    next();
  })

  app.use("/auth", authRoutes);

  app.get('*',(req,res)=>{
    handle(req,res);
  })

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000

  app.listen({ port }, () => {
    console.log(`Server working`);
  });

}).catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })