/**
 * Função para tratar erros
 * @param {Error} error - Objeto de erro
 * @returns {Object} - Objeto contendo mensagem padronizada
 */
const handleError = (error) => {
  console.error(error.message);
  return {
    success: false,
    message: error.message || "Ocorreu um erro desconhecido.",
  };
};

module.exports = { handleError };
