import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CompanySelection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [companiesData, setCompaniesData] = useState([]);
  const filteredCompanies = companiesData.filter(company =>
    company.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(()=> {
    getUniqueCompanies();
  }, [])
  async function getUniqueCompanies(){
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/dsa/get/companies`);
        setCompaniesData(response.data);
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching companies:", error);
    }
  }

  return (
    <div className="company-selection-container">
      <div className='bg-blue-50 shadow-md text-center p-6 mb-6'>
        <header className="main-header">
        <h1 className='text-4xl text-blue-600 font-bold'>Company-Wise DSA Sheets</h1>
        <p className='text-gray-600 mt-2'>Select a company to start practicing.</p>
      </header>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a company..."
          className="border border-black mt-3 rounded-md p-2 w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      </div>

      {/* Company Grid */}
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
        {filteredCompanies.map((company, id) => (
          // In a real app, this would be a <Link> from react-router-dom
          <div className='bg-gray-100 p-4 rounded-lg shadow-md col-span-1' key={company.name}>
            <Link to={`/sheet/${company.company.toLowerCase()}`} key={id} className="company-card">
            {/* <img src={company.logo} alt={`${company.name} logo`} className="company-logo" /> */}
            <h2 className="company-name">{company.company}</h2>
            <p className="question-count">{company.questionCount} Problems</p>
          </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompanySelection;