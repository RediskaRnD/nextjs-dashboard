import pg from "pg";

const { Pool } = pg;

// pools will use environment variables
// for connection information
export const pool = new Pool();

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export async function sql<T>(sql: string, values: string[] = []): Promise<T[]> {
  const client = await pool.connect();
  try {
    console.log("query:", sql);
    const queryResult = await client.query(sql, values);
    const result = queryResult.rows as T[];
    console.log("result:", result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
}

export async function ssql<T>(sql: string, values: string[] = []): Promise<T> {
  const client = await pool.connect();
  try {
    console.log("query:", sql);
    const queryResult = await client.query(sql, values);
    const result = queryResult.rows[0] as T;
    console.log("result:", result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
}