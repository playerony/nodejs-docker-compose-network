'use strict';

const Hapi = require('@hapi/hapi');
const { MongoClient } = require("mongodb");

const collectionName = "count";
const databaseName = "nodejs-docker-compose-network";
const url = process.env.MONGO_CONNECTION_STRING || "mongodb+srv://testuser:<password>@cluster0.lfbyy.mongodb.net/test";

const init = async () => {
  const client = await MongoClient.connect(url);
  const db = client.db(databaseName);
  const collection = db.collection(collectionName);

  const server = Hapi.server({
    host: "0.0.0.0",
    port: process.env.PORT || 3000
  });

  server.route({
    path: '/',
    method: 'GET',
    async handler() {
      const count = await collection.countDocuments();

      return { count, success: true };
    }
  });

  server.route({
    path: '/add',
    method: 'GET',
    async handler() {
      const response = await collection.insertOne({});

      return { inserted: response.insertedCount };
    }
  })

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
