import { PlusIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import Link from 'next/link';
import React, { ReactElement, Suspense } from 'react';

import { getTotalInvoicePages } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { Pagination } from '@/app/ui/invoices/pagination';
import { InvoicesTable } from '@/app/ui/invoices/table';
import { Search } from '@/app/ui/search';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';

export const metadata: Metadata = {
  title: 'Invoices'
};

const Page = async ({ searchParams }: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}): Promise<ReactElement> => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getTotalInvoicePages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..."/>
        <CreateInvoice/>
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton/>}>
        <InvoicesTable query={query} currentPage={currentPage}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages}/>
      </div>
    </div>
  );
};

export default Page;
