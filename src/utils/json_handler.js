class JsonHandler {
  convertJsonToQueryInput(queriesData) {
    return queriesData.map(record => {
      const queryType = this.getQueryType(record);
      const resource = this.getResource(record);
      const params = this.getParameters(record);
      return { queryType, resource, params };
    });
  }

  getQueryType(record) {
    return record['Query type'].trim();
  }

  getResource(record) {
    return record['Resource'].trim();
  }

  getParameters(record) {
    let params = {};
    for (let key in record) {
      if (/^P\d/.test(key)) {
        let values = record[key].split(':').map(value => value.trim());
        params[values[0]] = values[1];
      }
    }
    return params;
  }
}

module.exports = new JsonHandler();
