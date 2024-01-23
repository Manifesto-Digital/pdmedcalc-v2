import { calculateTotalLed } from "@/app/calculator/calculator-functions";

describe('tests for calculateTotalLed fn', () => {
    test('returns the correct total led if there are no comt inhibitors', () => {
        const exampleMedicines = [
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 2 },
            { name: 'Pramipexole (Mirapexin) Prolonged Release 260µg base (375µg salt)', frequencyPerDay: 1 },
            { name: 'Stalevo (levodopa, carbidopa and entacapone) 175/43.75/200mg', frequencyPerDay: 3 }
        ]
        expect(calculateTotalLed(exampleMedicines)).toBe(935.75);
    })

    test('returns the correct total led if there IS a comt inhibitor', () => {
        const exampleMedicines1 = [
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 2 },
            { name: 'Pramipexole (Mirapexin) Prolonged Release 260µg base (375µg salt)', frequencyPerDay: 1 },
            { name: 'Stalevo (levodopa, carbidopa and entacapone) 175/43.75/200mg', frequencyPerDay: 3 },
            { name: 'Tolcapone', frequencyPerDay: 3 },
        ];

        const exampleMedicines2 = [
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 2 },
            { name: 'Pramipexole (Mirapexin) Prolonged Release 260µg base (375µg salt)', frequencyPerDay: 1 },
            { name: 'Stalevo (levodopa, carbidopa and entacapone) 175/43.75/200mg', frequencyPerDay: 3 },
            { name: 'Entacapone', frequencyPerDay: 3 },
        ];

        const exampleMedicines3 = [
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 2 },
            { name: 'Pramipexole (Mirapexin) Prolonged Release 260µg base (375µg salt)', frequencyPerDay: 1 },
            { name: 'Stalevo (levodopa, carbidopa and entacapone) 175/43.75/200mg', frequencyPerDay: 3 },
            { name: 'Opicapone', frequencyPerDay: 3 },
        ];


        expect(calculateTotalLed(exampleMedicines1)).toBe(1403.625);
        expect(calculateTotalLed(exampleMedicines2)).toBe(1244.5475000000001);
        expect(calculateTotalLed(exampleMedicines3)).toBe(1403.625);
    })

    test('returns the correct total led if there are multiple comt inhibitors', () => {
        const exampleMedicines = [
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 2 },
            { name: 'Pramipexole (Mirapexin) Prolonged Release 260µg base (375µg salt)', frequencyPerDay: 1 },
            { name: 'Stalevo (levodopa, carbidopa and entacapone) 175/43.75/200mg', frequencyPerDay: 3 },
            { name: 'Tolcapone', frequencyPerDay: 3 },
            { name: 'Entacapone', frequencyPerDay: 3 },
        ];

        expect(calculateTotalLed(exampleMedicines)).toBe(1403.625);
    })
})