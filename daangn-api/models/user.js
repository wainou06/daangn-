const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            email: {
               type: Sequelize.STRING(40),
               allowNull: false,
               unique: true,
            },
            name: {
               type: Sequelize.STRING(20),
               allowNull: false,
            },
            addr: {
               type: Sequelize.STRING(80),
               allowNull: false,
            },
            nick: {
               type: Sequelize.STRING(40),
               allowNull: false,
               unique: true,
            },
            password: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true, // 소프트 삭제
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }
   static associate(db) {
      db.User.hasMany(db.Post, {
         foreignKey: 'user_id',
         sourceKey: 'id',
      })
   }
}
