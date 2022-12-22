# Table of contents
1. [Prerequisites](#Prerequisites)
2. [Setup](#Setup)
    1. [GitHub](#Github)
    2. [Frontend](#Frontend)
3. [Further Modifications](#Further Modifications)

# Prerequisites

## Node.js & NPM
You need to have at least node.js version 12 LTS or higher, as well as NPM included.

## Yarn
Preferably the newest version of yarn.

## Visual Studio Code
At least version 1.5 or higher. Is used to run all of the code, since this application does not have an actual backend or database.

## Android Studio
With a version 2021.x. Is needed to run an emulator of an android mobile phone. Can be replaced by an actual phone connected to your computer.
But should still be installed nonetheless

## Android SDK
You should also have installed a recent version of the android sdk (version 33)


# Setup

## Github
Copy the ssh code on the website and clone the project onto your own computer via gitbash or the desktop app.

## Frontend
Since this is an application that uses no backend and relies on the local storage of your phone (or emulated phone) you only need VSC to run your
application. Open the folder "Frontend" with **VSC**. Open a new terminal if none is open and type in `yarn install`. 
Type `yarn expo run:android` or if this doesn't work `yarn start` after installation is complete.


# Further Modifications
You also have to edit your environmental variables. Add the following two to your system variables under `Path`: 
`...\Android\Sdk\platform-tools` & `...\Android\Sdk\emulator`
Afterwards, you need to add a new system variable called `ANDROID_HOME` with location `...\Android\Sdk`
