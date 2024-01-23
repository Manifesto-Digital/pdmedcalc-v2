import { medications } from "../data/data";

export function calculateTotalLed(arrayOfMedicines) {
    const nonComtInhibitors = arrayOfMedicines.filter((aMedicineObj) => !medications[aMedicineObj.name].isComt);
    const totalLedFromNonComtInhibitors = nonComtInhibitors.reduce((totalLED, currentMedicineObj) => {
        return totalLED + (currentMedicineObj.frequencyPerDay * medications[currentMedicineObj.name].led);
    }, 0);

    if (nonComtInhibitors.length === arrayOfMedicines.length) { return totalLedFromNonComtInhibitors; }

    const comtInhibitors = arrayOfMedicines
        .filter((aMedicineObj) => medications[aMedicineObj.name].isComt)
        .sort((a, b) => medications[b.name].totalLedAdjustment - medications[a.name].totalLedAdjustment);
    /* since patients should only ever really be on one comt inhibitor we should take the one with the highest totalLedAdjustment*/
    const theComtInhibitor = comtInhibitors[0];

    return totalLedFromNonComtInhibitors + (totalLedFromNonComtInhibitors * medications[theComtInhibitor.name].totalLedAdjustment);
}

export function calculateMaxSpread(timeMadoparObj) {

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

    const spreads = [diffBtw8amLedAnd12pmLed, diffBtw8amLedAnd4pmLed, diffBtw8amLedAnd8pmLed, diffBtw12pmLedAnd4pmLed, diffBtw12pmLedAnd8pmLed, diffBtw4pmLedAnd8pmLed]

    return Math.max(...spreads);
}

export function allocateMadopar(noOfBigMadopars, noOfSmallMadopars) {
    let bigMadoparQuantities = [0, 0, 0, 0];

    for (let i = 1; i <= noOfBigMadopars; i++) {
        if (i < 5) { bigMadoparQuantities[i - 1]++; }
        else {
            const remainder = (i - 1) % 4;
            bigMadoparQuantities[remainder]++;
        }
    }

    const [bigMadopar8amQuantity, bigMadopar12pmQuantity, bigMadopar4pmQuantity, bigMadopar8pmQuantity] = bigMadoparQuantities;


    let smallMadoparQuantities = [0, 0, 0, 0];

    let timeSlotFirstSmallMadoparShouldGoIn = bigMadoparQuantities.indexOf(Math.min(...bigMadoparQuantities)) + 1;

    for (let i = timeSlotFirstSmallMadoparShouldGoIn; i <= timeSlotFirstSmallMadoparShouldGoIn + noOfSmallMadopars - 1; i++) {
        if (i < 5) { smallMadoparQuantities[i - 1]++; }
        else {
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
    }
}

export function calculateMadopar(targetLED) {

    const roundToNearest50 = (num) => {
        const divBy50Remainder = num % 50;
        if (divBy50Remainder === 0) { return num; }
        const base = num - divBy50Remainder;
        return divBy50Remainder < 25 ? base : base + 50;
    };

    let roundedTargetLED = roundToNearest50(targetLED);

    let bestDistribution = null;
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

    return bestDistribution;
}


export function calculateRotigotine(arrayOfMedicines) {
    const correctionFactor = 0.25;
    const adjustment = 30;
    const maxPatchdose = 16;
    const minPatchdose = 2;

    const nonDopamineAgonists = arrayOfMedicines.filter((aMedicineObj) => !medications[aMedicineObj.name].isDa);
    const dopamineAgonists = arrayOfMedicines.filter((aMedicineObj) => medications[aMedicineObj.name].isDa);

    const totalLedOfNonDopamineAgonists = calculateTotalLed(nonDopamineAgonists);
    const totalLedOfDopamineAgonists = calculateTotalLed(dopamineAgonists);

    const customRound = (num) => {
        const nearestMultipleOf2Below = Math.floor(num / 2) * 2;
        const nearestMultipleOf2Above = Math.ceil(num / 2) * 2;
        const thresholdForRoundingUp = nearestMultipleOf2Below + 1.5;

        return num < thresholdForRoundingUp ? nearestMultipleOf2Below : nearestMultipleOf2Above;
    }

    const patchdoseForNonDopamineAgonists = (totalLedOfNonDopamineAgonists * correctionFactor) / adjustment;
    const patchdoseForDopamineAgonists = totalLedOfDopamineAgonists / adjustment;

    let patchdose = patchdoseForDopamineAgonists + patchdoseForNonDopamineAgonists;
    patchdose = patchdose % 2 === 0 ? patchdose : customRound(patchdose);

    if (patchdose > maxPatchdose) { patchdose = maxPatchdose; }
    if (patchdose === 0) { patchdose = minPatchdose; }

    return patchdose;
}


export function mainTransform(arrayOfMedicines) {
    const totalLED = calculateTotalLed(arrayOfMedicines);
    const madopar = calculateMadopar(totalLED);

    return {
        option1: madopar,
        option2: calculateRotigotine(arrayOfMedicines)
    }
}