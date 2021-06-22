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

async function checkGraduationFields(){
    if(!document.getElementById('grad_ok').checked){
        document.getElementById('nomeCurso').disabled = true
    }else{
        document.getElementById('nomeCurso').disabled = false
    }
}

async function checkDefFields(){
    if(!document.getElementById('defSim').checked){
        document.getElementById('defTipo').disabled = true
    }else{
        document.getElementById('defTipo').disabled = false
    }
}

async function setPicture(){
    var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
  
    reader.onloadend = function () {
      preview.src = reader.result;
    }
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  }

