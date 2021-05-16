module.exports = (sequelize, Sequelize) => {
    const Situacao = sequelize.define('Situacao', {
        /* Todos os Campos Exceto: ID, createdAt, updatedAt */
        descricao: Sequelize.STRING,
    });

    Situacao.associate = (models) => {
        Situacao.hasMany(models.Funcionario, { foreingKey: 'situacaoId', as: 'situacao'})
    }
    return Situacao;
}