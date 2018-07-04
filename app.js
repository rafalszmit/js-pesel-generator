function generatePesel(date,sex){

var fullYear=date.getFullYear();
var year=fullYear%100;
var month=date.getMonth()+1;
var day=date.getDate();
var pesel;
var rand;
var seriesNr = [];
var controlSum;
var wagi = new Array (1, 3, 7, 9, 1, 3, 7, 9, 1, 3);
var tmp=0;

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

if(day<10)
day="0"+day;


for(var i=0;i<3;i++){
    seriesNr.push(Math.floor(Math.random() * 10));
}

if(sex=="F"){
    do {
        rand = Math.floor(Math.random() * 10);
    }
    while (rand%2 != 0);
    sex=rand;
}

if(sex=="M"){
    do {
        rand = Math.floor(Math.random() * 10);
    }
    while (rand%2 == 0);
    sex=rand;
}

pesel=""+year+month+day+seriesNr[0]+seriesNr[1]+seriesNr[2]+sex;

for(var i=0;i<pesel.length;i++){
   tmp+=pesel[i]*wagi[i];
}
controlSum=tmp%10;
pesel+=controlSum;
return pesel;
}

var d1 = new Date("2101-03-25");
var d2 = new Date("1963-09-07");
console.log("F: "+generatePesel(d1,"F"));
console.log("M: "+generatePesel(d2,"M"));