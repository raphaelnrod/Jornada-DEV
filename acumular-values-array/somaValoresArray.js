let produtos = [
  { descricao: "Notebook", valor: 2899 },
  { descricao: "TV 50 Polegadas LED", valor: 3689 },
  { descricao: "Mouse sem fio", valor: 98 },
  { descricao: "Caixa de Som", valor: 125.59 },
  { descricao: "Teclado USB", valor: 32.9 },
];

let valorTotalProdutos = produtos
  .map((e) => e.valor)
  .reduce((acc, currValue) => acc + currValue, 0);

console.log(valorTotalProdutos); //Saída: 6844,49
