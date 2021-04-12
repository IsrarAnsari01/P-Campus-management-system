import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'
import HomeScreen from '../src/components/homePage/HomeScreen'
import AllJobs from '../src/components/student/AllJobs'
import StudentScreen from '../src/components/student/StudentScreen'
import Profile from './components/student/Profile'
import Login from '../src/components/student/Login'
import Signin from '../src/components/student/Signin'
import CompanyScreen from '../src/components/company/CompanyScreen'
import AddJob from '../src/components/company/AddJob'
import EnrolledCandidate from '../src/components/company/EnrolledCandidate'
import CompanyLoginPage from './components/company/CompanyLoginPage'
import CompanySignIn from './components/company/CompanySignIn'
import CompanyDashBoard from './components/company/CompanyDashBoard'
import Thanks from './components/Thanks'
import AdminLogin from './components/Admin/AdminLogin'
import StudentView from './components/Admin/StudentsView'
import CompanyList from './components/Admin/CompanyList'
import PostedJobsByCompany from './components/Admin/PostedJobsByCompany'
import UpdateUser from './components/student/updateUser'
import UserProfileForCompany from './components/company/UserProfileForCompany'
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* Student Routing */}
        <Route path='/' exact>
          <HomeScreen />
        </Route>
        <Route path='/student'>
          <StudentScreen />
        </Route>
        <Route path='/allJobs'>
          <AllJobs />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/login/:id?'>
          <Login />
        </Route>
        <Route path='/Signin'>
          <Signin />
        </Route>
        <Route path='/updateUser'>
          <UpdateUser />
        </Route>
        {/* Company Routing */}
        <Route path='/companies'>
          <CompanyScreen />
        </Route>
        <Route path='/postjob'>
          <AddJob />
        </Route>
        <Route path='/enrolledStudent'>
          <EnrolledCandidate />
        </Route>
        <Route path='/companyLogIn'>
          <CompanyLoginPage />
        </Route>
        <Route path='/companySignIn'>
          <CompanySignIn />
        </Route>
        <Route path='/companyDashBoard'>
          <CompanyDashBoard />
        </Route>
        <Route path='/candidateProfile'>
          <UserProfileForCompany />
        </Route>
       
        {/* For Conformation Email */}
        <Route path='/thanksUser'>
          <Thanks />
        </Route>
        {/* Admin Routing */}
        <Route path='/admin'>
          <AdminLogin />
        </Route>
        <Route path='/studentview'>
          <StudentView />
        </Route>
        <Route path='/companyList'>
        <CompanyList />
        </Route>
        <Route path='/jobpostedbycompany'>
        <PostedJobsByCompany />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
