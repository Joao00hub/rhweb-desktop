async function loginAdm(){
    
    user = document.getElementById("campoUserAdm").value
    pass = document.getElementById("campoSenhaAdm").value

    if(user && pass){

        let loginFunc = {
            usuario: user,
            senha: pass
        }

        var headers = new Headers();
        headers.append('Content-Type', "application/json");
        const URL = "https://rh-web-api.herokuapp.com/login";
    
            fetch(URL, {
                method: 'POST',
                body: JSON.stringify(loginFunc),     
                headers: headers     
            })  
            .then(function(response){
                if(response.status != 200){
                    window.alert('Falha ao realizar login')
                }else{
                    return response.json();
                }
                
            })
            .then(function(data){
                sessionStorage.setItem('admProfile', data.adm)
                sessionStorage.setItem('acessToken', data.token);
                sessionStorage.setItem('userid', data.id);

                if(data.adm){
                    window.location.href = '../View/telaInicioAdm.html'
                }else{
                    window.alert('Login não é administrador')
                    window.location.href = '../View/index.html'
                }
                
            })    
    }else{
        alert("Dados Invalidos");
    }
}