import React, { useContext } from 'react'
import { ResumeInfoContext } from '../../Context/ResumeContext';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
function PersonalDetailsForm({enabledNext}) {

  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
  
  function handleInputChange(e){
    enabledNext(false);
    const{name,value} = e.target;
    setResumeInfo({...resumeInfo, [name]: value});
  }
  function onSave(e){
    e.preventDefault();
    enabledNext(true);
  }

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-blue-500 border-t-4 mt-6'>
      <h2 className='font-bold text-lg'>Personal Detail</h2>
      <p className=''>Get Started with basic information</p>
      <form action="" onSubmit={onSave}>
        <div className='grid grid-cols-2 gap-3 mt-4'>
          <div>
            <label htmlFor="">First Name</label>
            <Input name="firstName" required onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="">Last Name</label>
            <Input name="lastName" required onChange={handleInputChange} />
          </div>
          <div className='col-span-2'>
            <label htmlFor="">Job Title</label>
            <Input name="jobTitle" onChange={handleInputChange} />
          </div>
          <div className='col-span-2'>
            <label htmlFor="">Address</label>
            <Input name="address" required onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <Input name="email" required onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="">Phone</label>
            <Input name="phone" required onChange={handleInputChange} />
          </div>
        </div>
        <div className='flex justify-end mt-4'>
          <Button type="submit" className='bg-blue-500 hover:bg-blue-600 cursor-pointer'>Save</Button>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetailsForm