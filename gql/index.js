const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bodyParser = require('body-parser');

const resolvers = require('./resolvers');
const typeDefs = require('./types');
const authRouter = require('./routers/auth');
const { sequelize } = require('./models');

const { GRAPHQL_PORT, JWT_SECRET } = process.env

const { Strategy, ExtractJwt } = passportJWT

const params = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

const strategy = new Strategy(params, async (payload, done) => {
  const { id } = payload;
  const [user] = await sequelize.query(`SELECT * from users where id = :id`, { replacements:  { id }, type: sequelize.QueryTypes.SELECT})

  return done(null, user);
})

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

passport.initialize();

app.use('/graphql', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (user) {
      req.user = user
    }

    next();
  })(req, res, next)
})

app.use('/auth', authRouter);


passport.use(strategy)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    user: req.user
  }),
});

server.applyMiddleware({
  app
})

app.listen(
  {
    port: GRAPHQL_PORT
  },
  () => console.log(`🚀  Server is running on port ${GRAPHQL_PORT}`)
)