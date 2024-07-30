import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { ReactElement } from 'react';

import googleLogo from '@/public/google_logo.svg';

const GoogleSignInButton = (): ReactElement => {
  const handleClick = () => {
    console.log('click');
    signIn('google').then((result) => {
      console.log('result: ', result);
    });
    // console.log(q);
    // console.log(q);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-center h-12 px-6 mt-4 text-xl
      transition-colors duration-300 bg-white border border-gray-200 text-gray-600
      rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <Image src={googleLogo} alt="Google Logo" width={40} height={40}/>
      <span className="ml-1">Sign in with Google</span>
    </button>
  );
};

export { GoogleSignInButton };
