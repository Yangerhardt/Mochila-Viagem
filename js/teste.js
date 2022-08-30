const form = document.querySelector("#novoItem");
const lista = document.querySelector("#lista");
const itens = JSON.parse(localStorage.getItem("totalItens")) || [];
/*  na linha acima: se o localStorage.getItem["item"] = true, retornará ele mesmo, se não, retornará o []
 basisacmente é const a || b -> se a for true, retorna a, se não retorna b */

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = evento.target.elements["nome"];
  const quantidade = evento.target.elements["quantidade"];

  const existe = itens.find((objetos) => objetos.nome === nome.value);

  const itemAtual = {
    nome: nome.value,
    quantidade: quantidade.value,
  };

  if (existe) {
    itemAtual.id = existe.id;

    atualizaElemento(itemAtual);

    itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

  } else {
    itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id +1 : 0

    adicionarItem(itemAtual);

    itens.push(itemAtual);
  }

  localStorage.setItem("totalItens", JSON.stringify(itens));

  nome.value = "";
  quantidade.value = "";
});

const adicionarItem = (objeto) => {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const numeroItem = document.createElement("strong");
  numeroItem.innerHTML = objeto.quantidade;
  numeroItem.dataset.id = objeto.id; // ao invés de adicionar o ID no objeto, criamos um data-set com o id de cada elemento
  novoItem.appendChild(numeroItem);

  novoItem.innerHTML += objeto.nome;

  novoItem.appendChild(botaoDeleta(objeto.id))

  lista.appendChild(novoItem);
};

itens.forEach((objetos) => {
  adicionarItem(objetos);
}); // Utilizado para manter os dados na página mesmo ao atualizá-la

const atualizaElemento = (objeto) => {
  document.querySelector("[data-id='"+objeto.id+"']").innerHTML = objeto.quantidade
}

function botaoDeleta(id) {
  const elementoBotao = document.createElement("button")
  elementoBotao.innerHTML = "x"

  //necessário adicionar o eventListener dentro da função, já que o elemento botão está sendo criado dinamicamente
  elementoBotao.addEventListener("click", function() {
    deletaElemento(this.parentNode, id) // o this irá retornar o elemento botão, mas o que queremos é o pai, que é o li criado
  })

  return elementoBotao
}

function deletaElemento (tag, id) {
  tag.remove()

  itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
  //sintaxe -> eu passo um elemento e quero que o id desse elemento seja igual ao id passado

  //o SPLICE() funciona para remover elementos dentro de arrays de acordo com o id dos elementos

  console.log(itens)
  localStorage.setItem("totalItens", JSON.stringify(itens));
}