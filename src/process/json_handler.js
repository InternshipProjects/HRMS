class JsonHandler {
  convertJsonToQueryInput(data) {
    return data.map(record => {
      let queryType = this.getQueryType(record);
      let resources = this.getResources(record);
      let params = this.getParameters(record);
      return { queryType, resources, params };
    });
  }

  getQueryType(record) {
    return record['Query type'].trim();
  }

  getResources(record) {
    return record['Resource'].split(',').map(resource => resource.trim());
  }

  getParameters(record) {
    let params = {};
    for (let key in record) {
      if (/P.*/.test(key)) {
        let values = record[key].split(':').map(value => value.trim());
        params[values[0]] = values[1];
      }
    }
    return params;
  }
}

let jsonHandler = new JsonHandler();
module.exports = jsonHandler;
