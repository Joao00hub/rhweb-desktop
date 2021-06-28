window.onload = function(){
    var container = document.getElementById("cards1");  
    let card = "";

    var headers = new Headers();
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTYyNDgzOTE2NiwiZXhwIjoxNjI0ODQyNzY2fQ.68iPN9R1IlvGH17rPxK8qXj9UBnYC88_9CFYpBlrXFw";
    headers.append('Content-Type', "application/json");
    headers.append("Authorization", "Bearer " + token);

    fetch('https://rh-web-api.herokuapp.com/funcionarios/ativos', {
            method: 'GET',
            headers: headers
        })
        .then(function(response){
            if(response.status != 200){
               window.alert("falha ao carregar os dados")
            }else{ 
                return response.json();
            }
        })
        .then(function (response) { 
             {
                console.log(response);               
                response.forEach(function(element,i) {
                    let classSitua = "";
                    let dataContra = element.dtAdm;
                    const splits = dataContra.split('/');
                    console.log(splits[2]);

                    
                    switch (element.situacao.descricao) {
                        case 'Ativo':
                            classSitua = "ativo";
                            console.log(classSitua);
                          break;
                        case 'Férias':
                            classSitua = "ferias";
                            console.log(classSitua);
                            break;
                        case 'Afastamento':
                            classSitua = "afastamento";
                            console.log(classSitua);
                          break;
                        default:
                          console.log("deu nada");
                      }                       
                      if (i == 0)
                      {
                        card += `<div class="row">`
                      }
                       card += `
                  <div class="col-sm-3 my-2 animate__animated animate__fadeInLeft">
                    <div class="card text-center shadow">
                        <div class="card-header color ">
                            <img src="../IMG/Rectangle 44.png" style="height: 100px; border-radius: 150px;
                            -webkit-box-shadow: 4px 9px 6px 0px rgb(11 11 11 / 75%)">
                        </div>
                        <div class="card-body color2">
                            <h5 class="card-title fs-5 fw-bolder fst-normal">${element.nome}</h5>
                            <hr>
                            <div class="text-center">

                                <p class="card-text fs-6 text-muted fw-bolder">${element.cargo}</p>


                                <p class="card-text fs-6 fw-lighter text-muted">${splits[2]}-Presente</p>


                                <p class="card-text fs-6 ${classSitua} mt-2">${element.situacao.descricao}</p>
                            </div>
                        </div>
                      </div>
                    </div>`
                    
                    if(i!=0 && i%96 == 0)
                    {
                        card += `</div><div class="row">`
                    }
                     console.log(i);
                }); 
                card += `</div>`
                container.innerHTML += card;             
            }
        })
}