import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ResumeInfoContext } from "../../Context/ResumeContext";

function EducationForm({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [educationList, setEducationList] = useState(
    resumeInfo.education || [
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        score: "",
        startDate: "",
        endDate: "",
      },
    ]
  );

  // Load saved education if any
  useEffect(() => {
    if (resumeInfo.education && resumeInfo.education.length > 0) {
      setEducationList(resumeInfo.education);
      enabledNext(true);
    }
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...educationList];
    updated[index][field] = value;
    setEducationList(updated);
    enabledNext(updated.some(edu => edu.institute && edu.degree));
  };

  const addEducation = () => {
    setEducationList([
      ...educationList,
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        score: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setResumeInfo((prev) => ({ ...prev, education: educationList }));
    enabledNext(true);
  };
  useEffect(()=> {
    setResumeInfo((prev) => ({ ...prev, education: educationList }));
  }, [educationList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-blue-500 border-t-4 mt-6">
      <form onSubmit={handleSave}>
        <h2 className="font-bold text-lg">Education</h2>
        <p>Add your educational details here</p>

        {educationList.map((edu, index) => (
          <div key={index} className="border rounded-md p-3 mt-4">
            <input
              type="text"
              placeholder="Institution Name"
              value={edu.institution}
              onChange={(e) => handleChange(index, "institution", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              required
            />
            <input
              type="text"
              placeholder="Degree (e.g. B.Tech)"
              value={edu.degree}
              onChange={(e) => handleChange(index, "degree", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              required
            />
            <input
              type="text"
              placeholder="Computer Science"
              value={edu.fieldOfStudy}
              onChange={(e) => handleChange(index, "fieldOfStudy", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              required
            />
            <input
              type="text"
              placeholder="Score / GPA (e.g. 8.5)"
              value={edu.score}
              onChange={(e) => handleChange(index, "score", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Start Date (e.g. June 2022)"
                value={edu.startDate}
                onChange={(e) => handleChange(index, "startDate", e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded-lg mb-2"
              />
              <input
                type="text"
                placeholder="End Date (e.g. June 2026)"
                value={edu.endDate}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded-lg mb-2"
              />
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-3">
          <Button
            type="button"
            className="bg-gray-500 text-white hover:bg-gray-600"
            onClick={addEducation}
          >
            + Add Another Education
          </Button>
          <Button
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EducationForm;
