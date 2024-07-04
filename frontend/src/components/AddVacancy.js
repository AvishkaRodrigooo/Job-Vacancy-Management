import React,{useEffect, useState} from "react";
import './AddVacancy.css';
import Formtable from "./Formtable";
import { MdClose } from "react-icons/md";
import axios from "axios";
import Swal from 'sweetalert2';
//functinanl component use krnne

axios.defaults.baseURL ="http://localhost:8060/"

export default function AddVacancy(){

    const[ addSection,setAddSection] = useState(false)

    const[editSection,setEditSection] = useState(false)
    
    const[formData,setFormData] = useState({
        position:"",
        salary:"",
        age_limit:"",
        description:"",
        id:""
    });

    const[formDataEdit,setFormDataEdit] = useState({
        position:"",
        salary:"",
        age_limit:"",
        description:"",
        
    });

const[dataList,setDataList] = useState([])
const [successMessage, setSuccessMessage] = useState("");

    const handleOnChange = (e)=>{
        const{value,name} = e.target;
        if (name === 'position') {
            // Check if the value contains only letters and spaces
            const isValid = /^[a-zA-Z\s]*$/.test(value);
            if (!isValid) {
                // If not valid, show an error message
                alert("Position should contain only letters and spaces.");
                return; // Don't update state
            }
        }

        if (name === 'salary') {
            // Check if the value contains only numbers
            const isValid = /^\d*$/.test(value);
            if (!isValid) {
                // If not valid, show an error message
                alert("Salary should contain only numbers.");
                return; // Don't update state
            }
        }

        if (name === 'age_limit') {
            // Check if the value contains only letters and numbers
            const isValid = /^[a-zA-Z0-9\s]*$/.test(value);
            if (!isValid) {
                // If not valid, show an error message
                alert("Age Limit should contain only letters and numbers.");
                return; // Don't update state
            }
        }
       // Remove any non-numeric characters from the input value
       const updatedValue = name === 'salary' ? `Rs. ${value}` : value;

        setFormData((preve) =>({
           
                ...preve,
                [name]: updatedValue
                
        }));
    }


const handleSubmit = async(e)=>{

    e.preventDefault();
    if (!formData.position || !formData.salary || !formData.age_limit || !formData.description) {
        alert("Please fill in all fields.");
        return;
    }
    try{
        const data = await axios.post("/create_salary", formData);
        console.log(data); // Assuming your backend returns some data
        if(data.data.success){
            setAddSection(false)
            setSuccessMessage(data.data.message)
            fetchData();
            // Display "added successfully" as a toast message
            Swal.fire({
                icon: 'success',
                title: 'Vacancy Added Successful',
                text: 'Vacancy has been added successfully.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while updating the Vacancy. Please try again later.");
    }
    }
  /* 
try{
   
        const data = await axios.post("/create_salary", formData);
        console.log(data); // Assuming your backend returns some data
        if(data.data.success){
            setAddSection(false)
            setSuccessMessage(data.data.message)
            fetchData();
        
        } 
}
catch (error) {
    console.error("Error submitting form:", error);
    alert("An error occurred while submitting the form. Please try again later.");
}
}
*/
////////

const fetchData = async () => {
    try {
        const response = await axios.get("/get_data");
        console.log(response.data);
        if (response.data.success) {
            setDataList(response.data.data);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

useEffect(() => {
    fetchData();
}, []);


const handleDelete = async(id)=>{

    const result = await Swal.fire({
        title: 'Confirm delete',
        text: 'Are you sure you want to delete this Vacancy?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        
    });

    // Check if the user clicked the confirm button
    if (result.isConfirmed) {

        try{
        // Proceed with deletion
        const data = await axios.delete("/delete_salary/"+id);
        if (data.data.success) {
            fetchData();
            setSuccessMessage(data.data.message);
              // Display "delete successfully" as a toast message
              Swal.fire({
                icon: 'success',
                title: 'Delete Successful',
                text: 'Vacancy has been deleted successfully.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        }
    }catch (error) {
        console.error("Error deleting data:", error);
        alert("An error occurred while deleting the Vacancy. Please try again later.");
    }
}
}

const handleUpdate = async(e)=>{
    e.preventDefault()
    try{
    const data = await axios.put("/update_salary",formDataEdit)
    if(data.data.success){
        fetchData()
        setSuccessMessage(data.data.message)
        setEditSection(false);
        // Display "updated successfully" as a toast message
        Swal.fire({
            icon: 'success',
            title: 'Update Successful',
            text: 'Vacancy has been updated successfully.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });
    }
} catch (error) {
    console.error("Error updating data:", error);
    alert("An error occurred while updating the Vacancy. Please try again later.");
}
}
    
       


const handleEditOnChange = async(e)=>{
           
    const{value,name} = e.target
    setFormDataEdit((preve) =>({
           
                ...preve,
                [name]: value
            
        }));
}
const handleEdit =(item)=>{
    setFormDataEdit(item)
    setEditSection(true)
}




    return(
        <div className='container'>
            {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
  <button className="btn btn-add" onClick={()=>setAddSection(true)}>Add Vacancy</button>

{
addSection &&(
   //fromtable eke idn data pass wenv
  <Formtable
  handleSubmit={handleSubmit}
  handleOnChange={handleOnChange}
  handleclose={()=>setAddSection(false)}
  readonly={FormData}
  />
)

}


{
    editSection &&(
 //fromtable eke idn data pass wenv
 <Formtable
 handleSubmit={handleUpdate}
 handleOnChange={handleEditOnChange}
 handleclose={()=>setEditSection(false)}
 readonly={formDataEdit}
 />

    )
}

   <div className="tablecontainer">

    <table>
        <thead>
            <tr>
                <th>Position </th>
                <th>Salary</th>
                <th>Age Limit</th>
                <th>Description</th>
                <th>
                
                </th>
            </tr>
        </thead> 
        
        <tbody> {
            dataList[0] ? (
            dataList.map((item)=>{
                return(
                    <tr>
                    <td>{item.position}</td>
                    <td>{item.salary}</td>
                    <td>{item.age_limit}</td>
                    <td>{item.description}</td>
                    <td>
                    <button className="btn btn-edit" onClick={()=>handleEdit(item)}>Edit</button>
                    <button className="btn btn-delete" onClick={()=>handleDelete(item._id)}>delete</button>
                    </td>
                    </tr>
                )

            }))
            :(
                <p style={{textAlign:"center"}}>No data</p>
            )
        }
        </tbody>


    </table>
   </div>
  
        </div>
        
    );
} 

