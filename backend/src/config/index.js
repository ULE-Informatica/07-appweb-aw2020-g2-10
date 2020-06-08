
module.exports = {
  port: 3000,
  db: {
    database: "TheContentBoxAW",
    user: 'root',
    //user: "awuser",
    password: "12345678",
    //password: "awpass",
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
