const API_URL = "http://177.190.80.28:3001";

export async function listarPacientes() {
    const resposta = await fetch(`${API_URL}/pacientes`);
    console.log("Resposta", resposta);
    if (!resposta.ok){
        throw new Error("Não foi possível listar os pacientes");
    }
    return resposta.json();
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



