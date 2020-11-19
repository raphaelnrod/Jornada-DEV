var monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
var mesAno: any[] = [];
var today = new Date();
var d: Date;
var month;
var year;

for (var i = 12; i >= 1; i--) {
  d = new Date(today.getFullYear(), today.getMonth() - i, 1);
  month = this.monthNames[d.getMonth()];
  year = d.getFullYear();
  this.mesAno.push(month + "/" + year);
}
this.mesAno.reverse();
