function generatePesel(date){


var fullYear=date.getFullYear();
var year=fullYear%100;
var month=date.getMonth()+1;
var day=date.getDate();
var pesel;


if (fullYear>=1800 && fullYear<=1899){
    month += 80;
} else
if (fullYear>=2000 && fullYear<=2099){
    month += 20;
} else
if (fullYear>=2100 && fullYear<=2199){
    month += 40;
} else
if (fullYear>=2200 && fullYear<=2299){
    month += 60;
}


if(month<10)
month="0"+month;

if(year<10)
year="0"+year;

pesel=""+year+month+day;

console.log(pesel);

return pesel;
}


var d = new Date("2101-03-25");
generatePesel(d);