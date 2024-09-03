import React, { useEffect, useState } from "react";
import "./AddEmployee.css";
import ShowEmployee from "../ShowEmployee/ShowEmployee";

const AddEmployee = () => {
  const getStorageData = () => {
    const data = localStorage.getItem("emps");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  // Main state variable
  const [emps, setEmp] = useState(getStorageData());
  const [ecode, setCode] = useState("");
  const [ename, setEmpName] = useState("");
  const [emob, setEmpMob] = useState("");
  const [email, setEmail] = useState("");
  const [addr, setAddr] = useState("");
  const [pan, setPanNo] = useState("");
  const [salary, setSalary] = useState("");
  const [joindate, setJoinDate] = useState("");
  const [designation, setDesignation] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");

  const validateInput = () => {
    const dupName = emps.some((el) => el.ename === ename);
    if (dupName) {
      alert("no duplicate name allowed");
      return false;
    }

    const dupCode = emps.some((el) => el.ecode === ecode);
    if (dupCode) {
      alert("no duplicate Employee code allowed");
      return false;
    }

    // Validate name
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(ename)) {
      alert("Enter only letters in the Employee name.");
      return false;
    } else if (ename.length < 4) {
      alert("Name must be at least 4 characters long.");
      return false;
    }

    // Validate employee code
    const codePattern = /^[0-9]+$/;
    if (!codePattern.test(ecode)) {
      alert("Employee Code should contain only numbers.");
      return false;
    }

    // Validate mobile number
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(emob)) {
      alert("Mobile number should be exactly 10 digits.");
      return false;
    }

    // Validate email
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailPattern.test(email)) {
      alert("Invalid email format.");
      return false;
    }

    // Check for empty fields
     if (!ecode || !ename || !emob || !email || !addr || !pan || !salary || !joindate || !designation) {
        alert("All fields are required.");
        return false;
      }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }

    let emp = {
      ecode,
      ename,
      emob,
      email,
      addr,
      pan,
      salary,
      joindate,
      designation,
    };
    setEmp([...emps, emp]);

    // Reset form fields
    setCode("");
    setEmpName("");
    setEmpMob("");
    setEmail("");
    setAddr("");
    setPanNo("");
    setSalary("");
    setJoinDate("");
    setDesignation("");
  };

  useEffect(() => {
    localStorage.setItem("emps", JSON.stringify(emps));
  }, [emps]);

  const filteredEmps = emps.filter((emp) =>
    emp.ename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEmps = filteredEmps.sort((a, b) => {
    if (sortType === "name") {
      return a.ename.localeCompare(b.ename);
    } else if (sortType === "salary") {
      return parseFloat(a.salary) - parseFloat(b.salary);
    }
    return 0;
  });

  return (
    <div>
      <div className="wrapper">
        <h1>Add Employee Here</h1>

        <div className="main">
          <div className="form-container">
            <form onSubmit={handleSubmit} className="form-group">
              <div className="form-group">
                <label>Employee Code</label>
                <input
                  type="text"
                  value={ecode}
                  onChange={(e) => setCode(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Employee Name</label>
                <input
                  type="text"
                  value={ename}
                  onChange={(e) => setEmpName(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Employee Mobile</label>
                <input
                  type="text"
                  value={emob}
                  onChange={(e) => setEmpMob(e.target.value)}
                  className="form-control"
                  maxLength={10}
                />
              </div>

              <div className="form-group">
                <label>Employee Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Employee Address</label>
                <input
                  type="text"
                  value={addr}
                  onChange={(e) => setAddr(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Employee Pan Number</label>
                <input
                  type="text"
                  value={pan}
                  onChange={(e) => setPanNo(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Employee Salary</label>
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Joining Date</label>
                <input
                  type="date"
                  value={joindate}
                  onChange={(e) => setJoinDate(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Employee Designation</label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="form-control"
                />
              </div>
              <br />
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>

          <div className="view-container">
            <div className="search-sort-container">
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
              /><br></br>

              <select
                onChange={(e) => setSortType(e.target.value)}
                className="form-control"
              >
                <option value="">Sort By</option>
                <option value="name">Name</option>
                <option value="salary">Salary</option>
              </select>
            </div>
            <table className="table mt-4">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Emp Code</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Pan no</th>
                  <th>Salary</th>
                  <th>Joining Date</th>
                  <th>Designation</th>
                </tr>
              </thead>
              <tbody>
                <ShowEmployee emps={sortedEmps} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
