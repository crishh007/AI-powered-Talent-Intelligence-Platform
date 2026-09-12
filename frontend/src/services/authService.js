import api from './api';
import { MOCK_USER, MOCK_RECRUITER, MOCK_ADMIN, USER_ROLES } from '../utils/constants';

export const authService = {
  login: async (email, password, role = USER_ROLES.STUDENT) => {
    try {
     
      await new Promise((resolve) => setTimeout(resolve, 600));

      let user = MOCK_USER;
      if (role === USER_ROLES.RECRUITER) user = MOCK_RECRUITER;
      if (role === USER_ROLES.ADMIN) user = MOCK_ADMIN;

      
      user = { ...user, email: email || user.email };
      const token = `mock-jwt-token-${role}-${Date.now()}`;

      return {
        success: true,
        user,
        token,
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  },

  register: async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    const role = formData.role || USER_ROLES.STUDENT;
    let newUser = {
      id: `usr-${Date.now()}`,
      name: formData.name || 'New User',
      email: formData.email,
      role: role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      title: role === USER_ROLES.STUDENT ? 'Aspiring Software Developer' : 'Talent Acquisition Partner',
    };

    if (role === USER_ROLES.RECRUITER) {
      newUser.company = formData.companyName || 'Tech Startup';
    }

    return {
      success: true,
      user: newUser,
      token: `mock-jwt-token-${role}-${Date.now()}`,
      message: 'Account created successfully!',
    };
  },

  sendOTP: async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      message: `OTP sent successfully to ${email}. Check code: 123456`,
    };
  },

  verifyOTP: async (email, otp) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (otp === '123456' || otp.length === 6) {
      return { success: true, message: 'OTP verified successfully.' };
    }
    throw new Error('Invalid OTP code. Try entering 123456');
  },

  resetPassword: async (email, newPassword) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { success: true, message: 'Password has been reset successfully. Please login.' };
  },
};
