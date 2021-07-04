window.onload = function () {
    let pegaId = sessionStorage.getItem("idBeneficio");
    console.log(pegaId);

    var container = document.getElementById("EditaSltTipos");

    var headers = new Headers();
    const token = sessionStorage.getItem('acessToken');
    console.log(token);
    headers.append('Content-Type', "application/json");
    headers.append("Authorization", "Bearer " + token);

    fetch('https://rh-web-api.herokuapp.com/beneficios/tipos', {
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

    var headers = new Headers();
    console.log(token);
    headers.append('Content-Type', "application/json");
    headers.append("Authorization", "Bearer " + token);

    fetch('https://rh-web-api.herokuapp.com/beneficio/' + pegaId, {
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

                document.getElementById('Editadesc').value = response.descricao;

                var select = document.querySelector('#EditaSltTipos');
                for (var i = 0; i < select.options.length; i++) {
                    if (select.options[i].text === response.tipo.descricao) {
                        select.selectedIndex = i;
                        break;
                    }
                }
                var select = document.querySelector('#EditaSltTiposDescontos');
                for (var i = 0; i < select.options.length; i++) {
                    if (select.options[i].value === response.tipoDesconto) {
                        select.selectedIndex = i;
                        break;
                    }
                }

                document.getElementById('EditaDesconto').value = response.desconto;

            }

        })
}

async function salvarEdicao() {
    const funcOjb = await setDados();
    async function setDados() {
        return {
            descricao: document.getElementById('Editadesc').value,
            tipoDesconto: document.querySelector('#EditaSltTiposDescontos').value,
            desconto: document.getElementById('EditaDesconto').value,
        };

    }

    var headers1 = new Headers();
    headers1.append('Content-Type', "application/json");
    headers1.append("Authorization", "Bearer " + sessionStorage.getItem('acessToken'));

    let pegaIdPut = sessionStorage.getItem("idBeneficio");

    fetch('https://rh-web-api.herokuapp.com/beneficio/' + pegaIdPut, {
            method: 'PUT',
            body: JSON.stringify(funcOjb),
            headers: headers1
        }).then(function (response) {
            if (response.status != 200) {
                window.alert('falha')
            } else {
                return response.json();
            }

        })

}