let endereco = "";

async function pegarEndereco(){
    let cep = document.getElementById('txtCep').value;
    let resposta = await fetch('http://viacep.com.br/ws/' + cep + '/json/')
    endereco = await resposta.json();
    console.log(endereco);
    document.getElementById('txtEnde').value = endereco.logradouro;
    document.getElementById('txtCid').value = endereco.localidade;
    document.getElementById('txtBair').value = endereco.bairro;
    }