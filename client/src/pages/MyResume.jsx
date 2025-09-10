import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ResumeInfoContext } from "../Context/ResumeContext";
import ResumePreview from "../components/ResumePreview";

function MyResume() {
  const { id } = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  React.useEffect(() => {
    getResume(id);
  }, []);
  async function getResume(id) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/resume/get`,
        {
          params: { id },
        }
      );

      const data = response.data;
      if (data.success) {
        setResumeInfo(data.data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  }
  return (
    <div className="p-5">
      <ResumePreview />
    </div>
  );
}

export default MyResume;
