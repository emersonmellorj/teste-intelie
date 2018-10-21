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

let Facts = MapperFacts(schema, facts);

let list = Facts.toList();
let mapList = Facts.toMap();
let jsonList = Facts.toListObject();

console.log(list);
console.log(mapList);
console.log(jsonList);


document.addEventListener('DOMContentLoaded', onLoad);


function onLoad() {
  let $list = document.querySelector('#resultList');
  let $json = document.querySelector('#resultJson');
  let $map = document.querySelector('#resultMap');

  $list.innerHTML = JSON.stringify(list, undefined, 2);
  $json.innerHTML = JSON.stringify(jsonList, undefined, 2);
  $map.innerHTML = JSON.stringify(mapList, undefined, 2);
}