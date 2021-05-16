'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Login', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      usuario: {
        allowNull: false,
        type: Sequelize.STRING
      },
      senha: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ativo: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      ultimoLogin: {
        allowNull: true,
        type: Sequelize.DATE
      },
      funcionarioId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Funcionario',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
