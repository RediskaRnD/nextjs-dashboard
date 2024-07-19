import pg from "pg";

const { Pool, Client } = pg;

// pools will use environment variables
// for connection information
export const pool = new Pool();

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Declare the overload signatures
export async function sql<T>(sql: string): Promise<T[]>;
export async function sql<T>(sql: string, single: boolean): Promise<T>;

// Implement the function
export async function sql<T>(sql: string, single?: boolean): Promise<T[] | T> {
  const client = await pool.connect();
  try {
    console.log("query:", sql);
    const queryResult = await client.query(sql);
    const result = single
      ? queryResult.rows[0] as T
      : queryResult.rows as T[];
    console.log("result:", result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
}
