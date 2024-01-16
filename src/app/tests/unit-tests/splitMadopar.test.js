import { splitMadopar } from "@/app/calculator/calculator-functions";

describe('tests for splitMadopar fn', () => {
    test('works for less than four madopars', () => {
        const madoparObj = {
            'Madopar Dispersible 125mg (100mg/25mg)': 2,
            'Madopar Dispersible 62.5mg (50mg/12.5mg)': 1
        };

        const expectedResult = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 1 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 1 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 0 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 1 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 0 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
        }

        expect(splitMadopar(madoparObj)).toEqual(expectedResult);
    })

    test('works for four madopars', () => {
        const madoparObj = {
            'Madopar Dispersible 125mg (100mg/25mg)': 3,
            'Madopar Dispersible 62.5mg (50mg/12.5mg)': 1
        };

        const expectedResult = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 1 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 1 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 1 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 0 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 1 }
            ],
        }

        expect(splitMadopar(madoparObj)).toEqual(expectedResult);
    })

    test('works for five to seven madopars', () => {
        const madoparObj = {
            'Madopar Dispersible 125mg (100mg/25mg)': 5,
            'Madopar Dispersible 62.5mg (50mg/12.5mg)': 1
        };

        const expectedResult = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 2 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 1 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 1 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 1 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 1 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
        }

        expect(splitMadopar(madoparObj)).toEqual(expectedResult);
    })

    test('works for eight madopars', () => {
        const madoparObj = {
            'Madopar Dispersible 125mg (100mg/25mg)': 8,
            'Madopar Dispersible 62.5mg (50mg/12.5mg)': 0
        };

        const expectedResult = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 2 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 2 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 2 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 2 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
        }

        expect(splitMadopar(madoparObj)).toEqual(expectedResult);
    })

    test('works for greater than eight madopars', () => {
        const madoparObj = {
            'Madopar Dispersible 125mg (100mg/25mg)': 10,
            'Madopar Dispersible 62.5mg (50mg/12.5mg)': 1
        };

        const expectedResult = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 3 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 3 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 2 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 1 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 2 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
        }

        expect(splitMadopar(madoparObj)).toEqual(expectedResult);
    })

});