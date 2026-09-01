import React from "react";
import { useState, useEffect } from "react";
import { listarPacientes, cadastrarPaciente } from "../services/pacienteService";
const pacienteInicial = {
    nome: "",
    cpf: "",
    telefone: "",
    dataNascimento: ""
};

export default function PacientesPage() {
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState(pacienteInicial);
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        carregarPacientes();
    }, []);

    async function carregarPacientes() {
        try {
            setCarregando(true);
            setErro("");
            const dados = await listarPacientes();
            setPacientes(dados);
        } catch (error) {
            setErro(error.mensage);
        } finally {
            setCarregando(false);
        }
    }

    function alterarCampo(event) {
        const { name, value } = event.target;
        console.log("name", name, "valor", value);
        setPaciente(atual => ({ ...atual, [name]: value }));
    }

    async function salvarPacinte(event) {
        event.preventDefault();
        if (!paciente.nome.trim()) {
            setErro("Infome o nome do paciente")
            return;
        }
        try {
            setSalvando(true);
            setErro("");
            setMensagem("");
            const novoPaciente = await cadastrarPaciente(paciente);
            setPacientes(estadoAtual => [...estadoAtual, novoPaciente]);
            setPaciente(pacienteInicial);
            setMensagem("Paciente cadastrado com sucesso");
        } catch (error) {
            setErro(error.message);
        } finally {
            setSalvando(false);
        }
    }
    return (
        <main>
            <h1>Pacientes</h1>
            {erro && <p>{erro}</p>}
            {mensagem && <p>{mensagem}</p>}
            <form onSubmit={salvarPacinte}>
                <input name="nome" placeholder="Nome" value={paciente.nome} onChange={alterarCampo}>
                </input>
                <input name="cpf" placeholder="CPF" value={paciente.cpf} onChange={alterarCampo}>
                </input>
                <input name="telefone" placeholder="Telefone" value={paciente.telefone} onChange={alterarCampo}>
                </input>
                <input name="dataNascimento" placeholder="Data de Nascimento" value={paciente.dataNascimento} onChange={alterarCampo}>
                </input>
                <button disabled={salvando}>
                    {salvando ? "Salvando" : "Cadastrar"}
                </button>

            </form>

            <section>
                <div>
                    <h2>Pacientes Cadastrados</h2>
                    <button type="button" onClick={carregarPacientes}>Atualizar</button>
                </div>
                {carregando ? (<p>Carregando</p>)
                    : pacientes.length === 0 ? (<p>Nenhum paciente cadastrado</p>)
                        : (pacientes.map(paciente => (
                            <article key={paciente.id}>
                                <strong>{paciente.nome}</strong>
                                <strong>{paciente.cpf}</strong>
                                <strong>{paciente.telefone}</strong>
                            </article>
                        )))

                }
            </section>
        </main>
    )
}