// MainContent.jsx
import { Routes, Route } from 'react-router-dom';
import DashboardContent from './DashboardContent';
import UsersContent from './UsersContent';
import PageList from './PageList';
import MonitorContent from './MonitorContent';
import AnalyticsContent from './AnalyticsContent';
import MessagesContent from './MessagesContent';
import SettingsContent from './SettingsContent';
import EditPage from './CreatePage';
import { Navigate } from 'react-router-dom';
import AddProgramPage from '../../Pages/AddProgram';
import Programme from "./Programme/Programme"
import EditProgramme from "./Programme/EditProgramme"
import ViewProgramme from './Programme/ViewProgramme';
import ViewBlog from './ViewBlog';
import Career from './Career/Career';
import Gallery from './Gallery/Gallery'; 
import EnrolNow from './EnrolNow/EnrolNow';
import ContactPage from './Contact/Contact';
import CreatePage from './CreatePage';
const MainContent = () => {
  return (
    <main className="flex-1 bg-gray-100 overflow-auto">
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardContent />} />
      <Route path="pages" element={<PageList />} />
        <Route path="pages/create" element={<CreatePage />} />
        <Route path="blog" element={<MonitorContent />} />
        <Route path="blog/:slug" element={<ViewBlog />} />
        <Route path="users" element={<UsersContent />} />
        <Route path="analytics" element={<AnalyticsContent />} />
        <Route path="messages" element={<MessagesContent />} />
        <Route path="settings" element={<SettingsContent />} />
        <Route path="add-program" element={<AddProgramPage/>} />
        <Route path="edit-program/:slug" element={<EditProgramme />} />
        <Route path="program/:slug" element={<ViewProgramme />} />
        <Route path="programme" element={<Programme />} />
      <Route path="career" element={<Career />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<ContactPage/>} />
        <Route path="enrol-now" element={<EnrolNow />} />
        <Route path="*" element={<div>Error: Page Not Found</div>} />
      </Routes>
    </main>
  );
};

export default MainContent;