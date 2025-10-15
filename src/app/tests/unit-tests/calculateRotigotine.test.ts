import { calculateRotigotine } from "@/app/calculator/calculator-functions";

describe('tests for calculateRotigotine fn', () => {
    test('works if recommended patchdose is witihin patchdose range and no rounding is required', () => {
        const exampleMedicines = [{ name: 'Ropinirole (Requip XL) 12mg', frequencyPerDay: 1 }]
        expect(calculateRotigotine(exampleMedicines)).toBe(8);
    })

    test('works if recommended patchdose is above max patchdose and no rounding is required', () => {
        const exampleMedicines = [
            { name: 'Pramipexole (Mirapexin) 700µg base (1mg salt)', frequencyPerDay: 12 },
            { name: 'Ropinirole (Requip XL) 20mg', frequencyPerDay: 3 }
        ]
        expect(calculateRotigotine(exampleMedicines)).toBe(16);
    })

    test('works if recommended patchdose is within patchdose range and rounding is required', () => {
        const exampleMedicines = [
            { name: 'Sinemet (Co-careldopa) 250mg (25/250mg)', frequencyPerDay: 3 },
            { name: 'Opicapone 50mg', frequencyPerDay: 3 }
        ]
        expect(calculateRotigotine(exampleMedicines)).toBe(10);
    })

    test('works if recommended patchdose is below min patchdose and rounding is required', () => {
        const exampleMedicines = [{ name: 'Stalevo (levodopa, carbidopa and entacapone) 75/18.75/200mg', frequencyPerDay: 2 },]
        expect(calculateRotigotine(exampleMedicines)).toBe(2);
    })

    test('works if recommended patchdose is above max patchdose and rounding is required', () => {
        const exampleMedicines = [
            { name: 'Pramipexole (Mirapexin) Prolonged Release 3.15mg base (4.5mg salt)', frequencyPerDay: 4 },
            { name: 'Ropinirole (Requip XL) 12mg', frequencyPerDay: 1 }
        ]
        expect(calculateRotigotine(exampleMedicines)).toBe(16);
    })
});