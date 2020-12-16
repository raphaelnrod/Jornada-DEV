
['a', 'b'].concat(['c'])    
//['a', 'b', 'c']

['a', 'c'].join(['b'])  
// 'abc'

['a', 'b', 'c'].slice(1)    
// ['b', 'c']

['a', 'b', 'c'].indexOf('b')   
// pega a posição de 'b' que é 1

['a', 'b', 'b', 'c'].lastIndexOf('b')  
// pega a última posição de 'b' que é 2

[1, 2, 3].map(x => x * 2)   
// multiplica todos os elementos por 2 = [2, 4, 6]

[1, 2, 3]. reverse()    
//inverte a ordem do array = [3, 2, 1]
 
[1, 2, 3].reduce((x, z) => x * z)   
//reduz todo o array multiplicando os elementos = 6

[1, 2, 3].length()  
//tamanho do array = 3

[1,2,3].every(x => x < 10)  
// testa se todos os elementos sao menores que 10. Retorna true

[1,2,3].some(x = x < 2) 
// testa se pelo menos um elemento é menor que dois. Retorna true

const array = [1, 2, 3]     

const x = array.shift() 
//pega o primeiro indice do array 
//e remove da lista original. Fica array = [2, 3], x = 1

const x = array.unshift(7)  
//insere o valor passado como parametro 
//no primeiro indice do array. Fica [7, 1, 2, 3], x = 4

const x = array.pop()   
//remove o ultimo indice da lista. 
//array = [1, 2], x = 3

const x = array.push(9) 
//insere o valor no ultimo indice do array. 
//array = [1, 2, 3, 9], x = 4

