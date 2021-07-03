window.onload = function () {
    var container = document.getElementById("sltTipos");
    let table = "";

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
        .then(function (response) { {
            console.log(response);
            response.forEach(function (element, i) {
                container.innerHTML += `<option value="${element.id}">${element.descricao}</option>`
            });
        }
    })
}

async function cadastrarBeneficio(){
    const funcOjb = await setDados();

    async function setDados(){
        return {       
            descricao: document.getElementById("desc").value,
            tipoDesconto: document.getElementById("sltTiposDescontos").value,
            desconto: document.getElementById("desconto").value,
            tipoId: document.getElementById("sltTipos").value,
        };
    }

    var headers = new Headers();
    headers.append('Content-Type', "application/json");
    headers.append("Authorization", "Bearer " + sessionStorage.getItem('acessToken'));

    const URL = "https://rh-web-api.herokuapp.com/beneficio/novo";

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