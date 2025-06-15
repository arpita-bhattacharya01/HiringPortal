import './App.css';
import Home from './Components/Home';  // Home page
import Register from './Components/Register';  // Register page
import Login from './Components/Login';  // Login page
import ForgotPassword from './Components/ForgotPassword';  // Forgot Password page
import Carrier from './Components/Carrier';  // Carrier page
import JobDescription from './Components/JobDescription'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfileCard from './Components/ProfileCard';
import EmployerRegister from './Components/EmployerRegister';
import EmployerHome from "./Components/EmployerHome";
import EmpBasicDetails  from './Components/EmpBasicDetails';
import EmpCompDetails from './Components/EmpCompDetails';
import EmpPgAfterLogin from './Components/EmpPgAfterLogin'
import ChangePassword from "./Components/ChangePassword"
import SendJobsLikeThisModal from './Components/SendJobsLikeThisModal';
import ComingSoonPage from './Components/ComingSoonPage';
import CompanyProfileEdit from './Components/CompanyProfileEdit';
import ReportProblemForm from './Components/ReportProblemForm';
import EmpJobPostingForm from './Components/EmpJobPostingForm';
import EmployerFAQ from './Components/EmployerFAQ';
import AdminDashboard from './Components/AdminDashboard';
import UserDashboard from './Components/UserDashboard';
import UserFAQ from './Components/UserFAQ';
import UserSettings from './Components/UserSettings';
import AdminChangePassword from './Components/AdminChangePassword'
import AdminLogin from './Components/AdminLogin'
import AdminForgetPassword from './Components/AdminForgetPassword'
import SuperAdminDashboardMain from './Components/SuperAdminMain'

function App() {
  return (
   <BrowserRouter basename="/HiringWeb">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />
        <Route path="/carrier" element={<Carrier />} />
        <Route path="/JD" element={<JobDescription />} />
        <Route path='/EmployerLogin' element= {<EmployerHome/>} />
        <Route path='/EmpRegistration' element = {<EmployerRegister/>} />   
        <Route path="/empbasicDetails" element = {<EmpBasicDetails/>} />
        <Route path="/empCompDetails" element = {<EmpCompDetails/>} />
        <Route path='/updateProfile' element = {<ProfileCard/>} />
        <Route path='/empPgAfterLogin' element = {<EmpPgAfterLogin />} />
        <Route path='/sendjobslikethis' element = {<SendJobsLikeThisModal/>} />
        <Route path='/comingsoonpage' element = {<ComingSoonPage/>}  />
        <Route path='/companyprofileedit' element = {<CompanyProfileEdit/>} />
        <Route path='/changepassword' element = {<ChangePassword/>} />
        <Route path='/reportaproblem' element = {<ReportProblemForm/>} />
        <Route path='/postajob' element = {<EmpJobPostingForm/>} />
        <Route path='/employerfaq' element = {<EmployerFAQ/>} />
        <Route path='/admin-dashboard' element = {<AdminDashboard/>}  />
        <Route path='/user-dashboard' element = {<UserDashboard/>} />
        <Route path='/user-faq' element = {<UserFAQ/>} />
        <Route path='/user-settings' element = {<UserSettings/>} />
        <Route path='/admin-change-password' element = {<AdminChangePassword/>} />
        <Route path='adminforgetpassword' element = {<AdminForgetPassword/>} />
        <Route path='admin-login' element = {<AdminLogin/>} />
        <Route path='/superAdmin' element = {<SuperAdminDashboardMain/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;