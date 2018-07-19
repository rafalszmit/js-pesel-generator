/*jslint es6 */
"use strict";
function fillZeros(value) {
    if (value < 10) {
        value = "0" + value;
    }
    return value;
}

function getValidMonth(date) {
    var fullYear = date.getFullYear();
    var month = date.getMonth() + 1;

    if (fullYear >= 1800 && fullYear <= 1899) {
        month += 80;
    } else if (fullYear >= 2000 && fullYear <= 2099) {
        month += 20;
    } else if (fullYear >= 2100 && fullYear <= 2199) {
        month += 40;
    } else if (fullYear >= 2200 && fullYear <= 2299) {
        month += 60;
    }
    return month;
}

function getValidYearInTwoDigits(date) {
    var fullYear = date.getFullYear();
    var year = fullYear % 100;
    return year;
}

function getControlSum(notFullPesel) {
    var wagi = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    return wagi.map((a, b) => a * notFullPesel[b]).reduce((sum, i) => sum + i) % 10;
}

function getDigitForGender(genderDigit) {
    var female = [0, 2, 4, 6, 8];
    var male = [1, 3, 5, 7, 9];

    if (genderDigit === "F") {
        genderDigit = female[Math.floor(Math.random() * female.length)];
    }
    if (genderDigit === "M") {
        genderDigit = male[Math.floor(Math.random() * male.length)];
    }
    return genderDigit;
}

function generatePesel(date, sex, nr) {
    var year = fillZeros(getValidYearInTwoDigits(date));
    var month = fillZeros(getValidMonth(date));
    var day = fillZeros(date.getDate());
    var genderDigit = getDigitForGender(sex);
    var pesel = `${year}${month}${day}${nr}${genderDigit}`;
    pesel += getControlSum(pesel);
    return pesel;
}

module.exports = generatePesel;
// console.log("F: " + generatePesel(new Date("2101-03-25"), "F", 111));
// console.log("M: " + generatePesel(new Date("1963-09-07"), "M", 999));