'use client'

import { useState } from 'react'
import { medications } from '@/app/data/data'
import styles from './medicines-form.module.scss'

export function DesktopVersion() {
    return (
        <p className={styles.desktopOnly}>Desktop only</p>
    )
}