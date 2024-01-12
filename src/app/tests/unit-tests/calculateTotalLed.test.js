import { calculateTotalLed } from "@/app/calculator/calculator-utils";

describe('tests for calculateTotalLed fn', () => {
    test('returns the correct total led', () => {
        const exampleMedicines = [
            { name: 'Sinemet (co-careldopa) 125mg (100mg/25mg)', frequencyPerDay: 2 },
            { name: 'Pramipexole (Mirapexin) Prolonged Release (0.26mg/0.375mg)', frequencyPerDay: 1 },
            { name: 'Stalevo (levodopa, carbidopa and entacapone) 175mg', frequencyPerDay: 3 }
        ]
        expect(calculateTotalLed(exampleMedicines)).toBe(762.5);
    })
})