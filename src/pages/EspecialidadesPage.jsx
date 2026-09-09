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

    function handleChange(event){
        const {name, value} = event.target;
        setEspecialidade(atual => ({...atual,[name]: value}));
    }

    async function handleSubmit(event){
        event.preventDefault();
        try{
         
            setSalvando(true);
            setErro('');
            setMensagem('');
            const novaEspecialidade = await cadastrarEspecialidade(especialidade);
            setListaEspecialidades(atual => [...atual, novaEspecialidade]);
            setEspecialidade(especialidadeInicial);
            setMensagem("Especialidade Cadastrada com sucesso");

        }catch (error){
            setErro(error.message);
        }finally{
            setSalvando(false);
        }
    }

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
        <form className="formulario" onSubmit={handleSubmit}>
            <label htmlFor="nome">Nome</label>
            <input id='nome' value={especialidade.nome} name='nome' 
            onChange={handleChange} required/>

            <label htmlFor="descricao">Descrição</label>
            <input id='descricao' value={especialidade.descricao} name='descricao' 
            onChange={handleChange} required/>

            <button disabled={salvando}>{salvando ? "Salvando" : "Cadastrar"}</button>
        </form>
        {mensagem && <p>{mensagem}</p>}
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