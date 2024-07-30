import { QueryArrayConfig, QueryArrayResult } from 'pg';

interface Client {
  query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const getCustomersQuery = `-- name: GetCustomers :many
SELECT id, name, email, image_url FROM customers
LIMIT 2`;

export interface GetCustomersRow {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}

export async function getCustomers(client: Client): Promise<GetCustomersRow[]> {
  const result = await client.query({
    text: getCustomersQuery,
    values: [],
    rowMode: 'array'
  });
  return result.rows.map(row => {
    return {
      id: row[0],
      name: row[1],
      email: row[2],
      imageUrl: row[3]
    };
  });
}

