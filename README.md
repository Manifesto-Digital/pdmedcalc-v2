# README #

## Introduction ##

This repository is for the MedCalc tool, a web application that helps healthcare providers quickly and easily convert a Parkinson’s patient’s regular medicine into an equivalent dose of another medicine. 

The need for this tool is based on the fact that sometimes patients with Parkinson's Disease (PD) who have been admitted to hospital are unable to take their medications orally. Therefore the patient's usual oral medications need to be converted to a 'Levodopa equivalent dose' (LED), which is delivered either through a patch or via a naso-gastric tube.

## Application programming overview ##

The application is written in JavaScript and uses the [Next.js](https://nextjs.org/) framework and [React.js](https://react.dev) library.

The Next.js framework is configured for static export. This means the compiled application runs entirely in the browser and has no server side execution.

Stylesheets are written using the [Sass](https://sass-lang.com)

There is no database component. The details of the drugs involved in the calculation are defined in the file `src/app/data/data.js`.

## Version control ##

The application uses the [Git version control system](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control) and the [GitFLow branching strategy](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

The code is hosted on GitHub. The location of the repository is: https://github.com/tpximpact/pdmedcalc-v2 

The production branch is called `main`
The development branch is called `develop`

## Hosting and deployment ##

The application is hosted on [CloudFlare pages](https://pages.cloudflare.com/).
CloudFlare is also used as the NameServer and provides security protection for the site including [DDOS protection](https://www.cloudflare.com/en-gb/application-services/products/ddos-for-web/).

CloudFlare Pages also provides the deployment pipeline.
The CloudFlare pages application is connected to the GitHub repository. A deployment is triggered when code is committed to the main or develop branch.
The application is automatically tested and built as part of the deployment pipeline.

Code changes to the main branch are deployed to production.
Code changes to any other branch are deployed to a test environment.

The production URL is: https://pdmedcalc.co.uk

A new test environment is created each time code is pushed to a non production branch. The test URL follows the pattern: https://[commit-hash].pdmedcalc-v2.pages.dev/ e.g. https://7047263d.pdmedcalc-v2.pages.dev/

Note: There isn't a configuration file in the repository for CloudFlare. Configuration is provided inside the CloudFlare pages interface.

## Local set up ##

1. Clone the repo to your machine
2. cd into the directory where you cloned it
3. ```npm install``` to install the relevant JavaScript dependencies.

### How to start the dev server locally ###

Run ```npm run dev``` to start the development server and visit [http://localhost:3000](http://localhost:3000) to see the home page

### How to run the tests ###

Run ```npm run test```

### How to build the static application ###

Run ```npm run build```

The static assets can then be found in the generated `out` folder.

### Deployment script ###

The automated deployment script which runs when a deployment is triggered is:

```npm run test && npm run build```

Note: this is configured inside the CloudFlare pages interface, there isn't a separate build script file or hosting configuration file.

### Google Analytics ###

Google Analytics is integrated with the site for the purposes of counting the number of users.

### Cookies ###

The site does not set cookies or store any activity undertaken by the users.

## Paid for components ##

There are no commercially licensed software libraries in this application.
The CloudFlare hosting environment is being used on the free tier. 
Google Analytics is being used on the free tier.
The production domain registration is being provided by 123-reg.co.uk

## Version ##

This project is based upon an [older version of the MedCalc](https://bitbucket.org/tpximpactdx/pdmedcalc-old/src/main/).

This is therefore version 2 of the MedCalc tool.

## How it works ##

### Program flow ###

<img width="743" alt="program-flow" src="https://github.com/tpximpact/pdmedcalc-v2/assets/95880683/473c70f5-83e0-4322-9a99-ca82441fd42b">

- Users land on the home page, read the information presented and accept the disclaimer. This redirects the user to the calculator page.
- On the calculator page, users enter the respective medications and frequencies using the select dropdowns and the add button. Once the user is done adding medicines they then submit the form by clicking on the calculate button. This redirects the user to the results page.
- The medicines and frequencies the user entered on the calculator page are on the search params of the url. If these are missing (for example because the user went straight to /results and skipped the calculator page), the user is automatically redirected to the home page. If however they are present as expected, then the results page uses them to present to the user:
  1. what was entered on the calculator page
  2. a calculation of the total levodopa equivalent dose (in mg per day)
  3. a conversion of the entered medications to a dispersible madopar split across four dose times i.e. option 1
  4. a conversion of medications to a transdermal rotigotine patch i.e. option 2

### The calculation rules ###

See the 'rules of the calculator doc' for a detailed explanation written by James Fisher.

### Implementation ###

Although this project uses javascript rather than typescript, the types for the expected inputs and outputs of the various functions are nonetheless described for the sake of clarity.

#### Data storage ####

No user data is stored. The only data this app stores is related to the medicines themselves.

This app therefore does not have a database because it does not really need one since there are only 56 different medicines and we only need to know three different properties of each; having a database for the sake of one table with four columns and just 56 entries is unnecessary.

The data related to the medicines is in ```src/app/data/data.js```.

##### The medications object #####

The ```medications``` object is of the type :

```ts
type Medications = {
  string : {
    led: number
    isDa: boolean
    isComt: boolean
  }
} 
```

Each property of the ```medications``` object is a string representing the name of that medicine. The value of this property is an object with ```led```, ```isDa``` and ```isComt``` properties.

```led``` represents the levodopa equivalent dose for one unit of this medicine.

```isDa``` represents whether or not this medicine is a dopamine agonist.

```isComt``` represents whether or not this medicine is a comt inhibitor.

#### Functions ####

All the functions responsible for the actual conversion of the medicines are in ```src/app/calculator/calculator-functions.js```.

These functions are written in a functional programming style; they are __pure__ i.e. they take an input and return an output without mutating the original input or having any other side-effect.

##### The mainTransform function #####

<img width="376" alt="mainTransform" src="https://github.com/tpximpact/pdmedcalc-v2/assets/95880683/a46ae80c-7fb1-4816-95b9-ca7dff72c4f1">

The ```mainTransform``` function takes an array of medicine objects. Each medicine object is formed by looping through the search params of the results page's url and is of the type

```ts
{
  name: string
  frequencyPerDay: number
}
```

The two options object that the ```mainTransform``` function returns is of the type

```ts
{
  option1: TimeMadoparObject
  option2: number
}
```

where

```ts
type TimeMadoparObject = {
  "0800": TimeMadparTuple
  "1200": TimeMadparTuple
  "1600": TimeMadparTuple
  "2000": TimeMadparTuple
}
```

and

```ts
type TimeMadparTuple = [
  { name: 'Madopar Dispersible 125mg (25/100mg)', quantity: number, led: 100 },
  { name: 'Madopar Dispersible 62.5mg (12.5/50mg)', quantity: number, led: 50 }
]
```

##### The calculateRotigotine function #####

<img width="391" alt="calculateRotigotine" src="https://github.com/tpximpact/pdmedcalc-v2/assets/95880683/853db0e4-5a1d-4622-8caf-83821b28df27">

The ```calculateRotigotine``` function takes an array of medicine objects and returns a number representing the equivalent patchdose in mg for these medicines.

The patchdose is calculated by:

- splitting out the dopamine agonists from the non-dopamine agonists
- calculating the total led of the dopamine agonists and the total led of the non-dopamine agonists
- dividing the totalLedOfDopamineAgonists by the adjustment (30)
- multiplying the totalLedOfNonDopamineAgonists by the correction factor (0.25) and then divding the result by the adjustment (30)
- summing the results of the previous two steps
- rounding the result to a multiple of 2


##### The calculateTotalLed function #####

<img width="371" alt="calculateTotalLed" src="https://github.com/tpximpact/pdmedcalc-v2/assets/95880683/e321630f-45a7-4a78-a122-cc4e8041231e">

The ```calculateTotalLed``` function takes an array of medicine objects and returns a number representing the total levodopa equivalent dose for these medicines.

This total led is calculated by:

- splitting out the comt inhibtors from the non-comt inhibitors
- calculating the total led of the non-comt inhibitors by multiplying the frequencyPerDay of each medicine with its led and all the results
- picking out the comt inhibitor with the largest totalLedAdjustment* and multiplying its totalLedAdjustment against the totalLedFromNonComtInhibitors
- summing the totalLedFromNonComtInhibitors and the result of the previous step


*Note that, in practice, _"patients would only ever be on one COMT inhibitor, since [...] wouldn't prescribe more than one of them as there would be no value in doing so (once the COMT enzyme is blocked, it's blocked)"_. The function nevertheless handles the case where a user might input multiple comt inhibitors on the calculator page


##### The calculateMadopar function #####

<img width="433" alt="calculateMadopar" src="https://github.com/tpximpact/pdmedcalc-v2/assets/95880683/82c9ed38-b4d1-47cb-8b3c-1206a483f1d8">

The ```calculateMadopar``` function takes a targetLED and returns a ```TimeMadoparObject``` representing an equivalent total led in the form of dispersible madopar split across four dose times.

This is calculated by:

- rounding the targetLED to the nearest 50 since the dispersible madopar comes in two sizes 50 (small) and 100 (big)
- finding every possible combination of big and small madopars whose totalLed equals the roundedTargetLed
- for each of the above combinations, allocating the big and small madopars to four time zones to create a TimeMadoparObject for each
- for each TimeMadoparObject above calculating the maximum spread between the total leds of the four dose times
- returning the TimeMadoparObject which has the lowest max spread (i.e. the one in which the doses are most evenly spread across the four time slots)


##### The allocateMadopar function #####

<img width="522" alt="allocateMadopar" src="https://github.com/tpximpact/pdmedcalc-v2/assets/95880683/acd34fd5-4383-43be-9b9f-bb2ef1121b4d">

The ```allocateMadopar``` function takes two arguments; ```noOfBigMadopars``` and ```noOfSmallMadopars```. It returns a ```TimeMadoparObject``` representing an equivalent total led in the form of dispersible madopar split across four dose times.

This allocation is done by:

- looping through the big madopars and placing one in each time slot (starting at 0800) until there are none left
- looping through the small madopars and placing one in each time slot (starting at the time slot which has the fewest big madopars) until there are none left


##### The calculateMaxSpread function #####

<img width="424" alt="calculateMaxSpread" src="https://github.com/tpximpact/pdmedcalc-v2/assets/95880683/b5accd2d-c56e-4f40-b570-26106ff97be8">

The ```calculateMaxSpread``` function takes a ```TimeMadoparObject``` and returns a number representing the maximum difference in total leds between the time slot with the highest total led and the time slot with the lowest total led.

This is calculated by:

- calculating the total led for each time slot
- calculating the difference in total leds between each time slot
- returning the maximum difference in total led between the time slots
