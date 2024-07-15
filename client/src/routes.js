

import WrapPage from './pages/WrapPage'
import { Navigate } from 'react-router-dom'

import MainPage from './pages/main'
import RazborkaPage from './pages/razborka'
import ContactsPage from './pages/contacts'
import DetaliPage from './pages/detali'
import AboutPage from './pages/about'

import NotFound from './pages/NotFound'

export const routes = [
  {
    path: "/",
    element: <WrapPage />,
    children: [
      // {
      //   path: "private",
      //   element: <PrivateWrap />,
      //   children: [
      //     {
      //       path: "about",
      //       element: <AboutUs />,
      //     }
      //   ]
      // },
      {
        path: "main",
        element: <MainPage />,
      },
      {
        path: "razborka",
        element: <RazborkaPage />,
      },
      {
        path: "detali",
        element: <DetaliPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contacts",
        element: <ContactsPage />,
      },
      // {
      //   path: "profile/kyc",
      //   element: <KYCPage />,
      //   children: [
      //     {
      //       path: "step1",
      //       element: <KYCStep1 />,
      //     },
      //     {
      //       path: "step2",
      //       element: <KYCStep2 />,
      //     },
      //   ]
      // },
      {
        path: "",
        element: <Navigate to="/main" replace />,
      },
      {
        path: "*",
        element: <NotFound />,
      },

    ]
  },

]
