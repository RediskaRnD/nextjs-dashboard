import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Customers'
};

export default function Page() {
  console.log("customers");
  return <p>Customers Page</p>;
}