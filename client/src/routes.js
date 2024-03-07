
import Main from './pages/Main'

import RazborkaPage from './pages/razborka'
import ContactsPage from './pages/contacts'
import DetaliPage from './pages/detali'
import RazhodnikiPage from './pages/razhodniki'

import NotFound from './pages/NotFound'

export const routes = [
  {
    path: "/",
    element: <Main />,
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
        path: "razborka",
        element: <RazborkaPage />,
      },
      {
        path: "contacts",
        element: <ContactsPage />,
      },
      {
        path: "detali",
        element: <DetaliPage />,
      },
      {
        path: "razhodniki",
        element: <RazhodnikiPage />,
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
        path: "*",
        element: <NotFound />,
      },

    ]
  },

]
