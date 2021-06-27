const Swal = require('sweetalert2')

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
        
        const URL = "http://localhost:3000/login";
        //const URL = "https://rh-web-api.herokuapp.com/login";
    
            fetch(URL, {
                method: 'POST',
                body: JSON.stringify(loginFunc),     
                headers: headers     
            })  
            .then(function(response){
                if(response.status != 200){
                    window.alert('falha')
                }else{
                    return response.json();
                }
                
            })
            .then(function(data){
                sessionStorage.setItem('acessToken', data.token);
                window.location.href = "../View/telaInicioFunc.html"
            })    
    }else{
        window.alert('falha')
        // Swal.fire({
        //     title: 'Error!',
        //     text: 'Do you want to continue',
        //     icon: 'error',
        //     confirmButtonText: 'Cool'
        //   })
    }
}