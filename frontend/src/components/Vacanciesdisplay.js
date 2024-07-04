import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Vacanciesdisplay.css';

import axios from 'axios';

const Vacanciesdisplay = () => {
  const [data, setData] = useState([]);

  const [searchTerm, setSearchTerm] = useState(''); //search 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8060/get_data');
        setData(response.data.data); // Assuming the data array is nested under 'data' key
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleApply = (position) => {
    // Implement your apply logic here, e.g., navigate to apply page, show modal, etc.
    console.log(`Applying for position: ${position}`);
  };

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    item.position.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="photo" style={{ backgroundImage: 'url(./pic.jpg)' }}>
    <div className="container">
        <div className="our">
      <h1>Our Opportunities</h1>
      </div>
      <div className="search-container">
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          style={{ backgroundColor: '#d9beed' }}
          placeholder="Search by position..."
          //aria-label="Search by position"
     // aria-describedby="basic-addon2"//boostrap
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
  </div>
</div>

    
      <div className="row">
      {filteredData.map((item, index) => (
          <div key={index} className="col-md-4 mb-4">
          <div className="card custom-card">
              <div className="card-body">
                <h5 className="card-title">{item.position}</h5>
                <p className="card-text"><strong>Salary:</strong>{item.salary}</p>
                <p className="card-text"><strong>Age Limit:</strong> {item.age_limit}</p>
                <p className="card-text"><strong>Description:</strong> {item.description}</p>

                
                
              </div>
              <Link to="/app">
              <button onClick={() => handleApply(item.position)} className="mm">Apply</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
   
  );
};

export default Vacanciesdisplay;
