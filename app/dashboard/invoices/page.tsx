'use client';

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    console.log("invoices");
  }, []);

  return <p>Invoices Page</p>;
}