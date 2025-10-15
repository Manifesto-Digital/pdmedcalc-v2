import { calculateMaxSpread } from "@/app/calculator/calculator-functions";

describe('tests for calculateMaxSpread fn', () => {
    test('correctly returns the maximum difference in total led between the time slots', () => {

        const timeMadoparObj1 = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 3, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0, led: 50 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0, led: 50 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0, led: 50 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0, led: 50 }
            ],
        }

        expect(calculateMaxSpread(timeMadoparObj1)).toEqual(300);


        const timeMadoparObj2 = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0, led: 50 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0, led: 50 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 1, led: 50 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0, led: 50 }
            ],
        }

        expect(calculateMaxSpread(timeMadoparObj2)).toEqual(100);

        const timeMadoparObj3 = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 2, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0, led: 50 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 2, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0, led: 50 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 2, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0, led: 50 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 2, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0, led: 50 }
            ],
        }

        expect(calculateMaxSpread(timeMadoparObj3)).toEqual(0);

        const timeMadoparObj4 = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0, led: 50 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0, led: 50 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0, led: 50 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 1, led: 50 }
            ],
        }

        expect(calculateMaxSpread(timeMadoparObj4)).toEqual(50);

        const timeMadoparObj5 = {
            "0800": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 4, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 2, led: 50 }
            ],
            "1200": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 1, led: 50 }
            ],
            "1600": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 1, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 0, led: 50 }
            ],
            "2000": [
                { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: 0, led: 100 },
                { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: 1, led: 50 }
            ],
        }

        expect(calculateMaxSpread(timeMadoparObj5)).toEqual(450);
    })

});