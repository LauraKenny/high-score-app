# HighScoreApp

## Available Scripts

In the project directory, you can run:

### `npm install`

To install the relevant dependencies needed to run the app.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Runs the tests.

## Developer's choice

#### Limit the number of clicks to 10 and prevent additional button clicks

**Pros**

- By preventing additional button clicks and providing appropriate messaging aroud why the button is disabled, this gives the user clear feedback as to how the app functions.
- Adds appropriate restrictions to the app and is in line with the brief.

**Cons**

- Disrupts the flow of the interaction as the user has to restart the process after 10 clicks.
- The user may find the continuous messaging annoying if the app is used a lot. A potential solution to this could be to offer an option to 'disable notifications'.

#### Reset the points counter to 0 on every 10th click of the button

**Pros**

- Doesn't disrupt the flow of the user interacting with the app. As a result they may be more inclined to spend more time using the app.

**Cons**

- As there is no set limit it may make the user less inclined to submit a score as they could continue clicking until there is a higher score.
- Reduces the 'gamification' of the interaction.

## Improvements

- Change the default alerts to be more user-centric by adding notifications within the app.
- Add a light/dark mode option.
- Only display current player once the user has stopped typing.
- Add styling to highlight if the current player has been added to the leader table.
- Create additional tests for data fetching using mock requests.
- Create a more elegant solution for error handling in the http requests. For example, creating an 'Oh dear, something went wrong...' page that would be shown to the user if a network error occurs. The page should also include the relevant error status and message.
- HighScoreApp is still quite a complex component and could be broken down into smaller components as part of refactoring.
