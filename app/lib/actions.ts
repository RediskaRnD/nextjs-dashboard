'use server';

import { sql } from "@/app/lib/database-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod';
// import { signIn } from '@/app/test/_auth';
import { AuthError } from 'next-auth';
//
// export type FormState = {
//   customerId: string;
//   amount: number;
//   status: "pending" | "paid";
// }

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({ message: "Please select customer." }),
  amount: z.number({ message: "Please enter an amount greater than $0." })
    .positive("Please enter an amount greater than $0")
    .max(2147483647, "The number is to big."),
  status: z.enum(['pending', 'paid'], { message: "Please select an invoice status." }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
  console.log("createInvoice.FormData: ", formData);
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: Math.round(parseFloat(formData.get('amount') as string) * 100),
    status: formData.get('status'),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql(`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES ('${customerId}', ${amount}, '${status}', '${date}')
    `);
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: Math.round(parseFloat(formData.get('amount') as string) * 100),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;

  try {
    await sql(`
      UPDATE invoices
      SET customer_id = '${customerId}', amount = ${amount}, status = '${status}'
      WHERE id = '${id}'
    `);
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');
  try {
    await sql(`DELETE FROM invoices WHERE id = '${id}'`);
  } catch (error) {
    return {
      message: 'Database Error: Failed to delete Invoice.'
    }
  }

  revalidatePath('/dashboard/invoices');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}