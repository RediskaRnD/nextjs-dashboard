import Link from 'next/link';
import { ReactElement } from 'react';

import { SignupForm } from '@/app/(public)/signup/form';

const Page = (): ReactElement => (
  <div className="flex justify-center">
    <div className="flex flex-col p-4 lg:w-1/3">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-gray-500">Enter your information to get started</p>
      </div>
      <div className="mt-6">
        <SignupForm/>
      </div>
      <div className="mt-6 text-center text-sm">
        Already have an account?{' '}
        <Link className="underline" href="/login">
          Login
        </Link>
      </div>
    </div>
  </div>
);

export default Page;
