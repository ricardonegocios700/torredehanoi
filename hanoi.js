/*
let main = document.getElementsByTagName('main')[0]

let container = document.createElement('div')
container.setAttribute('id', 'container');

main.appendChild(container)
*/
let container = document.getElementById("container")

function popularTorres() {
  //limpa o container para receber as divs
  container.innerHTML = "";

  let start = document.createElement('div');
  start.setAttribute('id', 'start');
  start.setAttribute('class' , 'tower');
  container.appendChild(start);
  let barra1 = document.createElement('div');
  barra1.setAttribute('id', 'barra1');
  barra1.setAttribute('class', 'barras');
  start.appendChild(barra1);

  let offset = document.createElement('div');
  offset.setAttribute('id', 'offset');
  offset.setAttribute('class', 'tower');
  container.appendChild(offset);
  let barra2 = document.createElement('div');
  barra2.setAttribute('id', 'barra2');
  barra2.setAttribute('class', 'barras');
  offset.appendChild(barra2);

  let end = document.createElement('div');
  end.setAttribute('id' , 'end');
  end.setAttribute('class', 'tower');
  container.appendChild(end);
  let barra3 = document.createElement('div');
  barra3.setAttribute('id', 'barra3');
  barra3.setAttribute('class', 'barras');
  end.appendChild(barra3);
}

// selecionar quantidade de discos
let menu_select = document.getElementById("numberDiscs")
menu_select.addEventListener("click", optionSelected)
let option_start = 4;

function optionSelected(event) {
  let option_selected = event.target
  option_start = option_selected.options[option_selected.selectedIndex].value //-1
  criarBlocos()
}

function criarBlocos() {
  //limpei os blocos
  popularTorres()

  //para montar os discos de acordo com a quantidade
  let reduzWidth  = 238/option_start;
  let reduzHeigth = (35-25)/(option_start-1);

  for (let i = option_start-1; i >= 0; i--) {
    let bloco = document.createElement("div");
    bloco.setAttribute('id', `bloco${i}`);
    bloco.setAttribute('class', 'bloco');
    
    bloco.style.height = `${35-reduzHeigth}px`;
    bloco.style.width  = `${(1+i)*reduzWidth}px`;

    start.appendChild(bloco);
  }
}
criarBlocos()


// colocar a escuta no container
container.addEventListener("click", selected);

// variaveis para guardar os click's
let firstClick;
let secondClick;
let count = 0
//regra do jogo : Nao pode haver um bloco maior sobre um menor.
function validate() {
  // caso a primeira torre esteja vazia, para não mover a barra
  // caso a torre destino esteja vazia 
  // caso primeiro elemento < segundo

  if (firstClick.childElementCount === 1){
    return
  }
  if (secondClick.childElementCount === 1){
    secondClick.appendChild(firstClick.lastChild);
    return
  }
  if (secondClick.lastChild.id > firstClick.lastChild.id){
    secondClick.appendChild(firstClick.lastChild);
    return
  }
  alert("movimento inválido") 
}
// Validar a vitoria
function victory() {
  if (Number(end.childElementCount) === Number(option_start)+1) {
    alert("Você ganhou")
  }
}
// função para selecionar
function selected(event) {
  if (firstClick == undefined){
    // event clicado(é o target) é o ancestral com "div .tower"
    firstClick = event.target.closest("div .tower")
    
  } else {
    // event clicado(é o target) é o ancestral com "div .tower"
    secondClick = event.target.closest("div .tower")
    // Valida o movimento e o segundo clicado recebe o ultimo filho do primeiro clicado
    validate()
    
    // limpar as variáveis
    firstClick = undefined
    secondClick = undefined
    count += 1
    // retorna msg de vitoria caso atenda as condicoes 
    victory()
  }
}
// funcao do numero minimo de movimentos
function minMove(n) {
  let moves = (2**n)-1
  return moves 
}
let options = document.getElementById("options")

let minMoves = document.createElement("div")

// Botao de Reset
let botao_reset = document.querySelector("#button_discs")
botao_reset.addEventListener("click", criarBlocos)

// Melhorias de design

