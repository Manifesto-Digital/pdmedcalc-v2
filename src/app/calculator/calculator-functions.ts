import { medications, MedicationName } from "../data/data";

export interface MedicineInput {
    name: MedicationName;
    frequencyPerDay: number;
}

export interface MadoparDose {
    name: string;
    quantity: number;
    led: number;
}

export interface MadoparDistribution {
    "0800": MadoparDose[];
    "1200": MadoparDose[];
    "1600": MadoparDose[];
    "2000": MadoparDose[];
}

export interface CalculationResult {
    option1: MadoparDistribution;
    option2: number;
}

/**
 * Calculates the total LED (Levodopa Equivalent Dose) of a list of medicines.
 * 
 * @param arrayOfMedicines - Array of medicine objects with name and frequency
 * @returns The total LED value
 */
export function calculateTotalLed(arrayOfMedicines: MedicineInput[]): number {
    const hasAComtInhibitor = arrayOfMedicines.some((aMedicineObj) => medications[aMedicineObj.name].isComt);
    return hasAComtInhibitor ? calculateTotalLedWithComtInhibitor(arrayOfMedicines) : calculateTotalLedWithoutComtInhibitor(arrayOfMedicines);
}

/**
 * Calculates the total LED of a list of medicines, which do not contain a COMT inhibitor.
 * 
 * @param arrayOfMedicines - Array of medicine objects with name and frequency
 * @returns The total LED value
 */
export function calculateTotalLedWithoutComtInhibitor(arrayOfMedicines: MedicineInput[]): number {
    const nonComtInhibitors = arrayOfMedicines.filter((aMedicineObj) => !medications[aMedicineObj.name].isComt);
    const totalLedFromNonComtInhibitors = nonComtInhibitors.reduce((totalLED, currentMedicineObj) => {
        return totalLED + (currentMedicineObj.frequencyPerDay * (medications[currentMedicineObj.name].led ?? 0));
    }, 0);

    return totalLedFromNonComtInhibitors;
}

/**
 * Calculates the total LED of a list of medicines, taking into account the effect of COMT inhibitors.
 * 
 * @param arrayOfMedicines - Array of medicine objects with name and frequency
 * @returns The total LED value
 */
export function calculateTotalLedWithComtInhibitor(arrayOfMedicines: MedicineInput[]): number {
    const comtInhibitors = arrayOfMedicines
        .filter((aMedicineObj) => medications[aMedicineObj.name].isComt)
        .sort((a, b) => (medications[b.name].totalLedAdjustment ?? 0) - (medications[a.name].totalLedAdjustment ?? 0));

    // Since patients should only ever really be on one comt inhibitor we should take the one with the highest totalLedAdjustment.
    const theComtInhibitor = comtInhibitors[0];

    // First, the LED of levodopa-containing medications is calculated.
    const ledOfLevodopaMedicines = arrayOfMedicines
        .filter((aMedicineObj) => medications[aMedicineObj.name].hasLevodopa)
        .reduce((totalLED, currentMedicineObj) => {
            return totalLED + (currentMedicineObj.frequencyPerDay * (medications[currentMedicineObj.name].led ?? 0));
        }, 0);

    // Second, this LED of levodopa-containing medications is multiplied by 0.33 (entacapone) or 0.5 (tolcapone or opicapone) to give the LED of the COMT inhibitor.
    const ledOfComtInhibitor = ledOfLevodopaMedicines * (medications[theComtInhibitor.name].totalLedAdjustment ?? 0);

    // Third, the subtotal LED of dopamine agonists, MAO-B inhibitors, and other antiparkinsonian medications is calculated (those that are not COMT inhibitors or levodopa-containing medications).
    const ledOfNonLevodopaMedicines = arrayOfMedicines
        .filter((aMedicineObj) => !medications[aMedicineObj.name].hasLevodopa && !medications[aMedicineObj.name].isComt)
        .reduce((totalLED, currentMedicineObj) => {
            return totalLED + (currentMedicineObj.frequencyPerDay * (medications[currentMedicineObj.name].led ?? 0));
        }, 0);
    
    // Finally, the total LED is calculated by adding the LED of the COMT inhibitor, the LED of levodopa-containing medications, and the subtotal LED of other medications.
    return ledOfComtInhibitor + ledOfLevodopaMedicines + ledOfNonLevodopaMedicines;
}

