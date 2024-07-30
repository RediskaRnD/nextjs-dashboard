import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { ReactElement } from 'react';

const InvoiceStatus = ({ status }: { status: string }): ReactElement => (
  <span
    className={clsx(
      'inline-flex items-center rounded-full px-2 py-1 text-xs',
      {
        'bg-gray-100 text-gray-500': status === 'pending',
        'bg-green-500 text-white': status === 'paid'
      }
    )}
  >
    {status === 'pending' ? (
      <>
        Pending
        <ClockIcon className="ml-1 w-4 text-gray-500"/>
      </>
    ) : null}
    {status === 'paid' ? (
      <>
        Paid
        <CheckIcon className="ml-1 w-4 text-white"/>
      </>
    ) : null}
  </span>
);

export { InvoiceStatus };
