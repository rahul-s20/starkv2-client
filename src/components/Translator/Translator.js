import React from "react";
import axios from "axios";
import '../../App.css';  
import { Button,Modal, Form} from 'react-bootstrap'; 


export class Translator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text_to_be_translated: "",
      destination: "",
      show:false ,
      result: "",
      
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeDest = this.onChangeDest.bind(this);
    this.onSubmitPost = this.onSubmitPost.bind(this);
  }

  handleModal(){  
    this.setState({show:!this.state.show})  
  }  

  onChangeInput(e) {
    this.setState({
        text_to_be_translated: e.target.value,
    });
  }

  onChangeDest(e){
    this.setState({
        destination: e.target.value,
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
    let jsonobj = {"input_text":this.state.text_to_be_translated, "destination": this.state.destination}
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': window.sessionStorage.getItem("itoken")
    }
    axios.post('http://localhost:5001/api/v1/translate', jsonobj, {headers : headers})
    .then(re =>{
        console.log(re)
      this.setState({result: re.data.data.output})
    })
    .catch(er => this.setState({result: `${er}`}))
    this.setState({
        text_to_be_translated: "",
        destination: "",
        result: "",
     });
  }

  render() {
    return (
      <div>
        <div className="container" style={{ paddingTop: "70px", width: "500px" }}>
        <div className="card" style={{ height: "50%", width: "130%" }}>
            <form onSubmit={this.onSubmitPost} style={{ margin: "10px" }}>
                <div className="form-group has-success">
                <label className="form-control-label" htmlFor="translate"><b>Traslate</b></label>
                <div><small>Enter the text to translate to another language, select the language to translate</small></div>
                <input  type="text"
                        className="form-control"
                        id="translate"
                        value={this.state.text_to_be_translated}
                        onChange={this.onChangeInput}
                        placeholder="Text to translate"
                        required/>
                </div>

                <Form.Control
                    as="select"
                    custom
                    onChange={this.onChangeDest}
                    >
                    <option value="en">English</option>
                    <option value="bn">Bengali</option>
                    <option value="hn">Hindi</option>
                </Form.Control>
                
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
                    <Modal.Header closeButton>Traslated answer</Modal.Header>  
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