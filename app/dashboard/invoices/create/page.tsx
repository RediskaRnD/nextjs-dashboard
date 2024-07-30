import { Metadata } from 'next';
import { ReactElement } from 'react';

import { fetchCustomers } from '@/app/lib/data';
import { Breadcrumbs } from '@/app/ui/invoices/breadcrumbs';
import { CreateForm } from '@/app/ui/invoices/create-form';

export const metadata: Metadata = {
  title: 'Create Invoice'
};

const Page = async ({ searchParams }: {
  searchParams?: {
    amount?: number;
    status?: 'paid' | 'pending';
  };
}): Promise<ReactElement> => {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true
          }
        ]}
      />
      <CreateForm customers={customers}/>
    </main>
  );
};

export default Page;