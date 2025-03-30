// app/lib/data.ts
import {
  invoices,
  customers,
  revenue,
  users,
} from "@/app/lib/placeholder-data";

import { type InvoiceTable } from "@/app/lib/definitions";

export async function fetchCardData() {
  return {
    numberOfCustomers: customers.length,
    numberOfInvoices: invoices.length,
    totalPaidInvoices: invoices.filter((i) => i.status === "paid").length,
    totalPendingInvoices: invoices.filter((i) => i.status === "pending").length,
  };
}

export async function fetchRevenue() {
  return revenue;
}

export async function fetchLatestInvoices() {
  // Get the 5 most recent invoices
  const latestInvoices = invoices
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Enrich with customer data
  return latestInvoices.map((invoice) => {
    const customer = customers.find((c) => c.id === invoice.customer_id);
    return {
      id: invoice.customer_id, // Using customer_id as a temporary ID
      amount: invoice.amount,
      status: invoice.status,
      date: invoice.date,
      name: customer?.name || "Unknown Customer",
      email: customer?.email || "unknown@example.com",
      image_url: customer?.image_url || "/customers/default.png",
    };
  });
}

export async function fetchCustomers() {
  return customers;
}
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
): Promise<InvoiceTable[]> {
  // Explicit return type
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;

  return invoices
    .filter((invoice) => {
      const customer = customers.find((c) => c.id === invoice.customer_id);
      if (!customer) return false; // Skip invoices without customers

      return (
        customer.name.toLowerCase().includes(query.toLowerCase()) ||
        customer.email.toLowerCase().includes(query.toLowerCase()) ||
        invoice.amount.toString().includes(query) ||
        invoice.status.toLowerCase().includes(query.toLowerCase())
      );
    })
    .slice(startIndex, startIndex + itemsPerPage)
    .map((invoice) => {
      const customer = customers.find((c) => c.id === invoice.customer_id)!;
      return {
        id: invoice.customer_id, // or generate unique IDs
        name: customer.name,
        email: customer.email,
        image_url: customer.image_url,
        amount: invoice.amount,
        date: invoice.date,
        status: invoice.status as "pending" | "paid",
      };
    });
}

export async function fetchInvoicesPages(query: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const filteredInvoices = invoices.filter((invoice) => {
    const customer = customers.find((c) => c.id === invoice.customer_id);
    return (
      customer?.name.toLowerCase().includes(query.toLowerCase()) ||
      customer?.email.toLowerCase().includes(query.toLowerCase()) ||
      invoice.amount.toString().includes(query) ||
      invoice.status.toLowerCase().includes(query.toLowerCase())
    );
  });

  // Return pages count (6 items per page)
  return Math.ceil(filteredInvoices.length / 6);
}

export async function fetchFilteredCustomers(query: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return customers
    .filter(
      (customer) =>
        customer.name.toLowerCase().includes(query.toLowerCase()) ||
        customer.email.toLowerCase().includes(query.toLowerCase())
    )
    .map((customer) => ({
      ...customer,
      // Add invoice data for the table (matching tutorial UI)
      total_invoices: invoices.filter((i) => i.customer_id === customer.id)
        .length,
      total_pending: invoices.filter(
        (i) => i.customer_id === customer.id && i.status === "pending"
      ).length,
      total_paid: invoices.filter(
        (i) => i.customer_id === customer.id && i.status === "paid"
      ).length,
    }));
}
