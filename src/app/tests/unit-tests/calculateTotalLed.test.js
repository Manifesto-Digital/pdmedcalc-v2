import { calculateTotalLed } from "@/app/calculator/calculator-functions";

describe('tests for calculateTotalLed fn', () => {
    
    test('returns the correct total led if there are no comt inhibitors', () => {
        const exampleMedicines = [
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 2 },
            { name: 'Pramipexole (Mirapexin) Prolonged Release 260µg base (375µg salt)', frequencyPerDay: 2 },
        ]
        expect(calculateTotalLed(exampleMedicines)).toBe(275);
    })

    test('returns the correct total led if there IS a comt inhibitor', () => {
        const exampleMedicines1 = [
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 2 },
            { name: 'Pramipexole (Mirapexin) Prolonged Release 260µg base (375µg salt)', frequencyPerDay: 1 },
            { name: 'Tolcapone 100mg', frequencyPerDay: 3 },
        ];

        const exampleMedicines2 = [
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 2 },
            { name: 'Pramipexole (Mirapexin) Prolonged Release 260µg base (375µg salt)', frequencyPerDay: 1 },
            { name: 'Entacapone 200mg', frequencyPerDay: 3 },
        ];

        const exampleMedicines3 = [
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 2 },
            { name: 'Pramipexole (Mirapexin) Prolonged Release 260µg base (375µg salt)', frequencyPerDay: 1 },
            { name: 'Opicapone 50mg', frequencyPerDay: 3 },
        ];

        expect(calculateTotalLed(exampleMedicines1)).toBe(337.5);
        expect(calculateTotalLed(exampleMedicines2)).toBe(303.5);
        expect(calculateTotalLed(exampleMedicines3)).toBe(337.5);
    })

    test('returns the correct total led if there are multiple comt inhibitors', () => {
        const exampleMedicines = [
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 2 },
            { name: 'Pramipexole (Mirapexin) Prolonged Release 260µg base (375µg salt)', frequencyPerDay: 1 },
            { name: 'Stalevo (levodopa, carbidopa and entacapone) 175/43.75/200mg', frequencyPerDay: 3 },
        ];

        expect(calculateTotalLed(exampleMedicines)).toBe(1001.75);
    })

    test('Sinemet 1 per day + Opicapone 1 per day === 150 ', () => {
        const exampleMedicines = [
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 1 },
            { name: 'Opicapone 50mg', frequencyPerDay: 1 },
        ];

        expect(calculateTotalLed(exampleMedicines)).toBe(150);
    })

    test('Sinemet 125mg 1/day + Ropinirole 10mg 1/day + Opicapone 50mg 1/day === 350 ', () => {
        const exampleMedicines = [
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 1 },
            { name: 'Ropinirole (Requip XL) 10mg', frequencyPerDay: 1 },
            { name: 'Opicapone 50mg', frequencyPerDay: 1 },
        ];

        expect(calculateTotalLed(exampleMedicines)).toBe(350);
    })

    test('Stalevo + Madopar', () => {
        const exampleMedicines = [
            { name: 'Stalevo (levodopa, carbidopa and entacapone) 100/25/200mg', frequencyPerDay: 4 },
            { name: 'Madopar (Co-beneldopa) 62.5mg (12.5/50mg)', frequencyPerDay: 4 },
        ];

        expect(calculateTotalLed(exampleMedicines)).toBe(798);
    })
})