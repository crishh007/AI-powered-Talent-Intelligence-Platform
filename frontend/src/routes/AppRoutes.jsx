import React from 'react';
import { Routes, Route } from 'react-router-dom';


import LandingLayout from '../layouts/LandingLayout';
import DashboardLayout from '../layouts/DashboardLayout';

import LandingPage from '../pages/landing/LandingPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import OTPPage from '../pages/auth/OTPPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';


import StudentDashboardHome from '../pages/student/StudentDashboardHome';
import StudentProfilePage from '../pages/student/StudentProfilePage';
import StudentApplicationsPage from '../pages/student/StudentApplicationsPage';
import SavedOpportunitiesPage from '../pages/student/SavedOpportunitiesPage';
import StudentNotificationsPage from '../pages/student/StudentNotificationsPage';
import StudentSettingsPage from '../pages/student/StudentSettingsPage';


import RecruiterDashboardHome from '../pages/recruiter/RecruiterDashboardHome';
import CompanyProfilePage from '../pages/recruiter/CompanyProfilePage';
import PostOpportunityPage from '../pages/recruiter/PostOpportunityPage';
import ManageOpportunitiesPage from '../pages/recruiter/ManageOpportunitiesPage';
import ApplicantsPage from '../pages/recruiter/ApplicantsPage';
import RecruiterAnalyticsPage from '../pages/recruiter/RecruiterAnalyticsPage';
import RecruiterSettingsPage from '../pages/recruiter/RecruiterSettingsPage';


import AdminDashboardHome from '../pages/admin/AdminDashboardHome';
import ManageStudentsPage from '../pages/admin/ManageStudentsPage';
import ManageRecruitersPage from '../pages/admin/ManageRecruitersPage';
import ManageAdminOpportunitiesPage from '../pages/admin/ManageAdminOpportunitiesPage';
import SystemSettingsPage from '../pages/admin/SystemSettingsPage';

// Opportunities & Assessment Pages
import OpportunitiesPage from '../pages/opportunities/OpportunitiesPage';
import OpportunityDetailPage from '../pages/opportunities/OpportunityDetailPage';
import AssessmentListPage from '../pages/assessment/AssessmentListPage';
import AssessmentRunnerPage from '../pages/assessment/AssessmentRunnerPage';
import AssessmentResultPage from '../pages/assessment/AssessmentResultPage';


import NotFoundPage from '../pages/NotFoundPage';


import ProtectedRoute from './ProtectedRoute';
import { USER_ROLES } from '../utils/constants';

const AppRoutes = () => {
  return (
    <Routes>
      
    
      <Route element={<LandingLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/opportunities" element={<OpportunitiesPage />} />
        <Route path="/opportunities/:id" element={<OpportunityDetailPage />} />
        <Route path="/assessments" element={<AssessmentListPage />} />
        <Route path="/assessments/result/:id" element={<AssessmentResultPage />} />
      </Route>

     
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/auth/otp" element={<OTPPage />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

      
      <Route path="/assessments/runner/:id" element={<AssessmentRunnerPage />} />

      
      <Route element={<ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/student/dashboard" element={<StudentDashboardHome />} />
          <Route path="/student/profile" element={<StudentProfilePage />} />
          <Route path="/student/applications" element={<StudentApplicationsPage />} />
          <Route path="/student/saved" element={<SavedOpportunitiesPage />} />
          <Route path="/student/notifications" element={<StudentNotificationsPage />} />
          <Route path="/student/settings" element={<StudentSettingsPage />} />
        </Route>
      </Route>

     
      <Route element={<ProtectedRoute allowedRoles={[USER_ROLES.RECRUITER]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/recruiter/dashboard" element={<RecruiterDashboardHome />} />
          <Route path="/recruiter/company" element={<CompanyProfilePage />} />
          <Route path="/recruiter/post" element={<PostOpportunityPage />} />
          <Route path="/recruiter/opportunities" element={<ManageOpportunitiesPage />} />
          <Route path="/recruiter/applicants" element={<ApplicantsPage />} />
          <Route path="/recruiter/analytics" element={<RecruiterAnalyticsPage />} />
          <Route path="/recruiter/settings" element={<RecruiterSettingsPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboardHome />} />
          <Route path="/admin/students" element={<ManageStudentsPage />} />
          <Route path="/admin/recruiters" element={<ManageRecruitersPage />} />
          <Route path="/admin/opportunities" element={<ManageAdminOpportunitiesPage />} />
          <Route path="/admin/settings" element={<SystemSettingsPage />} />
        </Route>
      </Route>

      
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
};

export default AppRoutes;
