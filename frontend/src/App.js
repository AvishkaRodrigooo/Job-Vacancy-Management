
import './App.css';
//import './adminhome.css';
//import CounterClass from './components/CounterClass';
//import CounterFunction from './components/CounterFunction';
//import vacancyhome from './pages/vacancyhome';

import { BrowserRouter as Router,Route,Routes, BrowserRouter} from 'react-router-dom'
import Header from './components/Header';
import AddVacancy from './components/AddVacancy';
import Application from './components/Application';
import AllApplicationadmin from './components/AllApplicationadmin';
import Vacanciesdisplay from './components/Vacanciesdisplay';


//import AdminHome from './components/AdminHome';
//import AdminNavbar from './components/AdminNavbar';

function App() {
  return (
    
    <Router>
    <div>
  
    {/*<AdminNavbar />*/}
  
      <Header/>
     <Routes>
     
     
     
     <Route path='/add' exact Component={AddVacancy}/>
     <Route path='/app' exact Component={Application}/>
     <Route path='/students' exact Component={AllApplicationadmin}/>
     <Route path='/az' exact Component={Vacanciesdisplay}/>
     {/*<Route path="/" element={<AdminHome />} />*/}
    
     </Routes>
     
 
     </div>
     </Router>


  );
}

export default App;
 