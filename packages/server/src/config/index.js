module.exports = function (app, mongoose, express) {
  app.use(express.json());

  // DB
  let dbUrl = process.env.DB_HOST;
  if (process.env.NODE_ENV !== 'production') {
    dbUrl = process.env.DB_HOST_TEST;
  }

  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const database = mongoose.connection;
  database.on('error', function (e) {
    console.error('database connection error:' + e);
  });
};
