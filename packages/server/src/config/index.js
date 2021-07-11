module.exports = function (app, mongoose, express) {
  app.use(express.json());

  // DB
  let dbUrl = process.env.DB_HOST;
  if (process.env.NODE_ENV !== 'production') {
    dbUrl = 'mongodb://127.0.0.1/scrumpoker_test';
  }

  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const database = mongoose.connection;
  database.on('error', (e) => {
    console.error(`database connection error:${e}`);
  });
};
