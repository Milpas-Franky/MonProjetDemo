const { sequelize } = require('./models/students');

(async () => {
  await sequelize.sync({ force: true });
  await sequelize.close();
})();
