async function redirectHome(){
    if(sessionStorage.getItem('admProfile') == 'false'){
        window.location.href = '../View/telaInicioFunc.html';
    }else{
        window.location.href = '../View/telaInicioAdm.html';
    }
}