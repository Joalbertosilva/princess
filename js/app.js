function apurarResultado(respostas) {
  const pontos = {};
  const principais = {};
  CONTEUDO.princesas.forEach(function (princesa) {
    pontos[princesa.id] = 0;
    principais[princesa.id] = 0;
  });

  const pesoPrincipal = CONTEUDO.pontuacao.principal;
  const pesoSecundaria = CONTEUDO.pontuacao.secundaria;

  respostas.forEach(function (indice, pergunta) {
    const opcao = CONTEUDO.perguntas[pergunta].opcoes[indice];
    pontos[opcao.principal] += pesoPrincipal;
    pontos[opcao.secundaria] += pesoSecundaria;
    principais[opcao.principal] += 1;
  });

  let candidatas = CONTEUDO.princesas.map(function (princesa) {
    return princesa.id;
  });
  const maiorPonto = Math.max.apply(null, candidatas.map(function (id) {
    return pontos[id];
  }));
  candidatas = candidatas.filter(function (id) {
    return pontos[id] === maiorPonto;
  });

  if (candidatas.length > 1) {
    const maiorPrincipal = Math.max.apply(null, candidatas.map(function (id) {
      return principais[id];
    }));
    candidatas = candidatas.filter(function (id) {
      return principais[id] === maiorPrincipal;
    });
  }

  for (let q = respostas.length - 1; q >= 0 && candidatas.length > 1; q -= 1) {
    const opcao = CONTEUDO.perguntas[q].opcoes[respostas[q]];
    const ganhos = candidatas.map(function (id) {
      let ganho = 0;
      if (opcao.principal === id) ganho += pesoPrincipal;
      if (opcao.secundaria === id) ganho += pesoSecundaria;
      return ganho;
    });
    const referencia = ganhos[0];
    if (ganhos.every(function (ganho) { return ganho === referencia; })) continue;
    const topo = Math.max.apply(null, ganhos);
    candidatas = candidatas.filter(function (_, indice) {
      return ganhos[indice] === topo;
    });
  }

  return candidatas[0];
}

