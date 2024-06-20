module.exports = (sequelize, Sequelize) => {
  const Faq = sequelize.define('faqs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: Sequelize.TEXT },
      description: { type: Sequelize.TEXT },
      content: { type: Sequelize.TEXT },
  })
  return Faq
}
