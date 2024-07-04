import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function AllApplicationadmin() {
  const [applicants, setApplicants] = useState([]);
  const [approvedApplicants, setApprovedApplicants] = useState([]);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get("http://localhost:8060/applicants")
      .then(response => {
        setApplicants(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching applicants:", error);
      });
  }, []);

  const Deleteapp = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Confirm Reject',
        text: 'Are you sure you want to reject this applicant?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Reject',
        cancelButtonText: 'Cancel'
      });
      if (result.isConfirmed) {
      await axios.delete(`http://localhost:8060/delete/${id}`);
      const updatedApplicants = applicants.filter(applicant => applicant._id !== id);
      setApplicants(updatedApplicants);
      Swal.fire('Success', 'Application rejected!', 'success');
    } }catch (error) {
      console.error("Error deleting applicant:", error);
      Swal.fire('Error', 'Failed to reject application', 'error');
    }
  };

  const approveApplicant = async (id, email) => {
    try {
      const result = await Swal.fire({
        title: 'Confirm Approval',
        text: 'Are you sure you want to approve this applicant?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Approve',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        await axios.post("http://localhost:8060/approve", { id, email });
        await Deleteandapprove(id);
        const approvedApplicant = applicants.find(applicant => applicant._id === id);
        setApprovedApplicants(prevApprovedApplicants => [...prevApprovedApplicants, approvedApplicant]);
        console.log("Applicant approved and deleted successfully!");
        Swal.fire('Success', 'Application approved!', 'success');
      } else {
        console.log("Approval cancelled");
      }
    } catch (error) {
      console.error("Error approving applicant:", error);
      Swal.fire('Error', 'Failed to approve application', 'error');
    }
  };

  const Deleteandapprove = async (id) => {
    try {
      await axios.delete(`http://localhost:8060/delete/${id}`);
      const updatedApplicants = applicants.filter(applicant => applicant._id !== id);
      setApplicants(updatedApplicants);
    } catch (error) {
      console.error("Error deleting applicant:", error);
    }
  };

  const generateReporter = () => {
    const doc = new jsPDF();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    const filteredApplicants = applicants.filter(applicant =>
      applicant.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const salonAddressLines = [
      "E3, Isurupura",
      "Malabe",
      "Sri Lanka",
    ];

    doc.setFontSize(12);
    salonAddressLines.forEach((line, index) => {
      const yPos = 30 + (index * 10);
      doc.text(line, 150, yPos);
    });

    doc.setFontSize(14);
    const titleText = "Application Table";
    const titleWidth = doc.getStringUnitWidth(titleText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    const titleY = 70;
    doc.text(titleText, titleX, titleY);

    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate}`, 10, 280);

    const headers = ["ID", "Name", "Email", "Current City", "Mobile Number", "Age", "Gender","Job Type"];

    const rows = filteredApplicants.map((applicant, index) => [
      index + 1,
      applicant.name,
      applicant.email,
      applicant.address,
      applicant.mobile,
      applicant.age,
      applicant.gender,
      applicant.position
    ]);

    const tableProps = {
      startY: titleY + 20,
      margin: { horizontal: 10 },
      styles: { cellPadding: 5, fontSize: 10, cellWidth: "auto" },
      headStyles: { fillColor: [100, 100, 100], textColor: [255, 255, 255] },
      bodyStyles: { textColor: [0, 0, 0] },
    };

    doc.autoTable(headers, rows, tableProps);
    doc.save("Applicants_report.pdf");
  };

  const applicantCount = applicants.length;//submitted forms applications
  
  const filteredData = applicants.filter((applicant) =>
    applicant.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const applicantDetails = filteredData.map((applicant, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{applicant.name}</td>
      <td>{applicant.email}</td>
      <td>{applicant.address}</td>
      <td>{applicant.mobile}</td>
      <td>{applicant.age}</td>
      <td>{applicant.gender}</td>
      <td>{applicant.position}</td>
      <td>
        <Link to="/students" className="btn btn-success" onClick={() => approveApplicant(applicant._id, applicant.email)}>Approve</Link>
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => Deleteapp(applicant._id)}>Reject</button>
      </td>
    </tr>
  ));

  const approvedApplicantDetails = approvedApplicants.map((applicant, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{applicant.name}</td>
      <td>{applicant.email}</td>
      <td>{applicant.address}</td>
      <td>{applicant.mobile}</td>
      <td>{applicant.age}</td>
      <td>{applicant.gender}</td>
      <td>{applicant.position}</td>
    </tr>
  ));

  return (
    <div className="container mt-5">
      {deleteSuccessMessage && (
        <div className="alert alert-success" role="alert">
          {deleteSuccessMessage}
        </div>
      )}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>Applicants List</h4>
            </div>
            <div className="card-body">
              <div className="search-container">
                <div className="input-group mb-4">
                  <input
                    type="text"
                    className="form-control"
                    style={{ backgroundColor: '#f5eee4' }}
                    placeholder="Search by position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <button className="btn btn-primary mb-3 ml-3" onClick={generateReporter}>Generate PDF</button>
              <p>Total submitted forms: {applicantCount}</p>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Current City</th>
                    <th>Mobile Number</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>position</th>
                    <th>Approve</th>
                    <th>Disapprove</th>
                  </tr>
                </thead>
                <tbody>
                  {applicantDetails}
                </tbody>
              </table>
            </div>
          </div>
          {approvedApplicants.length > 0 && (
            <div className="card mt-4">
              <div className="card-header">
                <h4>Approved Applicants</h4>
              </div>
              <div className="card-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Current City</th>
                      <th>Mobile Number</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedApplicantDetails}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllApplicationadmin;
