window.onload = function () {
    var container = document.getElementById("table1");
    let table = "";
    let img = "";
    var Addvisivel = "hidden";
    


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

                    if(sessionStorage.getItem('novoFuncionario', true)){
                        Addvisivel = "visible";
                    }

                    let descontoBeneficio;

                    if (element.tipoDesconto == 'P') {
                        descontoBeneficio = element.desconto + "%"
                    } else {
                        descontoBeneficio = "R$" + element.desconto + ",00"
                    }
                    table += `<tr>

                                    
               <td>${element.id}</td>
               <td>${element.descricao}</td>
               <td>${element.tipo.descricao}</td>
               <td>${descontoBeneficio}</td>
               <td><button type="button" value="${element.id}" onclick="updateStatus(this, 1)" class="editar clicado">Editar</button></td>
               <td><button class="adicionar btn-success" style="visibility: ${Addvisivel};"><a href="">Adicionar</a></button></td>
               <td><button class="excluir btn-danger" onclick="removeBen(this, 1)"><i class="fas fa-trash-alt"></i></button></td>
               </tr>`
                  
                });              
                container.innerHTML += table;
                sessionStorage.setItem('novoFuncionario', false);           
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

function removeBen(obj, param) {
    var column = $(obj).parents("tr").find("td:nth-child(" + param + ")");
    let idDoBeneficio = column.html();
    console.log(idDoBeneficio);
    var headers = new Headers();
    headers.append('Content-Type', "application/json");
    headers.append("Authorization", "Bearer " + sessionStorage.getItem('acessToken'));

    const URL = "https://rh-web-api.herokuapp.com/beneficio/" + idDoBeneficio;

        fetch(URL, {
            method: 'DELETE',  
            headers: headers     
        })  
        .then(function(response){
            if(response.status != 200){                
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Não foi possível apagar o benefício. Se o erro persistir contate o administrador do sistema.'
                  })
                }
        })
        .then(function(){
            Swal.fire({
                icon: 'success',
                title: 'Benefício apagado com sucesso!',
                showConfirmButton: true,
            });
            setTimeout("window.location.href = '../View/beneficios.html';", 1500);
        })    
}