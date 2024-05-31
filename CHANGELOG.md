# Change Log

## 31 May 2024

Han Yu - 5.0 Hours

- Improved robustness of sign-up page. Signing up now requires confirmation email and password. sign-up page now validates for email and password
  complexity (min. 8 characters, inclusive of special characters, uppercase and lowercase) as well as check if all fields are filled. Throws ErrorPopUp otherwise.
- Improved robustness of sign-in page. sign-in page now validates if the user exists as well as checks if all fields are filled.
- Added AuthButton component at top-right corner of Home for easy access to sign-in and sign-out feature.
- Added ErrorPopUp component to push Error messages to user at middle of screen.

## 30 May 2024

Han Yu - 3.0 Hours

- Set up firebase for authentication services, config at .env.local.
- Added sign-in page, handles email and password.
- Added sign-up page, handles email and password.
- Integrated sign-in/ sign-up button with Home.

Han Yi - 2.0 Hours

- Hardcoded handling of basic sentiment analysis with pretrained finbert model.
- Updated trading script to first integrate cash_at_risk options and then sentiment analysis with finbert.

## 28 May 2024

Han Yi - 3.0 Hours

- Adjusted the backend and included extra code to perform cleanup of logs after executing script.
- Added a navbar/header.
- Added dark mode (custom theme context).
- Implemented a bit of frontend features.

## 27 May 2024

Han Yi - 3.0 Hours

- Implemented minimal user input component which calls an async function to trigger the trading script on the backend to generate a tearsheet.
- Implemented a minimal tearsheet display component to display a generated tearsheet. Temporarily hardcoded to test functionality.

## 18 May 2024

Han Yi - 1.0 Hour

- Initialized repo, set up basic page navigation.

Han Yi & Han Yu - 2.0 Hours

- Discussed project plans and created product video and poster.
