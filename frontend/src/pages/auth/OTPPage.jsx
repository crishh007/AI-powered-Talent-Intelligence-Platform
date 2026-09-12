import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useNotification } from '../../context/NotificationContext';
import { Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

const OTPPage = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'alex@example.com';

  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [loading, setLoading] = useState(false);
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    setLoading(true);
    try {
      await authService.verifyOTP(email, code);
      addToast('OTP verified! Please set your new password.', 'success');
      navigate(`/auth/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err) {
      addToast(err.message || 'Invalid OTP', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Verify OTP Code</h2>
          <p className="text-xs text-gray-500">Enter the 6-digit code sent to <strong>{email}</strong></p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-input-${i}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                className="w-12 h-14 text-center text-xl font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-bold text-white gradient-btn shadow-md flex items-center justify-center gap-2"
          >
            {loading ? 'Verifying...' : 'Verify & Continue'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Didn't receive code?{' '}
            <button
              onClick={() => authService.sendOTP(email).then((r) => addToast(r.message, 'info'))}
              className="font-bold text-brand-600 hover:underline"
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
