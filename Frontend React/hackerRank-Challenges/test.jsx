import React, { useState } from "react";

function EmployeeValidationForm() { 

  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [empid, setEmpid] = useState(""); 
  const [date, setDate] = useState(""); 
  const [submitted, setSubmitted] = useState(false);

const nameRegex = /^[a-zA-Z\s'-]{4,}/

// Double exponent: use braces to clarify
const empidRegex = /^\d{6}$/;


const isNameValid = nameRegex.test(name.trim()); 
const isEmailValid = emailRegex.test(email.trim()); 
const isEmpIdValid = empidRegex.test(empid);

// Validate date: must not be in the future and must be a valid date string const isDateValid = () => { if (!date) return false; let dateNow = new Date('2025-04-11').getTime(); const inputDate = new Date(date); return inputDate <= dateNow;

};

const onSubmit = () => { 
  setSubmitted(true); 
  if (isNameValid && isEmailValid && isEmpIdValid && isDateValid()) { 
    alert("Form submitted successfully!"); 
  } 
};

// Show all errors on initial load useEffect(() => { setSubmitted(true); }, []);

return ( 
 
  
  {/* Email input */}
  <div className="layout-column align-items-start mb-10 w-50" data-testid="input-email">
    <input
      className="w-100"
      type="text"
      name="email"
      value={email}
      placeholder="Email"
      data-testid="input-email-test"
      onChange={(e) => setEmail(e.target.value)}
    />
    {submitted && !isEmailValid && (
      <p className="error mt-2">Email must be a valid email address</p>
    )}
  </div>

  {/* Employee ID input */}
  <div className="layout-column align-items-start mb-10 w-50" data-testid="input-employee-id">
    <input
      className="w-100"
      type="text"
      name="employeeId"
      value={empid}
      placeholder="Employee ID"
      data-testid="input-employee-id-test"
      onChange={(e) => setEmpid(e.target.value)}
    />
    {submitted && !isEmpIdValid && (
      <p className="error mt-2">Employee ID must be exactly 6 digits</p>
    )}
  </div>

  {/* Joining Date input */}
  <div className="layout-column align-items-start mb-10 w-50" data-testid="input-joining-date">
    <input
      className="w-100"
      type="date"
      name="joiningDate"
      value={date}
      placeholder="Joining Date"
      data-testid="input-joining-date-test"
      onChange={(e) => setDate(e.target.value)}
    />
    {submitted &&  !isDateValid()  && (
      <p className="error mt-2" >Joining Date cannot be in the future</p>
    )}
  </div>

  {/* Submit Button */}
  <button
    data-testid="submit-btn"
    type="submit"
    onClick={onSubmit}
    disabled={!name || !email || !empid || !date} >
    Submit
  </button>
</div>
); 

export default EmployeeValidationForm;