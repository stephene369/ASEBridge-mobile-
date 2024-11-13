#!/bin/bash

npm run build
npx cap sync ios
npx cap copy ios
npx cap run ios
