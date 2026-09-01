import { NavLink } from "react-router-dom";

export default function Menu() {
    return (
        <header className="cabecalho">

            <strong>Menu Principal da Clinica React</strong>
            <nav>
                <NavLink to="/">Início</NavLink>
                <NavLink to="/pacientes">Pacientes</NavLink>
            </nav>
        </header>

    );
}