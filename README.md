<<<<<<< HEAD
# CS260
=======
<span style="color: blue;">CS260 web design project</span>

# Description of My website  
  At present, many people all over the world have suffered from a large number of scams. For example, scam websites, scam phone calls, scam text messages and etc. In my project of this semester, I hope to make a fraud-proof website called "ANTI-SPAM". Through the simulation of the fraud scene to let people think about the psychology of the scammer.  
# The following is my analysis of the features of the website.
  This is the homepage of my website, which includes registration and login functions. You can choose the name you like, and if you score in the top10 you will appear in the leaderboard.  
![IMG_0014](https://github.com/user-attachments/assets/ced00ba1-e8c6-40fb-bc5b-1b289b70d433)  
# Log in and sign up   
  This is the registration and login screen for my website. If you have not registered for an account, the account and password you enter will automatically become your password.  
![IMG_0013](https://github.com/user-attachments/assets/c9cb2646-a381-4bb4-bd20-fa19a1c660bc)
# Question page  
  This is the quiz section, which includes many of the quizzes I prepared. You can use either multiple choice or short answer and give a score. These scores are stored and saved for the best 10 times and placed on the leaderboard.  
![IMG_0012](https://github.com/user-attachments/assets/c9da6e33-4238-43cb-99c9-d07145919e2b)
# Programming languages  
  **HTML** - HTML will be the main structure of the programming language including the external framework of the website  
  **CSS** - CSS is used to adjust the color and beauty of the website. In the quiz, CSS is also used for aesthetic purposes or to simulate real fraud scenarios.  
  **JavaScript** - JavaScript is used in the interaction design of various buttons on the website.  
  **React** - react is mainly responsible for the answer interface.  
  **Service** - chatWithFriend and saveScores also provide users with access to the data they have recorded in leaderboards.  
  **DB/Login** - DB/Login is used to handle logins and Signup.  
  **WebSocket** - Websockets is used to record user data and leaderboards.  

# MY HTML START UP WROK DESCRIPTION setps
1. add a file named index.html 
2. create a header a title on top. create space for the login in and sign up function. have some plain text for the front page
3. Create a login.html page, and created quiz.html page. create inpust section for login in and sign up and a submit button in login.html
4. create a button for quiz.html, Try to create some question for quiz.html
5. clone simon
6. Make every all html page have a link to each other, and make those link look the same, so I could use router to link them later.
7. edit the index.html make it to login in page.
8. create about,html and make the edited Scores.html make it include blank space for database.
9. edit quiz page add 2 example quiz questions. add intro section for all html page
10. fix little bug of link to scores.html
# MY HTML START UP WROK DESCRIPTION 
1. index.html (Login/Home)
Purpose: As a login page, users can log in or create a new account.
Features:
Login form: Allows users to enter their credentials to access quizzes and scoring systems.
Creating accounts: make new user create an account.
Navigation links: Provide easy access to other parts of the site. (this feature is shared in all site)
Welcome Content: (going to add one)
2. Quiz.html (Quiz page)
Objective: To test users' understanding of online fraud and their ability to identify fraud scenarios.
Features:
Interactive questions: Users can select answers and submit them.
Third-party service placeholder: A reserved place to add CAPTCHA or external scoring apis in the future.
Responsive design: Ensure that the test layout remains user-friendly on devices of all sizes.
3. Scores.html (score/leaderboard page)
Purpose: Display user historical scores, rankings.
Features:
Leaderboard: Shows top players, top scores, and dates.
Database data: Space reserved for integrated database.
WebSocket data: Space reserved for WebSocket database.
4. About.html (About the page)
Purpose: Explain the original idea for creating this website.
Features:
Information Content: Provides background on why websites are created and the importance of fraud awareness.

# MY CSS START UP WROK DESCRIPTION
1. create a file named index.css
2. create the style of different heading
3. create Responsive Design for the webstie
4. clone simon
5. link index.css to index.html check how it looks like
6. Delete the previous code, because the previous all by imagination is a little ugly. (I did the css before i check the rubic of html, also I was trying to give every header or botton a color and front which make the website looks so wried)
7. create the style of login page (index.html)
8. create the style of score and about page (Scores.html and about.html)
9. create the style for quiz page (quiz.html)
10. centered the picture

# MY React START UP WROK DESCRIPTION
1. creat app.js file and header.js file put react router in my website.
2. clone simon
3. use these commond "npm init -y","npm install vite@latest -D","npm install bootstrap react-bootstrap","npm install react react-dom react-router-dom","npm run dev" to start convet my html startup frontend to use Reac
4. created the file architecture after using vite-react
5. created index.html src/main.jsx src/app.jsx to make the main application component with routes
6. created a footer.jsx (super easy I put the css code in there too, so that i could have style of it)
7. created a header.jsx I put the routes in there to make it like a navbar. Also add the css code to it
8. deploy simon to my website
9. read simon again and again
10. I spent a long time figure out that i had problem create the header and foot.
11. create a new Project Structure /pages/About, Login, Quiz, Score(.css/.jsx)+App.jsx/.css (replace header and footer)
12. put react router function in the project, and create username in app.jsx to make the login function work (did not finshed)
13. create more scam question, create function caculate score
14. edited the app.jsx and score.jsx
15. create login in page
16. Copy the css code from my CSS startup
17. edit the css code
18. I could see anything when I run dev
19. create a normal app.jsx only print hello world
20. removed extra render inindex.jsx
21. found the problem on index.html, forget line <script type="module" src="/index.jsx"></script> in index.html
22. edit the quiz.jsx
23. add image to website
24. could not figure out css footer problem.

# MY Service START UP WROK DESCRIPTION
1. create a vite.config.js make my server proxy API calls to my backend running on port 4000.
2. create Frontend served up using Express static middleware
3. download express and uuid
4. use command node index.js, and curl to check my end points
5. add a login endpoint to my index.js
6. add create account endpoint
7. add submit score endpoint
8. add a logout endpoint
9. edit login page to make it call the login endpoint
10. edit login page to make it call the create account endpoint
11. edit about page to make it have third party api
12. edit quiz page to make it call logout and submit scoreendpoint
13. fix the bug i made in step 11 (I did not have a submit button when i was working on me react startup, so i chenged it back to send score after user finsh quiz, and after they finsh it will jump to score page)
14. copied the submit current score endpoint, and make a current score function from it. change the name of submit score to score/currentscore
15. edit score page to make it have logout and show current score function.

# MY Login START UP WROK DESCRIPTION
1. created dbConfig.json
2. make database.js connect to database
3. create a new database in DB Alta called startup, and create two conpoents for startup database.
4. 