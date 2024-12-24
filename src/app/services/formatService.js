/**
 * Função para formatar os dados da API
 * @param {Object} rawData - Dados brutos retornados pela API
 * @returns {Array} - Array de objetos formatados
 */
const formatApiData = (rawData) => {
  try {
    // if (!rawData || !rawData.data) {
    //   throw new Error("Dados inválidos ou inexistentes.");
    // }

    // Limpa e extrai apenas o JSON válido usando expressão regular
    const match = rawData.match(/\[.*\]/); // Encontra o conteúdo entre colchetes []
    if (!match) {
      throw new Error("Conteúdo de dados JSON não encontrado.");
    }

    // Parseia o conteúdo JSON limpo
    const cleanedArray = JSON.parse(match[0]);

    // Formata os dados
    return cleanedArray.map((item) => ({
      stop_detection_time: item.stop_detection_time || "",
      score: item.score || 0,
      detected_time: item.detected_time || "",
      tracker_id: item.tracker_id || null,
      bbox: item.bbox || "",
      idTrack: item.idTrack || null,
      class_name: item.class_name || "",
      client_id: item.client_id || null,
    }));
  } catch (error) {
    console.error("Erro ao formatar os dados:", error.message);
    return [];
  }
};

module.exports = { formatApiData };
