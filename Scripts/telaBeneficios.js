window.onload = function () {
    var container = document.getElementById("table1");
    let table = "";
    let img = "";

    function toBinary(string) {
        const codeUnits = new Uint16Array(string.length);
        for (let i = 0; i < codeUnits.length; i++) {
            codeUnits[i] = string.charCodeAt(i);
        }
        img = btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
        return img;
    }

    var headers = new Headers();
    const token = sessionStorage.getItem('acessToken');
    console.log(token);
    headers.append('Content-Type', "application/json");
    headers.append("Authorization", "Bearer " + token);

    fetch('https://rh-web-api.herokuapp.com/beneficios/listar', {
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

                    let tipoBeneficio;
                    let descontoBeneficio;
                    switch (element.tipo.id) {
                        case '1':
                            tipoBeneficio = "Vale Transporte";
                            break;
                        case '2':
                            tipoBeneficio = "Vale Alimentação";
                            break;
                        case '3':
                            classSitua = "Vale Refeição";
                            break;
                        case '4':
                            tipoBeneficio = "Vale Cultura";
                            break;
                        case '5':
                            tipoBeneficio = "Vale Combustível";
                            break;
                        case '6':
                            tipoBeneficio = "Plano de Saúde";
                            break;
                        case '7':
                            tipoBeneficio = "Convênios Universitários";
                            break;
                        case '8':
                            tipoBeneficio = "Cesta";
                            break;
                        case '9':
                            tipoBeneficio = "Gympass";
                            break;
                        case '10':
                            tipoBeneficio = "Outros Beneficios";
                            break;
                        case '11':
                            tipoBeneficio = "Convênios Universitários";
                            break;
                        default:
                            tipoBeneficio = "";
                    }
                    if (element.tipoDesconto == 'P') {
                        descontoBeneficio = element.desconto + "%"
                    } else {
                        descontoBeneficio = "R$" + element.desconto + ",00"
                    }
                    table += `<tr>

                                    
               <td>${element.id}</td>
               <td>${element.descricao}</td>
               <td>${tipoBeneficio}</td>
               <td>${descontoBeneficio}</td>
               <td><button type="button" value="${element.id}" onclick="updateStatus(this, 1)" class="editar clicado">Editar</button></td>
               <td><button class="adicionar btn-success"><a href="">Adicionar</a></button></td>
               </tr>`
                });
                container.innerHTML += table;
            }
        })

}

function updateStatus(obj, param) {
    var column = $(obj).parents("tr").find("td:nth-child(" + param + ")");   
    let idDoBeneficio = column.html();
    console.log(idDoBeneficio);
     sessionStorage.setItem('idBeneficio', idDoBeneficio);
     window.location.href = '../View/editarben.html';
  }