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
        
    if (sessionStorage.getItem("idFuncionarioCard") == 'false') {
        window.location.href = '../View/TelaFuncionariosDesligados.html';
    } else {
        window.location.href = '../View/TelaFuncionarios.html';
    }
        
    if (sessionStorage.getItem('admProfile') == 'false') {
        window.location.href = '../View/telaInicioFunc.html';
    }
}

window.onload = function () {
    const ativoInativo = false;

    let pegaIdCard = sessionStorage.getItem("idFuncionarioCard");
    if(pegaIdCard == ""){
        ativoInativo = true;
        pegaIdCard = sessionStorage.getItem("idFuncionarioCardDesligado");
    }

    if(sessionStorage.getItem("admProfile") == "false") {
        pegaIdCard = sessionStorage.getItem("userid");
    }
    

    const URL = "https://rh-web-api.herokuapp.com/funcionario/" + pegaIdCard;
    let funcId = sessionStorage.getItem('userid');
    var headers = new Headers();
    headers.append('Content-Type', "application/json");
    headers.append("Authorization", "Bearer " + sessionStorage.getItem('acessToken'));

    fetch(URL,{
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

            let inputs = document.querySelectorAll("input");
            let selects = document.querySelectorAll("select");

            if (sessionStorage.getItem('admProfile') == 'false') {

                document.getElementById("btBeneficios").hidden = true;
                document.getElementById("admOptions").hidden = true;
                document.getElementById("linhaSituacao").hidden = true;              

                inputs.forEach(function (input) {
                    input.disabled = true
                });

                selects.forEach(function (select) {
                    select.disabled = true
                });
            }
            // }else{
            //     inputs.forEach(function (input) {
            //         input.disabled = false
            //     });

            //     selects.forEach(function (select) {
            //         select.disabled = false
            //     });

                
            //     document.getElementById("btBeneficios").hidden = false;
            //     document.getElementById("admOptions").hidden = false;
            //     document.getElementById("linhaSituacao").hidden = false; 
            // }

            var teste = data.cep;
            console.log(teste);
            if (data.login.isAdmin == true) {
                document.getElementById("simAdm").checked = true
            } else {
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
            // document.getElementById("upImage").value = data.upImage;


            var container = document.getElementById("slctSituação");

            fetch('https://rh-web-api.herokuapp.com/situacoes', {
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
                .then(function (response) {
                    {
                        console.log(response);
                        response.forEach(function (element, i) {
                            container.innerHTML += `<option value="${element.id}">${element.descricao}</option>`
                        });
                    }
                })

        })
}

function testAtt() {
    Swal.fire({
        title: 'Alterar',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Save`,
        denyButtonText: `Don't save`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    })
}

async function EditarFuncionario() {
    let idEditado = sessionStorage.getItem("idFuncionarioCard");
    var verificaAdm = document.getElementById('simAdm').value;

    if (verificaAdm == "on") {
        isAdmn = "true";
    }else {
        isAdmn = "false";
    }

    const funcOjb = await setDados();

    async function setDados() {

        if (sessionStorage.getItem('base64TempPic') != undefined || sessionStorage.getItem('base64TempPic') != null || bsessionStorage.getItem('base64TempPic') != "") {

            const IMGUR_ID = '32a49e8df66e9f8'
            const URL_IMGUR = "https://api.imgur.com/3/image";

            fetch(URL_IMGUR, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Client-ID ' + IMGUR_ID,
                    },
                    form: {
                        "image": sessionStorage.getItem('base64TempPic'),
                        "type": "base64"
                    }
                })
                .then(function (response) {
                    if (response.status != 200) {
                        alert('Ocorreu um erro ao salvar imagem do funcionário.')
                        return response.json();
                    } else {
                        return response.json();
                    }
                })
                .then(function (data) {
                    console.log(data);
                })
        }

        return {
            nome: document.getElementById("nome").value,
            cpf: document.getElementById("cpf").value,
            dataNascimento: document.getElementById("dtNasc").value,
            estadoCivil: document.getElementById("civilStatus").value,
            sexo: document.getElementById("sexo").value,
            email: document.getElementById("email").value,
            graduacao: document.getElementById("nomeCurso").value,
            cep: document.getElementById("txtCep").value,
            logradouro: document.getElementById("txtEnde").value,
            cidade: document.getElementById("txtCid").value,
            bairro: document.getElementById("txtBair").value,
            numero: document.getElementById("endNum").value,
            complemento: document.getElementById('endComp').value,
            celular: document.getElementById("telCel").value,
            fixo: document.getElementById("telFixo").value,
            emergencia: document.getElementById("telEmerg").value,
            nomeReferencia: document.getElementById("nomeEmerg").value,
            parentesco: document.getElementById("grauParentesco").value,
            deficiencia: document.getElementById("defTipo").value,
            cargo: document.getElementById("cargo").value,
            dtAdm: document.getElementById("dtAdm").value,
            ferias: document.getElementById("dtFerias").value,
            salario: document.getElementById('salario').value,
            foto: document.getElementById("upImage").value,
            isAdmin: isAdmn,
            situacaoId: document.querySelector('#slctSituação').value

        }


    }

     var headers = new Headers();
    headers.append('Content-Type', "application/json");
    headers.append("Authorization", "Bearer " + sessionStorage.getItem('acessToken'));
    const URL = "https://rh-web-api.herokuapp.com/funcionario/"+ idEditado;

    fetch(URL, {
        method: 'PUT',
        body: JSON.stringify(funcOjb),
        headers: headers
    })
    .then(function(response){
        if(response.status != 200){
              Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Não foi possivel atualizar o funcionário'
              })
            return response.json();

        }else{
            Swal.fire({
                icon: 'success',
                title: 'Funcionário alterado com sucesso!',
                showConfirmButton: true,
              })
        }
    })
    .then(function(data){
    })

    sessionStorage.setItem("idFuncionarioCard", "");
}