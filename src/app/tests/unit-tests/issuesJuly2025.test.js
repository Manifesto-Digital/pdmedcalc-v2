import { calculateRotigotine } from "@/app/calculator/calculator-functions";

describe('Client reported issues with rotigotine calculations', () => {
    
    test('Patient 2 - Sinemet 125mg 4×/day should give 4mg patch (was giving 2mg)', () => {
        const patient2Medicines = [
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 4 }
        ];
        
        const result = calculateRotigotine(patient2Medicines);
        expect(result).toBe(4);
    });

    test('Patient 18 - Madopar 125mg 3×/day abd Rasagline 1mg 1x/day should give 4mg patch', () => {
        const patient18Medicines = [
            { name: 'Rasagiline 1mg', frequencyPerDay: 1 },
            { name: 'Madopar (Co-beneldopa) 125mg (25/100mg)', frequencyPerDay: 3 }
        ];
        
        const result = calculateRotigotine(patient18Medicines);
        expect(result).toBe(4);
    });

    test('Patient 20 - Complex case should give 10mg patch (was giving 8mg)', () => {
        const patient20Medicines = [
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 8 },
            { name: 'Sinemet (Co-careldopa) 250mg (25/250mg)', frequencyPerDay: 1 },
            { name: 'Ropinirole (Requip XL) 2mg', frequencyPerDay: 1 }
        ];
        
        const result = calculateRotigotine(patient20Medicines);
        expect(result).toBe(10);
    });
});
