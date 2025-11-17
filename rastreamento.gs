function rastrearEncomenda(codigo) {
  var apikey = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("API").getRange("B1").getValue();
  var url = 'https://api-labs.wonca.com.br/wonca.labs.v1.LabsService/Track';

  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Apikey ' + apikey // com prefixo Apikey
    },
    payload: JSON.stringify({ code: codigo }),
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(url, options);
  var data = JSON.parse(response.getContentText());

  // A API pode vir "dupla" (um campo string chamado "json")
  var obj = (data && typeof data.json === 'string') ? JSON.parse(data.json) : data;

  // Pega eventos e escolhe o MAIS RECENTE
  var eventos = Array.isArray(obj.eventos) ? obj.eventos.slice() : [];
  if (eventos.length) {
    // Ordena por data/hora (caso não venha ordenado)
    eventos.sort(function(a, b) {
      var da = (a.dtHrCriado && a.dtHrCriado.date) ? a.dtHrCriado.date : '';
      var db = (b.dtHrCriado && b.dtHrCriado.date) ? b.dtHrCriado.date : '';
      return da.localeCompare(db);
    });
  }

  var ultimo = eventos.length ? eventos[eventos.length - 1] : {};

  // Extrai campos principais
  var cidade = (ultimo.unidade && ultimo.unidade.endereco && ultimo.unidade.endereco.cidade) ? ultimo.unidade.endereco.cidade : '';
  var uf     = (ultimo.unidade && ultimo.unidade.endereco && ultimo.unidade.endereco.uf) ? ultimo.unidade.endereco.uf : '';
  var local  = (cidade || uf) ? (cidade + (uf ? ' / ' + uf : '')) : '';

  var resumo = {
    codigo: obj.codObjeto || codigo,
    previsto: obj.dtPrevista || '',                     // data prevista
    status: ultimo.descricaoFrontEnd || ultimo.descricao || '',
    dataHora: (ultimo.dtHrCriado && ultimo.dtHrCriado.date) ? ultimo.dtHrCriado.date : '',
    local: local,
    detalhe: ultimo.detalhe || ultimo.comentario || ''
  };

  // Log compacto
  Logger.log('Resumo: %s', JSON.stringify(resumo, null, 2));

  return resumo; // retorna só o essencial
}
