import React, {useEffect} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toaster.css';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

let data = [];
const ExpandedSection = ({data}) => (
  <p className="small mt-2">
    <strong>Skills: </strong>
    {data.skills}
  </p>
); 
const columns = [
  {
    name: 'Id',
    selector: row => row.id,
    sortable: true,
    maxWidth: "10px"
  },
  {
    name: 'Resume',
    selector: row => row.resumeId,
    sortable: true,
    cell: (d)=>{
      let url = `http://localhost:5001/api/v1/get_resume_pdf?resume_name=${d.resumeId}`;
      return(
      <a href={url} target="_blank" className="dlink">{d.resumeId}</a>
    )},
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: true,
    grow: 2
  },
  {
    name: 'Phone no',
    selector: row => row.phone_no,
    sortable: true
  },
  {
    name: 'Domain',
    selector: row => row.domain,
    sortable: true
  },
  // {
  //   name: 'Skills',
  //   selector: row => row.skills,
  //   sortable: false,
  //   wrap: true
  // },
  {
    name: 'Date',
    selector: row => row.date,
    sortable: true
  },
  {
    name: 'Status',
    selector: row => row.status,
    sortable: true
  },
];

export default function ResumeProfileTable() {
  const [datatable, setDatatable] = React.useState({});
  const [slectedData, setSelectedData] = React.useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5001/api/v1/get_resume_analysis_data')
    .then(res=>{
        
     if(res.data.data.length > 0){
      for(let i=0; i<res.data.data.length; i++){
        if(res.data.data[i].is_Active == true){
        let dict={
          id: res.data.data[i].id,
          resumeId: res.data.data[i].resumeId,
          name: res.data.data[i].name,
          email: res.data.data[i].email,
          phone_no: res.data.data[i].phone_no,
          domain: res.data.data[i].domain,
          skills: res.data.data[i].skills,
          date: res.data.data[i].timestamp,
          status: res.data.data[i].is_Active ? 'Active': 'In Active'
        }
        data.push(dict)
      }
      console.log(data)
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
          expandableRows = {true}
          expandableRowsComponent={ExpandedSection}
          expandOnRowClicked = {true}
          expandOnRowDoubleClicked = {false}
          expandableRowsHideExpander = {false}
          dense
          />
        </DataTableExtensions>
      </div>
    </div>
  );
}