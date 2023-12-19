import { mainTransform } from "@/app/calculator/calculator-utils";

describe('tests for the main transform function', () => {
    test('works if there are zero dopamine agonists', () => {
        const exampleMedicines = [
            { name: 'Stalevo (levodopa, carbidopa and entacapone) 125mg', frequencyPerDay: 3 },
            { name: 'Sinemet (co-careldopa) 62.5mg (50mg/12.5mg)', frequencyPerDay: 4 }
        ];

        const expectedMadopar = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 2 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 2 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 1 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 1 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
        };

        const expectedResult = {
            option1: expectedMadopar,
            option2: 6
        };

        expect(mainTransform(exampleMedicines)).toEqual(expectedResult);
    })

    test('works if there are only dopamine agonists', () => {
        const exampleMedicines = [
            { name: 'Pramipexole (Mirapexin) Prolonged Release (0.52mg/0.75mg)', frequencyPerDay: 7 }
        ];

        const expectedMadopar = {
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
        };

        const expectedResult = {
            option1: expectedMadopar,
            option2: 12
        };

        expect(mainTransform(exampleMedicines)).toEqual(expectedResult);
    })

    test('works if there are a mix of dopamine agonists and non-dopamine agonists', () => {
        const exampleMedicines = [
            { name: 'Ropinirole (Requip XL) 8mg', frequencyPerDay: 1 },
            { name: 'Stalevo (levodopa, carbidopa and entacapone) 125mg', frequencyPerDay: 2 }
        ];

        const expectedMadopar = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 1 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 1 }
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
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 1 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0 }
            ],
        };

        const expectedMadoparForJustNonDopamineAgonists = {
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
        };

        const expectedOptionTwoObject = {
            madoparDose: expectedMadoparForJustNonDopamineAgonists,
            rotigotineDose: 4
        };

        const expectedResult = {
            option1: expectedMadopar,
            option2: expectedOptionTwoObject,
            option3: 4
        };

        expect(mainTransform(exampleMedicines)).toEqual(expectedResult);
    })
});