import React from 'react';
import Button from '../../../components/ui/Button';


const SSOButton = () => {
  const handleSSOLogin = () => {
    console.log('SSO authentication initiated');
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="mt-6">
        <Button
          variant="outline"
          fullWidth
          onClick={handleSSOLogin}
          iconName="Building2"
          iconPosition="left"
        >
          Sign in with SSO
        </Button>
      </div>
    </div>
  );
};

export default SSOButton;