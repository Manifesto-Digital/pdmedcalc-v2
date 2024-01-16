import { allocateMadopar } from "@/app/calculator/calculator-functions";

describe('tests for allocateMadopar fn', () => {
    test('works for less than four madopars', () => {

        const expectedResult = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
        }

        expect(allocateMadopar(2, 1)).toEqual(expectedResult);
    })

    test('works for four madopars', () => {

        const expectedResult = {
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
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
        }

        expect(allocateMadopar(3, 1)).toEqual(expectedResult);
    })

    test('works for five to seven madopars', () => {

        const expectedResult = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 2, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
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

        expect(allocateMadopar(5, 1)).toEqual(expectedResult);
    })

    test('works for eight madopars', () => {

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

        expect(allocateMadopar(8, 0)).toEqual(expectedResult);
    })

    test('works for greater than eight madopars', () => {
        const expectedResult = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 3, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 3, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 2, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 2, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
        }

        expect(allocateMadopar(10, 1)).toEqual(expectedResult);
    })

});