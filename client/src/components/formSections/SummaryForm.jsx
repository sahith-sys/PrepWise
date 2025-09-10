import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { ResumeInfoContext } from "../../Context/ResumeContext";

function SummaryForm({enabledNext}) {
  
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [initialSummary, setInitialSummary] = useState(resumeInfo.summary || "");
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setResumeInfo({ ...resumeInfo, summary: initialSummary });
  }, [initialSummary, setResumeInfo]);

  async function generateSummary() {
    if (!initialSummary) {
      alert("Please enter an initial summary before generating.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/resume/generate-summary`,
        {
          initialSummary,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      if (data.success) {
        setInitialSummary(data.summary);
      } else {
        console.error("Error generating summary:", data.message);
      }
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setLoading(false);
    }
  }
  function handleInputChange(e){
    enabledNext(false);
    setInitialSummary(e.target.value);
    enabledNext(value.trim().length > 0);
  }
  function handleSave(e) {
    e.preventDefault();
    enabledNext(true);
    setResumeInfo({ ...resumeInfo, summary: initialSummary });
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-blue-500 border-t-4 mt-6">
      <form action="" onSubmit={handleSave}>
        <div>
          <h2 className="font-bold text-lg">Summary</h2>
          <p>Add your Profile Summary here</p>
          <textarea
            name="summary"
            id="summary"
            className="w-full p-2 border border-gray-300 rounded-lg mt-3"
            rows="3"
            placeholder="Add 3-4 lines of your summary"
            value={initialSummary}
            onChange={handleInputChange}
            required
          ></textarea>
          <Button
            className="mt-3 ms-43 text-center bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
            onClick={generateSummary}
            type="button"
            disabled={loading}
          >
            <ClipLoader
              color="#ffffff"
              loading={loading}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            Enhance Summary with AI
          </Button>
        </div>
        <div className="flex justify-end">
          <Button className="mt-3 ms-43 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SummaryForm;
