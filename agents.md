# AI Agent Guide for PDMedCalc

## Project Overview

**PDMedCalc** is a medical device (MHRA Class I registered) for converting Parkinson's Disease medications to Levodopa Equivalent Dose (LED) for patients unable to take medications orally. This is a static Next.js application built with TypeScript, React, and SCSS.

⚠️ **CRITICAL**: This is a medical calculation tool where errors could have serious consequences. All changes must maintain calculation accuracy and pass comprehensive tests.

## Technology Stack

- **Framework**: Next.js 15.5.5 (App Router with static export)
- **Language**: TypeScript (strict mode)
- **Runtime**: Node.js 22.11.0 LTS
- **UI**: React 19.2.0
- **Styling**: SCSS modules
- **Testing**: Jest 29.7.0, Cypress 13.6.3
- **Deployment**: Cloudflare Pages (static site)

## Project Structure

```
pdmedcalc-v2/
├── src/app/                          # Next.js App Router
│   ├── (home-page)/                  # Home page route group
│   │   ├── page.tsx                  # Home page component
│   │   └── home-page.module.scss     # Home page styles
│   ├── calculator/                   # Calculator page
│   │   ├── page.tsx                  # Calculator UI
│   │   ├── calculator-functions.ts   # Core calculation logic ⚠️
│   │   └── calculator-page.module.scss
│   ├── results/                      # Results page
│   │   ├── page.tsx                  # Results display
│   │   └── results-page.module.scss
│   ├── components/                   # Shared React components
│   │   ├── back/                     # Navigation components
│   │   ├── medicines-form/           # Form with state management
│   │   │   ├── MedicinesForm.tsx     # Main form wrapper
│   │   │   ├── DesktopVersion.tsx    # Desktop form layout
│   │   │   └── MobileVersion.tsx     # Mobile form layout
│   │   ├── entered-medicines/        # Display entered meds
│   │   ├── options/                  # Result options display
│   │   │   ├── Option1.tsx           # Madopar conversion
│   │   │   └── Option2.tsx           # Rotigotine patch
│   │   └── [other-components]/
│   ├── data/                         # Application data
│   │   └── data.ts                   # Medication definitions ⚠️
│   ├── styles/                       # Global styles
│   │   ├── _breakpoints.scss
│   │   ├── _colours.scss
│   │   ├── _fonts.scss
│   │   ├── _typography.scss
│   │   └── _print.scss              # Print-specific styles
│   ├── tests/                        # Test files
│   │   ├── unit-tests/              # Unit tests for functions
│   │   └── integration-tests/        # Integration tests
│   ├── layout.tsx                    # Root layout
│   └── globals.scss                  # Global styles import
├── cypress/                          # E2E tests
│   └── e2e/
│       └── home-calc-results-flow.cy.js
├── public/                           # Static assets
├── out/                             # Static export output
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
└── jest.config.js                    # Jest configuration
```

## Code Conventions

### TypeScript

**Strict Mode Enabled**: All code must pass TypeScript strict mode checks.

```typescript
// ✅ Good - Explicit types, proper interfaces
interface MedicineInput {
    name: MedicationName;
    frequencyPerDay: number;
}

export function calculateTotalLed(arrayOfMedicines: MedicineInput[]): number {
    // Implementation
}

// ❌ Bad - Any types, implicit returns
function calculate(meds: any) {
    // Implementation
}
```

### React Components

**Functional Components with TypeScript**:

```tsx
// ✅ Good - Props interface, explicit types
interface BackProps {
    href: string;
    text: string;
}

export default function Back({ href, text }: BackProps) {
    return <Link href={href}>{text}</Link>;
}

// ❌ Bad - No prop types
export default function Back({ href, text }) {
    return <Link href={href}>{text}</Link>;
}
```

**Client Components**: Mark with `'use client'` directive when using hooks or browser APIs:

```tsx
'use client';

import { useState } from 'react';

export function MedicinesForm() {
    const [medInputs, setMedInputs] = useState<MedInput[]>([...]);
    // Component logic
}
```

### Form Components (IMPORTANT)

**Controlled Components**: All form inputs must be controlled with `value` prop:

```tsx
// ✅ Good - Controlled select
<select value={thisMedInput.values.medicine} onChange={handleMedChange}>
    <option value="">Select</option>
    {medicines.map((med, index) => (
        <option key={index} value={med}>{med}</option>
    ))}
</select>

// ❌ Bad - Uncontrolled select
<select onChange={handleMedChange}>
    <option value="">Select</option>
    {thisMedInput.values.medicine && <option selected>{thisMedInput.values.medicine}</option>}
</select>
```

