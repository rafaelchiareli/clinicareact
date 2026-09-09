const API_URL = "http://177.190.80.28:3001";

async function lerErro(resposta){
    var erroRetorno = '';
    try{
        const dados = await resposta.json();
        erroRetorno = dados.mensagem || "Ocorreu um erro na requisição";
    
    } catch{
        erroRetorno = "Ocorreu um erro na requisição";
    }

    return;
}

export async function listarProfissionais(){
    const resposta = await fetch(`${API_URL}/profissionais`);
     if (!resposta.ok) throw new Error(lerErro(resposta));
    return resposta.json();
    }