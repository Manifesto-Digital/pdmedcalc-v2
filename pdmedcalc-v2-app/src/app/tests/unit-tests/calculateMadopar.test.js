import { calculateMadopar } from "@/app/calculator/calculator-utils";

describe('tests for calculateMadopar fn', () => {

    test('no rounding up required - only uses big madopar', () => {
        const expectedResult = {
            'Madopar Dispersible 125mg (100mg/25mg)': 4,
            'Madopar Dispersible 62.5mg (50mg/12.5mg)': 0
        }
        expect(calculateMadopar(400)).toEqual(expectedResult);
    })

    test('no rounding up required - only uses small madopar', () => {
        const expectedResult = {
            'Madopar Dispersible 125mg (100mg/25mg)': 0,
            'Madopar Dispersible 62.5mg (50mg/12.5mg)': 1
        }
        expect(calculateMadopar(50)).toEqual(expectedResult);
    })

    test('no rounding up required - uses big madopar AND small madopar', () => {
        const expectedResult = {
            'Madopar Dispersible 125mg (100mg/25mg)': 2,
            'Madopar Dispersible 62.5mg (50mg/12.5mg)': 1
        }
        expect(calculateMadopar(250)).toEqual(expectedResult);
    })

    test('Rounding up IS required - only uses big madopar', () => {
        const expectedResult = {
            'Madopar Dispersible 125mg (100mg/25mg)': 8,
            'Madopar Dispersible 62.5mg (50mg/12.5mg)': 0
        }
        expect(calculateMadopar(762.5)).toEqual(expectedResult);
    })

    test('Rounding up IS required - only uses small madopar', () => {
        const expectedResult = {
            'Madopar Dispersible 125mg (100mg/25mg)': 0,
            'Madopar Dispersible 62.5mg (50mg/12.5mg)': 1
        }
        expect(calculateMadopar(37.5)).toEqual(expectedResult);
    })

    test('Rounding up IS required - uses big madopar AND small madopar', () => {
        const expectedResult = {
            'Madopar Dispersible 125mg (100mg/25mg)': 6,
            'Madopar Dispersible 62.5mg (50mg/12.5mg)': 1
        }
        expect(calculateMadopar(637.5)).toEqual(expectedResult);
    })

});