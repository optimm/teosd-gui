import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RoutesContainer } from './styles';
import {
  AllAppointmentsPage,
  AllUsersPage,
  AppointmentsWithLocatorPage,
  HomePage,
  TowerInfoPage,
  UserInfoPage
} from '@pages/index';
import { SideBar } from '@components/index';

const AllRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <RoutesContainer>
          <SideBar />
          <Routes>
            <Route path='' element={<HomePage />} />
            <Route path='tower-info' element={<TowerInfoPage />} />
            <Route path='all-users' element={<AllUsersPage />} />
            <Route path='user-info' element={<UserInfoPage />} />
            <Route path='all-appointments' element={<AllAppointmentsPage />} />
            <Route path='appointments-with-locator' element={<AppointmentsWithLocatorPage />} />
          </Routes>
        </RoutesContainer>
      </BrowserRouter>
    </>
  );
};

export default AllRoutes;
