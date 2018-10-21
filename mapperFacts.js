(function(global) {
  const CONSTANTS_FACT = {
    KEY: 0, PROPERTY: 1, DATA: 2, ACTIVE: 3
  };
  
  const CONSTANT_SCHEMA = {
    PROPERTY: 0, TYPE: 1, CARDINALITY: 2
  };
  
  const CARDINALITY = {
    ONE: 'one', MANY: 'many'
  };

  function MapperFacts(schema, facts) {

    if (!(this instanceof MapperFacts)) {
      return new MapperFacts(schema, facts);
    }

    this.resultFacts = [];
    this.toObjectCache = [];
    this.toMapCache = {};
    this.factObjCache = {};

    validateEntries(schema, facts);

    this.SCHEMA = prepareSchema(schema);
    this.FACTS = orderList(facts);
    parseFacts.call(this);
  }

  function validateEntries(schemas, facts) {
    let entriesSchema = Object.entries(CONSTANT_SCHEMA);
    let entriesFacts = Object.entries(CONSTANTS_FACT);

    if(!schemas || !Array.isArray(schemas) || !schemas.length) {
      throw 'Não foi informado um schema válido';
    }

    if(!facts || !Array.isArray(facts) || !facts.length) {
      throw 'Não foi informado um conjuno de dados válido';
    }

    if(schemas[0].length !== entriesSchema.length) {
      throw 'O schema informado não segue o padrão esperado';
    }

    if(facts[0].length !== entriesFacts.length) {
      throw 'Os Facts informado não segue o padrão esperado';
    }
  }

  function prepareSchema(schemas) {
    let new_schema = {};

    while(schemas.length) {
      const schema = schemas.pop();
      const PROPERTY = schema[CONSTANT_SCHEMA.PROPERTY];
      const CARDINALITY = schema[CONSTANT_SCHEMA.CARDINALITY];

      new_schema[PROPERTY] = CARDINALITY;
    }

    return new_schema;
  }

  function parseFacts() {
    let total = this.FACTS.length;

    for(let i = 0; i < total; i++) {
      let [key, property, data, active] = this.FACTS[i];

      if(!active) continue;

      if(this.SCHEMA[property]) {
        pushItem.call(this, key, property, data, active);
      }
    }
    this.resultFacts = orderList(this.resultFacts);
  };

  function pushItem(key, property, data, active) {
    if (this.SCHEMA[property] === CARDINALITY.ONE) {
      let iExistsFact = searchFact(key, property, this.resultFacts);
      pashItemCardOne.call(this, iExistsFact, ...arguments);
    } else {
      this.resultFacts.push([...arguments]);
    }
  };

  function pashItemCardOne(indexObj, key, property, data, active) {
    if(indexObj > -1) {
      this.resultFacts[indexObj][CONSTANTS_FACT.DATA] = data;
    } else {
      this.resultFacts.unshift([key, property, data, active]);
    }
  }

  function searchFact(key, property, list) {
    return list.findIndex(fact =>
      fact[CONSTANTS_FACT.KEY] === key &&
      fact[CONSTANTS_FACT.PROPERTY] === property
    );
  }

  function orderList(list) {
    return list.sort(
      (a, b) => a[CONSTANTS_FACT.KEY] > b[CONSTANTS_FACT.KEY]
    );
  }

  MapperFacts.prototype.toList = function() {
    return this.resultFacts;
  }

  MapperFacts.prototype.count = function() {
    return this.resultFacts.length;
  }

  MapperFacts.prototype.toMap = function() {
    let entriesMap = Object.entries(this.toMapCache);
    if(!entriesMap.length) {
      let listObject = copyObject(this.toListObject());
      listObject.map(parseToMap.bind(this));
    }
    return this.toMapCache;
  };

  function copyObject(obj) {
    return JSON.parse( JSON.stringify(obj) );
  }

  function parseToMap(fact) {
    let key = fact.chave;
    delete fact.chave;
    this.toMapCache[key] = fact;
  };

  MapperFacts.prototype.toListObject = function() {
    if(!this.toObjectCache.length) {
      prepareObject.call(this);
    }
    return this.toObjectCache;
  };

  function prepareObject() {
    let total = this.count();

    for (let i = 0; i < total; i++) {
      let fact = this.resultFacts[i];
      let objExists = getObjectCache(this.toObjectCache, fact);

      if (objExists) {
        setPropertObject(fact, objExists, this.SCHEMA);

      } else {
        let [key, , , active] = fact;
        let obj = objectFact.call(this, key, active);

        setPropertObject(fact, obj, this.SCHEMA);
        this.toObjectCache.push(obj);
      }

    }
  };

  function getObjectCache(list, fact) {
    return list.find(
      obj => obj.chave === fact[CONSTANTS_FACT.KEY]
    );
  }

  function objectFact(chave, ativo) {
    if (this.factObjCache.hasOwnProperty("chave")) {
      let objCopy = copyObject(this.factObjCache);
      objCopy.chave = chave;
      objCopy.ativo = ativo;
      return objCopy;
    } else {
      createFactObjCache.apply(this);
      return objectFact.call(this, chave, ativo);
    }
  }

  function createFactObjCache() {
    let obj = {
      chave: '', ativo: false
    };
    let schemaPropertys = Object.entries(this.SCHEMA);
    let total = schemaPropertys.length;

    for(let i = 0; i < total; i++) {
      let [property, cardinality] = schemaPropertys[i];
      obj[property] = cardinality === CARDINALITY.ONE ? '' : [];
    }

    this.factObjCache = obj;
    return obj;
  }

  function setPropertObject(fact, obj, validSchema) {
    let property = fact[CONSTANTS_FACT.PROPERTY];

    if (validSchema[property] === CARDINALITY.ONE) {
      obj[property] = fact[CONSTANTS_FACT.DATA];
    } else {
      obj[property].push(fact[CONSTANTS_FACT.DATA]);
    }

  };

  global.MapperFacts = MapperFacts;
})(this || {});

