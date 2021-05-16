module.exports = (sequelize, Sequelize) => {
    const Funcionario = sequelize.define('Funcionario', {
        /* Todos os Campos Exceto: ID, createdAt, updatedAt */
        nome: Sequelize.STRING,
        cpf: Sequelize.STRING,
        dataNascimento: Sequelize.STRING,
        estadoCivil: Sequelize.STRING,
        sexo: Sequelize.STRING,
        email: Sequelize.STRING,
        graduacao: Sequelize.STRING,
        cep: Sequelize.STRING,
        numero: Sequelize.STRING,
        complemento: Sequelize.STRING,
        celular: Sequelize.STRING,
        fixo: Sequelize.STRING,
        emergencia: Sequelize.STRING,
        nomeReferencia: Sequelize.STRING,
        parentesco: Sequelize.STRING,
        deficiencia: Sequelize.STRING,
    });

    Funcionario.associate = (models) => {
        Funcionario.belongsTo(models.Situacao, { foreingKey: 'situacaoId', as: 'situacao'})
        Funcionario.belongsTo(models.Login, { foreingKey: 'loginId', as: 'login'})
        Funcionario.hasMany(models.Login, { foreingKey: 'id', as: 'funcionarioId'})
    }
   

    return Funcionario;
}