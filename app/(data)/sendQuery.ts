'use server'

import { Resend } from 'resend';
import QueryCustomerTemplate from '@/app/components/QueryCustomerTemplate';
import QueryInternalTemplate from '@/app/components/QueryInternalTemplate';
import * as React from 'react';
import { dataProductType as Product } from './getProducts';

interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface SendQueryProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  query: string;
  
  cartItems?: CartItem[];
  currencyCode: string;
  exchangeRate: number
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendQuery({
  customerName,
  customerEmail,
  customerPhone,
  query,
  cartItems,
  currencyCode,
  exchangeRate
}: SendQueryProps) {
  const orderId = Math.floor(100000 + Math.random() * 900000).toString();
  // return { success: true, orderId: orderId };
  try {
    // Send email to customer
    const customerEmailResponse = await resend.emails.send({
      from: 'LIS Boutique <auth@lisboutique.in>', // Replace with your verified Resend domain
      to: customerEmail,
      subject: 'Your Inquiry to LIS Boutique',
      react: React.createElement(QueryCustomerTemplate, {
        customerName,
        customerEmail,
        customerPhone,
        query,
        orderId,
        cartItems,
        currencyCode,
        exchangeRate
      }),
    });

    if (customerEmailResponse.error) {
      console.error('Error sending email to customer:', customerEmailResponse.error);
      return { success: false, error: customerEmailResponse.error.message };
    }

    // Send email to internal team
    const internalEmailResponse = await resend.emails.send({
      from: 'LIS Boutique <auth@lisboutique.in>', // Replace with your verified Resend domain
      to: 'lisboutique06@gmail.com', // Replace with your actual internal email address
      subject: `New Customer Inquiry from ${customerName} (ID: ${orderId || 'N/A'})`,
      react: React.createElement(QueryInternalTemplate, {
        customerName,
        customerEmail,
        customerPhone,
        query,
        orderId,
        cartItems,
        currencyCode,
        exchangeRate
      }),
    });

    if (internalEmailResponse.error) {
      console.error('Error sending email to internal team:', internalEmailResponse.error);
      return { success: false, error: internalEmailResponse.error.message };
    }

    return { success: true, orderId: orderId };
  } catch (error: any) {
    console.error('Failed to send query emails:', error);
    return { success: false, error: error.message };
  }
}
