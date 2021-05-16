module.exports = (sequelize, Sequelize) => {
    const Login = sequelize.define('Login', {
        /* Todos os Campos Exceto: ID, createdAt, updatedAt */
          ativo: Sequelize.BOOLEAN,
          ultimoLogin:  Sequelize.DATE,
          usuario: Sequelize.STRING,
          senha: Sequelize.STRING
    });

    Login.associate = (models) => {
        Login.belongsTo(models.Funcionario, { foreingKey: 'funcionarioId', as: 'funcionario'})
        Login.hasOne(models.Funcionario, { foreignKey: 'loginId', as: 'login' })
    }


    return Login;
}