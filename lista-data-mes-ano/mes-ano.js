var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var today = new Date();
var d;
var month;
var year;
var mesAno = [];

for(var i = 6; i > 0; i -= 1) {
  d = new Date(today.getFullYear(), today.getMonth() - i, 1);
  month = monthNames[d.getMonth()];
  year = d.getFullYear();
  mesAno.push(month + '/' + year);
}
mesAno.reverse(); //inverte a ordem da lista caso necessário