(function () {
  if (typeof document === "undefined") return;

  const palco = document.getElementById("palco");
  const botaoMusica = document.getElementById("musica");
  const audio = document.getElementById("trilha");
  const total = CONTEUDO.perguntas.length;

  const estado = {
    tela: "capa",
    pergunta: 0,
    respostas: Array(total).fill(null),
    resultado: null,
    respostasDoResultado: null,
    principeAberto: false,
    cartaAberta: false,
  };

  let travado = false;
  let turno = 0;

  function esc(valor) {
    return String(valor)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function modelo(texto, dados) {
    return String(texto).replace(/\{(\w+)\}/g, function (_, chave) {
      return dados[chave] == null ? "" : String(dados[chave]);
    });
  }

  function princesaPorId(id) {
    return CONTEUDO.princesas.find(function (princesa) {
      return princesa.id === id;
    });
  }

  function movimentoReduzido() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function tracoEscolhido(id, respostas) {
    if (!respostas || respostas.some(function (resposta) { return resposta == null; })) return "";
    for (let q = respostas.length - 1; q >= 0; q -= 1) {
      const opcao = CONTEUDO.perguntas[q].opcoes[respostas[q]];
      if (opcao.principal === id && opcao.traco) return opcao.traco;
    }
    return "";
  }

  function divisor() {
    return (
      '<svg class="divisor" viewBox="0 0 220 18" aria-hidden="true" focusable="false">' +
      '<path d="M8 9 H92"></path>' +
      '<path d="M110 9 c-8-8-18-8-18 0 0 8 10 8 18 0 8-8 18-8 18 0 0 8-10 8-18 0z"></path>' +
      '<path d="M128 9 H212"></path>' +
      "</svg>"
    );
  }

  const ORNAMENTOS = {
    tiana:
      '<svg viewBox="0 0 160 40" aria-hidden="true" focusable="false">' +
      '<path d="M8 20 H48"></path><path d="M112 20 H152"></path>' +
      '<path d="M80 32 C80 22 70 20 67 13 C64 7 74 5 80 14 C86 5 96 7 93 13 C90 20 80 22 80 32 Z"></path>' +
      '<path d="M80 16 V31"></path></svg>',
    cinderela:
      '<svg viewBox="0 0 160 40" aria-hidden="true" focusable="false">' +
      '<path d="M8 20 H48"></path><path d="M112 20 H152"></path>' +
      '<path d="M86 8 C74 10 68 15 68 20 C68 29 78 33 86 32 C77 30 75 24 75 20 C75 14 79 10 86 8 Z"></path>' +
      '<path d="M58 15 h7 M61.5 11.5 v7"></path><path d="M100 13 h5 M102.5 10.5 v5"></path></svg>',
    branca:
      '<svg viewBox="0 0 160 40" aria-hidden="true" focusable="false">' +
      '<path d="M8 20 H48"></path><path d="M112 20 H152"></path>' +
      '<path d="M80 20 C72 11 61 14 66 21 C61 28 72 30 80 21 C88 30 99 28 94 21 C99 14 88 11 80 20 Z"></path>' +
      '<path d="M80 20 v8"></path></svg>',
    bela:
      '<svg viewBox="0 0 160 40" aria-hidden="true" focusable="false">' +
      '<path d="M8 20 H50"></path><path d="M110 20 H152"></path>' +
      '<path d="M80 30 V12"></path>' +
      '<path d="M80 14 C74 12 66 14 63 21 C67 18 74 18 80 23"></path>' +
      '<path d="M80 14 C86 12 94 14 97 21 C93 18 86 18 80 23"></path></svg>',
    rapunzel:
      '<svg viewBox="0 0 160 40" aria-hidden="true" focusable="false">' +
      '<path d="M8 20 H52"></path><path d="M108 20 H152"></path>' +
      '<path d="M80 6 v4"></path><path d="M73 11 h14 v10 c0 5 -14 5 -14 0 z"></path>' +
      '<path d="M76 25 v4 M84 25 v4"></path><circle cx="80" cy="16" r="1.3"></circle></svg>',
    ariel:
      '<svg viewBox="0 0 160 40" aria-hidden="true" focusable="false">' +
      '<path d="M8 20 H50"></path><path d="M110 20 H152"></path>' +
      '<path d="M80 32 C67 32 65 18 80 9 C95 18 93 32 80 32 Z"></path>' +
      '<path d="M80 32 V13"></path><path d="M74 28 C74 21 77 16 80 13"></path>' +
      '<path d="M86 28 C86 21 83 16 80 13"></path></svg>',
    jasmine:
      '<svg viewBox="0 0 160 40" aria-hidden="true" focusable="false">' +
      '<path d="M8 20 H52"></path><path d="M108 20 H152"></path>' +
      '<path d="M80 7 L89 18 L80 33 L71 18 Z"></path><path d="M71 18 H89"></path>' +
      '<circle cx="80" cy="18" r="1.5"></circle></svg>',
  };

  function enfeite() {
    const desenho = estado.resultado && ORNAMENTOS[estado.resultado];
    if (!desenho) return "";
    return '<div class="ornamento" aria-hidden="true">' + desenho + "</div>";
  }

  const CORES_TEMA = {
    tiana: "#f3f6ee",
    cinderela: "#f4f6fb",
    branca: "#fbf6ef",
    bela: "#f8f1e4",
    rapunzel: "#f7f2f8",
    ariel: "#f3f7f6",
    jasmine: "#f6f4ec",
  };

  function aplicarTema() {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (estado.resultado) {
      document.documentElement.dataset.tema = estado.resultado;
      if (meta) meta.setAttribute("content", CORES_TEMA[estado.resultado] || "#fbf6ef");
    } else {
      delete document.documentElement.dataset.tema;
      if (meta) meta.setAttribute("content", "#fbf6ef");
    }
  }

  function desenhoVazio(iniciais) {
    return (
      '<svg class="desenho" viewBox="0 0 120 160" aria-hidden="true" focusable="false">' +
      '<path d="M26 150 V60 C26 28 94 28 94 60 V150"></path>' +
      '<path d="M26 150 H94"></path>' +
      '<path d="M60 78 l7 7 -7 7 -7 -7 z"></path>' +
      "</svg>" +
      '<span class="iniciais">' + esc(iniciais) + "</span>"
    );
  }

  function moldura(opcoes) {
    const fallback = opcoes.fallback && opcoes.fallback !== opcoes.src
      ? ' data-fallback="' + esc(opcoes.fallback) + '"'
      : "";
    const prioridade = opcoes.prioridade ? ' fetchpriority="' + esc(opcoes.prioridade) + '"' : "";
    const lazy = opcoes.lazy ? ' loading="lazy"' : "";
    const largura = opcoes.largura || 768;
    const altura = opcoes.altura || 1024;
    return (
      '<figure class="moldura ' + esc(opcoes.classe || "") + '">' +
      '<img src="' + esc(opcoes.src) + '" alt="' + esc(opcoes.alt) + '"' +
      ' width="' + largura + '" height="' + altura + '" data-retrato="1"' + fallback +
      ' data-iniciais="' + esc(opcoes.iniciais) + '"' +
      ' data-alt-vazio="' + esc(opcoes.vazio || opcoes.alt) + '"' +
      prioridade + lazy + ' decoding="async">' +
      "</figure>"
    );
  }

  function ligarRetratos(raiz) {
    raiz.querySelectorAll("img[data-retrato]").forEach(function (img) {
      const virarMoldura = function () {
        const figura = img.closest(".moldura");
        if (!figura || figura.classList.contains("moldura-vazia")) return;
        figura.classList.add("moldura-vazia");
        figura.setAttribute("role", "img");
        figura.setAttribute("aria-label", img.dataset.altVazio || img.alt);
        figura.innerHTML = desenhoVazio(img.dataset.iniciais || "");
      };
      let tratado = false;
      const aoErro = function () {
        if (tratado) return;
        const reserva = img.getAttribute("data-fallback");
        if (reserva) {
          tratado = true;
          img.removeAttribute("data-fallback");
          img.addEventListener("error", virarMoldura, { once: true });
          img.src = reserva;
          return;
        }
        tratado = true;
        virarMoldura();
      };
      if (img.complete && img.naturalWidth > 0) {
        img.style.visibility = "";
      } else {
        img.style.visibility = "hidden";
        img.addEventListener("load", function () { img.style.visibility = ""; });
      }
      img.addEventListener("error", aoErro);
      if (img.complete && img.naturalWidth === 0) aoErro();
    });

    const juntos = raiz.querySelector("[data-juntos]");
    if (!juntos) return;
    const figura = juntos.closest("figure");
    const mostrar = function () { figura.hidden = false; };
    const remover = function () { figura.remove(); };
    if (juntos.complete && juntos.naturalWidth > 0) mostrar();
    else if (juntos.complete) remover();
    else {
      juntos.addEventListener("load", mostrar, { once: true });
      juntos.addEventListener("error", remover, { once: true });
    }
  }

  function focarPagina() {
    const alvo = palco.querySelector(".enunciado") || palco.querySelector("h1");
    window.scrollTo(0, 0);
    if (!alvo) return;
    alvo.setAttribute("tabindex", "-1");
    alvo.focus({ preventScroll: true });
  }

  function render(opcoes) {
    aplicarTema();
    const telas = {
      capa: renderCapa,
      quiz: renderQuiz,
      resultado: renderResultado,
      galeria: renderGaleria,
      principe: renderPrincipe,
    };
    palco.innerHTML = (telas[estado.tela] || renderCapa)();
    ligarRetratos(palco);
    if (!opcoes || opcoes.foco !== false) focarPagina();
  }

  function transicao(aplicar) {
    if (travado) return;
    if (movimentoReduzido()) {
      aplicar();
      render();
      return;
    }

    travado = true;
    const id = ++turno;
    palco.classList.add("saindo");

    let seguiu = false;
    const seguir = function () {
      if (seguiu || id !== turno) return;
      seguiu = true;
      aplicar();
      palco.classList.remove("saindo");
      render();
      void palco.offsetWidth;
      palco.classList.add("entrando");
      window.setTimeout(function () {
        if (id !== turno) return;
        palco.classList.remove("entrando");
        travado = false;
      }, 480);
    };

    palco.addEventListener("animationend", function noFim(evento) {
      if (evento.target !== palco) return;
      palco.removeEventListener("animationend", noFim);
      seguir();
    });
    window.setTimeout(seguir, 520);
  }

  function ir(tela, extra) {
    transicao(function () {
      estado.tela = tela;
      if (extra) extra();
    });
  }

  function renderCapa() {
    const t = CONTEUDO.textos;
    const rever = estado.resultado
      ? '<button type="button" class="btn discreto" data-acao="rever">' + esc(t.reverResultado) + "</button>"
      : "";
    return (
      '<section class="pagina pagina-capa">' +
      '<p class="olho">' + esc(t.olhoCapa) + "</p>" +
      moldura({
        src: CONTEUDO.midias.fotoPrincipal,
        alt: CONTEUDO.midias.altPrincipal,
        vazio: "Moldura ilustrada no lugar do retrato de " + CONTEUDO.nomeDela,
        iniciais: CONTEUDO.midias.iniciaisDela,
        classe: "moldura-capa",
        prioridade: "high",
      }) +
      '<h1><span class="era">Era uma vez,</span> <span class="nome">' + esc(CONTEUDO.nomeDela) + "</span></h1>" +
      (estado.resultado ? enfeite() : divisor()) +
      '<p class="frase">' + esc(t.fraseCapa) + "</p>" +
      '<div class="acoes">' +
      '<button type="button" class="btn" data-acao="abrir">' + esc(t.abrirConto) + "</button>" +
      rever +
      "</div>" +
      '<p class="dedicacao">' + esc(t.dedicacao) + "</p>" +
      "</section>"
    );
  }

  function renderQuiz() {
    const t = CONTEUDO.textos;
    const pergunta = CONTEUDO.perguntas[estado.pergunta];
    const marcada = estado.respostas[estado.pergunta];
    const ultima = estado.pergunta === total - 1;
    const progresso = ((estado.pergunta + 1) / total) * 100;
    const passo = modelo(t.passo, { atual: estado.pergunta + 1, total: total });
    const opcoes = pergunta.opcoes.map(function (opcao, indice) {
      return (
        '<label class="opcao">' +
        '<input type="radio" name="resposta" value="' + indice + '"' +
        (marcada === indice ? " checked" : "") + ">" +
        "<span>" + esc(opcao.texto) + "</span></label>"
      );
    }).join("");

    return (
      '<section class="pagina pagina-quiz">' +
      enfeite() +
      "<h1>" + esc(t.tituloQuiz) + "</h1>" +
      '<p class="passo" id="passo">' + esc(passo) + "</p>" +
      '<div class="progresso" role="progressbar" aria-valuemin="1" aria-valuemax="' + total +
      '" aria-valuenow="' + (estado.pergunta + 1) + '" aria-valuetext="' + esc(passo) + '">' +
      '<span style="width:' + progresso.toFixed(2) + '%"></span></div>' +
      '<form id="form-quiz">' +
      '<h2 class="enunciado" id="enunciado">' + esc(pergunta.enunciado) + "</h2>" +
      '<div class="opcoes" role="radiogroup" aria-labelledby="enunciado">' + opcoes + "</div>" +
      '<div class="nav-quiz">' +
      '<button type="button" class="btn secundario" data-acao="voltar">' + esc(t.voltar) + "</button>" +
      '<button type="button" class="btn" id="continuar" data-acao="continuar"' +
      (marcada == null ? " disabled" : "") + ">" +
      esc(ultima ? t.descobrir : t.continuar) +
      "</button></div></form></section>"
    );
  }

  function renderResultado() {
    const t = CONTEUDO.textos;
    const princesa = princesaPorId(estado.resultado);
    const traco = tracoEscolhido(princesa.id, estado.respostasDoResultado);
    const paragrafos = [princesa.revelacao];
    if (traco) paragrafos.push(traco);
    return (
      '<section class="pagina pagina-revelacao">' +
      '<p class="olho">' + esc(t.olhoRevelacao) + "</p>" +
      "<h1>" + esc(modelo(t.tituloResultado, { princesa: princesa.nome })) + "</h1>" +
      enfeite() +
      moldura({
        src: princesa.imagem,
        fallback: CONTEUDO.midias.fotoPrincipal,
        alt: CONTEUDO.midias.altPrincipal,
        vazio: "Moldura ilustrada no lugar do retrato de " + CONTEUDO.nomeDela,
        iniciais: CONTEUDO.midias.iniciaisDela,
        classe: "moldura-revelacao",
      }) +
      '<p class="qualidade">' + esc(princesa.qualidade) + "</p>" +
      '<div class="texto">' + paragrafos.map(function (paragrafo) {
        return "<p>" + esc(paragrafo) + "</p>";
      }).join("") + "</div>" +
      '<div class="acoes">' +
      '<button type="button" class="btn" data-acao="final">' + esc(t.faltaPagina) + "</button>" +
      '<button type="button" class="btn secundario" data-acao="galeria">' + esc(t.conhecer) + "</button>" +
      '<button type="button" class="btn discreto" data-acao="refazer">' + esc(t.refazer) + "</button>" +
      "</div></section>"
    );
  }

  function renderGaleria() {
    const t = CONTEUDO.textos;
    const entradas = CONTEUDO.princesas.map(function (princesa) {
      const sua = princesa.id === estado.resultado;
      return (
        '<article class="entrada' + (sua ? " entrada-sua" : "") + '">' +
        moldura({
          src: princesa.imagem,
          alt: "Retrato de " + CONTEUDO.nomeDela + " — " + princesa.nome,
          vazio: "Moldura ilustrada no lugar do retrato de " + princesa.nome,
          iniciais: CONTEUDO.midias.iniciaisDela,
          classe: "moldura-mini",
          lazy: true,
        }) +
        "<div>" +
        (sua ? '<p class="marca">' + esc(t.aSua) + "</p>" : "") +
        "<h2>" + esc(princesa.nome) + "</h2>" +
        "<p>" + esc(princesa.historia) + "</p>" +
        '<p class="qualidade">' + esc(princesa.qualidade) + "</p></div></article>"
      );
    }).join("");
    const botao = '<button type="button" class="btn" data-acao="rever">' + esc(t.voltarResultado) + "</button>";
    return (
      '<section class="pagina pagina-galeria">' +
      '<p class="olho">' + esc(t.olhoGaleria) + "</p>" +
      enfeite() +
      "<h1>" + esc(t.tituloGaleria) + "</h1>" +
      '<div class="acoes acoes-inicio">' + botao + "</div>" +
      '<div class="lista">' + entradas + "</div>" +
      '<div class="acoes">' + botao + "</div></section>"
    );
  }

  function htmlCarta() {
    return (
      '<article class="carta-papel" id="carta">' +
      CONTEUDO.carta.paragrafos.map(function (paragrafo) {
        return "<p>" + esc(paragrafo) + "</p>";
      }).join("") +
      '<p class="assinatura">' + esc(CONTEUDO.carta.assinatura) + "</p>" +
      '<figure class="foto-juntos" hidden>' +
      '<img data-juntos="1" src="' + esc(CONTEUDO.midias.nosDois) + '" alt="' +
      esc(CONTEUDO.midias.altJuntos) + '" width="768" height="1024" decoding="async">' +
      "</figure></article>"
    );
  }

  function renderPrincipe() {
    const t = CONTEUDO.textos;
    let miolo;
    const princesa = princesaPorId(estado.resultado);
    if (!estado.principeAberto) {
      miolo =
        enfeite() +
        '<div class="acoes">' +
        '<button type="button" class="btn" data-acao="virar">' + esc(t.virarPagina) + "</button>" +
        '<button type="button" class="btn discreto" data-acao="rever">' + esc(t.voltarResultado) + "</button>" +
        "</div>";
    } else {
      const carta = estado.cartaAberta
        ? htmlCarta()
        : '<div class="envelope"><div class="envelope-corpo" aria-hidden="true"><div class="aba"></div><div class="lacre"></div></div>' +
          '<button type="button" class="btn" data-acao="carta" aria-expanded="false">' + esc(t.abrirCarta) + "</button></div>";
      const srcCasal = princesa && princesa.casal ? princesa.casal : CONTEUDO.midias.principe;
      miolo =
        (princesa ? '<p class="com-ela">' + esc(modelo(t.comPrincesa, { princesa: princesa.nome })) + "</p>" : "") +
        enfeite() +
        moldura({
          src: srcCasal,
          fallback: srcCasal === CONTEUDO.midias.principe ? "" : CONTEUDO.midias.principe,
          alt: princesa && princesa.altCasal ? princesa.altCasal : CONTEUDO.midias.altPrincipe,
          vazio: "Moldura ilustrada no lugar do retrato de " + CONTEUDO.meuNome,
          iniciais: CONTEUDO.midias.iniciaisMeu,
          classe: "moldura-casal",
          largura: 819,
          altura: 1024,
          prioridade: "high",
        }) +
        '<p class="fala">' + esc(t.frasePrincipe) + "</p>" +
        carta +
        '<div class="acoes acoes-fim">' +
        '<button type="button" class="btn secundario" data-acao="capa">' + esc(t.voltarCapa) + "</button>" +
        '<button type="button" class="btn discreto" data-acao="rever">' + esc(t.reverResultado) + "</button>" +
        "</div>";
    }

    return (
      '<section class="pagina pagina-final ' + (estado.principeAberto ? "aberta" : "fechada") + '">' +
      '<p class="olho">' + esc(t.olhoFinal) + "</p>" +
      "<h1>" + esc(t.perguntaPrincipe) + "</h1>" +
      miolo +
      "</section>"
    );
  }

  function selecionar(indice) {
    estado.respostas[estado.pergunta] = indice;
    const continuar = document.getElementById("continuar");
    if (continuar) continuar.disabled = false;
  }

  function continuarQuiz() {
    const marcado = palco.querySelector('input[name="resposta"]:checked');
    if (!marcado) return;
    estado.respostas[estado.pergunta] = Number(marcado.value);
    if (estado.pergunta < total - 1) {
      transicao(function () { estado.pergunta += 1; });
      return;
    }
    const snapshot = estado.respostas.slice();
    estado.respostasDoResultado = snapshot;
    estado.resultado = apurarResultado(snapshot);
    estado.principeAberto = false;
    estado.cartaAberta = false;
    ir("resultado");
  }

  function abrirCarta() {
    if (estado.cartaAberta) return;
    estado.cartaAberta = true;
    const envelope = palco.querySelector(".envelope");
    if (!envelope) {
      render({ foco: false });
      return;
    }
    envelope.outerHTML = htmlCarta();
    ligarRetratos(palco);
    const carta = document.getElementById("carta");
    if (!carta) return;
    if (!movimentoReduzido()) carta.classList.add("abrindo");
    carta.scrollIntoView({ behavior: movimentoReduzido() ? "auto" : "smooth", block: "nearest" });
    carta.setAttribute("tabindex", "-1");
    carta.focus({ preventScroll: true });
  }

  function aoClicar(evento) {
    const botao = evento.target.closest("[data-acao]");
    if (!botao || !palco.contains(botao)) return;
    const acao = botao.dataset.acao;
    if (acao === "abrir") {
      estado.pergunta = 0;
      ir("quiz");
    } else if (acao === "rever") {
      if (estado.resultado) ir("resultado");
    } else if (acao === "voltar") {
      if (estado.pergunta === 0) ir("capa");
      else transicao(function () { estado.pergunta -= 1; });
    } else if (acao === "continuar") {
      continuarQuiz();
    } else if (acao === "final") {
      ir("principe");
    } else if (acao === "galeria") {
      ir("galeria");
    } else if (acao === "refazer") {
      estado.respostas = Array(total).fill(null);
      estado.pergunta = 0;
      ir("quiz");
    } else if (acao === "virar") {
      transicao(function () { estado.principeAberto = true; });
    } else if (acao === "carta") {
      abrirCarta();
    } else if (acao === "capa") {
      ir("capa");
    }
  }

  function prepararMusica() {
    const src = CONTEUDO.midias.trilha;
    botaoMusica.setAttribute("aria-label", CONTEUDO.textos.ativarMusica);
    if (!src) return;
    const mostrar = function () {
      botaoMusica.hidden = false;
      document.body.classList.add("com-musica");
    };
    const esconder = function () {
      botaoMusica.hidden = true;
      document.body.classList.remove("com-musica");
      audio.removeAttribute("src");
    };
    audio.loop = true;
    audio.preload = "metadata";
    audio.volume = Number(CONTEUDO.midias.volume) || 0.22;
    audio.addEventListener("loadedmetadata", mostrar);
    audio.addEventListener("error", esconder);
    audio.src = src;
  }

  function atualizarMusica() {
    const tocando = !audio.paused && !audio.ended;
    botaoMusica.setAttribute("aria-pressed", tocando ? "true" : "false");
    botaoMusica.setAttribute("aria-label", tocando ? CONTEUDO.textos.pausarMusica : CONTEUDO.textos.ativarMusica);
  }

  function alternarMusica() {
    audio.volume = Number(CONTEUDO.midias.volume) || 0.22;
    if (audio.paused) {
      const promessa = audio.play();
      if (promessa && typeof promessa.then === "function") {
        promessa.then(atualizarMusica).catch(function () { atualizarMusica(); });
      } else {
        atualizarMusica();
      }
    } else {
      audio.pause();
      atualizarMusica();
    }
  }

  palco.addEventListener("click", aoClicar);
  palco.addEventListener("change", function (evento) {
    if (evento.target.name === "resposta") selecionar(Number(evento.target.value));
  });
  palco.addEventListener("submit", function (evento) {
    evento.preventDefault();
  });
  botaoMusica.addEventListener("click", alternarMusica);

  document.title = CONTEUDO.textos.tituloLivro;
  prepararMusica();
  render();
})();
