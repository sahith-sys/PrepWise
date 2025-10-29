
# PrepWise

PrepWise is an AI-powered interview preparation platform that helps users master coding interviews and behavioral rounds through personalized quizzes, analytics, and resume insights.

Built for aspiring developers, PrepWise combines AI-generated question banks, company-specific DSA sheets, and real-time progress analytics to make interview preparation smarter and more efficient.

# Tech Stack
<img width="1000" height="550" alt="image" src="https://github.com/user-attachments/assets/c20c9be9-6499-4893-bf75-e77088d52d13" />


## Features

- **AI Quiz Generation** — Create quizzes dynamically using Gemini based on difficulty, topics, or past performance.
- **Topic-Based QnA Generation** — Generate technical and behavioral questions for any topic interactively.
- **Company-Wise DSA Sheets** — Access curated DSA problem sets tailored for companies like Google, Amazon, and Microsoft.
- **Smart Resume Builder** — Build professional resumes instantly with customizable templates.
- **ATS Resume Analysis** — Evaluate your resume’s ATS score and receive actionable improvement tips.
- **User Dashboard & Analytics** — View quizzes attended, recent 10 interactions, interview sessions created, and performance metrics.
- **Secure Authentication** — User login and session management with JWT.


## Folder Structure

```bash

├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   |      |── formSections/
│   │   |      |── resumePreviewSections/
│   │   ├── Context/
│   │   |      |── AppContext.jsx
│   │   |      |── ResumeContext.jsx
│   │   ├── data/
│   │   |      |── dummy.jsx
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── main.jsx
│   │   └── App.jsx
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.js
│
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── data/
│   │   ├── dsaQuestions.js
│   ├── models/
│   ├── config/
│   │   ├── mongodb.js
│   ├── app.js
│   ├── .env
│   ├── index.js
│   ├── seedProblems.js
│   └── package.json
│
├── LICENSE
├── .gitignore
└── README.md


```

## Tech Stack

| Layer       | Technology / Tool                       | Purpose                                      |
|------------|----------------------------------------|---------------------------------------------|
| Frontend    | React.js, TailwindCSS, Shadcn/U         | Responsive UI & Component Design      |
| Backend     | Node.js, Express.js                     | REST API & Authentication |
| Database    | MongoDB + Mongoose                      | Store users, quizzes, and resumes              |
| AI Model    | Google Gemini API                       | Generate quizzes, feedback & analysis |
| State Mgmt  | Context API                             | Manage global app state             |
| Auth        | JWT + Bcrypt                            | Secure login and sessions            |
| Env Mgmt    | dotenv                                  | Manage API keys and environment variables   |

## Getting started it locally

### 1. Clone the Repository
```bash
git clone https://github.com/sahith-sys/PrepWise.git
```
### 2. Setup the Frontend
```bash
cd client
npm install
```
### 3. Setup the Backend
```bash
cd server
npm install
```
### 4. Environment Variables
```bash
#Frontend
VITE_REACT_APP_API_URL="backend_url"

#Backend
MONGODB_URI="your_mongodb_connection_string"
GEMINI_API_KEY="your_gemini_api_key_here"
JWT_SECRET="your_secret_key"
```
### 5. Run the app
```bash
#Frontend
npm run dev

#Backend
npm run dev
```

## API Endpoints

| Method | Endpoint | Description | Payload |
|--------|-----------|-------------|----------|
| **POST** | `/api/quiz/generate` | Generate AI-based quiz | `{ "topic": "DSA", "difficulty": "medium", "numQuestions": 10 }` |
| **POST** | `/api/resume/analyze` | Analyze resume ATS score | `{ "resumeFile": "<file>" }` |
| **GET** | `/api/user/dashboard` | Fetch user analytics | Auth token required |
| **GET** | `/api/dsa/company/:name` | Get company-wise DSA sheet | `:name` = company name (e.g. Google) |
| **POST** | `/api/auth/register` | Register a new user | `{ "name": "John Doe", "email": "john@example.com", "password": "123456" }` |
| **POST** | `/api/auth/login` | Login existing user | `{ "email": "john@example.com", "password": "123456" }` |



## Todo

- Integrate leaderboard & mock interview sessions
- Dockerize the project
- Add AI feedback for coding answers


## Credits

- React + TailwindCSS + Shadcn
- Node.js + Express
- MongoDB
- Google Gemini API

