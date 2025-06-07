import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MemberService from '../services/MemberService';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';

const ListMemberComponent = () => {
  const [members, setMembers] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    getAllMembers();
  }, []);

  const getAllMembers = () => {
    MemberService.getAllMembers()
      .then(response => setMembers(response.data))
      .catch(error => console.error(error));
  };

  const deleteMember = (memberId) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      MemberService.deleteMember(memberId)
        .then(() => getAllMembers())
        .catch(error => console.error(error));
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(members);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Members');
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, 'members.xlsx');
  };

  const exportToPDF = () => {
    html2canvas(document.querySelector("table")).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("members.pdf");
    });
  };

  return (
    <div className="container">
      <h2 className="text-center">List Members</h2>

      {role === "ADMIN" && (
        <Link to="/add-member" className="btn btn-primary mb-2">Add Member</Link>
      )}

      <div className="mb-3 d-flex gap-2">
        <button className="btn btn-success" onClick={exportToExcel}>Export to Excel</button>
        <button className="btn btn-danger" onClick={exportToPDF}>Export to PDF</button>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Member Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Id</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Spiritual Father</th>
            <th>Date Registered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.firstName}</td>
              <td>{member.lastName}</td>
              <td>{member.emailId}</td>
              <td>{member.phoneNumber}</td>
              <td>{member.address}</td>
              <td>{member.spritualFather}</td>
              <td>{member.dateRegistered}</td>
              <td>
                <div className="d-flex justify-content-center gap-2">
                  {role === "ADMIN" ? (
                    <>
                      <Link className="btn btn-info" to={`/edit-member/${member.id}`}>Update</Link>
                      <button className="btn btn-danger" onClick={() => deleteMember(member.id)}>Delete</button>
                    </>
                  ) : (
                    <span className="text-muted">Read-only</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListMemberComponent;
