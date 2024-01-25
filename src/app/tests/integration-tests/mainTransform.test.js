import { mainTransform } from "@/app/calculator/calculator-functions";

describe('tests for the main transform function', () => {

    test('Produces correct output when entered medicines does not include a comt inhibitor or any dopamine agonists', () => {

        const exampleMedicines = [
            { name: 'Madopar (Co-beneldopa) 125mg (25/100mg)', frequencyPerDay: 3 },
            { name: 'Sinemet (Co-careldopa) 62.5mg (12.5/50mg)', frequencyPerDay: 2 },
        ];

        const expectedMadopar = {
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
        };

        const expectedResult = {
            option1: expectedMadopar,
            option2: 2
        };

        expect(mainTransform(exampleMedicines)).toEqual(expectedResult);
    })


    test('Produces correct output when entered medicines does not include any dopamine agonists but does include a comt inhibitor', () => {
        const exampleMedicines1 = [
            { name: 'Sinemet (Co-careldopa) 110mg (10/100mg)', frequencyPerDay: 5 },
            { name: 'Opicapone 50mg', frequencyPerDay: 5 },
        ];

        const expectedMadopar1 = {
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
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
        };

        const expectedResult1 = {
            option1: expectedMadopar1,
            option2: 6
        };

        const exampleMedicines2 = [
            { name: 'Madopar (Co-beneldopa) CR 125mg (25/100mg)', frequencyPerDay: 5 },
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 5 },
            { name: 'Tolcapone 100mg', frequencyPerDay: 5 },
        ];

        const expectedMadopar2 = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 3, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 3, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 3, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 3, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
        };

        const expectedResult2 = {
            option1: expectedMadopar2,
            option2: 10
        };

        expect(mainTransform(exampleMedicines1)).toEqual(expectedResult1);
        expect(mainTransform(exampleMedicines2)).toEqual(expectedResult2);
    })


    test('Produces correct output when entered medicines includes dopamine agonists AND a comt inhibitor', () => {

        const exampleMedicines = [
            { name: 'Madopar (Co-beneldopa) CR 125mg (25/100mg)', frequencyPerDay: 4 },
            { name: 'Pramipexole (Mirapexin) 700µg base (1mg salt)', frequencyPerDay: 4 },
            { name: 'Tolcapone 100mg', frequencyPerDay: 4 },
        ];

        const expectedMadopar = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 3, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 2, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 2, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 2, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
        };

        const expectedResult = {
            option1: expectedMadopar,
            option2: 16
        };

        expect(mainTransform(exampleMedicines)).toEqual(expectedResult);
    })


    test('Produces correct output when entered medicines includes just dopamine agonists', () => {

        const exampleMedicines = [
            { name: 'Ropinirole (Requip XL) 4mg', frequencyPerDay: 1 },
            { name: 'Pramipexole (Mirapexin) Prolonged Release 520µg base (750µg salt)', frequencyPerDay: 2 },
        ];

        const expectedMadopar = {
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
        };

        const expectedResult = {
            option1: expectedMadopar,
            option2: 8
        };

        expect(mainTransform(exampleMedicines)).toEqual(expectedResult);
    })


    test('Produces correct output when entered medicines includes just dopamine agonists and a comt inhibitor', () => {

        const exampleMedicines = [
            { name: 'Ropinirole (Requip XL) 6mg', frequencyPerDay: 1 },
            { name: 'Entacapone 200mg', frequencyPerDay: 1 },
        ];

        const expectedMadopar = {
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
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
        };

        const expectedResult = {
            option1: expectedMadopar,
            option2: 4
        };

        expect(mainTransform(exampleMedicines)).toEqual(expectedResult);
    })


    test('Produces correct output when entered medicines includes dopamine agonists AND medicines that are neither dopamine agonists nor comt inhibitors', () => {

        const exampleMedicines = [
            { name: 'Ropinirole (Requip XL) 2mg', frequencyPerDay: 1 },
            { name: 'Half Sinemet (Co-careldopa) CR 25/100mg', frequencyPerDay: 4 },
        ];

        const expectedMadopar = {
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
        };

        const expectedResult = {
            option1: expectedMadopar,
            option2: 4
        };

        expect(mainTransform(exampleMedicines)).toEqual(expectedResult);
    })

    /* test patient examples provided by James */

    test('Patient 1', () => {
        const exampleMedicines = [
            { name: 'Madopar (Co-beneldopa) 125mg (25/100mg)', frequencyPerDay: 3 },
        ];

        const expectedMadopar = {
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
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
        };

        const expectedResult = {
            option1: expectedMadopar,
            option2: 2
        };

        expect(mainTransform(exampleMedicines)).toEqual(expectedResult);
    })

    test('Patient 2', () => {
        const exampleMedicines = [
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 4 },
        ];

        const expectedMadopar = {
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
        };

        const expectedResult = {
            option1: expectedMadopar,
            option2: 2
        };

        expect(mainTransform(exampleMedicines)).toEqual(expectedResult);
    })

    test('Patient 3', () => {
        const exampleMedicines = [
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 4 },
            { name: 'Sinemet (Co-careldopa) 62.5mg (12.5/50mg)', frequencyPerDay: 2 }
        ];

        const expectedMadopar = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
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
        };

        const expectedResult = {
            option1: expectedMadopar,
            option2: 4
        };

        expect(mainTransform(exampleMedicines)).toEqual(expectedResult);
    })

    test('Patient 4', () => {
        const exampleMedicines = [
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 5 },
            { name: 'Entacapone 200mg', frequencyPerDay: 5 }
        ];

        const expectedMadopar = {
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
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
        };

        const expectedResult = {
            option1: expectedMadopar,
            option2: 6
        };

        expect(mainTransform(exampleMedicines)).toEqual(expectedResult);
    })

    test('Patient 5', () => {
        const exampleMedicines = [
            { name: 'Ropinirole (Requip XL) 16mg', frequencyPerDay: 1 }
        ];

        const expectedMadopar = {
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
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
        };

        const expectedResult = {
            option1: expectedMadopar,
            option2: 10
        };

        expect(mainTransform(exampleMedicines)).toEqual(expectedResult);
    })

    test('Patient 6', () => {
        const exampleMedicines = [
            { name: 'Pramipexole (Mirapexin) Prolonged Release 1.57mg base (2.25mg salt)', frequencyPerDay: 1 }
        ];

        const expectedMadopar = {
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
        };

        const expectedResult = {
            option1: expectedMadopar,
            option2: 8
        };

        expect(mainTransform(exampleMedicines)).toEqual(expectedResult);
    })

    test('Patient 7', () => {
        const exampleMedicines = [
            { name: 'Pramipexole (Mirapexin) 350µg base (500µg salt)', frequencyPerDay: 3 }
        ];

        const expectedMadopar = {
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
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 0, led: 50 }
            ],
        };

        const expectedResult = {
            option1: expectedMadopar,
            option2: 4
        };

        expect(mainTransform(exampleMedicines)).toEqual(expectedResult);
    })

    test('Patient 8', () => {
        const exampleMedicines = [
            { name: 'Stalevo (levodopa, carbidopa and entacapone) 150/37.5/200mg', frequencyPerDay: 5 },
        ];

        const expectedMadopar = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 2, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 2, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 2, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 2, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
            ],
        };

        const expectedResult = {
            option1: expectedMadopar,
            option2: 8
        };

        expect(mainTransform(exampleMedicines)).toEqual(expectedResult);
    })

    test('Patient 9', () => {
        const exampleMedicines = [
            { name: 'Half Sinemet (Co-careldopa) CR 25/100mg', frequencyPerDay: 1 },
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 4 }
        ];

        const expectedMadopar = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
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
        };

        const expectedResult = {
            option1: expectedMadopar,
            option2: 4
        };

        expect(mainTransform(exampleMedicines)).toEqual(expectedResult);
    })

    test('Patient 10', () => {
        const exampleMedicines = [
            { name: 'Ropinirole (Requip XL) 4mg', frequencyPerDay: 1 },
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 4 }
        ];

        const expectedMadopar = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: 1, led: 50 }
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
        };

        const expectedResult = {
            option1: expectedMadopar,
            option2: 6
        };

        expect(mainTransform(exampleMedicines)).toEqual(expectedResult);
    })

});