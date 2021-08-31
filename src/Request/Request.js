import axios from "axios";
class Request {
  constructor(baseURL) {
    this.axios_instance = axios.create({
      baseURL: baseURL,
      timeout: 30000,
      withCredentials: true
    });

    this.reset();
  }

  reset() {
    this.method = "";
    this.endpoint = "";
    this.params = {};
    this.data = new FormData();
    this.headers = {};
  }

  get(endpoint) {
    this.reset();
    this.method = "GET";
    this.endpoint = endpoint;
    return this;
  }

  post(endpoint) {
    this.reset();
    this.method = "POST";
    this.endpoint = endpoint;
    return this;
  }

  put(endpoint) {
    this.reset();
    this.method = "PUT";
    this.endpoint = endpoint;
    return this;
  }

  delete(endpoint) {
    this.reset();
    this.method = "DELETE";
    this.endpoint = endpoint;
    return this;
  }

  addParam(key, value) {
    this.params[key] = value;
    return this;
  }

  removeParam(key) {
    delete this.params[key];
    return this;
  }

  addData(key, value) {
    this.data.set(key, value);
    return this;
  }

  removeData(key) {
    delete this.data[key];
    return this;
  }

  addFile(key, file) {
    if (this.method === "POST" || this.method === "PUT") {
      this.data.append(key, file, file.name);
      this.setHeader("Content-Type", "multipart/form-data");
    }
    return this;
  }

  setHeader(key, value) {
    this.headers[key] = value;
    return this;
  }

  parseQueryString(params) {
    let query_string = "";
    let params_keys = Object.keys(params);
    params_keys.forEach((param, index) => {
      query_string += param + "=" + params[param];
      if (params_keys.length - 1 > index) {
        query_string += "&";
      }
    });
    return query_string;
  }

  noCache() {
    this.addParam("random", Math.random(11111, 99999));
    return this;
  }

  run() {
    if (this.method === "GET") {
      return new Promise((resolve, reject) => {
        this._get(this.endpoint, this.params)
          .then(function(response) {
            resolve(response.data);
          })
          .catch(function(error) {
            reject(error.response.data);
          });
      });
    } else if (this.method === "POST") {
      return new Promise((resolve, reject) => {
        this._post(this.endpoint, this.params, this.data)
          .then(function(response) {
            resolve(response.data);
          })
          .catch(function(error) {
            reject(error.response.data);
          });
      });
    } else if (this.method === "PUT") {
      return new Promise((resolve, reject) => {
        this._put(this.endpoint, this.params, this.data)
            .then(function(response) {
              resolve(response.data);
            })
            .catch(function(error) {
              reject(error.response.data);
            });
      });
    } else if (this.method === "DELETE") {
      return new Promise((resolve, reject) => {
        this._delete(this.endpoint, this.params)
            .then(function(response) {
              resolve(response.data);
            })
            .catch(function(error) {
              reject(error.response.data);
            });
      });
    }
  }

  _get(endpoint, params) {
    return this.axios_instance.get(endpoint, {
      headers: this.headers,
      params: params
    });
  }

  _post(endpoint, params, data) {
    let query_string = this.parseQueryString(params);
    return this.axios_instance.post(endpoint + query_string, data, {
      headers: this.headers
    });
  }
  _put(endpoint, params, data) {
    let query_string = this.parseQueryString(params);
    return this.axios_instance.put(endpoint + query_string, data, {
      headers: this.headers
    });
  }
  _delete(endpoint, params) {
    let query_string = this.parseQueryString(params);
    return this.axios_instance.delete(endpoint + query_string,  {
      headers: this.headers
    });
  }
}

export default Request;
