async function pegarEndereco() {
    let endereco = "";
    let cep = document.getElementById('txtCep').value;
    let resposta = await fetch('http://viacep.com.br/ws/' + cep + '/json/')
    endereco = await resposta.json();
    document.getElementById('txtEnde').value = endereco.logradouro;
    document.getElementById('txtCid').value = endereco.localidade;
    document.getElementById('txtBair').value = endereco.bairro;
}

async function checkGraduationFields() {
    if (!document.getElementById('grad_ok').checked) {
        document.getElementById('nomeCurso').disabled = true
    } else {
        document.getElementById('nomeCurso').disabled = false
    }
}

async function checkDefFields() {
    if (!document.getElementById('defSim').checked) {
        document.getElementById('defTipo').disabled = true
    } else {
        document.getElementById('defTipo').disabled = false
    }
}

async function redirectHome() {
    if (sessionStorage.getItem('admProfile') == 'false') {
        window.location.href = '../View/telaInicioFunc.html';
    } else {
        window.location.href = '../View/telaInicioAdm.html';
    }
}

window.onload = function () {
    let pegaIdCard = sessionStorage.getItem("idFuncionarioCard");
    const URL = "https://rh-web-api.herokuapp.com/funcionario/" + pegaIdCard;
    let funcId = sessionStorage.getItem('userid');
    var headers = new Headers();
    headers.append('Content-Type', "application/json");
    headers.append("Authorization", "Bearer " + sessionStorage.getItem('acessToken'));

    fetch(URL + funcId, {
            method: 'GET',
            headers: headers
        })
        .then(function (response) {
            if (response.status != 200) {
                window.alert("falha ao carregar os dados")
            } else {
                return response.json();
            }
        })
        .then(function (data) {
            console.log(sessionStorage.getItem('admProfile'))

            if (sessionStorage.getItem('admProfile') == 'false') {

                document.getElementById("btBeneficios").hidden = true;
                document.getElementById("admOptions").hidden = true;

                let inputs = document.querySelectorAll("input");
                let selects = document.querySelectorAll("select");

                inputs.forEach(function (input) {
                    input.disabled = true
                });

                selects.forEach(function (select) {
                    select.disabled = true
                });
            }
            var teste = data.cep;
            console.log(teste);
            if(data.login.isAdmin == true){
                document.getElementById("simAdm").checked = true
            }else{
                document.getElementById("naoAdm").checked = true
            }
            document.getElementById("codNomeFunc").textContent = `${data.nome} - Matrícula: ${data.id}`
            document.getElementById("codFunc").value = data.id;
            document.getElementById("nome").value = data.nome;
            document.getElementById("cpf").value = data.cpf;
            document.getElementById("dtNasc").value = data.dataNascimento;
            var selectCivil = document.querySelector('#civilStatus');
            for (var i = 0; i < selectCivil.options.length; i++) {
                if (selectCivil.options[i].value === data.estadoCivil) {
                    selectCivil.selectedIndex = i;
                    break;
                }
            }
            var selecSexo = document.querySelector('#sexo');
            for (var i = 0; i < selecSexo.options.length; i++) {
                if (selecSexo.options[i].value === data.sexo) {
                    selecSexo.selectedIndex = i;
                    break;
                }
            }
            // document.getElementById("sexo").value = data.sexo;
            document.getElementById("email").value = data.email;
            document.getElementById("nomeCurso").value = data.graduacao;
            // if(document.getElementById("nomeCurso").value)
            //     document.getElementById("grad_ok").checked = true
            // else
            //     document.getElementById("grad_n").checked = true
            document.getElementById("txtCep").value = teste;
            document.getElementById("endNum").value = data.numero;
            document.getElementById("endComp").value = data.complemento,
            document.getElementById('txtEnde').value = data.logradouro;
            document.getElementById('txtCid').value = data.cidade;
            document.getElementById('txtBair').value = data.bairro;
            document.getElementById("telCel").value = data.celular;
            document.getElementById("telFixo").value = data.fixo;
            document.getElementById("telEmerg").value = data.emergencia;
            document.getElementById("nomeEmerg").value = data.nomeReferencia;
            document.getElementById("grauParentesco").value = data.parentesco;
            document.getElementById("defTipo").value = data.deficiencia;

            if (document.getElementById("defTipo").value)
                document.getElementById("defSim").checked = true
            else
                document.getElementById("defNao").checked = true
                
            document.getElementById("cargo").value = data.cargo;
            document.getElementById("dtAdm").value = data.dtAdm;
            document.getElementById("dtFerias").value = data.ferias;
            document.getElementById("salario").value = data.salario;
            document.getElementById("upImage").value = data.upImage;

        })
}