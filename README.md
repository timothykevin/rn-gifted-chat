# Setup

1. run `npm ci` using Node `18.18.2` and NPM `9.8.1`
2. Download [Expo GO](https://play.google.com/store/apps/details?id=host.exp.exponent&pcampaignid=web_share) in your mobile
3. run `npm start` to start the app
   1. to run in web environment, press `w`
   2. to run in Android, open Expo Go app then scan the barcode using Scan QR feature inside the app. Make sure your mobile and laptop is using the same internet connection

# Backend

Since currently we are trying to simulate backend via REST API. In this PoC we are using the backend of [Demo LLM staging](https://demo-llm-gat.glair.ai/)

To get token access, get the token from spreadsheet [Demo LLM Auth](https://docs.google.com/spreadsheets/d/194IgPwy1Lt3cNPLcjUo0_zz9FVhWDsaq-heSbm734Sk). Ask maintainer for the `.env` value.
