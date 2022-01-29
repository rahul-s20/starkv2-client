import React, {useEffect} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toaster.css';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router";

let data = [], age_from_uploading_date = 0;
const columns = [
  {
    name: 'Id',
    selector: 'id',
    sortable: true
  },
  {
    name: 'Resume',
    selector: 'name',
    sortable: true
  },
  {
    name: 'Age (Days)',
    selector: 'age',
    sortable: true
  },
  {
    name: 'Date',
    selector: 'date',
    sortable: true
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true
  },
];

export default function ResumeScreeningTable() {
  const [datatable, setDatatable] = React.useState({});
  const [slectedData, setSelectedData] = React.useState([]);
  const [resume_files, setResume_files] = React.useState(null);
  const history = useHistory();

  useEffect(()=>{
    axios.get('http://localhost:5001/api/v1/get_resume_data')
    .then(res=>{
     if(res.data.data.length > 0){
      for(let i=0; i<res.data.data.length; i++){
        if(res.data.data[i].isActive == true){
        age_from_uploading_date = Math.round(Math.abs(new Date() - new Date(res.data.data[i].timestamp))/(1000 * 3600 * 24))
        let dict={
          id: res.data.data[i].id,
          name: res.data.data[i].name,
          age: age_from_uploading_date > 1? age_from_uploading_date :'Less than a day' ,
          date: res.data.data[i].timestamp,
          status: res.data.data[i].is_screened ? 'Yes': 'No'
        }
        data.push(dict)
      }
    }
    }
      var tableData = { columns, data};
      setDatatable(tableData);
    })
    .catch(e=>{
      toast.error(`${e}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'toast-error-container toast-error-container-after'
        });
    })
  }, []);


const handleSelectedRows = (state) => {
    setSelectedData(state.selectedRows)
  };

  const onSubmit = (e) =>{
    e.preventDefault();
    const data = new FormData();
    const configheaders = {
        "Content-Type": `multipart/form-data`,
    };
    for (let i=0; i<resume_files.length; i++){
      data.append('resume_files', resume_files[i], resume_files[i].name)
    }
    axios.post('http://localhost:5001/api/v1/upload_resume', data, {headers : configheaders})
    .then(res=>{
      toast.success(`${res.data.data}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'toast-success-container toast-success-container-after'
        });
      
    })
    .catch(e=> {
      toast.error(`${e}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'toast-error-container toast-error-container-after'
        });
    })
    setResume_files(null)
    
  }

  const onSubmitProfile = (e) =>{
    e.preventDefault();
    const list_of_files = {list_of_files:[]};
    const configheaders = {
        "Content-Type": `application/json`,
    };
    for (let i=0; i<slectedData.length; i++){
      const data = {
        id: slectedData[i].id,
        name: slectedData[i].name
      }
      list_of_files.list_of_files.push(data)
    }
    console.log(list_of_files)
    axios.post('http://localhost:5001/api/v1/analyze_resume', list_of_files, {headers : configheaders})
    .then(res=>{
      history.push({
        pathname:  "/resumeprofile",
        state: {
          response: res.data 
        } 
     });
      // toast.success(`${res.data.data}`, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   className: 'toast-success-container toast-success-container-after'
      //   });
      
    })
    .catch(e=> {
      toast.error(`${e}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'toast-error-container toast-error-container-after'
        });
    })  
  }

  return (
    <div style={{ paddingTop: "12px", margin: "10px" }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div>
        <DataTableExtensions
        {...datatable}
        >
          <DataTable
          noHeader
          defaultSortFieldId="name"
          defaultSortAsc={false}
          pagination
          highlightOnHover
          selectableRows
          onSelectedRowsChange={handleSelectedRows}
          />
        </DataTableExtensions>
      </div>

      <form onSubmit={onSubmit} encType="multipart/form-data" >
        <div style={{ "position": "relative", "overflow": "hidden", "float": "right", "paddingRight": "10px", "paddingLeft": "10px" }}>
          {resume_files != null? <button type="submit" className="btn btn-success">Submit</button> : <button type="submit" className="btn btn-success" disabled>Submit</button>}
        </div>
        <div className='file btn btn-primary' style={{ "position": "relative", "overflow": "hidden", "float": "right", "paddingRight": "10px" }}>
          Upload
          <input type="file" name="file" onChange={(e)=>{setResume_files(e.target.files)}} multiple style={{ "position": "absolute", "opacity": 0, "right": 0, "left": 0 }} />
        </div>
      </form>

      <form onSubmit={onSubmitProfile} >
      <div style={{ "position": "relative", "overflow": "hidden", "float": "right", "paddingRight": "10px", "paddingLeft": "10px" }}>
          {slectedData.length > 0? <button type="submit" className="btn btn-info">Start Analyzing</button> : <button type="submit" className="btn btn-info" disabled>Start Analyzing</button>}
        </div>
      </form>
    </div>
  );
}