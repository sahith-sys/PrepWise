import React, { useState, useEffect, useContext } from "react";
import { ResumeInfoContext } from "../../Context/ResumeContext";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const SkillsForm = ({ nextEnabled }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [skills, setSkills] = useState(resumeInfo.skills || [""]);
  const navigate = useNavigate();
  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      skills,
    }));
  }, [skills, setResumeInfo]);

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };
  async function handleSave() {
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/resume/save`,
        { resumeInfo },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = resp.data;
      const id = data.data._id;
      if(data.success){
        navigate(`/my-resume/${id}`);
      }
      else{
        alert(data.message);
      }
    } catch (error) {
      console.error("Error Saving data", error);
      alert(error?.message || "Error saving data. Please try again.");
    }
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-blue-500 border-t-4 mt-6">
      <h2 className="font-bold text-lg">Skills</h2>
      <p className="mb-4">Add your skills here</p>

      {skills.map((skill, index) => (
        <div key={index} style={{ display: "flex", marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Enter a skill"
            value={skill}
            onChange={(e) => handleSkillChange(index, e.target.value)}
            style={{
              flex: 1,
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />

          <Trash
            onClick={() => removeSkill(index)}
            className="ml-2 text-red-400 cursor-pointer"
          />
        </div>
      ))}

      <div className="flex justify-between">
        <Button
          type="button"
          onClick={addSkill}
          className="mt-3 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
        >
          + Add Skill
        </Button>
        <Button
          type="button"
          onClick={handleSave}
          className="mt-3 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
        >
          Save Data
        </Button>
      </div>
    </div>
  );
};

export default SkillsForm;
