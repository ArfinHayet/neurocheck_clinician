import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Signin/Login";
import SignUp from "../pages/Signup/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";
import RootLayout from "../Layout/Layout";
import Private from "./PrivateRoute";
import Appointments from "../pages/Appointments/Appointments";
import AssessmentList from "../pages/Assessments/AssessmentList";
import AssessmentDetails from "../pages/Assessments/AssessmentDetails";
import InvoiceDetails from "../pages/Invoice/InvoiceDetails";
import Prescription from "../pages/Prescription/Prescription";
import Profile from "../pages/User/Profile";
import SignUpForm from "../components/SignUp/SignUpForm";

export const router = createBrowserRouter([
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUpForm />,
    // element: <SignUp />,
  },
  {
    path: "/",
    element: (
      <Private>
        <RootLayout />
      </Private>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/appointments",
        element: <Appointments /> ,
      },
      {
        path: "/assessments",
        element: <AssessmentList />,
      },
      {
        path: "/assessment/:patientId/:assessmentId",
        element: <AssessmentDetails />,
      },
      {
        path: "/invoice/:assessmentId",
        element: <InvoiceDetails />,

      },
      {
        path: "prescription/:id",
        element: <Prescription />,
      },
      {
        path: "/user",
        element: <Profile />,
      },
      {

      },
      {

      },


      ],
  },
]);