export function calculateMaxSpread(timeMadoparObj: MadoparDistribution): number {
    const totalLed8am = timeMadoparObj["0800"].reduce((totalLED, aMadopar) => totalLED + (aMadopar.quantity * aMadopar.led), 0);
    const totalLed12pm = timeMadoparObj["1200"].reduce((totalLED, aMadopar) => totalLED + (aMadopar.quantity * aMadopar.led), 0);
    const totalLed4pm = timeMadoparObj["1600"].reduce((totalLED, aMadopar) => totalLED + (aMadopar.quantity * aMadopar.led), 0);
    const totalLed8pm = timeMadoparObj["2000"].reduce((totalLED, aMadopar) => totalLED + (aMadopar.quantity * aMadopar.led), 0);

    const diffBtw8amLedAnd12pmLed = Math.abs(totalLed8am - totalLed12pm);
    const diffBtw8amLedAnd4pmLed = Math.abs(totalLed8am - totalLed4pm);
    const diffBtw8amLedAnd8pmLed = Math.abs(totalLed8am - totalLed8pm);
    const diffBtw12pmLedAnd4pmLed = Math.abs(totalLed12pm - totalLed4pm);
    const diffBtw12pmLedAnd8pmLed = Math.abs(totalLed12pm - totalLed8pm);
    const diffBtw4pmLedAnd8pmLed = Math.abs(totalLed4pm - totalLed8pm);

    const spreads = [diffBtw8amLedAnd12pmLed, diffBtw8amLedAnd4pmLed, diffBtw8amLedAnd8pmLed, diffBtw12pmLedAnd4pmLed, diffBtw12pmLedAnd8pmLed, diffBtw4pmLedAnd8pmLed];

    return Math.max(...spreads);
}

export function allocateMadopar(noOfBigMadopars: number, noOfSmallMadopars: number): MadoparDistribution {
    let bigMadoparQuantities: number[] = [0, 0, 0, 0];

    for (let i = 1; i <= noOfBigMadopars; i++) {
        if (i < 5) { 
            bigMadoparQuantities[i - 1]++; 
        } else {
            const remainder = (i - 1) % 4;
            bigMadoparQuantities[remainder]++;
        }
    }

    const [bigMadopar8amQuantity, bigMadopar12pmQuantity, bigMadopar4pmQuantity, bigMadopar8pmQuantity] = bigMadoparQuantities;

    let smallMadoparQuantities: number[] = [0, 0, 0, 0];

    let timeSlotFirstSmallMadoparShouldGoIn = bigMadoparQuantities.indexOf(Math.min(...bigMadoparQuantities)) + 1;

    for (let i = timeSlotFirstSmallMadoparShouldGoIn; i <= timeSlotFirstSmallMadoparShouldGoIn + noOfSmallMadopars - 1; i++) {
        if (i < 5) { 
            smallMadoparQuantities[i - 1]++; 
        } else {
            const remainder = (i - 1) % 4;
            smallMadoparQuantities[remainder]++;
        }
    }

    const [smallMadopar8amQuantity, smallMadopar12pmQuantity, smallMadopar4pmQuantity, smallMadopar8pmQuantity] = smallMadoparQuantities;

    return {
        "0800": [
            { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: bigMadopar8amQuantity, led: 100 },
            { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: smallMadopar8amQuantity, led: 50 }
        ],
        "1200": [
            { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: bigMadopar12pmQuantity, led: 100 },
            { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: smallMadopar12pmQuantity, led: 50 }
        ],
        "1600": [
            { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: bigMadopar4pmQuantity, led: 100 },
            { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: smallMadopar4pmQuantity, led: 50 }
        ],
        "2000": [
            { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: bigMadopar8pmQuantity, led: 100 },
            { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: smallMadopar8pmQuantity, led: 50 }
        ],
    };
}

