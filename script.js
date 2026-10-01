const url = "http://localhost:3000/jogos";

const listaJogos = document.getElementById("listaJogos");
const formJogo = document.getElementById("formJogo");
const mensagem = document.getElementById("mensagem");

const pesquisa = document.getElementById("pesquisa");
const filtroStatus = document.getElementById("filtroStatus");

let idEditando = null;



async function carregarJogos() {

    try {

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar os jogos");
        }

        const jogos = await resposta.json();



        document.getElementById("totalJogos").textContent =
            jogos.length;

        document.getElementById("jogando").textContent =
            jogos.filter(jogo =>
                jogo.status === "Jogando"
            ).length;

        document.getElementById("finalizados").textContent =
            jogos.filter(jogo =>
                jogo.status === "Finalizado"
            ).length;



        const textoPesquisa =
            pesquisa.value.toLowerCase();

        const statusSelecionado =
            filtroStatus.value;


        const jogosFiltrados = jogos.filter(jogo => {

            const combinaPesquisa =
                jogo.titulo
                    .toLowerCase()
                    .includes(textoPesquisa);


            const combinaStatus =
                statusSelecionado === "Todos" ||
                jogo.status === statusSelecionado;


            return combinaPesquisa && combinaStatus;

        });



        listaJogos.innerHTML = "";


        if (jogosFiltrados.length === 0) {

            listaJogos.innerHTML =
                "<p>Nenhum jogo encontrado.</p>";

            return;
        }


        jogosFiltrados.forEach(jogo => {

            const div =
                document.createElement("div");

            div.classList.add("jogo");


            div.innerHTML = `
                <h3>${jogo.titulo}</h3>

                <p>Gênero: ${jogo.genero}</p>

                <p>Plataforma: ${jogo.plataforma}</p>

                <p>Nota: ${jogo.nota}</p>

                <p>Status: ${jogo.status}</p>

                <div class="botoes">

                    <button
                        class="editar"
                        onclick="editarJogo('${jogo.id}')">
                        Editar
                    </button>

                    <button
                        class="excluir"
                        onclick="excluirJogo('${jogo.id}')">
                        Excluir
                    </button>

                </div>
            `;


            listaJogos.appendChild(div);

        });


    } catch (erro) {

        console.error("Erro:", erro);

        listaJogos.innerHTML =
            "<p>Não foi possível conectar com a API.</p>";
    }

}




pesquisa.addEventListener(
    "input",
    carregarJogos
);




filtroStatus.addEventListener(
    "change",
    carregarJogos
);




formJogo.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const titulo =
            document.getElementById("titulo").value.trim();

        const genero =
            document.getElementById("genero").value.trim();

        const plataforma =
            document.getElementById("plataforma").value.trim();

        const nota =
            Number(document.getElementById("nota").value);

        const status =
            document.getElementById("status").value;



        if (titulo === "") {

            mensagem.textContent =
                "Digite o título do jogo.";

            return;
        }


        if (genero === "") {

            mensagem.textContent =
                "Digite o gênero do jogo.";

            return;
        }


        if (plataforma === "") {

            mensagem.textContent =
                "Digite a plataforma do jogo.";

            return;
        }


        if (isNaN(nota) || nota < 0 || nota > 10) {

            mensagem.textContent =
                "A nota precisa estar entre 0 e 10.";

            return;
        }


        if (status === "") {

            mensagem.textContent =
                "Selecione um status.";

            return;
        }


        const jogo = {

            titulo: titulo,

            genero: genero,

            plataforma: plataforma,

            nota: nota,

            status: status

        };


        try {

            let resposta;



            if (idEditando !== null) {

                resposta = await fetch(
                    `${url}/${idEditando}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(jogo)
                    }
                );


                if (!resposta.ok) {

                    throw new Error(
                        "Erro ao editar o jogo"
                    );
                }


                mensagem.textContent =
                    "Jogo editado com sucesso!";


                idEditando = null;


            } else {

                

                resposta = await fetch(
                    url,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(jogo)
                    }
                );


                if (!resposta.ok) {

                    throw new Error(
                        "Erro ao cadastrar o jogo"
                    );
                }


                mensagem.textContent =
                    "Jogo cadastrado com sucesso!";

            }


            formJogo.reset();

            carregarJogos();


        } catch (erro) {

            console.error("Erro:", erro);

            mensagem.textContent =
                "Não foi possível realizar a operação.";
        }

    }
);



async function editarJogo(id) {

    try {

        const resposta =
            await fetch(`${url}/${id}`);


        if (!resposta.ok) {

            throw new Error(
                "Erro ao buscar o jogo"
            );
        }


        const jogo =
            await resposta.json();


        document.getElementById("titulo").value =
            jogo.titulo;

        document.getElementById("genero").value =
            jogo.genero;

        document.getElementById("plataforma").value =
            jogo.plataforma;

        document.getElementById("nota").value =
            jogo.nota;

        document.getElementById("status").value =
            jogo.status;


        idEditando = id;


        mensagem.textContent =
            "Edite os dados e clique no botão para salvar.";


        formJogo.scrollIntoView({
            behavior: "smooth"
        });


    } catch (erro) {

        console.error("Erro:", erro);

        mensagem.textContent =
            "Não foi possível carregar o jogo.";
    }

}



async function excluirJogo(id) {

    const confirmar =
        confirm(
            "Tem certeza que deseja excluir este jogo?"
        );


    if (!confirmar) {
        return;
    }


    try {

        const resposta =
            await fetch(
                `${url}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!resposta.ok) {

            throw new Error(
                "Erro ao excluir o jogo"
            );
        }


        mensagem.textContent =
            "Jogo excluído com sucesso!";


        carregarJogos();


    } catch (erro) {

        console.error("Erro:", erro);

        mensagem.textContent =
            "Não foi possível excluir o jogo.";
    }

}




carregarJogos();