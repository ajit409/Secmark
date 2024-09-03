import React from "react";

const ShowEmployee = ({ emps }) => {
  return (
    <>
      {emps.map((item, ind) => (
        <tr key={ind}>
          <td>{ind + 1}</td>
          <td>{item.ecode}</td>
          <td>{item.ename}</td>
          <td>{item.emob}</td>
          <td>{item.email}</td>
          <td>{item.addr}</td>
          <td>{item.pan}</td>
          <td>{item.salary}</td>
          <td>{item.joindate}</td>
          <td>{item.designation}</td>
        </tr>
      ))}
    </>
  );
};

export default ShowEmployee;
