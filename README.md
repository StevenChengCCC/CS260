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
8. 
