'use client'

import { useState } from 'react'
import { medications } from '@/app/data/data'
import styles from './medicines-form.module.scss'
import { MobileVersion } from './MobileVersion'
import { DesktopVersion } from './DesktopVersion'

export default function MedicinesForm() {
    return (
        <>
            <MobileVersion />
            <DesktopVersion />
        </>
    )
}