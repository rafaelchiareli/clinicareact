import { Link } from "react-router-dom";

const HomePage = () => {

    return (
        <main className="container">
            <section className="hero">
                <p className="destaque">Sistema da Clinca Death Star</p>
                <h1>Organize os atendimentos em um só lugar</h1>
                <p>Consulte e cadastre pacientes utilizando uma API Rest</p>

                <Link className="botao" to="/pacientes">
                    Acessar Pacientes
                </Link>
            </section>

            <section className="cards">
                <article className="card">
                    <h2>Pacientes</h2>
                    <p>Cadastro e consulta de Pacientes</p>
                </article>
            </section>
            <section className="card card-desabilitado">
                <h2>Consultas</h2>
                <p> Disponivel em breve...</p>
            </section>

        </main>
    )
}
export default HomePage;