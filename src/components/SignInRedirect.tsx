import React from 'react';
import { useTheme } from "../components/theme_context";
import AuthButton from './AuthButton';

const SignInRedirect = () => {
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-center">
      <div className={`p-4 rounded shadow-md max-w-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <h1 className="text-xl font-bold mb-4">Sign-In Required!</h1>
        <p>This feature is exclusive to PaperHans members only. Please Sign-In to access this feature. Thank You.</p>
        <div className="h-4"></div>
        <div className="flex justify-end">
          <AuthButton></AuthButton>
        </div>
      </div>
    </div>
  )
}

export default SignInRedirect;