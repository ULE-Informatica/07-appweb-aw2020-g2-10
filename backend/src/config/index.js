
module.exports = {
  port: 3000,
  db: {
    database: "TheContentBoxAW",
    user: "root",
    password: "12345678",
    options: {
      dialect: "mysql",
      host: "localhost",
      logging: false,
    },
    authentication: {
      jwtSecret: 'secret',
    },
  },
};
