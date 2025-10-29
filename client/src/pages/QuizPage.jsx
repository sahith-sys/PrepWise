import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";

export default function QuizPage() {
  const { sessionId } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [wholeQuizData, setWholeQuizData] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const loadingMessages = [
    "Generating your personalized quiz...",
    "Analyzing your session data...",
    "Crafting the perfect quiz for you...",
    "Just a moment, setting up your questions...",
    "Selecting thought-provoking questions...",
    "Finalizing your quiz experience...",
    "Almost there, preparing your quiz...",
  ];
  useEffect(() => {
  const interval = setInterval(() => {
    setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
  }, 6000);

  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/quiz/create`,
          { sessionId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setWholeQuizData(data);
        setQuizData(data.quizQuestions || []);
        setQuizId(data.quizId);
      } catch (err) {
        console.error("Error fetching quiz:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuiz();
  }, [sessionId]);

  const handleSelect = (optionIndex) => {
    setAnswers((prev) => ({ ...prev, [current]: optionIndex }));
  };

  const handleNext = () => {
    if (current < quizData.length - 1) {
      setCurrent(current + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    let localScore = 0;

    quizData.forEach((q, index) => {
      if (answers[index] === q.answer) localScore++;
    });
    try {
        const token = localStorage.getItem("token");
        const resp = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/quiz/score`, {
            quizId,
            score: localScore,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!resp.data.success) {
            alert(resp.data.message || "Failed to submit score");
        }
    } catch (error) {
        console.error("Error submitting score:", error);
        alert("There was an error submitting your score. Please try again.");
    }

    setScore(localScore);
    setShowResult(true);
    setSubmitting(false);
  };

  if (loading)
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4">
      <ClipLoader
              color="#4d5dcaff"
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
      <p className="text-lg text-gray-700 mt-4 transition-opacity duration-500">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );

  if (showResult) {
  const percentage = Math.round((score / quizData.length) * 100);

  const getMotivationMessage = () => {
    if (percentage === 100)
      return "Outstanding! You nailed every question, true mastery!";
    if (percentage >= 80)
      return "Great job! You’re doing really well, keep practicing to reach perfection!";
    if (percentage >= 60)
      return "Good effort! A bit more practice and you’ll ace it!";
    if (percentage >= 40)
      return "Not bad! Keep practicing and reviewing your weak areas.";
    return "Don’t give up! Practice makes perfect, try again and you’ll improve!";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8">Quiz Result</h1>

      {/* Circle + Stats */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        {/* Circular Score Progress */}
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#e5e7eb"
              strokeWidth="15"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#4f46e5"
              strokeWidth="15"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${
                2 * Math.PI * 70 * (1 - score / quizData.length)
              }`}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-semibold text-indigo-700">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Quiz Stats */}
        <ul className="text-gray-700 space-y-2 text-lg">
          <li>
            <strong>Answered:</strong> {Object.keys(answers).length}
          </li>
          <li className="text-green-600">
            <strong>Correct:</strong>{" "}
            {
              quizData.filter(
                (q, i) => answers[i] !== undefined && answers[i] === q.answer
              ).length
            }
          </li>
          <li className="text-red-500">
            <strong>Incorrect:</strong>{" "}
            {
              quizData.filter(
                (q, i) => answers[i] !== undefined && answers[i] !== q.answer
              ).length
            }
          </li>
          <li className="text-gray-500">
            <strong>Skipped:</strong>{" "}
            {quizData.length - Object.keys(answers).length}
          </li>
        </ul>
      </div>

      {/* Motivational Message */}
      <p className="text-lg text-gray-800 font-medium mb-10 text-center w-full md:w-1/2">
        {getMotivationMessage()}
      </p>

      {/* Detailed Questions Review */}
      <div className="w-full md:w-2/3 lg:w-1/2 space-y-5">
        {quizData.map((q, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl shadow-md border border-gray-100"
          >
            <p className="font-semibold mb-2">
              {i + 1}. {q.question}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Your Answer:</strong>{" "}
              <span
                className={`${
                  answers[i] === q.answer
                    ? "text-green-600"
                    : answers[i] !== undefined
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {answers[i] !== undefined
                  ? q.options[answers[i]]
                  : "Not answered"}
              </span>
            </p>
            <p className="text-sm text-gray-700">
              <strong>Correct Answer:</strong>{" "}
              <span className="text-green-600">{q.options[q.answer]}</span>
            </p>
            <p className="text-sm text-gray-600 mt-2 italic">
              {q.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}



  const q = quizData[current];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full md:w-2/3 lg:w-1/2 p-8 rounded-2xl shadow-lg">
        <div className="flex justify-between mb-4 text-gray-500 text-sm">
          <span>Question {current + 1} / {quizData.length}</span>
        </div>

        <h2 className="text-lg font-semibold mb-4 text-gray-800">{q.question}</h2>

        <div className="space-y-3">
          {q.options.map((opt, idx) => (
            <label
              key={idx}
              className={`block px-3 py-2 rounded-lg border cursor-pointer transition ${
                answers[current] === idx
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 hover:border-indigo-300"
              }`}
            >
              <input
                type="radio"
                name={`question-${current}`}
                checked={answers[current] === idx}
                onChange={() => handleSelect(idx)}
                className="mr-2 accent-indigo-600"
              />
              {opt}
            </label>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            disabled={submitting}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-indigo-400"
          >
            {current === quizData.length - 1 ? "Finish" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
