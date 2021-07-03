async function loginFunc(){
    user = document.getElementById("campoUserFunc").value
    pass = document.getElementById("campoSenhaFunc").value

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

                window.location.href = '../View/telaInicioFunc.html'

            });   
    }else{
        window.alert('Preencha os dados!')
    }
}