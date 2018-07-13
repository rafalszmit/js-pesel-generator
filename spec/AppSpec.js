/*jslint es6 */
/*global describe, it, expect */
/*global require */
"use strict";

describe("Pesel generator", function () {

    var generatePesel = require('../app.js');

    function getMonth(pesel) {
        return pesel.slice(2, 4);
    }

    function getControlSum(pesel) {
        return pesel.substr(-1);
    }

    function getGenderDigit(pesel) {
        return pesel.slice(9, 10);
    }

    it("should return female pesel", function () {
        let pesel = generatePesel(new Date("1963-09-07"), "F", 111);
        expect(parseInt(getGenderDigit(pesel))).toBeEvenNumber();
    });

    it("should return male pesel", function () {
        let pesel = generatePesel(new Date("1963-09-07"), "M", 111);
        expect(parseInt(getGenderDigit(pesel))).toBeOddNumber();
    });

    it("should return pesel with valid control sum", function () {
        let pesel = generatePesel(new Date("1980-01-12"), 1, 743);
        let expectedPesel = '80011274315';//generated with http://pesel.felis-net.com/
        expect(getControlSum(pesel)).toEqual(getControlSum(expectedPesel));
    });

    it("should return pesel with month number increased by 80 for someone born between 1800 and 1899", function () {
        let pesel = generatePesel(new Date("1899-12-02"), "M", 111);
        expect(getMonth(pesel)).toBe('92');
    });

    it("should return pesel with month number increased by 20 for someone born between 2000 and 2099", function () {
        let pesel = generatePesel(new Date("2000-01-02"), "M", 111);
        expect(getMonth(pesel)).toBe('21');
    });

    it("should return pesel with month number increased by 40 for someone born between 2100 and 2199", function () {
        let pesel = generatePesel(new Date("2150-01-02"), "M", 111);
        expect(getMonth(pesel)).toBe('41');
    });

    it("should return pesel with month number increased by 60 for someone born between 2200 and 2299", function () {
        let pesel = generatePesel(new Date("2299-01-02"), "M", 111);
        expect(getMonth(pesel)).toBe('61');
    });
});