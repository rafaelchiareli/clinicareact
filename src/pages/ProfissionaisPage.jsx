import React from "react";
import { useState, useEffect } from "react";
import { listarProfissionais } from "../services/profissionalService";

export default function ProfissionaisPage () {
    const [listaProfissionais, setListaProfissionais] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    useEffect(() =>{
        carregarProfissionais();
    },[])
    async function carregarProfissionais(){
        try{
            setCarregando(true);
            setErro('');
            const dados = await listarProfissionais();
            setListaProfissionais(dados);

        }catch(error){
            setErro(error.message);
        }finally{
            setCarregando(false);
        }
    }
    
    return (<>
      {carregando ? (<p>Carrehango Profisionais</p>)
      : listaProfissionais.length === 0 ? (<p>Nenhum profissional cadastrado</p>)
      : (listaProfissionais.map(prof => (
        <article className="item" key={prof.id}>
            <strong>{prof.nome}</strong>
            <span>{prof.registroProfissional}</span>
              <span>{prof.telefone}</span>
        </article>
      )))
    }
    </>
      
    )
}