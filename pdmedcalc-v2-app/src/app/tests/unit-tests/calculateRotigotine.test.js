import { calculateRotigotine } from "@/app/calculator/calculator-utils";

describe('tests for calculateRotigotine fn', () => {
    test('works if all medicines are dopamine agonists - recommended patchdose within patchdose range', () => {
        const exampleMedicines = [
            { name: 'Ropinirole (Immediate Release) 2mg', frequencyPerDay: 3 },
            { name: 'Pramipexole (Mirapexin) (0.35mg/0.5mg)', frequencyPerDay: 2 }
        ]
        expect(calculateRotigotine(exampleMedicines)).toBe(4);
    })

    test('works if all medicines are dopamine agonists - recommended patchdose below min patchdose', () => {
        const exampleMedicines = [{ name: 'Ropinirole (Requip XL) 2mg', frequencyPerDay: 1 }]
        expect(calculateRotigotine(exampleMedicines)).toBe(2);
    })

    test('works if all medicines are dopamine agonists - recommended patchdose above max patchdose', () => {
        const exampleMedicines = [
            { name: 'Ropinirole (Requip XL) 24mg', frequencyPerDay: 1 },
            { name: 'Pramipexole (Mirapexin) Prolonged Release (1.05mg/1.5mg)', frequencyPerDay: 2 }
        ]
        expect(calculateRotigotine(exampleMedicines)).toBe(16);
    })

    test('works if some medicines are NOT dopamine agonists - recommended patchdose within patchdose range', () => {
        const exampleMedicines = [
            { name: 'Sinemet (co-careldopa) 125mg (100mg/25mg)', frequencyPerDay: 2 },
            { name: 'Pramipexole (Mirapexin) Prolonged Release (0.26mg/0.375mg)', frequencyPerDay: 1 },
            { name: 'Stalevo (levodopa, carbidopa and entacapone) 175mg', frequencyPerDay: 3 }
        ]
        expect(calculateRotigotine(exampleMedicines)).toBe(8);
    })

    test('works if some medicines are NOT dopamine agonists - recommended patchdose below min patchdose', () => {
        const exampleMedicines = [{ name: 'Sinemet (co-careldopa) 62.5mg (50mg/12.5mg)', frequencyPerDay: 2 }]
        expect(calculateRotigotine(exampleMedicines)).toBe(2);
    })

    test('works if some medicines are NOT dopamine agonists - recommended patchdose above max patchdose', () => {
        const exampleMedicines = [
            { name: 'Sinemet (co-careldopa) 125mg (100mg/25mg)', frequencyPerDay: 3 },
            { name: 'Pramipexole (Mirapexin) Prolonged Release (1.57mg/2.25mg)', frequencyPerDay: 1 },
            { name: 'Stalevo (levodopa, carbidopa and entacapone) 175mg', frequencyPerDay: 5 }
        ]
        expect(calculateRotigotine(exampleMedicines)).toBe(16);
    })
});