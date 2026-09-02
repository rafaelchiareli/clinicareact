const API_URL = "http://177.190.80.28:3001";

export async function listarPacientes() {
    const resposta = await fetch(`${API_URL}/pacientes`);
    console.log("Resposta", resposta);
    if (!resposta.ok){
        throw new Error("Não foi possível listar os pacientes");
    }
    return resposta.json();
}

export async function atualizarPaciente(id, paciente){
    const resposta = await fetch(`${API_URL}/pacientes/${id}`, {
        method:'PUT',
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify(paciente)
    });

    if (!resposta.ok) {
        const erro = await letErro(resposta);
        throw new Error(erro);
    }
    if (resposta.status  == 200){
        return {id , ...paciente}
    }
    return resposta.json();
}

export async function excluirPaciente(id){
    const resposta = await fetch(`${API_URL}/pacientes/${id}`, {
        method: 'DELETE'
    });
    if (!resposta.status == 204){
        const erro = await lerErro(resposta);
        throw new Error(erro);
    }

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


export async function cadastrarPaciente(paciente){
    const resposta = await fetch(`${API_URL}/pacientes`, {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"        
        },
        body: JSON.stringify(paciente)
    });
    if (!resposta.ok) throw new Error("Não foi possível cadastrar o paciente");
    return resposta.json();
}