### Styling

**SCSS Modules**: Use CSS modules for component-specific styles:

```tsx
import styles from './component.module.scss';

<div className={styles.container}>
    <h1 className={styles.heading + ' h2'}>Title</h1>
</div>
```

**Global Typography Classes**: Combine module classes with global typography:
- `h2`, `h3`, `h4`, `h5`, `h6` - Heading styles
- `p` - Paragraph styles
- `sr-only` - Screen reader only content

**Responsive Design**:
- Desktop-specific: `styles.desktopOnly`
- Mobile-specific: `styles.mobileOnly`
- Both versions often exist for complex components (forms, tables)

### HTML & Accessibility

**Always Escape Apostrophes in JSX**:

```tsx
// ✅ Good
<p>Parkinson&apos;s Disease</p>
<p>&lsquo;Levodopa equivalent dose&rsquo;</p>

// ❌ Bad - Will cause ESLint errors
<p>Parkinson's Disease</p>
<p>'Levodopa equivalent dose'</p>
```

**Accessibility Requirements**:
- Use `htmlFor` (not `for`) on labels
- Include `aria-describedby` for buttons
- Provide `sr-only` descriptions for interactive elements
- Use semantic HTML (`<label>`, `<button type="button">`)

## Critical Files

### `src/app/data/data.ts`

⚠️ **MEDICAL DATA - HANDLE WITH EXTREME CARE**

Defines all Parkinson's medications with LED values:

```typescript
export interface Medication {
    led?: number;                    // Levodopa Equivalent Dose
    isDa: boolean;                   // Is Dopamine Agonist
    isComt: boolean;                 // Is COMT Inhibitor
    hasLevodopa: boolean;            // Contains Levodopa
    totalLedAdjustment?: number;     // COMT adjustment factor
}

export const medications: Record<MedicationName, Medication> = {
    'Sinemet (Co-careldopa) 125mg (25/100mg)': {
        led: 100,
        isDa: false,
        isComt: false,
        hasLevodopa: true
    },
    // ... 50+ medications
};
```

**When modifying**:
1. Verify LED values with medical references
2. Update all related tests
3. Test calculations thoroughly
4. Document changes in comments

### `src/app/calculator/calculator-functions.ts`

⚠️ **CORE CALCULATION LOGIC - TEST EXTENSIVELY**

Key functions:
- `calculateTotalLed()` - Main LED calculation
- `calculateMadopar()` - Madopar dosing (Option 1)
- `calculateRotigotine()` - Rotigotine patch (Option 2)
- `mainTransform()` - Orchestrates all calculations

**Exported Interfaces**:
```typescript
export interface MedicineInput {
    name: MedicationName;
    frequencyPerDay: number;
}

export interface MadoparDistribution {
    "0800": MadoparDose[];
    "1200": MadoparDose[];
    "1600": MadoparDose[];
    "2000": MadoparDose[];
}

export interface CalculationResult {
    option1: MadoparDistribution;
    option2: number;  // Rotigotine patch dose
}
```

**Testing Requirements**:
- All calculation changes require unit tests
- Maintain 100% test coverage for calculation functions
- Integration tests verify end-to-end flow

## Testing

### Run Tests

```bash
# Unit and integration tests
npm test

# E2E tests (requires dev server running)
npm run dev  # Terminal 1
npx cypress run  # Terminal 2

# Or interactive Cypress
npx cypress open
```

### Test Conventions

**Unit Tests** (`src/app/tests/unit-tests/`):
```typescript
import { calculateTotalLed } from "@/app/calculator/calculator-functions";

describe('tests for calculateTotalLed fn', () => {
    test('returns the correct total led if there are no comt inhibitors', () => {
        const exampleMedicines = [
            { name: 'Sinemet (Co-careldopa) 125mg (25/100mg)', frequencyPerDay: 2 },
            { name: 'Pramipexole (Mirapexin) Prolonged Release 260µg base (375µg salt)', frequencyPerDay: 2 },
        ];
        expect(calculateTotalLed(exampleMedicines)).toBe(275);
    });
});
```

**Integration Tests**: Test full workflows from input to result

**E2E Tests**: Cypress tests verify user flows through the entire application

