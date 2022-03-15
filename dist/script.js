// Variaveis de informações dos jogadores e checagem de campeão
var jogadores = [];
var campeao = [0];

// Função para calcular pontos do vencedor da rodada e dos empatados
function calcularPontos(jogador) {
  var pontos = jogador.vitorias * 3 + jogador.empates;
  return pontos;
}


// Armazenar informações dos jogadores e exibir na tabela
function exibir(jogadores) {
  var elemento = "";
  for (var i = 0; i < jogadores.length; i++) {
    elemento +=
      '<tr><td><img class="imgJogador" src=' +
      jogadores[i].imagem +
      ">" +
      "</td><td>" +
      jogadores[i].nome +
      "</td><td>" +
      jogadores[i].vitorias +
      "</td><td>" +
      jogadores[i].empates +
      "</td><td>" +
      jogadores[i].derrotas +
      "</td><td>" +
      jogadores[i].pontos +
      "</td>" +
      '<td><button class="buttonA" onClick="adicionarVitoria(' +
      i +
      ')">Vitória</button></td>' +
      '<td><button class="buttonE" onClick="adicionarEmpate(' +
      i +
      ')">Empate</button></td>' +
      '<td><button class="buttonD" onClick="adicionarDerrota(' +
      i +
      ')">Derrota</button></td>' +
      "</tr></tr>";
  }
  var tabelaJogadores = document.getElementById("tabelaJogadores");
  tabelaJogadores.innerHTML = elemento;
}

// Calcular vitória de X jogador e adicionar na tabela
function adicionarVitoria(i) {
  if (jogadores.length < 2) {
    document.getElementById("erro").innerHTML =
      "<h2>Precisa de pelo menos 2 jogadores</h2>";
    return;
  }
  var jogador = jogadores[i];
  jogador.vitorias++;
  jogador.pontos = calcularPontos(jogador);

  checarCampeao();
  exibir(jogadores);
}

// Calcular empates de X jogador(es) e adicionar na tabela
function adicionarEmpate(i) {
  if (jogadores.length < 2) {
    document.getElementById("erro").innerHTML =
      "<h2>Precisa de pelo menos 2 jogadores</h2>";
    return;
  }
  var jogador = jogadores[i];
  jogador.empates++;
  jogador.pontos = calcularPontos(jogador);
  checarCampeao();
  exibir(jogadores);
}

// Adicionar derrota a X jogador(es) na tabela
function adicionarDerrota(i) {
  if (jogadores.length < 2) {
    document.getElementById("erro").innerHTML =
      "<h2>Precisa de pelo menos 2 jogadores</h2>";
    return;
  }
  var jogador = jogadores[i];
  jogador.derrotas++;

  checarCampeao();
  exibir(jogadores);
}

// Função para zerar tabela de pontos 
function zerarTabela() {
  for (var i = 0; i < jogadores.length; i++) {
    var jogador = jogadores[i];
    jogador.vitorias = 0;
    jogador.empates = 0;
    jogador.derrotas = 0;
    jogador.pontos = 0;
  }
  if (jogadores.length > 0) {
    resetarCampeao();
  }
  document.getElementById("erro").innerHTML = "";
  exibir(jogadores);
}

// Função para adicionar jogador, com URL de imagem e permissão para usar .Gif e deixar mais dinâmico. "nota= criar function para excluir toda informação de jogador, para caso seja adicionado sem querer"
function addJogador() {
  var campoNome = document.getElementById("campoNome").value;
  var campoImagem = document.getElementById("campoImagem").value;
  if (!campoNome) {
    document.getElementById("erro").innerHTML =
      "<h2>O jogador precisa de um nome</h2>";
    return;
  }
  if (!campoImagem) {
    document.getElementById("erro").innerHTML =
      "<h2>O jogador precisa de uma imagem</h2>";
    return;
  }
  if (
    !campoImagem.endsWith(".jpg") &&
    !campoImagem.endsWith(".png") &&
    !campoImagem.endsWith(".gif")
  ) {
    document.getElementById("erro").innerHTML =
      "<h2>URL da imagem inválida.</h2>";
    document.getElementById("campoImagem").value = "";
    return;
  }
  document.getElementById("erro").innerHTML = "";
  document.getElementById("campoNome").value = "";
  document.getElementById("campoImagem").value = "";
  jogadores.push({
    nome: campoNome,
    imagem: campoImagem,
    vitorias: 0,
    empates: 0,
    derrotas: 0,
    pontos: 0
  });
  if (jogadores.length == 2) {
    document.getElementById("erro").innerHTML = "";
  }
  exibir(jogadores);
}

// Função para checar qual jogador está na frente da tabela em questão de mais pontuação total
function checarCampeao() {
  resetarCampeao();
  if (jogadores[1]) {
    for (var i = 1; i < jogadores.length; i++) {
      if (jogadores[i].pontos > jogadores[campeao[0]].pontos) {
        campeao = [i];
      } else if (jogadores[i].pontos == jogadores[campeao[0]].pontos) {
        var existe = false;
        for (var j = 0; i < campeao.length; i++) {
          if (i == campeao[j]) {
            existe = true;
          }
        }
        if (!existe) campeao.push(i);
      }
    }
  }
  for (var i = 0; i < campeao.length; i++) {
    jogadores[campeao[i]].nome += "👑";
  }
  exibir(jogadores);
}

// Função para resetar o campeão caso seja ultrapassado ou empatado
function resetarCampeao() {
  for (var i = 0; i < campeao.length; i++) {
    if (jogadores[campeao[i]].nome.slice(-2) == "👑") {
      jogadores[campeao[i]].nome = jogadores[campeao[i]].nome.slice(0, -2);
    }
  }
  campeao = [0];
}