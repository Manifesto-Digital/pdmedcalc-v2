import { EnteredMedicinesMobileVersion } from './MobileVersion'
import { EnteredMedicinesDesktopVersion } from './DesktopVersion'

export default function EnteredMedicines({ medicineObjects }) {
    return (
        <>
            <EnteredMedicinesMobileVersion medicineObjects={medicineObjects} />
            <EnteredMedicinesDesktopVersion medicineObjects={medicineObjects} />
        </>
    )
}