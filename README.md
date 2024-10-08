[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/summary/new_code?id=JLS-DEV-lab_sonarqube)

This project is using SonarCloud for enhanced code quality and developer experience.

## sonarqube-webapp

This repository contains the source code for a simple web application built with [React](https://react.dev/). Initially created for testing DevOps principles with SonarCloud and SonarQube, this project has evolved into a small training project. It is recommended to read this document before starting the development.

## 1. Development

Development is entirely done with NodeJS. NodeJS 20 was used, tested, and validated during the setup phase. While the project may work with other versions, this is not guaranteed. The version used for CI as of writing this document is 20.12.0, the latest LTS version.

## 2. Tooling

The code is written in TypeScript and requires compilation before delivery. This is primarily handled by Vite. Note that type aliases are used to enhance the developer experience. The following paths are currently configured:

| Name        | Location                |
| ----------- | ----------------------- |
| `@elements` | src/components/elements |
| `@hooks`    | src/components/hooks    |
| `@modules`  | src/components/modules  |
| `@pages`    | src/components/pages    |
| `@types`    | src/types               |
| `@utils/*`  | src/utils/\*            |
| `@/*`       | src/\*                  |

Code quality is ensured using SonarLint, ESLint and Prettier. To maintain clean code in line with coding conventions, a SonarQube server checks for non-compliant code using quality gates in PR's and custom rules. For a better developer experience and to learn more about CI/CD with SonarQube, you can either run a local Docker container with your own quality gate (see section 3) or join my SonarCloud test instance (see section 4). Before joining SonarQube or SonarCloud, you need to run SonarLint in your IDE, you have to install the official SonarLint extension from Sonarsource, which is currently only integrated with most JetBrains IDEs including IntelliJ IDEA, CLion, WebStorm, PHPStorm, PyCharm, Rider, Android Studio & RubyMine, and runs on Mac, Windows, and Linux OS, VS Code, VS Studio and Ecplipse (see [sonarLint docs](https://docs.sonarsource.com/sonarlint/intellij/) for installation details). If you've installed SonarLint, new analyses will be triggered in VS Code when you open or save a file, with Autosave in your IDE configured, new issues will be reported as you type and Security Hotspots will be available in SonarLint.

### (option 1) 3. Use Connected Mode for SonarLint with SonarQube (local development)

You should use this option, if you want to setup your own development experience and devOps environment.

Requirements:

- Docker has been installed locally (Desktop or docker-engine)
- SonarLint Extension has been installed in your IDE

Connecting SonarLint to a SonarQube instance is the first step in setting up a Sonar Solution. Using the Connected Mode will permit the transmission of information between SonarLint and SonarQube. In Connected Mode, SonarLint synchronizes some data from the issues that were found on the server, such as the issues's status and resolution. For a fast setup, I created a docker-compose.yml file which can be used. Direct to the root directory and run `docker-compose up -d` to fetch the official images and start a PostgresSQL database and SonarQube web server in detached mode. For an improved SonarQube update policy, named volumes will be used. You can verify a successful setup using the `docker ps` command; you should see both SonarQube and PostgreSQL containers running.

### (option 2) 4. Use Connected Mode for SonarLint with SonarCloud (team development)

Yout should use this option, if you want to use a devOps environment created and managed by me.

Requirements:

- SonarLint Extension has been installed in your IDE

Connecting SonarLint to a SonarCloud instance is the first step in setting up a Sonar Solution. Using the Connected Mode will permit the transmission of information between SonarLint and SonarCloud. In Connected Mode, SonarLint synchronizes some data from the issues that were found on the server, such as the issue's status and resolution. For a fast setup, I created a ready-to-use connectedMode.json file which can be used to connect to my personal SonarCloud instance using your personal SonarCloud credentials. After successfully installing SonarLint you will be prompted to use this configuration. It may take a couple of minutes for the popup to appear to confirm a SonarCloud connection. Please note, that this shared file is only working in VS Code currently. In case you're using another IDE or you have trouble getting things working, follow the sonasource instructions mentioned above and use the further SonarCloud project information (connectionId, projectKey) below.

SonarCloud project information for setup with different IDE than VS Code:

- `connectionId`: `sonarCloud-connection`
- `projectKey`: `JLS-DEV-lab_sonarqube`

## Installation

This is a monorepo, making the installation process straightforward. To get started with the development, clone this repository and run `npm install` or `npm i` in the project’s root folder. This will install all required dependencies.

## Scripts

This repository is equipped with scripts to build and run the code.

| Script     | Description                                                                  | Comment           |
| ---------- | ---------------------------------------------------------------------------- | ----------------- |
| `dev`      | starts the application in development mode                                   | default port 5173 |
| `build`    | builds the application for production                                        |                   |
| `lint`     | run ESLint to check the .ts and .tsx files for code quality and style issues |                   |
| `coverage` | run developer tests and create a coverage report file for sonar analysis     |                   |

# Testing
For a robust developer experience, automated testing for React components has been set up. Tests located in the `tests` folder will be executed in a GitHub build pipeline. Branches can only be merged into the main branch if all tests pass and there is a minimum code coverage of 80%. So it is required to add tests using vitest when creating new components.


## Folder structure

The folder structure in this repository is based on suggestions by vite.js

- **.node_modules/** - all dependencies required by the project will be installed here
- **.public/** - serves as a storage space for static content
- **.src/** - main folder for react source code
  - **.components/**
    - **.elements/** - small reusable components
    - **.hooks/** - custom react hooks
    - **.modules/** - larger reusable components
    - **.pages/** - pages to render in user interfaces
  - **.types/** - folder to define typescript types
  - **.utils/** - folder for utility code like constants, configs or helper functions
- **.test/** - folder for test files
- **.tests/** - main folder for tests (will be executed during build process)