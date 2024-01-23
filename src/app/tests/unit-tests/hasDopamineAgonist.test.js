import { hasDopamineAgonist } from "@/app/calculator/calculator-functions";

describe('tests for hasDopamineAgonist fn', () => {

    test('returns false if there are zero dopamine agonists - ', () => {
        const exampleMedicines = [
            { name: 'Stalevo (levodopa, carbidopa and entacapone) 125/31.25/200mg', frequencyPerDay: 3 },
            { name: 'Sinemet (Co-careldopa) 62.5mg (12.5/50mg)', frequencyPerDay: 4 }
        ]
        expect(hasDopamineAgonist(exampleMedicines)).toBe(false);
    })

    test('returns true if all the medicines are dopamine agonists', () => {
        const exampleMedicines = [
            { name: 'Ropinirole (Immediate Release) 250µg', frequencyPerDay: 2 },
            { name: 'Pramipexole (Mirapexin) 88µg base (125µg salt)', frequencyPerDay: 1 }
        ]
        expect(hasDopamineAgonist(exampleMedicines)).toBe(true);
    })

    test('returns true if the medicines are a mix of dopamine agoinsts and non-dopamine agonists', () => {
        const exampleMedicines = [
            { name: 'Ropinirole (Immediate Release) 250µg', frequencyPerDay: 5 },
            { name: 'Sinemet (Co-careldopa) 62.5mg (12.5/50mg)', frequencyPerDay: 6 }
        ]
        expect(hasDopamineAgonist(exampleMedicines)).toBe(true);
    })
})