#!/bin/bash

unset _JAVA_OPTIONS
npm run build
npx cap sync android
npx cap copy android
npx cap run android
#npx cap open android
cd ./android         
./gradlew bundleRelease
cd ..


git add .

current_date=$(date +"%Y/%m/%d-%H:%M:%S")

git commit -m "Version-$current_date"

git push https://github.com/stephene369/ASEBridge-mobile-.git


