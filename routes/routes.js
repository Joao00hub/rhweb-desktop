const { Router } = require ('express');
const FuncionarioController = require('../controllers/FuncionarioController');
const SituacaoController = require('../controllers/SituacaoController');
/* IMPORTAR CONTROLLERS */

const routes = Router();

routes.get('/', (req,res) => {
    res.status(200).send({mensagem: "RH WEB API"});
})

//Funcionario routes
routes.post('/funcionario', FuncionarioController.create);
routes.get('/funcionarios', FuncionarioController.getFuncAtivos);
routes.get('/desligados', FuncionarioController.getFuncInativos);

//Situacao routes
routes.get('/situacoes', SituacaoController.getAll);
routes.post('/situacao', SituacaoController.create);



module.exports = routes;