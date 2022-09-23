import { FC } from "react";
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';

import Navbar from './Components/Navbar'
import RoadMeasurements from "./pages/RoadMeasurements";
import RoadConditions from "./pages/RoadConditions";
import Altitude from "./pages/Altitude";
import CarData from "./pages/CarData";
import Login from "./pages/Login";

import "./App.css";

const App: FC = () => {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Switch>
                    <Route 
                        exact path="/cardata" 
                        component={CarData} />
                    <Route 
                        exact path="/Roadiesagain" 
                        component={RoadMeasurements} />
                    <Route 
                        exact path="/road_conditions"    
                        component={RoadConditions} />
                    <Route 
                        exact path="/altitude"    
                        component={Altitude}  />
                    <Route 
                        exact path="/login" 
                        component={Login} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