### Test Coverage Requirements

- **Calculator functions**: 100% coverage (47 tests currently)
- **Integration tests**: Major user flows
- **E2E tests**: Happy path and edge cases
- All tests must pass before merging

## Build & Deployment

### Development

```bash
npm run dev  # http://localhost:3000
```

### Production Build

```bash
npm run build  # Creates static export in /out
```

### Static Export

This project uses `output: 'export'` in `next.config.ts`:
- No server-side rendering
- All pages pre-rendered to static HTML
- Client-side navigation with React
- Deployed as static files to Cloudflare Pages

### Deployment Pipeline

```
develop branch → Push → Cloudflare Pages Build → Deploy to Staging
main branch → Merge → Cloudflare Pages Build → Deploy to Production
```

**Environment**:
- Node.js 22.11.0 (specified in `.nvmrc`)
- Build command: `npm run build`
- Output directory: `out/`

## Common Tasks

### Adding a New Medication

1. Add to `src/app/data/data.ts`:
```typescript
'New Medicine Name': {
    led: 100,
    isDa: false,
    isComt: false,
    hasLevodopa: true
}
```

2. Add test cases in `src/app/tests/unit-tests/calculateTotalLed.test.ts`

3. Verify all tests pass: `npm test`

### Modifying Calculations

1. Update function in `calculator-functions.ts`
2. Update corresponding unit tests
3. Add integration test if needed
4. Run full test suite: `npm test`
5. Test manually with `npm run dev`
6. Run E2E tests: `npx cypress run`

### Adding a New Component

1. Create component directory in `src/app/components/`
2. Create `.tsx` file with proper TypeScript interfaces
3. Create `.module.scss` file for styles
4. Export from component file
5. Import and use in pages

### Styling Changes

- Module styles: Edit `.module.scss` files
- Global styles: Edit files in `src/app/styles/`
- Typography: Use existing classes (`h2`, `h3`, `p`)
- Print styles: Edit `src/app/styles/_print.scss`

## Troubleshooting

### Build Errors

**ESLint: Unescaped apostrophes**
```
Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`
```
Solution: Use HTML entities (`&apos;`, `&lsquo;`, `&rsquo;`)

**TypeScript: JSX flag errors**
```
Error: Cannot use JSX unless the '--jsx' flag is provided
```
Solution: False positive from language server - Next.js handles JSX compilation. If build passes, ignore these warnings.

**Form dropdowns not working**
- Ensure `value` prop on `<select>` elements
- Verify controlled component pattern
- Check state updates in `onChange` handlers

### Test Failures

1. Check test output for specific failures
2. Run individual test file: `npm test -- calculateTotalLed.test.ts`
3. Verify test data matches current medication definitions
4. Update snapshots if intentional: `npm test -- -u`

### Cypress Failures

1. Ensure dev server is running: `npm run dev`
2. Check selector changes in components
3. Verify form submission flow
4. Check results page rendering

## Important Notes

### Medical Accuracy

- LED values sourced from peer-reviewed literature
- References documented in `ReferencesAccordion` component
- Any calculation changes require clinical review
- Test coverage mandatory for all calculation logic

### Browser Compatibility

- Modern browsers (ES2020+ support)
- No IE11 support required
- Tested on Chrome, Firefox, Safari, Edge

### Performance

- Static site = excellent performance
- No server-side processing
- All calculations client-side
- Minimal JavaScript bundle

### Security

- No user data stored
- No backend/database
- All calculations client-side
- Cloudflare Pages handles HTTPS

### Accessibility

- WCAG 2.1 Level AA compliance target
- Screen reader support
- Keyboard navigation
- High contrast support
- Print-friendly output (with warnings about limitations)

## Contact

For questions about medical accuracy or clinical use:
- Email: james.fisher@nhct.nhs.uk
- See footer on all pages

For technical issues:
- Repository: Manifesto-Digital/pdmedcalc-v2
- Branch: develop (staging), main (production)

## Version History

- **v1.0.8** (October 2025): TypeScript migration, Next.js 15, React 19, Node 22
- **v1.0.0** (2024): Initial redevelopment with Next.js
- **Original** (2014): First version developed by Northumbria Healthcare

## License & Registration

- MHRA Class I Medical Device (15/02/24)
- Funded by Parkinson's UK
- Developed by Northumbria Healthcare NHS Foundation Trust
- Redeveloped with support from TPXimpact
