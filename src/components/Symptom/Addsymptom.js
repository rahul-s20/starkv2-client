import React from "react";
import axios from "axios";
import '../../App.css';  
import { Button,Modal} from 'react-bootstrap'; 

var result ="";


export class Addsymptom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symptoms: "",
      show:false ,
      result: "",
      
    };
    this.onChangeSymptom = this.onChangeSymptom.bind(this);
    this.onSubmitPost = this.onSubmitPost.bind(this);
  }

  handleModal(){  
    this.setState({show:!this.state.show})  
  }  

  onChangeSymptom(e) {
    this.setState({
        symptoms: e.target.value,
    });
  }
  //   onChangeLat() {
  //     console.log("Lat I am working");
  //     if (sessionStorage.getItem("Latitude >>")) {
  //       this.setState({
  //         lat: sessionStorage.getItem("Latitude >>"),
  //       });
  //     } else {
  //       this.setState({
  //         lat: "0",
  //       });
  //     }
  //   }
  //   onChangeLong() {
  //     console.log("Long I am working");
  //     if (sessionStorage.getItem("Longitude >>")) {
  //       this.setState({
  //         lat: sessionStorage.getItem("Longitude >>"),
  //       });
  //     } else {
  //       this.setState({
  //         long: "0",
  //       });
  //     }
  //   }

  onSubmitPost(e) {
    e.preventDefault();
    let jsonobj = {"symptoms":this.state.symptoms}
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': window.sessionStorage.getItem("itoken")
    }
    axios.post('http://localhost:5001/api/v1/symptom_disease', jsonobj, {headers : headers})
    .then(re =>{
      this.setState({result: re.data.data})
    })
    .catch(er => this.setState({result: `${er}`}))
    this.setState({
      symptoms: "",
      result: ""
     });
  }

  render() {
    return (
      <div>
        <div className="container" style={{ paddingTop: "70px", width: "500px" }}>
        <div className="card" style={{ height: "50%", width: "130%" }}>
            <form onSubmit={this.onSubmitPost} style={{ margin: "10px" }}>
                <div className="form-group has-success">
                <label className="form-control-label" htmlFor="symptoms"><b>Symptoms</b></label>
                <div><small>Add symptoms separated by commaa ( , ). Maximum 17 symptoms are allowed.</small></div>
                <input  type="text"
                        className="form-control"
                        id="symptoms"
                        value={this.state.symptoms}
                        onChange={this.onChangeSymptom}
                        placeholder="Symptoms"
                        required/>
                </div>
                <div style={{ paddingTop:"10px"}}>
                    <Button
                    type="submit"
                    className="btn btn-success btn-lg"
                    data-target="#signup"
                    role="button"
                    onClick={()=>this.handleModal()}
                  >
                    Submit
                  </Button> 
              </div>
                </form>   
                </div>
              
                <div>  
                  <Modal show={this.state.show} onHide={()=>this.handleModal()}>  
                    <Modal.Header closeButton>This is the dieases</Modal.Header>  
                    <Modal.Body>{this.state.result}</Modal.Body>  
                    <Modal.Footer>  
                      <Button onClick={()=>this.handleModal()}>Close</Button>  
                      <Button onClick={()=>this.handleModal()}>Save</Button>  
                    </Modal.Footer>  
                  </Modal>  
                </div>
                </div>
      </div>
    );
  }
}

// export default Addsymptom;