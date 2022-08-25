## See it in action right now 🔥
Vercel deployment - [musclegroups.teodor.tv](https://musclegroups.teodor.tv)
Please access it on a laptop / desktop, it will be super squished on mobile.

## Run locally using yarn 🧑‍💻
- git clone https://github.com/teodorrd27/team-rh-challenge.git
- yarn
- yarn dev

## Assumptions ✏️
- wger.de API does not contain malicious embedded html in the exercise description resources
- only English language results are returned from the `/exercise` endpoint
- A very literal interpretation of the acceptance criteria allows me to leave out the pagination features of the WGER api (check nice to haves for how I would have implemented that)

## Rationale 🧠
- Use this challenge for incremental learning (chuck out `create-react-app` to throw away comfort zone):
  - I used Next.js and Vercel for the first time, appologies for any non best practices
- Make it actually useable and deploy it on a subdomain I own
- Leverage SSR to preload muscle groups and pass them as props to the entry component to simplify lifecycle

## Features 💫
- Material UI was used to give us an out-of-the-box design system that is customiseable (I'm also used to it)
- Vercel is hooked up with GitHub and deploys on push
- yarn test will run a few (sadly incomplete) testing suites on `yarn test` - try it
- A controlled expandable-row table was used in order to only display one Exercise at a time. This is to make sure that the user does not get overwhelmed with too much information that gets littered on screen.
- Styled components are leveraged to compositionally add CSS

## Nice to haves 🛠
I would have liked to do a lot more. Here is a list of things that need to be tidied up or done better.
- *MUST HAVE*: I ran out of time during test coverage. A lot more unit testing is necessary. Integration testing would be nice.
- Refactoring of client calls (fetch) and API paths that are parameterised. Language is currently hard coded to only request English results. It would be good to similarly prerender the possible language just like I have done for the Muscle groups and pass them into the props.
- Refactoring of bigger components such as the Table is necessary to achieve better readability and code reuse.
- I noticed that the `/muscle` WGER endoint also returns svg resources that illustrate where the muscle groups are in the human body. I also noticed they are each of the same dimension. This means that you could superimpose all of the svgs and create a sketch of the whole body. Then, based on the user's selection, you could change the colour of an svg group to highlight the parts of the body to be trained.
- Error handling is necessary for the fetch GET calls. i.e. catch blocks.
- Caching - a lot of API calls are repeated whenever the User navigates between muscle groups. This could easily be prevented by using a caching Node package like memory-cache or Redis for a more robust solution.
- Pagination - I am currently throwing out any results with a count greater than 20 from the WGER API. I would use the MUI Table component's pagination feature with the `next` and `previous` fields in the WGER API to allow the user to fetch more Exercises.
- Media queries for different sized screens - Currently this looks terrible on Mobile, and could easily be improved by leveraging MUI's xs, sm, md, lg, xl props.
- The unsafely set HTML coming back from the API should be sanitised before rendering. Otherwise we potentially leave the app open to Cross Site Scripting via HTML injection.
