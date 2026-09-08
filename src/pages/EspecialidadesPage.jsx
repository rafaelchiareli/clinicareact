import React from "react";
import { useEffect, useState } from "react";
import { listarEspecialidades, cadastrarEspecialidade } from "../services/especialidadeService";
const especialidadeInicial = {
    nome: '',
    descricao: ''
}
export default function EspecialidadesPage() {
    const [listaEspecialidades, setListaEspecialidades] = useState([]);
    const [especialidade, setEspecialidade] = useState(especialidadeInicial);
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState('');
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        carregarEspecialidades();
    },[])

    async function carregarEspecialidades() {
        try {
            setCarregando(true);
            setErro('');
            const dados = await listarEspecialidades();
            setListaEspecialidades(dados);
        } catch (error) {
            setErro(error.message)
        } finally {
            setCarregando(false);
        }
    }

    return (
        <>
            {carregando ? (<p>Carregando especialidades...</p>)
                : listaEspecialidades.length === 0 ?
                    (<p>Nenhuma especialidade cadastrada</p>)
                    : (
                        listaEspecialidades.map(especialidade => (
                            <article className="item" key={especialidade.id}>
                                <strong>{especialidade.nome}</strong>
                                <p>{especialidade.descricao}</p>
                            </article>
                        ))
                    )
            }
        </>
    )
}