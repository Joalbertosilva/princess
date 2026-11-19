/* Edite este arquivo para mudar nomes, textos, carta, perguntas e caminhos.
   A lógica das páginas fica em js/app.js. */

const nomeDela = "Ayres Sabrina";
const meuNome = "João Alberto";

const CONTEUDO = {
  nomeDela,
  meuNome,
  data: "18 de novembro",

  pontuacao: {
    principal: 2,
    secundaria: 1,
  },

  textos: {
    tituloLivro: `Era uma vez, ${nomeDela}`,
    fraseCapa: "Hoje eu fiz uma coisa só pra você.",
    abrirConto: "Abrir meu conto",
    dedicacao: `18 de novembro • Um presente de ${meuNome}`,
    reverResultado: "Rever meu resultado",
    ativarMusica: "Ativar música",
    pausarMusica: "Pausar música",
    tituloQuiz: "Qual princesa seria você?",
    passo: "Pergunta {atual} de {total}",
    voltar: "Voltar",
    continuar: "Continuar",
    descobrir: "Descobrir minha princesa",
    tituloResultado: "Você seria a princesa {princesa}",
    faltaPagina: "Ainda falta uma página…",
    conhecer: "Conhecer as princesas",
    refazer: "Refazer o quiz",
    tituloGaleria: "Sete jeitos de ser princesa",
    voltarResultado: "Voltar ao meu resultado",
    perguntaPrincipe: "E como é o seu príncipe?",
    virarPagina: "Virar a última página",
    frasePrincipe: "Acho que você já conhece esse aqui.",
    abrirCarta: "Abrir minha carta",
    voltarCapa: "Voltar à capa",
    olhoCapa: "Um conto",
    olhoRevelacao: "A revelação",
    olhoGaleria: "Se quiser folhear",
    olhoFinal: "A última página",
    comPrincesa: "Com a princesa {princesa}",
    aSua: "A sua",
  },

  midias: {
    fotoPrincipal: "assets/img/foto-principal.webp",
    principe: "assets/img/principe.webp",
    nosDois: "assets/img/nos-dois.webp",
    trilha: "assets/audio/trilha.mp3",
    volume: 0.22,
    altPrincipal: "Retrato de Ayres Sabrina",
    altPrincipe: "Retrato de João Alberto",
    altJuntos: "Foto de Ayres Sabrina e João Alberto",
    iniciaisDela: "AS",
    iniciaisMeu: "JA",
  },

  carta: {
    paragrafos: [
      "Amor, confesso que fiz essa brincadeira hoje pois não sabia que hoje era o dia da princesa kkk. Mas vim fazer esse quiz legalzinho pra você poder brincar e saber qual princesa você seria, e como você seria.",
      "Te amo muito e estarei sempre aqui disposto a fazer qualquer coisinha brega pra você. Um xero do seu sapo, fera, tritão, indiano, príncipe e por aí vai… kkk (características dos príncipes do quiz 🤭).",
    ],
    assinatura: "Te amo, minha princesa Ayres ❤️",
  },

  princesas: [
    {
      id: "tiana",
      nome: "Tiana",
      imagem: "assets/img/tiana.webp",
      casal: "assets/img/casal-tiana.webp",
      altCasal: "Ayres Sabrina e João Alberto no jardim iluminado da Tiana",
      revelacao:
        "Nas suas respostas, o que aparece é alguém que não espera a condição perfeita para começar e que trata o que importa com dedicação. Você junta esforço e um jeito próprio de dar forma às coisas.",
      historia:
        "Tiana insiste num sonho que quer construir com o próprio trabalho, e no meio do caminho aprende que realizar não é o contrário de amar. Mesmo quando o plano entorta, ela segue criando um jeito de chegar lá.",
      qualidade: "Representa a determinação.",
    },
    {
      id: "cinderela",
      nome: "Cinderela",
      imagem: "assets/img/cinderela.webp",
      casal: "assets/img/casal-cinderela.webp",
      altCasal: "Ayres Sabrina e João Alberto na escadaria ao luar da Cinderela",
      revelacao:
        "As suas escolhas mostram um jeito gentil de atravessar as coisas, sem alarde e sem pressa de endurecer. Há esperança nessa calma, e ela não depende de um momento especial para existir.",
      historia:
        "Cinderela atravessa dias duros sem perder a delicadeza, até que uma noite inesperada devolve a ela a chance de ser vista por inteiro. A história lembra que a serenidade também sustenta quem segue em frente.",
      qualidade: "Representa a gentileza.",
    },
    {
      id: "branca",
      nome: "Branca de Neve",
      imagem: "assets/img/branca-de-neve.webp",
      casal: "assets/img/casal-branca.webp",
      altCasal: "Ayres Sabrina e João Alberto no bosque da Branca de Neve",
      revelacao:
        "Você responde como quem cuida: repara em quem está por perto, acolhe sem fazer alarde e encontra valor no que é simples. É um cuidado que não pede plateia para ser de verdade.",
      historia:
        "Branca de Neve sai de casa sem abrigo e transforma o lugar onde chega em espaço de cuidado mútuo. Ela trata um gesto miúdo, uma mesa posta, um canto quieto, como se isso bastasse para recomeçar.",
      qualidade: "Representa o acolhimento.",
    },
    {
      id: "bela",
      nome: "Bela",
      imagem: "assets/img/bela.webp",
      casal: "assets/img/casal-bela.webp",
      altCasal: "Ayres Sabrina e João Alberto na biblioteca da Bela",
      revelacao:
        "Dá para ver curiosidade nas suas respostas, e também o hábito de escutar até o fim. Você pensa com a própria cabeça e, ainda assim, tenta entender o que a outra pessoa sente.",
      historia:
        "Bela escolhe as próprias perguntas mesmo quando o lugar onde vive acha isso estranho, e acaba enxergando além da aparência de quem todos evitam. O que move a história dela é a empatia de quem não terceiriza o que pensa.",
      qualidade: "Representa a curiosidade.",
    },
    {
      id: "rapunzel",
      nome: "Rapunzel",
      imagem: "assets/img/rapunzel.webp",
      casal: "assets/img/casal-rapunzel.webp",
      altCasal: "Ayres Sabrina e João Alberto entre as lanternas da Rapunzel",
      revelacao:
        "As suas escolhas têm imaginação e um lado espontâneo: você não precisa do roteiro fechado para topar viver uma coisa. Explorar, para você, parece parte de estar presente.",
      historia:
        "Rapunzel passa anos olhando o mundo por uma janela, até a vontade de ver com os próprios olhos ficar maior do que o medo. Lá fora, a imaginação dela deixa de ser espera e vira caminho.",
      qualidade: "Representa a imaginação.",
    },
    {
      id: "ariel",
      nome: "Ariel",
      imagem: "assets/img/ariel.webp",
      casal: "assets/img/casal-ariel.webp",
      altCasal: "Ayres Sabrina e João Alberto à beira do mar da Ariel",
      revelacao:
        "Você se mostra disposta a mudar de caminho quando algo chama de verdade, mesmo que o novo ainda seja desconhecido. Há ousadia nisso, e também curiosidade por mundos que não são o de sempre.",
      historia:
        "Ariel se interessa por um mundo que não é o dela e aceita o risco de mudar para chegar mais perto. A história fala de curiosidade e da disposição de trocar o conhecido pelo que ainda não se entende.",
      qualidade: "Representa a ousadia.",
    },
    {
      id: "jasmine",
      nome: "Jasmine",
      imagem: "assets/img/jasmine.webp",
      casal: "assets/img/casal-jasmine.webp",
      altCasal: "Ayres Sabrina e João Alberto no jardim do palácio da Jasmine",
      revelacao:
        "As suas respostas têm autonomia e uma coragem quieta de se posicionar. Você liga o que sente ao que acha justo, e não gosta de decisão que apague a sua voz.",
      historia:
        "Jasmine recusa uma vida desenhada só por outras pessoas e sai para ver o reino como ele é, não apenas como lhe contam. Ela fica do lado de quem pode decidir e de quem pergunta se a regra é justa.",
      qualidade: "Representa a autonomia.",
    },
  ],

  perguntas: [
    {
      enunciado: "Quando uma surpresa chega sem aviso, o que você faz primeiro?",
      opcoes: [
        {
          texto: "Assumo o que depende de mim e começo a resolver.",
          principal: "tiana",
          secundaria: "jasmine",
          traco: "Uma das suas respostas deixa isso visível: quando uma surpresa chega, você assume o que depende de você e começa a resolver.",
        },
        {
          texto: "Respiro, aceito o momento e sigo a minha parte com calma.",
          principal: "cinderela",
          secundaria: "tiana",
          traco: "Uma das suas respostas deixa isso visível: diante de uma surpresa, você respira, aceita o momento e segue a sua parte com calma.",
        },
        {
          texto: "Penso em quem está comigo e em como cada pessoa está recebendo aquilo.",
          principal: "branca",
          secundaria: "bela",
          traco: "Uma das suas respostas deixa isso visível: numa surpresa, você pensa primeiro em quem está com você.",
        },
        {
          texto: "Quero saber de onde aquilo veio e o que pode mudar a partir dali.",
          principal: "bela",
          secundaria: "ariel",
          traco: "Uma das suas respostas deixa isso visível: você quer entender de onde a surpresa veio antes de se decidir.",
        },
      ],
    },
    {
      enunciado: "Numa amizade, o que mais importa para você?",
      opcoes: [
        {
          texto: "Ter com quem inventar um plano no meio do caminho, com leveza.",
          principal: "rapunzel",
          secundaria: "cinderela",
          traco: "Uma das suas respostas deixa isso visível: na amizade, você valoriza inventar um plano no meio do caminho, com leveza.",
        },
        {
          texto: "Alguém que tope conhecer o que eu ainda não conheço e que fale com sinceridade.",
          principal: "ariel",
          secundaria: "jasmine",
          traco: "Uma das suas respostas deixa isso visível: você preza uma amizade que tope o desconhecido e fale com sinceridade.",
        },
        {
          texto: "Poder dizer o que penso, sabendo que a outra pessoa também se dedica à amizade.",
          principal: "jasmine",
          secundaria: "tiana",
          traco: "Uma das suas respostas deixa isso visível: você quer poder dizer o que pensa numa amizade que também se dedica.",
        },
        {
          texto: "Saber que a gente constrói junto, e ainda sobra espaço para sonhar no meio.",
          principal: "tiana",
          secundaria: "rapunzel",
          traco: "Uma das suas respostas deixa isso visível: você gosta de construir uma amizade junto, com espaço para sonhar.",
        },
      ],
    },
    {
      enunciado: "Num dia livre, sem compromisso, você tende a…",
      opcoes: [
        {
          texto: "Fazer algo devagar e deixar o dia me levar, sem hora marcada.",
          principal: "cinderela",
          secundaria: "rapunzel",
          traco: "Uma das suas respostas deixa isso visível: num dia livre, você gosta de ir devagar e sem hora marcada.",
        },
        {
          texto: "Cuidar de uma coisa pequena, uma planta, a casa ou alguém, e conversar sem pressa.",
          principal: "branca",
          secundaria: "bela",
          traco: "Uma das suas respostas deixa isso visível: no tempo livre, você cuida de algo pequeno e conversa sem pressa.",
        },
        {
          texto: "Demorar numa história, num assunto ou numa conversa que faça pensar, num canto quieto.",
          principal: "bela",
          secundaria: "branca",
          traco: "Uma das suas respostas deixa isso visível: você usa um dia livre para se demorar numa história ou numa conversa que faça pensar.",
        },
        {
          texto: "Sair sem roteiro e topar um lugar ou um assunto que eu ainda não provei.",
          principal: "rapunzel",
          secundaria: "ariel",
          traco: "Uma das suas respostas deixa isso visível: num dia livre, você sai sem roteiro e topa o que ainda não provou.",
        },
      ],
    },
    {
      enunciado: "Quando um desafio aperta, você…",
      opcoes: [
        {
          texto: "Mudo o jeito de tentar, prestando atenção em quem aquilo também afeta.",
          principal: "ariel",
          secundaria: "branca",
          traco: "Uma das suas respostas deixa isso visível: num desafio, você muda o jeito de tentar e olha para quem também é afetado.",
        },
        {
          texto: "Digo o que está errado, mesmo que a minha leitura seja diferente da dos outros.",
          principal: "jasmine",
          secundaria: "bela",
          traco: "Uma das suas respostas deixa isso visível: você diz o que está errado, mesmo quando a sua leitura é diferente.",
        },
        {
          texto: "Insisto, ajusto e não largo até a solução ficar à altura do que eu imagino.",
          principal: "tiana",
          secundaria: "ariel",
          traco: "Uma das suas respostas deixa isso visível: você insiste e ajusta até a solução ficar à altura do que imagina.",
        },
        {
          texto: "Sigo com calma e esperança, sem abrir mão do que acho justo.",
          principal: "cinderela",
          secundaria: "jasmine",
          traco: "Uma das suas respostas deixa isso visível: no aperto, você segue com calma e esperança, sem abrir mão do que acha justo.",
        },
      ],
    },
    {
      enunciado: "Qual gesto de carinho mais te alcança?",
      opcoes: [
        {
          texto: "Alguém cuidar de um detalhe pequeno e me tratar com consideração, de igual para igual.",
          principal: "branca",
          secundaria: "jasmine",
          traco: "Uma das suas respostas deixa isso visível: te alcança quem cuida de um detalhe pequeno e te trata de igual para igual.",
        },
        {
          texto: "Ser ouvida até o fim, com uma atenção mansa, mesmo quando eu penso diferente.",
          principal: "bela",
          secundaria: "branca",
          traco: "Uma das suas respostas deixa isso visível: te alcança ser ouvida até o fim, mesmo pensando diferente.",
        },
        {
          texto: "Um convite de última hora, feito por alguém que caprichou na ideia.",
          principal: "rapunzel",
          secundaria: "tiana",
          traco: "Uma das suas respostas deixa isso visível: te alcança um convite de última hora feito com capricho.",
        },
        {
          texto: "Alguém me encorajar a mudar de caminho, se é isso que a minha vontade pede.",
          principal: "ariel",
          secundaria: "rapunzel",
          traco: "Uma das suas respostas deixa isso visível: te alcança quem encoraja uma mudança de caminho quando é isso que você quer.",
        },
      ],
    },
    {
      enunciado: "O que mais desperta a sua curiosidade?",
      opcoes: [
        {
          texto: "Entender por que as coisas são como são, e se isso faz sentido de verdade.",
          principal: "jasmine",
          secundaria: "bela",
          traco: "Uma das suas respostas deixa isso visível: você fica curiosa para entender se as coisas fazem sentido de verdade.",
        },
        {
          texto: "Ver uma ideia sair do papel com capricho, sem perder o cuidado com as pessoas.",
          principal: "tiana",
          secundaria: "cinderela",
          traco: "Uma das suas respostas deixa isso visível: você se interessa por uma ideia que sai do papel com capricho e cuidado.",
        },
        {
          texto: "Saber como alguém continua gentil e acolhedor num dia difícil.",
          principal: "cinderela",
          secundaria: "branca",
          traco: "Uma das suas respostas deixa isso visível: você se interessa por quem continua gentil num dia difícil.",
        },
        {
          texto: "Descobrir o que faz uma pessoa se sentir em casa, mesmo num lugar novo.",
          principal: "branca",
          secundaria: "ariel",
          traco: "Uma das suas respostas deixa isso visível: você quer descobrir o que faz alguém se sentir em casa, mesmo num lugar novo.",
        },
      ],
    },
    {
      enunciado: "Surge uma oportunidade que muda um pouco a sua rota. O que pesa mais?",
      opcoes: [
        {
          texto: "Se ela respeita o que eu penso, e se eu consigo entrar nela com o coração leve.",
          principal: "bela",
          secundaria: "cinderela",
          traco: "Uma das suas respostas deixa isso visível: numa oportunidade, pesa se ela respeita o que você pensa.",
        },
        {
          texto: "Se ela abre um pedaço de mundo que eu ainda não vi e me deixa curiosa para mudar de rota.",
          principal: "rapunzel",
          secundaria: "ariel",
          traco: "Uma das suas respostas deixa isso visível: pesa se a oportunidade abre um pedaço de mundo que você ainda não viu.",
        },
        {
          texto: "Se eu topo o desconforto de começar de outro jeito e me dedicar até pegar o ritmo.",
          principal: "ariel",
          secundaria: "tiana",
          traco: "Uma das suas respostas deixa isso visível: você topa o desconforto de começar de outro jeito e se dedicar até pegar o ritmo.",
        },
        {
          texto: "Se eu continuo podendo decidir por mim, e se a escolha também cuida de quem vem junto.",
          principal: "jasmine",
          secundaria: "branca",
          traco: "Uma das suas respostas deixa isso visível: pesa se você continua podendo decidir por si, cuidando de quem vem junto.",
        },
      ],
    },
    {
      enunciado: "O que você mais admira em si?",
      opcoes: [
        {
          texto: "A minha capacidade de me dedicar até criar algo de que eu tenha orgulho, do meu próprio jeito.",
          principal: "tiana",
          secundaria: "rapunzel",
          traco: "Uma das suas respostas deixa isso visível: você admira a própria dedicação de criar algo do seu jeito.",
        },
        {
          texto: "A minha calma, e o fato de ela não depender de alguém me autorizar a senti-la.",
          principal: "cinderela",
          secundaria: "jasmine",
          traco: "Uma das suas respostas deixa isso visível: você admira a própria calma, sem precisar que alguém a autorize.",
        },
        {
          texto: "O meu jeito de acolher e de tentar entender a pessoa antes de julgar.",
          principal: "branca",
          secundaria: "bela",
          traco: "Uma das suas respostas deixa isso visível: você admira o próprio jeito de acolher e de entender antes de julgar.",
        },
        {
          texto: "A minha imaginação, que segue esperançosa mesmo quando o caminho ainda é desconhecido.",
          principal: "rapunzel",
          secundaria: "cinderela",
          traco: "Uma das suas respostas deixa isso visível: você admira a própria imaginação, mesmo quando o caminho ainda é desconhecido.",
        },
      ],
    },
  ],
};
