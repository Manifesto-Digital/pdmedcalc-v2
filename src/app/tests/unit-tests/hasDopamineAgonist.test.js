import { hasDopamineAgonist } from "@/app/calculator/calculator-utils";

describe('tests for hasDopamineAgonist fn', () => {

    test('works if there are zero dopamine agonists - returns false', () => {
        const exampleMedicines = [
            { name: 'Stalevo (levodopa, carbidopa and entacapone) 125mg', frequencyPerDay: 3 },
            { name: 'Sinemet (co-careldopa) 62.5mg (50mg/12.5mg)', frequencyPerDay: 4 }
        ]
        expect(hasDopamineAgonist(exampleMedicines)).toBe(false);
    })

    test('works if all the medicines are dopamine agonists - returns true', () => {
        const exampleMedicines = [
            { name: 'Ropinirole (Immediate Release) 250µg', frequencyPerDay: 2 },
            { name: 'Pramipexole (Mirapexin) (0.088mg/0.125mg)', frequencyPerDay: 1 }
        ]
        expect(hasDopamineAgonist(exampleMedicines)).toBe(true);
    })

    test('works if the medicines are a mix of dopamine agoinsts and non-dopamine agonists - returns true', () => {
        const exampleMedicines = [
            { name: 'Ropinirole (Immediate Release) 250µg', frequencyPerDay: 5 },
            { name: 'Sinemet (co-careldopa) 62.5mg (50mg/12.5mg)', frequencyPerDay: 6 }
        ]
        expect(hasDopamineAgonist(exampleMedicines)).toBe(true);
    })
})