# Tempo Frontend challenge

# Solution Improvement

### Describe what you have improved in the solution

- Fixed broken test case (was broken when I cloned)
- Use of var keyword - this may cause some issues, and for this reason, was refactored.

#### On TeamOverview.tsx file

- Used destructuring assignment on imports related to React (such as useEffect, useState, etc)
- Moved some functions to outside useEffect scope to improve readability.
- Fixed prop type mismatching on TeamOverview component, when it calls <List> component, it's passing a string instead of boolean.
- Refactored getTeamUSers to useCallback approach
- Renamed mapTLead function name to improve readability.
- Typed mapTLead funcion parameter.

#### On Teams.tsx file:

- Used destructuring assignment on imports related to React (such as useEffect, useState, etc).
- Renamed mapT function name to improve readability.
- Switched var to const
- Refactored getTeamUSers to useCallback approach
- Fixed type to TeamsList[] instead of any.
- Fixed type to boolean instead of any.
- Added input to search for a specific team.
- Added Pagination to improve usability.


#### On List.tsx file:

- Used destructuring assignment on imports related to React (such as useEffect, useState, etc).
- Fixed isLoading type to boolean

#### On Header.tsx file:

- Used destructuring assignment on imports related to React (such as useEffect, useState, etc).
- Replaced back text.

#### On Card.tsx file:

- Used destructuring assignment on imports related to React (such as useEffect, useState, etc).
- Navigation logic abstracted into its own function to improve readability
- Improved layout

#### On UserOverview.tsx file:

- Used destructuring assignment on imports related to React (such as useEffect, useState, etc).

#### On App.tsx file:
- Switched var to const
- Placed routes logic into its own file.

#### On testCard.tsx
- Renamed to index.test.tsx
- Switched var to const
- Fixed wrong getByText test

#### On testTeamOverview.tsx
- Renamed to index.test.tsx
- Placed into __tests__ folder within TeamOverview folder

#### On testTeams.tsx
- Renamed to index.test.tsx
- Placed into __tests__ folder within TeamOverview folder

#### On testUserOverview.tsx
- Renamed to index.test.tsx
- Placed into __tests__ folder within TeamOverview folder

## To Run the project you must run:

```
npm install
```

## after the installation finished, you can run:

```
npm start
```

#### The project will open in your browser with the following url http://localhost:3000;

## To run the tests yo must run

```
npm run test
```