import { MedicineInput } from '../../calculator/calculator-functions';
import { EnteredMedicinesMobileVersion } from './MobileVersion';
import { EnteredMedicinesDesktopVersion } from './DesktopVersion';

interface EnteredMedicinesProps {
    medicineObjects: MedicineInput[];
}

export default function EnteredMedicines({ medicineObjects }: EnteredMedicinesProps) {
    return (
        <>
            <EnteredMedicinesMobileVersion medicineObjects={medicineObjects} />
            <EnteredMedicinesDesktopVersion medicineObjects={medicineObjects} />
        </>
    );
}
