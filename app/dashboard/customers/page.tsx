import { Metadata } from 'next';
import { ReactElement } from 'react';

export const metadata: Metadata = {
  title: 'Customers'
};

const Page = (): ReactElement => {
  console.log('customers');
  return <p>Customers Page</p>;
};

export default Page;
