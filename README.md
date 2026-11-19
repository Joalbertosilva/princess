# Era uma vez, Ayres Sabrina

Conto estático, em português, para abrir no celular. Não tem build, banco nem API.

A carta, os nomes, as perguntas, a pontuação e os caminhos de mídia ficam em `js/conteudo.js`.

As fotos pessoais já estão em `assets/img/`. Não coloque esta pasta num repositório público. Se publicar, use um projeto privado na Vercel.

## Arquivos para colocar

Se algum retrato obrigatório faltar, o site mostra uma moldura ilustrada com as iniciais e o restante da página continua igual. A revelação, se não achar o retrato da princesa, usa a foto principal. A foto dos dois e a música são opcionais: sem elas, o bloco some.

- `assets/img/foto-principal.webp`
- `assets/img/tiana.webp`
- `assets/img/cinderela.webp`
- `assets/img/branca-de-neve.webp`
- `assets/img/bela.webp`
- `assets/img/rapunzel.webp`
- `assets/img/ariel.webp`
- `assets/img/jasmine.webp`
- `assets/img/casal-tiana.webp`
- `assets/img/casal-cinderela.webp`
- `assets/img/casal-branca.webp`
- `assets/img/casal-bela.webp`
- `assets/img/casal-rapunzel.webp`
- `assets/img/casal-ariel.webp`
- `assets/img/casal-jasmine.webp`
- `assets/img/principe.webp`
- `assets/img/nos-dois.webp` (opcional, só dentro da carta)
- `assets/audio/trilha.mp3` (opcional)

`foto-principal.webp` e `principe.webp` já foram gerados a partir das fotos enviadas. A faixa `trilha.mp3` é uma valsa instrumental original, feita para este presente (piano e cordas). O botão deixa o volume baixo. Você pode substituir o arquivo pelo mesmo caminho, desde que a música seja sua ou licenciada.

Enquadramento: as molduras usam a imagem inteira, sem cortar o rosto. Os retratos da galeria só são pedidos quando essa página abre. Na última página, o retrato é o casal da princesa que ela tirou; se o arquivo faltar, entra a foto do príncipe. Depois do resultado, o conto troca a paleta e o ornamento para os da princesa.

## Testar neste computador

Na pasta do projeto:

```bash
python3 -m http.server 8080
```

Abra `http://localhost:8080`. Dá também para abrir o `index.html` direto no navegador.

## Publicar na Vercel

1. Entre em [vercel.com/new](https://vercel.com/new).
2. Envie esta pasta (ou um repositório **privado**).
3. Framework: Other.
4. Build command: vazio.
5. Output directory: a raiz do projeto.
6. Faça o deploy. O `vercel.json` só adiciona cabeçalhos para desencorajar indexação; o link continua abrindo normalmente.

A meta `noindex` não esconde o presente de quem tem o endereço.
