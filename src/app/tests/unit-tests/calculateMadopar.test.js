import { calculateMadopar } from "@/app/calculator/calculator-functions";

describe('Tests for calculateMadopar fn. Does it correctly return the dose with the minimum possible spread of total led between the time slots when: ', () => {

    test('target led does not need any rounding and the dose only uses big madopar', () => {

        const expectedResult1 = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
        }

        expect(calculateMadopar(400)).toEqual(expectedResult1);
    })

    test('target led does not need any rounding and the dose only uses small madopar', () => {
        const expectedResult = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
        }
        expect(calculateMadopar(50)).toEqual(expectedResult);
    })

    test('target led does not need any rounding and the dose uses both big madopar AND small madopar', () => {
        const expectedResult = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
        }
        expect(calculateMadopar(250)).toEqual(expectedResult);
    })

    test('target led needs to be rounded down and the dose only uses big madopar', () => {
        const expectedResult = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 2, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 2, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 2, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 2, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
        }
        expect(calculateMadopar(812.5)).toEqual(expectedResult);
    })

    test('target led needs to be rounded up and the dose only uses small madopar', () => {
        const expectedResult = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
        }
        expect(calculateMadopar(87.5)).toEqual(expectedResult);
    })

    test('target led needs to be rounded up and the dose uses both big madopar AND small madopar', () => {
        const expectedResult = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 2, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 2, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
        }
        expect(calculateMadopar(687.5)).toEqual(expectedResult);
    })

});