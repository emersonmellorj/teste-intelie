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

var schema = [
    ['endereço', 'cardinality', 'one'],
    ['telefone', 'cardinality', 'many']
];

let MapperFacts = require('./mapper_node');
let Facts = MapperFacts(schema, facts);

console.log(Facts.toList());
/* output
[
  ["gabriel","endereço","av rio branco, 109",true],
  ["gabriel","telefone","98888-1111",true],
  ["gabriel","telefone","56789-1010",true],
  ["joão","endereço","rua bob, 88",true],
  ["joão","telefone","234-5678",true],
  ["joão","telefone","91234-5555",true]
]
*/

console.log(Facts.toListObject());
/* output
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
*/

console.log(Facts.toMap());
/* output
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
*/