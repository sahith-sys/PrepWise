import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ResumeInfoContext } from "../../Context/ResumeContext";

function ExperienceForm({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [experiences, setExperiences] = useState(resumeInfo.experience || [
    {
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  // Load saved experiences if any
  useEffect(() => {
    if (resumeInfo.experience && resumeInfo.experience.length > 0) {
      setExperiences(resumeInfo.experience);
      enabledNext(true);
    }
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
    enabledNext(updated.some(exp => exp.title && exp.company));
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setResumeInfo((prev) => ({ ...prev, experience: experiences }));
    enabledNext(true);
  };
  useEffect(()=> {
    setResumeInfo((prev) => ({ ...prev, experience: experiences }));
  }, [experiences, setResumeInfo]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-blue-500 border-t-4 mt-6">
      <form onSubmit={handleSave}>
        <h2 className="font-bold text-lg">Experience</h2>
        <p>Add your work experience here</p>

        {experiences.map((exp, index) => (
          <div key={index} className="border rounded-md p-3 mt-4">
            <input
              type="text"
              placeholder="Job Title"
              value={exp.jobTitle}
              onChange={(e) => handleChange(index, "jobTitle", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              required
            />
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => handleChange(index, "company", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={exp.location}
              onChange={(e) => handleChange(index, "location", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Start Date (e.g. Jan 2023)"
                value={exp.startDate}
                onChange={(e) => handleChange(index, "startDate", e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded-lg mb-2"
              />
              <input
                type="text"
                placeholder="End Date (e.g. Present)"
                value={exp.endDate}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded-lg mb-2"
              />
            </div>
            <textarea
              placeholder="Description of your work"
              value={exp.description}
              onChange={(e) => handleChange(index, "description", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              rows="3"
              required
            ></textarea>
          </div>
        ))}

        <div className="flex justify-between mt-3">
          <Button
            type="button"
            className="bg-gray-500 text-white hover:bg-gray-600"
            onClick={addExperience}
          >
            + Add Another Experience
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

export default ExperienceForm;
