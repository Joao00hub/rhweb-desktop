// window.onload = function () {
    
//     const btSave = document.getElementById("btSave");
//     btSave.addEventListener('click', function(e) {
    
//       e.preventDefault();
//     });

//     let inputs = document.querySelectorAll("input");
//     let selects = document.querySelectorAll("select");
//     let INPUTS_VALIDATED = false;
//     let SELECTS_VALIDATED = false;

//     let button = document.getElementById("btSave");
//     inputs.forEach(function(input) {
//         input.addEventListener("keyup", function() {
//           if(checkInputs(inputs)){
//             INPUTS_VALIDATED = true;
//           }
//         });
//     });

//     selects.forEach(function(select) {
//         select.addEventListener("change", function() {
//           if(checkInputs(selects)){
//             SELECTS_VALIDATED = true;
//           }
//         });
//     });

//     if(INPUTS_VALIDATED && SELECTS_VALIDATED){
//         button.disabled = true;
//     }else{
//         button.disabled = false;
//     }
// }

// function checkInputs(inputs) {
//     let filled = true;
//     inputs.forEach(function(input) {
        
//       if((input.value == "" || input.value == null) && input.required) {
//           filled = false;
//       }else{
//           filled = true
//       }
//     });
//     return filled;
// }

async function pegarEndereco(){
    let endereco = "";
    let cep = document.getElementById('txtCep').value;
    let resposta = await fetch('http://viacep.com.br/ws/' + cep + '/json/')
    endereco = await resposta.json();
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

async function cadastrarFuncionario(){
    console.log("casulindo");
    const SITUACAO_INICIAL = 1;
    const COMPLEMENTO = "";
    const funcOjb = await setDados();

    async function setDados(){
        return {
            nome: document.getElementById("nome").value,
            cpf: document.getElementById("cpf").value,
            dataNascimento: document.getElementById("dtNasc").value,
            estadoCivil: document.getElementById("civilStatus").value,
            sexo: document.getElementById("sexo").value,
            email: document.getElementById("email").value,
            graduacao: document.getElementById("nomeCurso").value,
            cep: document.getElementById("txtCep").value,
            numero: document.getElementById("endNum").value,
            complemento: COMPLEMENTO,
            celular: document.getElementById("telCel").value,
            fixo: document.getElementById("telFixo").value,
            emergencia: document.getElementById("telEmerg").value,
            nomeReferencia: document.getElementById("nomeEmerg").value,
            parentesco: document.getElementById("grauParentesco").value,
            deficiencia: document.getElementById("defTipo").value,
            cargo: document.getElementById("cargo").value,
            dtAdm: document.getElementById("dtAdm").value,
            ferias: document.getElementById("dtFerias").value,
            salario: document.getElementById("salario").value,
            foto: document.getElementById("upImage").value,
            situacaoId: SITUACAO_INICIAL
        };
    }

    var headers = new Headers();
    headers.append('Content-Type', "application/json");
    headers.append("Authorization", "Bearer " + sessionStorage.getItem('acessToken'));

    //const URL = "http://localhost:3000/funcionario/novo";
    const URL = "https://rh-web-api.herokuapp.com/funcionario/novo";

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify(funcOjb),     
            headers: headers     
        })  
        .then(function(response){
            if(response.status != 200){
                return response.json();
            }else{ 
                console.log("deu ruim");
            }
        })
        .then(function(data){
            window.alert(data)
            console.log(data);
        })    
       


}