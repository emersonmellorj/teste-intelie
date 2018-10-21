describe("Mapper Facts Teste", function() {
  var mapper, facts, schema;

  describe("Métodos", function() {
    beforeEach(function() {
      facts = [
        ['gabriel', 'endereço', 'av rio branco, 109', true],
        ['joão', 'endereço', 'rua alice, 10', true],
        ['joão', 'endereço', 'rua bob, 88', true],
        ['joão', 'telefone', '234-5678', true],
        ['joão', 'telefone', '91234-5555', true],
        ['joão', 'vencimento', '10', true],
        ['joão', 'idade', '39', true],
        ['joão', 'idade', '40', true],
        ['joão', 'telefone', '234-5678', false],
        ['gabriel', 'telefone', '98888-1111', true],
        ['gabriel', 'telefone', '56789-1010', true],
        ['gabriel', 'idade', '30', true],
        ['gabriel', 'vencimento', '30', true],
        ['alberto', 'telefone', '98888-1111', true],
        ['alberto', 'telefone', '56789-1010', true],
        ['alberto', 'idade', '30', true],
        ['alberto', 'vencimento', '30', true]
      ];

      schema = [
        ['endereço', 'cardinality', 'one'],
        ['telefone', 'cardinality', 'many'],
        ['idade', 'cardinality', 'one']
      ];

      mapper = MapperFacts(schema, facts);
    });

    it("deve garantir que foi instanciada a classe", function() {
      expect(mapper).toBeDefined();
    });

    it("deve garantir que tem a quantidade após processamento", function() {
      expect(mapper.count()).toEqual(11);
    });

    it("deve garantir que existe idade", function() {
      expect(mapper.toListObject()[0].idade).toBeDefined();
    });

    it("deve garantir que não existe vencimento", function() {
      expect(mapper.toListObject()[0].vencimento).toBeUndefined();
    });

    it("deve garantir que existe registros únicos", function() {
      var mapEntries = Object.entries(mapper.toMap());
      expect(mapEntries.length).toEqual(3);
    });
  });

  describe("Falhas", function() {
    beforeEach(function(){
      facts = [
        ['gabriel', 'endereço', 'av rio branco, 109', true],
        ['joão', 'endereço', 'rua bob, 88', true],
        ['joão', 'telefone', '234-5678', true],
        ['gabriel', 'telefone', '98888-1111', true]
      ];

      schema = [
        ['endereço', 'cardinality', 'one'],
        ['telefone', 'cardinality', 'many']
      ];
    });
    it("deve garantir falha ao não informar o schema", function(){
      expect(function() { MapperFacts(); }).toThrow("Não foi informado um schema válido");
    });

    it("deve garantir falha ao não informar os facts", function(){
      expect(function() { MapperFacts(schema); }).toThrow("Não foi informado um conjuno de dados válido");
    });

    it("deve garantir falha ao schema passado incorreto", function(){
      schema[0].shift();
      expect(function() { MapperFacts(schema, facts); }).toThrow("O schema informado não segue o padrão esperado");
    });

    it("deve garantir falha ao facts passado incorreto", function(){
      facts[0].shift();
      expect(function() { MapperFacts(schema, facts); }).toThrow("Os Facts informado não segue o padrão esperado");
    });
  });

  describe("Garantir Teste", function() {
    beforeEach(function() {
      facts = [
        ['gabriel', 'endereço', 'av rio branco, 109', true],
        ['joão', 'endereço', 'rua alice, 10', true],
        ['joão', 'endereço', 'rua bob, 88', true],
        ['joão', 'telefone', '234-5678', true],
        ['joão', 'telefone', '91234-5555', true],
        ['joão', 'telefone', '234-5678', false],
        ['gabriel', 'telefone', '98888-1111', true],
        ['gabriel', 'telefone', '56789-1010', true]
      ];
      schema = [
        ['endereço', 'cardinality', 'one'],
        ['telefone', 'cardinality', 'many']
      ];
      mapper = MapperFacts(schema, facts);
    });

    it("deve garantir o retorno esperado no toList", function() {
      var retorno = [
        ["gabriel","endereço","av rio branco, 109",true],
        ["gabriel","telefone","98888-1111",true],
        ["gabriel","telefone","56789-1010",true],
        ["joão","endereço","rua bob, 88",true],
        ["joão","telefone","234-5678",true],
        ["joão","telefone","91234-5555",true]
      ];

      expect(mapper.toList()).toEqual(retorno);
    });

    it("deve garantir o retorno esperado no toMap", function() {
      var retorno = {
        "gabriel":{
          "ativo":true,
          "endereço":"av rio branco, 109",
          "telefone":["98888-1111","56789-1010"]
        },
        "joão":{
          "ativo":true,
          "endereço":"rua bob, 88",
          "telefone":["234-5678","91234-5555"]
        }
      };

      expect(mapper.toMap()).toEqual(retorno);
    });

    it("deve garantir o retorno esperado no toListObject", function() {
      var retorno = [
        {
          "chave":"gabriel",
          "ativo":true,
          "endereço":"av rio branco, 109",
          "telefone":["98888-1111","56789-1010"]
        },
        {
          "chave":"joão",
          "ativo":true,
          "endereço":"rua bob, 88",
          "telefone":["234-5678","91234-5555"]
        }
      ];

      expect(mapper.toListObject()).toEqual(retorno);
    });
  });
});