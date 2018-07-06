function generatePesel(date,sex,nr){

var year=getValidYearInTwoDigits(date);
var month=getValidMonth(date);
var day=getValidDay(date);
var sexDigit=getDigitForSex(sex);
var pesel=""+year+month+day+nr+sexDigit;
pesel+=getControlSum(pesel);

return pesel;
}

function getValidMonth(date){
    var fullYear=date.getFullYear();
    var month=date.getMonth()+1;

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

    return month;
}

function getValidYearInTwoDigits(date){
    var fullYear=date.getFullYear();
    var year=fullYear%100;

    if(year<10)
    year="0"+year;

    return year; 
}

function getControlSum(notFullPesel){
    var wagi = new Array (1, 3, 7, 9, 1, 3, 7, 9, 1, 3);
    var controlSum=0;
    var tmp=0;
    for(var i=0;i<notFullPesel.length;i++){
        tmp+=notFullPesel[i]*wagi[i];
     }
     controlSum=tmp%10;
     return controlSum;
}

function getDigitForSex(sex){
    var rand;

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
    return sex;
}

function getValidDay(date){
    var day=date.getDate();

    if(day<10)
    day="0"+day;

    return day;
}

console.log("F: "+generatePesel(new Date("2101-03-25"),"F",123));
console.log("M: "+generatePesel(new Date("1963-09-07"),"M",456));