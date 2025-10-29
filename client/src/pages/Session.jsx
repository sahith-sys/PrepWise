import axios from "axios";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Session() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const sessionId = id;

  const handleStartQuiz = () => {
    navigate(`/quiz/${sessionId}`);
  }

  async function getSession() {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const resp = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/qna/get/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.data.success) {
        setSession(resp.data.data);
        console.log(resp.data.data);
      } else {
        alert(resp.data.message || "Failed to get session");
      }
    } catch (error) {
      console.log("Error getting Session", error);
      alert(error.response?.data?.message || "Error getting Session");
    } finally {
      setLoading(false);
    }
  }
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  useEffect(() => {
    getSession();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-medium">
        Loading session...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 font-medium">
        Session not found
      </div>
    );
  }
  return (
    <div className="container ml-10 max-w-4xl px-6 py-10">
      <Link
        to="/qna"
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
      >
        <ArrowLeft size={18} />
        Back to Sessions
      </Link>

      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-1">{session.sessionName}</h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          {session.sessionDescription}
        </p>
        <div className="flex items-center gap-3 mb-3">
          <div className="text-[10px] text-white bg-black font-semibold rounded-full px-3 py-1">
            Created At: {new Date(session.createdAt).toLocaleString().split(",")[0]}
          </div>
          <div className="text-[10px] text-white bg-black font-semibold rounded-full px-3 py-1">
            Experience: {session.experience}
          </div>
          <div className="text-[10px] text-white bg-black font-semibold rounded-full px-3 py-1">
            {session.targetRole}
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Questions</h2>

        {session.questions && session.questions.length > 0 ? (
          <div className="space-y-4">
            {session.questions.map((q, index) => (
              <div
                key={index}
                className="border rounded-xl shadow-sm bg-gray-50"
              >
                {/* Accordion Header */}
                <div
                  className="flex justify-between items-center px-5 py-3 cursor-pointer hover:bg-gray-100 rounded-xl"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="font-medium text-gray-800">
                    {`${index + 1}. ${q.questionText}`}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>

                {/* Accordion Body */}
                {openIndex === index && (
                  <div className="px-5 py-4 border-t text-gray-700 space-y-2">
                    <p>
                      <span className="font-semibold">Answer:</span>{" "}
                      {q.correctAnswer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">
            No questions available in this session.
          </p>
        )}
      </div>
      <button onClick={handleStartQuiz} className="mt-6 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
        <h2 className="flex items-center justify-center gap-2">
          Take Quiz <span><ArrowRight size={15} /></span>
        </h2>
      </button>
    </div>
  );
}

export default Session;