export function calculateMadopar(targetLED: number): MadoparDistribution {
    const roundToNearest50 = (num: number): number => {
        const divBy50Remainder = num % 50;
        if (divBy50Remainder === 0) { return num; }
        const base = num - divBy50Remainder;
        return divBy50Remainder < 25 ? base : base + 50;
    };

    let roundedTargetLED = roundToNearest50(targetLED);

    let bestDistribution: MadoparDistribution | null = null;
    let minSpread = Infinity;

    for (let noOfBigMadoparsNeeded = 0; noOfBigMadoparsNeeded * 100 <= roundedTargetLED; noOfBigMadoparsNeeded++) {
        const remainder = roundedTargetLED - (noOfBigMadoparsNeeded * 100);
        const noOfSmallMadoparsNeeded = remainder / 50;
        const potentialNewBestDistribution = allocateMadopar(noOfBigMadoparsNeeded, noOfSmallMadoparsNeeded);
        const spread = calculateMaxSpread(potentialNewBestDistribution);

        if (spread <= minSpread) {
            bestDistribution = potentialNewBestDistribution;
            minSpread = spread;
        }
    }

    return bestDistribution!;
}

/**
 * This function rounds the number to the nearest multiple of 2, with a custom rule for rounding.
 * If the calculated patch dose is exactly on an odd integer (e.g., 5.0, 7.0, 9.0), round down.
 * If the calculated patch dose is above an odd integer (e.g., 5.01+), round up.
 * @param num - the number to be rounded
 * @returns The rounded number to the nearest multiple of 2
 */
function roundToNearestTwo(num: number): number {
    const nearestMultipleOf2Below = Math.floor(num / 2) * 2;
    const nearestMultipleOf2Above = nearestMultipleOf2Below + 2;
    
    // Check if the number is exactly on an odd integer (which would be between even multiples)
    const isExactlyOnOddInteger = Math.abs(num % 1) < 0.0001 && (Math.floor(num) % 2 === 1);
    
    if (isExactlyOnOddInteger) {
        // If exactly on odd integer (like 5.0, 7.0), round down to lower even multiple
        return nearestMultipleOf2Below;
    } else {
        // Standard rounding: round to nearest even multiple
        const midpoint = nearestMultipleOf2Below + 1;
        return num < midpoint ? nearestMultipleOf2Below : nearestMultipleOf2Above;
    }
}

export function calculateRotigotine(arrayOfMedicines: MedicineInput[]): number {
    const correctionFactor = 0.25;
    const adjustment = 30;
    const maxPatchdose = 16;
    const minPatchdose = 2;

    const nonDopamineAgonists = arrayOfMedicines.filter((aMedicineObj) => !medications[aMedicineObj.name].isDa);
    const dopamineAgonists = arrayOfMedicines.filter((aMedicineObj) => medications[aMedicineObj.name].isDa);

    const totalLedOfNonDopamineAgonists = calculateTotalLed(nonDopamineAgonists);
    const totalLedOfDopamineAgonists = calculateTotalLed(dopamineAgonists);
    const overallTotalLed = totalLedOfDopamineAgonists + totalLedOfNonDopamineAgonists;

    const patchdoseForNonDopamineAgonists = (totalLedOfNonDopamineAgonists * correctionFactor) / adjustment;
    const patchdoseForDopamineAgonists = totalLedOfDopamineAgonists / adjustment;

    let patchdose = patchdoseForDopamineAgonists + patchdoseForNonDopamineAgonists;
    patchdose = patchdose % 2 === 0 ? patchdose : roundToNearestTwo(patchdose);

    if (patchdose > maxPatchdose) { patchdose = maxPatchdose; }
    if (patchdose === 0 && overallTotalLed !== 0) { patchdose = minPatchdose; }

    return patchdose;
}

export function mainTransform(arrayOfMedicines: MedicineInput[]): CalculationResult {
    const totalLED = calculateTotalLed(arrayOfMedicines);
    const madopar = calculateMadopar(totalLED);

    return {
        option1: madopar,
        option2: calculateRotigotine(arrayOfMedicines)
    };
}
