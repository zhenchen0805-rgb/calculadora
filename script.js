var input = document.getElementById('tela'),
    numeros = document.querySelectorAll('.numeros div'),
    contas = document.querySelectorAll('.contas div'),
    resultado = document.getElementById('resultado'),
    limpar = document.getElementById('limpar'),
    resultadoMostrado = false;

// 1. Adicionar evento para os botões de números e ponto (.)
for (var i = 0; i < numeros.length; i++) {
  numeros[i].addEventListener("click", function(e) {
    var textNaTela = input.innerHTML;
    var ultimoChar = textNaTela[textNaTela.length - 1];
    var valor = e.target.innerHTML;

    // Se clicou no botão "C" (limpar), ignoramos aqui pois ele tem ID próprio
    if (e.target.id === "limpar") return;

    if (resultadoMostrado === false) {
      input.innerHTML += valor;
    } else {
      resultadoMostrado = false;
      input.innerHTML = valor;
    }
  });
}

// 2. Adicionar evento para os botões de operações (+, -, ×, ÷)
for (var i = 0; i < contas.length; i++) {
  contas[i].addEventListener("click", function(e) {
    var textNaTela = input.innerHTML;
    var ultimoChar = textNaTela[textNaTela.length - 1];
    var operador = e.target.innerHTML;

    // Evita colocar operador se a tela estiver vazia
    if (textNaTela === "") return;

    // Se o último caractere já for um operador, substitui pelo novo
    if (ultimoChar === "+" || ultimoChar === "-" || ultimoChar === "×" || ultimoChar === "÷") {
      input.innerHTML = textNaTela.slice(0, -1) + operador;
    } else {
      input.innerHTML += operador;
    }
    resultadoMostrado = false;
  });
}

// 3. Botão Limpar ("C")
if (limpar) {
  limpar.addEventListener("click", function() {
    input.innerHTML = "";
    resultadoMostrado = false;
  });
}

// 4. Botão de Resultado ("=")
resultado.addEventListener("click", function() {
  var inputString = input.innerHTML;
  
  if (!inputString) return;

  // Substitui os símbolos visuais pelos símbolos que o JavaScript entende para cálculo
  var expressao = inputString.replace(/×/g, '*').replace(/÷/g, '/');

  try {
    var resultadoFinal = eval(expressao);
    input.innerHTML = resultadoFinal;
    resultadoMostrado = true;
  } catch (error) {
    input.innerHTML = "Erro";
    resultadoMostrado = true;
  }
});