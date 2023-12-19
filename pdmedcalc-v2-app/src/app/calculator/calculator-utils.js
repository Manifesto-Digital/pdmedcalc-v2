import { medications } from "../data/data";

function hasDopamineAgonist(arrayOfMedicines) {
    return arrayOfMedicines.filter((aMedicineObj) => medications[aMedicineObj.name].isDa).length > 0;
}

function onlyHasDopamineAgonists(arrayOfMedicines) {
    return arrayOfMedicines.every((aMedicineObj) => medications[aMedicineObj.name].isDa);
}

function calculateTotalLed(arrayOfMedicines) {
    return arrayOfMedicines.reduce((totalLED, currentMedicineObj) => {
        return totalLED + (currentMedicineObj.frequencyPerDay * medications[currentMedicineObj.name].led);
    }, 0)
}

function calculateMadopar(targetLED) {

    const divBy100Remainder = targetLED % 100;
    const smallerMadoparNeeded = divBy100Remainder !== 0 && divBy100Remainder <= 50;

    const bigMadoparQuantity = smallerMadoparNeeded ? Math.floor(targetLED / 100) : Math.ceil(targetLED / 100);
    const smallMadoparQuantity = smallerMadoparNeeded ? Math.ceil((targetLED - (bigMadoparQuantity * 100)) / 50) : 0;

    return {
        'Madopar Dispersible 125mg (100mg/25mg)': bigMadoparQuantity,
        'Madopar Dispersible 62.5mg (50mg/12.5mg)': smallMadoparQuantity
    }
}

function splitMadopar(madoparObj) {

    let bigMadoparQuantities = [0, 0, 0, 0];

    for (let i = 1; i <= madoparObj['Madopar Dispersible 125mg (100mg/25mg)']; i++) {
        if (i < 5) { bigMadoparQuantities[i - 1]++; }
        else {
            const remainder = (i - 1) % 4;
            bigMadoparQuantities[remainder]++;
        }
    }

    const [bigMadopar8amQuantity, bigMadopar12pmQuantity, bigMadopar4pmQuantity, bigMadopar8pmQuantity] = bigMadoparQuantities;



    let smallMadoparQuantities = [0, 0, 0, 0];
    /*
    since small madopar (i.e. madoparObj['Madopar Dispersible 62.5mg (50mg/12.5mg)']) will only ever be 1, 
    we just need to find out which time to slot it into
    */
    if (madoparObj['Madopar Dispersible 62.5mg (50mg/12.5mg)'] !== 0) {
        const allBigMadoparQuantitiesAreTheSame = new Set(bigMadoparQuantities).size === 1;

        if (allBigMadoparQuantitiesAreTheSame) {
            smallMadoparQuantities[0] = 1;
        }
        else {
            if (bigMadopar12pmQuantity < bigMadopar8amQuantity) {
                smallMadoparQuantities[1] = 1;
            }
            else if (bigMadopar4pmQuantity < bigMadopar12pmQuantity) {
                smallMadoparQuantities[2] = 1;
            }
            else if (bigMadopar8pmQuantity < bigMadopar4pmQuantity) {
                smallMadoparQuantities[3] = 1;
            }
            else {
                smallMadoparQuantities[0] = 1;
            }
        }
    }

    const [smallMadopar8amQuantity, smallMadopar12pmQuantity, smallMadopar4pmQuantity, smallMadopar8pmQuantity] = smallMadoparQuantities;



    return {
        "0800": [
            { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: bigMadopar8amQuantity },
            { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: smallMadopar8amQuantity }
        ],
        "1200": [
            { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: bigMadopar12pmQuantity },
            { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: smallMadopar12pmQuantity }
        ],
        "1600": [
            { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: bigMadopar4pmQuantity },
            { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: smallMadopar4pmQuantity }
        ],
        "2000": [
            { name: 'Madopar Dispersible 125mg (100mg/25mg)', quantity: bigMadopar8pmQuantity },
            { name: 'Madopar Dispersible 62.5mg (50mg/12.5mg)', quantity: smallMadopar8pmQuantity }
        ],
    }

}

function calculateRotigotine(arrayOfMedicines) {
    const correctionFactor = onlyHasDopamineAgonists(arrayOfMedicines) ? 0.5 : 0.25;
    const targetLED = calculateTotalLed(arrayOfMedicines);
    const maxPatchdose = 16;
    const minPatchdose = 2;

    let patchdose = (targetLED * correctionFactor) / 20;
    patchdose = patchdose % 2 === 0 ? patchdose : Math.floor(patchdose / 2) * 2;

    if (patchdose > maxPatchdose) { patchdose = maxPatchdose; }
    if (patchdose === 0) { patchdose = minPatchdose; }

    return patchdose;
}


function twoOptions(arrayOfMedicines) {
    const totalLED = calculateTotalLed(arrayOfMedicines);
    const madopar = calculateMadopar(totalLED);
    const finalMadopar = splitMadopar(madopar);

    return {
        option1: finalMadopar,
        option2: calculateRotigotine(arrayOfMedicines)
    }
}

function threeOptions(arrayOfMedicines) {

    const totalLED = calculateTotalLed(arrayOfMedicines);
    const madopar = calculateMadopar(totalLED);
    const finalMadopar = splitMadopar(madopar);

    const nonDopamineAgonists = arrayOfMedicines.filter(aMedicineObj => !medications[aMedicineObj.name].isDa);
    const totalLedOfNonDopamineAgonists = calculateTotalLed(nonDopamineAgonists);
    const madoparForJustNonDopamineAgonists = calculateMadopar(totalLedOfNonDopamineAgonists);
    const finalMadoparForJustNonDopamineAgonists = splitMadopar(madoparForJustNonDopamineAgonists);

    const justDopamineAgonists = arrayOfMedicines.filter(aMedicineObj => medications[aMedicineObj.name].isDa);

    const optionTwoObject = {
        madoparDose: finalMadoparForJustNonDopamineAgonists,
        rotigotineDose: calculateRotigotine(justDopamineAgonists)
    };

    return {
        option1: finalMadopar,
        option2: optionTwoObject,
        option3: calculateRotigotine(arrayOfMedicines)
    }
}

function mainTransform(arrayOfMedicines) {
    const hasDopamineAgonistsAndNonDopamineAgonists = hasDopamineAgonist(arrayOfMedicines) && !onlyHasDopamineAgonists(arrayOfMedicines);

    if (hasDopamineAgonistsAndNonDopamineAgonists) { return threeOptions(arrayOfMedicines); }
    else { return twoOptions(arrayOfMedicines); }
}