const axios = require("axios");
const config = require("../../config/conf");
const { fetchExternalData } = require("../../external/services/fetchService");

module.exports = class DataController {
  static async fetchData(req, res) {
    console.log(req.url);
    const params = req.url;
    const apiUrl = config.URL_EXTERNAL;

    const result = await fetchExternalData(apiUrl + params.substr(1));
    if (!result.success) {
      return res.status(500).json(result);
    }

    res.json(result.data.data);
  }
};
