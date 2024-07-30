'use server';

import { sql, ssql } from './database-service';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable, LatestInvoice,
  LatestInvoiceRaw,
  Revenue
} from './definitions';
import { formatCurrency } from './utils';

type Count = {
  count: string;
}

type PaidPending = {
  paid: string,
  pending: string
}

const fetchRevenue = async (): Promise<Revenue[]> => {
  try {
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>('SELECT * FROM revenue');

    console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
};

const fetchLatestInvoices = async (): Promise<LatestInvoice[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const data = await sql<LatestInvoiceRaw>(`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`);

    console.log('data', data);
    return data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount)
    } as LatestInvoice));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
};

const fetchCardData = async (): Promise<any | void> => {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = ssql<Count>('SELECT COUNT(*) FROM invoices');
    const customerCountPromise = ssql<Count>('SELECT COUNT(*) FROM customers');
    const invoiceStatusPromise = ssql<PaidPending>(`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`);

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise
    ]);

    const numberOfInvoices = parseInt(data[0].count);
    const numberOfCustomers = parseInt(data[1].count);
    const totalPaidInvoices = formatCurrency(data[2].paid);
    const totalPendingInvoices = formatCurrency(data[2].pending);

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
};

const ITEMS_PER_PAGE = 6;

const fetchFilteredInvoices = async (
  query: string,
  currentPage: number
): Promise<InvoicesTable[]> => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    return await sql<InvoicesTable>(`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE '%${query}%' OR
        customers.email ILIKE '%${query}%' OR
        invoices.amount::text ILIKE '%${query}%' OR
        invoices.date::text ILIKE '%${query}%' OR
        invoices.status ILIKE '%${query}%'
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
};

const getTotalInvoicePages = async (query: string): Promise<number> => {
  try {
    const totalItems = await ssql<Count>(`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE '%${query}%' OR
      customers.email ILIKE '%${query}%' OR
      invoices.amount::text ILIKE '%${query}%' OR
      invoices.date::text ILIKE '%${query}%' OR
      invoices.status ILIKE '%${query}%'
  `);
    return Math.ceil((Number(totalItems.count) || 1) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
};

const fetchInvoiceById = async (id: string): Promise<InvoiceForm | null> => {
  try {
    const invoiceForm = await ssql<InvoiceForm>(`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = $1;
    `, [id]);

    return invoiceForm ? {
      ...invoiceForm,
      amount: invoiceForm.amount / 100
    } : null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
};

const fetchCustomers = async (): Promise<CustomerField[]> => {
  try {
    return await sql<CustomerField>(`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
};

const fetchFilteredCustomers = async (query: string): Promise<any> => {
  try {
    const customers = await sql<CustomersTableType>(`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE '%${query}%' OR
      customers.email ILIKE '%${query}%'}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `);

    return customers.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid)
    }));
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
};

export {
  fetchCardData,
  fetchCustomers,
  fetchFilteredCustomers,
  fetchFilteredInvoices,
  fetchInvoiceById,
  fetchLatestInvoices,
  fetchRevenue,
  getTotalInvoicePages
};
