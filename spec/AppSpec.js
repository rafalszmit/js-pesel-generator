describe("Pesel generator", function () {
    var generatePesel = require('../app.js');

    it("should return female pesel", function () {
        pesel = generatePesel(new Date("1963-09-07"), "F",111);
        expect(pesel[10] % 2).toBe(0);
    });

    it("should return male pesel", function () {
        pesel = generatePesel(new Date("1963-09-07"), "M",111);
        expect(pesel[10] % 2).not.toBe(0);
    });

    it("should return pesel with valid control sum", function () {
        pesel = generatePesel(new Date("1963-09-07"), "F", 111);
        var wagi = new Array(1, 3, 7, 9, 1, 3, 7, 9, 1, 3);
        var controlSum = 0;
        for (var i = 0; i < pesel.length-1; i++) {
            controlSum += pesel[i] * wagi[i];
        }
        controlSum =controlSum % 10;
        expect(pesel[10]).toBe(controlSum.toString());
    });

    it("should return valid pesel for someone born between 1800 and 1899", function () {
        pesel = generatePesel(new Date("1899-01-02"), "M",111);
        expect(pesel[2]).not.toBe(8);
    });

    it("should return valid pesel for someone born between 2000 and 2099", function () {
        pesel = generatePesel(new Date("2000-01-02"), "M",111);
        expect(pesel[2]).not.toBe(2);
    });

    it("should return valid pesel for someone born between 2100 and 2199", function () {
        pesel = generatePesel(new Date("2150-01-02"), "M",111);
        expect(pesel[2]).not.toBe(4);
    });

    it("should return valid pesel for someone born between 2200 and 2299", function () {
        pesel = generatePesel(new Date("2299-01-02"), "M",111);
        expect(pesel[2]).not.toBe(6);
    });

    
});