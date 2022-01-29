import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import { Home } from './components/Home/Home';
import {Addsymptom} from './components/Symptom/Addsymptom';
import Navbar from './components/Navbar/Navbar';
import Signin from './components/Auth/Signin';
import ProtectedRoute from './services/Protectedroute';
import { Translator } from './components/Translator/Translator';
import ResumeScreeningTable from './components/ResumeScreening/ResumeScreeningTable';
import ResumeProfileTable from './components/ResumeScreening/ResumeProfileTable';




function App() {
  return (
    
    <div className="App">
      <Navbar/>
      <Router>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/dieases_detection" component={Addsymptom}/>
          <Route path="/translate" component={Translator}/>
          <Route path="/translate" component={Translator}/>
          <Route path="/resumescreening" component={ResumeScreeningTable}/>
          <Route path="/resumeprofile" component={ResumeProfileTable}/>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
