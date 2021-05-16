'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Funcionario', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cpf: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      dataNascimento: {
        allowNull: false,
        type: Sequelize.STRING
      },
      estadoCivil: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sexo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      graduacao: {
        allowNull: true,
        type: Sequelize.STRING
      },
      cep: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numero: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      complemento: {
        allowNull: true,
        type: Sequelize.STRING
      },
      celular: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fixo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      emergencia: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nomeReferencia: {
        allowNull: false,
        type: Sequelize.STRING
      },
      parentesco: {
        allowNull: false,
        type: Sequelize.STRING
      },
      deficiencia: {
        allowNull: true,
        type: Sequelize.STRING
      },  
      situacaoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Situacao',
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
      },
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
