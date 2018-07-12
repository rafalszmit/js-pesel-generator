/*jslint es6 */
/*global describe, it, expect */
/*global require */
"use strict";

describe("Pesel generator", function () {

    var generatePesel = require('../app.js');
    const genderDigitPosition = 9;
    const controlSumPosition = 10;

    function isEven(num) {
        return num % 2;
    }

    function getMonth(pesel) {
        return pesel.slice(2, 4);
    }

    function getControlSum(pesel) {
        return pesel.substr(-1);
    }

    it("should return female pesel", function () {
        let pesel = generatePesel(new Date("1963-09-07"), "F", 111);
        expect(isEven(pesel[genderDigitPosition])).toBe(0);
    });

    it("should return male pesel", function () {
        let pesel = generatePesel(new Date("1963-09-07"), "M", 111);
        expect(isEven(pesel[genderDigitPosition])).not.toBe(0);
    });

    it("should return pesel with valid control sum", function () {
        let pesel = generatePesel(new Date("1980-01-12"), 1, 743);
        let expectedPesel = '80011274315';//generated with http://pesel.felis-net.com/
        expect(pesel[controlSumPosition]).toEqual((getControlSum(expectedPesel)).toString());
    });

    it("should return valid pesel for someone born between 1800 and 1899", function () {
        let pesel = generatePesel(new Date("1899-12-02"), "M", 111);
        expect(getMonth(pesel)).toBe('92');
    });

    it("should return valid pesel for someone born between 2000 and 2099", function () {
        let pesel = generatePesel(new Date("2000-01-02"), "M", 111);
        expect(getMonth(pesel)).toBe('21');
    });

    it("should return valid pesel for someone born between 2100 and 2199", function () {
        let pesel = generatePesel(new Date("2150-01-02"), "M", 111);
        expect(getMonth(pesel)).toBe('41');
    });

    it("should return valid pesel for someone born between 2200 and 2299", function () {
        let pesel = generatePesel(new Date("2299-01-02"), "M", 111);
        expect(getMonth(pesel)).toBe('61');
    });
});