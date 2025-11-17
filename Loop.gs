function LoopRastreamento() {
  var app = SpreadsheetApp
  var spredsheet = app.getActiveSpreadsheet();
  var sheet = spredsheet.getSheetByName("Rastreios")

 // sheet.getRange("d5:d").clearContent(); // Linha comentada que pode ser usada para limpar a coluna de status
  var totalciclo = sheet.getLastRow()
console.log(totalciclo)
var i = 5
for (i=5; i<=(totalciclo);i++){

   if(sheet.getRange(i,3).getValue() == true){
     console.log("linha: " + i + " verdadeiro ")

      var retorno =  rastrearEncomenda(sheet.getRange(i,2).getValue())

sheet.getRange(i,4).setValue(retorno)

   }

 console.log("ciclo: " + i)

}


}
