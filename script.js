
/* =========================================
   MENU DE NAVEGAÇÃO
========================================= */

// Identifica os elementos do menu.
const botaoMenu = document.getElementById("menu-toggle");
const menuPrincipal = document.getElementById("menu-principal");

// Abre e fecha o menu em dispositivos móveis.
botaoMenu.addEventListener("click", function () {

    const menuAberto = menuPrincipal.classList.toggle("menu-aberto");

    botaoMenu.setAttribute("aria-expanded", menuAberto);

    if (menuAberto) {

        botaoMenu.textContent = "✕";

        botaoMenu.setAttribute(
            "aria-label",
            "Fechar menu de navegação"
        );

    } else {

        botaoMenu.textContent = "☰";

        botaoMenu.setAttribute(
            "aria-label",
            "Abrir menu de navegação"
        );

    }

});


// Fecha o menu após selecionar uma seção.
const linksMenu = document.querySelectorAll("#menu-principal a");

linksMenu.forEach(function (link) {

    link.addEventListener("click", function () {

        menuPrincipal.classList.remove("menu-aberto");

        botaoMenu.setAttribute("aria-expanded", "false");

        botaoMenu.textContent = "☰";

        botaoMenu.setAttribute(
            "aria-label",
            "Abrir menu de navegação"
        );

    });

});


/* =========================================
   CONTROLE DO TAMANHO DA FONTE
========================================= */

const botaoAumentar = document.getElementById("aumentar-fonte");
const botaoDiminuir = document.getElementById("diminuir-fonte");

let tamanhoFonte = 16;


// Aumenta o tamanho do texto.
botaoAumentar.addEventListener("click", function () {

    if (tamanhoFonte < 22) {

        tamanhoFonte += 2;

        document.documentElement.style.setProperty(
            "--tamanho-base",
            tamanhoFonte + "px"
        );

        mostrarMensagem(
            "O tamanho do texto foi aumentado."
        );

    } else {

        mostrarMensagem(
            "O tamanho máximo já foi alcançado."
        );

    }

});


// Diminui o tamanho do texto.
botaoDiminuir.addEventListener("click", function () {

    if (tamanhoFonte > 12) {

        tamanhoFonte -= 2;

        document.documentElement.style.setProperty(
            "--tamanho-base",
            tamanhoFonte + "px"
        );

        mostrarMensagem(
            "O tamanho do texto foi diminuído."
        );

    } else {

        mostrarMensagem(
            "O tamanho mínimo já foi alcançado."
        );

    }

});


/* =========================================
   MODO DE ALTO CONTRASTE
========================================= */

const botaoContraste = document.getElementById("alto-contraste");

botaoContraste.addEventListener("click", function () {

    // Alterna a classe de alto contraste.
    const contrasteAtivado = document.body.classList.toggle(
        "alto-contraste"
    );

    // Atualiza o estado do botão.
    botaoContraste.setAttribute(
        "aria-pressed",
        contrasteAtivado
    );

    if (contrasteAtivado) {

        mostrarMensagem(
            "Modo de alto contraste ativado."
        );

    } else {

        mostrarMensagem(
            "Modo de alto contraste desativado."
        );

    }

});


/* =========================================
   LEITURA AUTOMÁTICA DO CONTEÚDO
========================================= */

const botaoLer = document.getElementById("ler-conteudo");
const botaoParar = document.getElementById("parar-leitura");


// Verifica se o navegador oferece síntese de voz.
const possuiLeitura = "speechSynthesis" in window;


// Inicia a leitura do conteúdo principal.
botaoLer.addEventListener("click", function () {

    if (!possuiLeitura) {

        mostrarMensagem(
            "A leitura por voz não está disponível neste navegador."
        );

        return;

    }

    // Interrompe uma leitura anterior.
    window.speechSynthesis.cancel();

    // Seleciona o conteúdo principal do site.
    const conteudo = document.querySelector("main");

    // Cria um texto com as informações da página.
    const texto = conteudo.innerText;

    // Cria o objeto responsável pela leitura.
    const leitura = new SpeechSynthesisUtterance(texto);

    // Define o idioma português brasileiro.
    leitura.lang = "pt-BR";

    // Configura a velocidade e o volume.
    leitura.rate = 0.95;
    leitura.pitch = 1;
    leitura.volume = 1;

    // Inicia a leitura.
    window.speechSynthesis.speak(leitura);

    mostrarMensagem(
        "A leitura do conteúdo foi iniciada."
    );

});


// Interrompe a leitura.
botaoParar.addEventListener("click", function () {

    if (possuiLeitura) {

        window.speechSynthesis.cancel();

        mostrarMensagem(
            "A leitura foi interrompida."
        );

    }

});


/* =========================================
   RESTAURAÇÃO DAS CONFIGURAÇÕES
========================================= */

const botaoRestaurar = document.getElementById("restaurar");

botaoRestaurar.addEventListener("click", function () {

    // Restaura o tamanho original da fonte.
    tamanhoFonte = 16;

    document.documentElement.style.setProperty(
        "--tamanho-base",
        "16px"
    );

    // Desativa o alto contraste.
    document.body.classList.remove("alto-contraste");

    botaoContraste.setAttribute(
        "aria-pressed",
        "false"
    );

    // Interrompe qualquer leitura em andamento.
    if (possuiLeitura) {

        window.speechSynthesis.cancel();

    }

    mostrarMensagem(
        "As configurações foram restauradas ao padrão."
    );

});


/* =========================================
   MENSAGENS DO PAINEL
========================================= */

const mensagem = document.getElementById(
    "mensagem-acessibilidade"
);


// Apresenta mensagens para o usuário.
function mostrarMensagem(texto) {

    mensagem.textContent = texto;

}


/* =========================================
   ATUALIZAÇÃO AUTOMÁTICA DO ANO
========================================= */

// Obtém o ano atual do computador.
const anoAtual = new Date().getFullYear();

// Atualiza o rodapé.
document.getElementById("ano-atual").textContent = anoAtual;


/* =========================================
   INICIALIZAÇÃO DO SITE
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    mostrarMensagem(
        "Ferramentas de acessibilidade disponíveis."
    );

});
