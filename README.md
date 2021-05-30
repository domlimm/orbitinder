<p align="center">
  <a>
    <img
      width="50%"
      src="https://user-images.githubusercontent.com/46486515/118839750-578a9700-b8f9-11eb-88dd-ee9ff21af3a3.png"
    />
  </a>
</p>

<div align="center">
  Made with 💙 using <br/><br/>
  <div align="center">
    <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Expo-20232A?style=for-the-badge&logo=expo&logoColor=white"/><img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black"/>
    </div>
</div>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)

<div align="left">
  <br/>
  
  You may want to watch our [video](https://drive.google.com/file/d/1-tXbN5Yr0KRQDf51QrBR_rcDU527qURu/view?usp=sharing) presentation or view our [poster](https://i.imgur.com/89aBsEq.jpg)
  
  <br/>
  
  <b>Proposed Level of Achievement:</b> Artemis

  <b>Motivation: </b>
  <p>
    As a NUS Computing freshman, you must have heard of the summer project,
    kindly organised by NUS School of Computing, Orbital. It is early March, and
    you have received an email from the module coordinator. You read the email
    and notice a word that students dread, ‘deadline’. You think to yourself,
    "What?! I have only this long to find myself a partner and register for it."
    Based on our personal recollections: we are freshmen who are interested in
    doing the Orbital Project. This project requires us to work in pairs. We
    went on a hunt on several social media platforms to look for a partner and
    we have had troubles along the way. When we found someone, we asked for
    their contact and proceeded to find out whether he or she is the right fit.
    Don't you find the process of looking for a partner rather cumbersome? It is
    indeed quite a hassle. Is there a way to provide a better experience for
    future registrants?
  </p>
  <b>Aim:</b>
  <p>
    We hope to provide a centralised platform to improve the process of finding
    a partner for Orbital. Here, students will be able to find the most suitable
    partner based on their preferences, if not, the system will offer
    recommendations.
  </p>
  
  <br/>
  
  <b>Competitor Analysis: </b>
  Competitor's Name | User's Experience with Competitors App | User's Experience with OrbiTinder
  --- | --- | ---
  **Reddit**| The NUS subreddit only comprises a small percentage of NUS students interested in Orbital. | OrbiTinder would primarily be adopted by students interested in forming teams for Orbital
  **Reddit**| Reddit post’s audience reach depends on the popularity of the post and it’s age. Older posts and posts with low numbers of upvotes tend not to have high levels of engagement. | User profiles on OrbiTinder will receive engagement based on whether they meet the preferences of other users
  **Reddit**| Users may choose not to include their technical backgrounds in their posts, which can deter others from reaching out to them. | OrbiTinder would require users to include details such as technical backgrounds etc, making it much more likely for interested users to reach out to them.
  **Telegram** |Students currently post messages in large NUS module group chats as a way to potentially find those that are interested in teaming up with them. <br/> Such group chats comprise a small percentage of NUS students interested in Orbital.| OrbiTinder would primarily be adopted by students interested in forming teams for Orbital.
  
  <br/>
  
  <b>Main Features: </b>
  Features | Description
  --- | --- 
  **Account Registration** | Allow users to create an account for OrbiTinder
  **Preferences** | Allow users to set their profile preferences
  **Edit Preferences** | Allow users to change their profile preferences
  **Profile Matching** | Allow users to swipe left/right on users’ profiles to indicate disinterest/interest
  **Profile Filter** | Filtering user profiles based on filter inputs during profile matching
  **Recommended Profiles** | Provide a personalised group of recommended user profiles for users to swipe on based on their preferences
  **Messages** | Allow users to send in-app messages to users they have matched with
  **In-app Handshake** | Allow users to send an in-app “handshake” to acknowledge Orbital partnership
  **Telegram Extension** | Telegram information of each team member would be released upon acknowledgement of Orbital partnership
  **Notifications** | Allow users to receive notifications of new matches, recommendations and messages
  
  <b>Additional Features: </b>
  Features | Description
  --- | --- 
  **Dark Mode** | Allow users to change the application UI theme
  
  <b>Optional Features: </b>
  Features | Description
  --- | --- 
  **Compare all saved users** | Compare the characteristics of a pair of favourited users
  **Customisation of Dashboard** | Allow users to customise what they can see on their home dashboard page
  
  <br/>
  
  <b>User Stories: </b>
  <p>Priorities: High (must have) - <b>***</b>, Medium (nice to have) - <b>**</b></p>
  
  Priority | As a... | I want to... 
  --- | --- | --- 
  *** | User | Create an account for OrbiTinder
  *** | User | Login to OrbiTinder
  *** | User | Input my background information
  *** | User | Input my Orbital partner preferences
  *** | User | Look at other users that fit my preferences
  *** | User | Chat with users that i’m interested in
  *** | User | Decline chat requests with users i’m not interested in
  *** | User | Filter users based on specific characteristics
  *** | User | Be recommended users that i may be interested in
  *** | User | Confirm my orbital partnership with a user, at the same time not receive subsequent requests from others
  *** | User | Receive chat request notifications
  *** | User | Receive chat notifications
  ** | User | Toggle Dark Mode
  ** | User | Conveniently move my conversation with my partner to Telegram
  ** | User | Compare the features of users that i like
  ** | User | Customize my home screen
  
  <br/>
  <b>Activity Diagram:</b>
  <p align="center">
    <a>
      <img
        width="100%"
        src="https://user-images.githubusercontent.com/66832279/120101159-3d617c00-c177-11eb-9f29-8d6c4edc2002.png"
      />
    </a>
  </p>
  
  <br/>
  
  <b>Proposed Timeline:</b>
  
  Milestone 1 | Milestone2 | Milestone 3 
  --- | --- | --- 
  Implement sign up (i.e. User registration and profiling) and login<br/><br/>Allow for modifications of user profile<br/><br/>Ability to perform swiping actions on other users<br/><br/>Ability to save preferences of users<br/><br/>Setup of Firebase (i.e. Authentication/Registration, Database) | Filtering and sorting of all users<br/><br/>Integration of in-application messaging with Firebase<br/><br/>Implement in-app and push notifications<br/><br/>Creation and testing of Machine Learning Models<br/><br/>Basic implementation of ML Models into application<br/><br/>User Testing (I)<br/><br/>System Testing (I)| Continue testing ML models<br/><br/>Implement ML models into mobile application<br/><br/>Implement Error Handling & Input Validation<br/><br/>Refine UI<br/><br/>User Testing (II)<br/><br/>System Testing (II)
  
</div>

<b>Technology Stack:</b>

| Technology | Purpose                               |
|------------|-------------------------------------------|
| React Native      | Backbone of application                |
| Expo       | Framework for React Native                    |
| Firebase | As database and authentication |
| Git CLI/ GitHub | Version control |
