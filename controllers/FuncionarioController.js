const { Funcionario, Situacao, Login } = require ('../models/');
const { Op } = require("sequelize");

class FuncionarioController {
    async getFuncAtivos(req,res) {
        try {
            const funcionarios = await Funcionario.findAll({
                include: [{ 
                    model: Situacao, 
                    as: "situacao",
                    where: { 
                       descricao:{ [Op.not]: 'Inativo'}
                    },
                    attributes: { exclude: ['createdAt', 'updatedAt'] }                   
                    },
                    { 
                    model: Login, 
                    as: "login",
                    attributes: { exclude: ['FuncionarioId', 'funcionarioId', 'createdAt', 'updatedAt'] } 
                    },
                              
                ],
                attributes: { exclude: ['loginId','situacaoId','SituacaoId', 'createdAt', 'updatedAt'] }
            })
            res.status(200).json(funcionarios);
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    async getFuncInativos(req,res) {
        try {
            const funcionarios = await Funcionario.findAll({
                include: [{ 
                    model: Situacao, 
                    as: "situacao", where: { descricao: 'Inativo' },
                    attributes: { exclude: ['createdAt', 'updatedAt'] }              
                },
                { 
                    model: Login, 
                    as: "login",
                    attributes: { exclude: ['FuncionarioId', 'funcionarioId', 'createdAt', 'updatedAt'] } 
                }],
                attributes: { exclude: ['loginId', 'situacaoId','SituacaoId', 'createdAt', 'updatedAt'],
                              include: [['updatedAt','ultima atualizacao']]  }
            })
            res.status(200).json(funcionarios);
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    async create(req,res) {
        try {
            let funcSituacaoRes = await Situacao.findByPk(req.body.situacaoId);       
            if (!funcSituacaoRes) {
                res.status(400).json({erro: 'Situação não encontrada'});
            }

            let funcCPF = await Funcionario.findOne({ where: { cpf: req.body.cpf } });
            if(funcCPF){
                res.status(400).json({erro: 'CPF já cadastrado'});
            }else {
                let funcionario = {
                    nome: req.body.nome,
                    cpf: req.body.cpf,
                    dataNascimento: req.body.dataNascimento,
                    estadoCivil: req.body.estadoCivil,
                    sexo: req.body.sexo,
                    email: req.body.email,
                    graduacao: req.body.graduacao,
                    cep: req.body.cep,
                    numero: req.body.numero,
                    complemento: req.body.complemento,
                    celular: req.body.celular,
                    fixo: req.body.fixo,
                    emergencia: req.body.emergencia,
                    nomeReferencia: req.body.nomeReferencia,
                    parentesco: req.body.parentesco,
                    deficiencia: req.body.deficiencia,
                    situacaoId: Number(req.body.situacaoId)
                }
                
                const funcResponse = await Funcionario.create(funcionario);
                const loginFuncionario = await createLogin(funcResponse);
                try{
                    const funcObj = await Funcionario.update(
                        {loginId: loginFuncionario.id},
                        {where: { id: funcResponse.id}});

                        res.status(201).json({mensagem:`Funcionario ${funcReponse.id} criado com sucesso`});
                }catch(e){
                    throw new Error(`Funcionario ${funcResponse.id} cadastrado sem login`);
                }

                async function createLogin(){
                    let funcionarioLogin = {
                        ativo: true,
                        funcionarioId: funcResponse.id,
                        usuario: funcResponse.nome,
                        senha: funcResponse.cpf
                    }
                    console.log(funcionarioLogin)
                    const loginReponse = await Login.create(funcionarioLogin);

                    return loginReponse;
                }
                
            }  
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }
}

module.exports = new FuncionarioController();