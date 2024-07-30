'use client';

// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
import { ReactElement } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { signup } from '@/app/auth/01-auth';

// import React, { startTransition, useActionState } from "react";

export function SignupButton(): ReactElement {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} type="submit" className="mt-2 w-full">
      {pending ? 'Submitting...' : 'Login'}
    </button>
  );
}

export function SignupForm(): ReactElement {
  const [state, action] = useFormState(signup, undefined);

  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" placeholder="John Doe"/>
        </div>
        {state?.errors?.name && (
          <p className="text-sm text-red-500">
            [state.errors.name]
          </p>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" placeholder="john@example.com"/>
        </div>
        {state?.errors?.email && (
          <p className="text-sm text-red-500">[state.errors.email]</p>
        )}
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password"/>
        </div>
        {state?.errors?.password && (
          <div className="text-sm text-red-500">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <SignupButton/>
      </div>
    </form>
  );
}
