import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import UploadScreen from './screens/UploadScreen';
import ReviewScreen from './screens/ReviewScreen';
import VerifyScreen from './screens/VerifyScreen';
import DashboardScreen from './screens/DashboardScreen';
import AllCasesScreen from './screens/AllCasesScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="upload" element={<UploadScreen />} />
          <Route path="review/:caseId" element={<ReviewScreen />} />
          <Route path="verify/:caseId" element={<VerifyScreen />} />
          <Route path="dashboard" element={<DashboardScreen />} />
          <Route path="cases" element={<AllCasesScreen />} />
          <Route path="pending" element={<AllCasesScreen filterStatus="pending" />} />
          <Route path="reports" element={<AllCasesScreen filterStatus="all" />} />
          <Route path="settings" element={<ProfileScreen />} />
          <Route path="profile" element={<ProfileScreen />} />
        </Route>
      </Routes>
    </Router>
  );
}
