class JsonHandler {
  convertJsonToQueryInput(queriesData) {
    return queriesData.map(record => {
      const queryType = this.getQueryType(record);
      const resources = this.getResources(record);
      const params = this.getParameters(record);
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

module.exports = new JsonHandler();
