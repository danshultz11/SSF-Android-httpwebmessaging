# SpaceStationFinderCordova
(Warning - setup is a time-consuming pain in the ass)

Increment release (version) and version(android-versionCode):
(in config.xml):
android-versionCode="56" defaultlocale="en-US" id="com.SpaceStationFinder" version="42.1.0"

install vscode-cordova:
https://github.com/microsoft/vscode-cordova
(Follow instructions in README.md)
Install Required Android stuff:
https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html
Install Java:
https://www.oracle.com/java/technologies/downloads/#java8

also add the powershell path to PATH env variable:
C:\Windows\System32\WindowsPowerShell\v1.0

In vscode terminal window at the root of the project, add the Android platform to cordova
cordova platform add android

When all set up, run 
cordova build android
at the root of the app in VSCode Terminal

To sign and create a release apk:
cordova build android --release -- --keystore=./SpaceStationFinder.keystore --storePassword=jjjjjj --password=jjjjjj --packageType=bundle
and gets put in
C:\Users\Dan\Documents\Development Projects\SSF-Android-httpwebmessaging\SpaceStationFinder\platforms\android\app\build\outputs\apk\release\app-release.apk

Go to play.google.com dashboard as danshultz11@gmail.com
Select "Production"
then "Release dashboard" tab:
https://play.google.com/console/u/1/developers/7874038105599688716/app/4975497713174280884/tracks/production?tab=releaseDashboard
Click Create New Release button in upper right
