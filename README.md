# Table of contents
1. [Prerequisites](#Prerequisites)
2. [Setup](#Setup)
    1. [GitHub](#Github)
    2. [Frontend](#Frontend)
3. [Modifications](#Modifications)
4. [Further Information](#Further-Information)
5. [Basic Usage](#Basic-Usage)

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


# Modifications
You also have to edit your environmental variables. Add the following two to your system variables under `Path`: 
`...\Android\Sdk\platform-tools` & `...\Android\Sdk\emulator`
Afterwards, you need to add a new system variable called `ANDROID_HOME` with location `...\Android\Sdk`


# Further Information
Many parts of the application are prone to fail if used incorrectly. Be careful when you add new libraries and frameworks. This
application is mainly for usage on android, since a library called notifee is apparently not compatible with it. There is a possibility that
the insertion of notifee makes it unable to run the application. A working part is on the computer of Gian-Luca Kunfermann and can in need be copied
as a zip.


# Basic Usage
The application starts on a landing page with no set reminders. On press of the plus button on the bottom, you will be redirected
to a new page, where you can add a reminder to your reminder list. The user cannot enter false information, since the time is locked behind
a time picker and the repeat count in weeks only allows for numbers to be entered. After creating one or multiple reminders, by clicking
on a reminder you will enter the edit page for the corresponding reminder. There you can change whichever information you'd like. By 
long pressing on a single reminder on the overview page, you will have the option to delete this specifig reminder by clicking on the 
trashcan symbol that will appear for five seconds. Notifications do sadly not work at this point in time, but will hopefully be 
repaired in the near future.
