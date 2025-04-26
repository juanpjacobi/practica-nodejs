// src/index.ts
import 'reflect-metadata';
import express, { Application } from 'express';
import { ApolloServer }          from '@apollo/server';
import { expressMiddleware }     from '@apollo/server/express4';

import { typeDefs }      from './graphql/typeDefs';
import { resolvers }     from './graphql/resolvers';
import userRoutesHandler from './routes/userRoutes';
import { errorHandler }  from './middlewares/errorHandler';
import { AppDataSource } from './ormconfig';

async function startServer() {
  const app: Application = express();

  app.use(express.json());
  app.use('/users', userRoutesHandler);

  // Apollo Server v4
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  app.use(
    '/graphql',
    expressMiddleware(server)  // deep-import desde @apollo/server
  );

  app.use(errorHandler);

  await AppDataSource.initialize();
  console.log('🗄️ Conectado a la base de datos');
  app.listen(3000, () =>
    console.log('🚀 Server listo en http://localhost:3000/graphql')
  );
}

startServer().catch(err => console.error('Error arrancando server:', err));
