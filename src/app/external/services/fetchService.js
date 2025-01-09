const axios = require("axios");
const { formatApiData } = require("./formatService");

/**
 * Função para buscar dados da API externa e formatá-los
 * @returns {Object} - Dados formatados ou mensagem de erro
 */
const fetchExternalData = async (apiUrlParams) => {
  try {
    const response = await axios.get(apiUrlParams);
    //const formattedData = formatApiData(response.data);

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error("Erro ao buscar dados da API externa:", error.message);
    return {
      success: false,
      message: "Erro ao buscar dados da API externa.",
    };
  }
};

module.exports = { fetchExternalData };
