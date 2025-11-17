function onOpen(e) {
   var app = SpreadsheetApp;
   var ui = app.getUi();
   var spreadsheet = app.getActiveSpreadsheet();
  ui.createMenu("Rastreamento")
    .addItem("RASTREAR ENTREGAS", "LoopRastreamento")
    .addToUi();
}
