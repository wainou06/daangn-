const Sequelize = require('sequelize')

module.exports = class Category extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            name: {
               type: Sequelize.STRING(20),
               allowNull: false,
               unique: true,
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Category',
            tableName: 'categorys',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }
   static associate(db) {
      db.Category.belongsToMany(db.Post, {
         through: 'PostCategory',
         foreignKey: 'category_id',
         otherKey: 'post_id',
      })
   }
}
