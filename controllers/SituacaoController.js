const { Situacao } = require ('../models');

class SituacaoController {
    async getAll(req,res) {
        try {
            const funcSituacoes = await Situacao.findAll();
            res.status(200).json(funcSituacoes);
        }
        catch(err) {
            res.status(400).json({error: err.message});
        }
    }

    async create(req,res) {
        try {
            const funcSituacao = await Situacao.create(req.body)
            res.status(200).json(funcSituacao);
        }
        catch(err) {
            res.status(400).json({error: err.message});
        }
    }
}

module.exports = new SituacaoController();