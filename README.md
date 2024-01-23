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

The application uses the Git version control system and the GitFLow branching strategy.
The code is hosted on GitHub. The location of the repository is: https://github.com/tpximpact/pdmedcalc-v2 

## Hosting and deployment ##

The application is hosted on CloudFlare pages.
CloudFlare is also used as the NameServer and provides security protection for the site including WAF and DDOS.

CloudFlare Pages also provides the deployment pipeline.
The CloudFlare pages application is connected to the GitHub repository. A deployment is triggered when code is committed to the main or develop branch.
The application is automatically tested and built as part of the deployment pipeline.

Code changes to the main branch are deployed to production.
Code changes to the develop branch are deployed to the test environment.

The production URL is:
The test URL is:

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
The production domain registration is being provided by 

## Version ##

This project is based upon an [older version of the MedCalc](https://bitbucket.org/tpximpactdx/pdmedcalc-old/src/main/).

This is therefore version 2 of the MedCalc tool.
