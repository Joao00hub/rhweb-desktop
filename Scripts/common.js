async function logout(){
    funcId = sessionStorage.getItem('userid');
    var headers = new Headers();
    headers.append('Content-Type', "application/json");
    const URL = "https://rh-web-api.herokuapp.com/logout/";

    fetch(URL + funcId, {
        method: 'POST',
        headers: headers     
    })  
    .then(function(response){
        if(response.status != 200){
            //verificar se é necessário validar reset do token
            sessionStorage.setItem('acessToken', null)
            window.location.href= "../View/index.html"; 
        }else{ 
            sessionStorage.setItem('acessToken', null)
            window.location.href= "../View/index.html";
        }
    })
}