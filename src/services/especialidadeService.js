const API_URL = "http://177.190.80.28:3001";

export async function listarEspecialidades() {
    const resposta = await fetch(`${API_URL}/especialidades`);
  
    if (!resposta.ok) throw new Error(await lerErro(resposta));
    return resposta.json();
}

export async function cadastrarEspecialidade(especialidade){
    const resposta = await fetch(`${API_URL}/especialidades`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(especialidade)
    });
    if (!resposta.status(201)) 
        throw new Error(await lerErro(resposta));

    return resposta.json();
}



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