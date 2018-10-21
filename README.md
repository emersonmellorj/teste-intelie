## O Desafio!
Considere um modelo de informação onde um registro é representado por uma "tupla".

Uma tupla (ou lista) nesse contexto é chamado de fato.

Exemplo de um fato: 

**('joão', 'idade', 18, true)**

Nessa representação, a entidade 'joão' tem o atributo 'idade' com o valor '18'.


Para indicar a remoção (ou retração) de uma informação, o quarto elemento da tupla pode ser 'false'
representando que a entidade não tem mais aquele valor associado àquele atributo.

Como é comum em um modelo de entidades, os atributos de uma entidade pode ter cardinalidade 1 ou N (muitos).

Segue um exemplo de fatos no formato de tuplas (E, A, V, added?)
i.e. [entidade, atributo, valor, booleano que indica se fato foi adicionado ou retraido]
 ```javascript
var facts = [
  ['gabriel', 'endereço', 'av rio branco, 109', true],
  ['joão', 'endereço', 'rua alice, 10', true],
  ['joão', 'endereço', 'rua bob, 88', true],
  ['joão', 'telefone', '234-5678', true],
  ['joão', 'telefone', '91234-5555', true],
  ['joão', 'telefone', '234-5678', false],
  ['gabriel', 'telefone', '98888-1111', true],
  ['gabriel', 'telefone', '56789-1010', true]
];
```
Vamos assumir que essa lista de fatos está ordenada dos mais antigos para os mais recentes.

Nesse schema,
o atributo 'telefone' tem cardinalidade 'muitos' (one-to-many), e 'endereço' é 'one-to-one'.

```javascript
var schema = [
    ['endereço', 'cardinality', 'one'],
    ['telefone', 'cardinality', 'many']
];
```

Nesse exemplo, os seguintes registros representam o histórico de endereços que joão já teve:
 ```javascript
 [
  ['joão', 'endereço', 'rua alice, 10', true]
  ['joão', 'endereço', 'rua bob, 88', true],
]
```
E o fato considerado vigente é o último.

O objetivo desse desafio é escrever uma função que retorne quais são os fatos vigentes sobre essas entidades.

Ou seja, quais são as informações que estão valendo no momento atual.

A função deve receber `facts` (todos fatos conhecidos) e `schema` como argumentos.

Resultado esperado para este exemplo (mas não precisa ser nessa ordem):
```javascript
[
  ['gabriel', 'endereço', 'av rio branco, 109', true],
  ['joão', 'endereço', 'rua bob, 88', true],
  ['joão', 'telefone', '91234-5555', true],
  ['gabriel', 'telefone', '98888-1111', true],
  ['gabriel', 'telefone', '56789-1010', true]
];
```

## Após classe mapper
Depois da lista passar pelo processamento e estar pronta, a classe oferece 3 saídas que resultam abaixo no console do NodeJS abrindo o arquivo em ```./node/desafio_node.js``` ou abrindo o arquivo ```index.html``` no navegador que irá mostrar os resultados abaixo tanto no console quanto no browser.

Método **toList**
```javascript
[
  ["gabriel","endereço","av rio branco, 109",true],
  ["gabriel","telefone","98888-1111",true],
  ["gabriel","telefone","56789-1010",true],
  ["joão","endereço","rua bob, 88",true],
  ["joão","telefone","234-5678",true],
  ["joão","telefone","91234-5555",true]
]
```

Método **toListObject**
```javascript
[
  {
    "key":"gabriel",
    "active":true,
    "address":"av rio branco, 109",
    "telphones":["98888-1111","56789-1010"]
  },
  {
    "key":"joão",
    "active":true,
    "address":"rua bob, 88",
    "telphones":["234-5678","91234-5555"]
  }
]
```

Método **toMap**
```javascript
{
  "gabriel":{
    "active":true,
    "address":"av rio branco, 109",
    "telphones":["98888-1111","56789-1010"]
  },
  "joão":{
    "active":true,
    "address":"rua bob, 88",
    "telphones":["234-5678","91234-5555"]
  }
}
```