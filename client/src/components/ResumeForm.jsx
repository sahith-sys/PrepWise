import React, { act, useContext, useState } from 'react'
import PersonalDetailsForm from './formSections/PersonalDetailsForm';
import SummaryForm from './formSections/SummaryForm';
import ExperienceForm from './formSections/ExperienceForm';
import EducationForm from './formSections/EducationForm';
import SkillsForm from './formSections/SkillsForm';
import { ResumeInfoContext } from '../Context/ResumeContext';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { LayoutGrid } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
function ResumeForm() {
  const [activeStep, setActiveStep] = useState(1);
  const[enableNext, setEnableNext] = useState(false);
  return (
    <div className='shadow-lg p-3 md:p-7'>
      <div className='flex justify-between items-center'>
        <Button variant='outline' size='sm' className='flex gap-2'><LayoutGrid /> Theme</Button>
        <div className='flex items-center gap-2'>
          {activeStep > 1 && <Button variant='outline' className='mr-2' onClick={() => setActiveStep(activeStep - 1)}><ArrowLeft /></Button>}
          {activeStep < 5 && <Button className='bg-blue-500 text-white flex gap-2 hover:bg-blue-600' onClick={() => setActiveStep(activeStep + 1)} disabled={!enableNext}>Next <ArrowRight /> </Button>}
        </div>
      </div>
      {/* Personal details form */}
      {activeStep === 1 ? <PersonalDetailsForm enabledNext={(v) => setEnableNext(v)}/> : null}
      {/* Summary form */}
      {activeStep === 2 ? <SummaryForm enabledNext={(v) => setEnableNext(v)} /> : null}

      {/* Experience form */}
      {activeStep === 3 ? <ExperienceForm enabledNext={(v) => setEnableNext(v)} /> : null}

      {/* Education form */}
      {activeStep === 4 ? <EducationForm enabledNext={(v) => setEnableNext(v)} /> : null}

      {/* Skills form */}
      {activeStep === 5 ? <SkillsForm enabledNext={(v) => setEnableNext(v)} /> : null}

    </div>
  )
}

export default ResumeForm