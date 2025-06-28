import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Img,
  Column,
  Row,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import { dataProductType as Product } from "@/app/(data)/getProducts";

interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface QueryInternalTemplateProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  query: string;
  orderId?: string;
  cartItems?: CartItem[];
  totalAmount?: number;
  currencyCode: string;
  exchangeRate: number;
}

function sizeToPrice(size: string, product: Product) {
  if (size.toLowerCase() === "unstitched") {
    return product.unstitchPrice;
  } else if (size.toLowerCase() === "customized") {
    return product.customPrice;
  } else {
    return product.price;
  }
}

const QueryInternalTemplate: React.FC<QueryInternalTemplateProps> = ({
  customerName,
  customerEmail,
  customerPhone,
  query,
  orderId,
  cartItems,
  totalAmount,
  currencyCode = "USD",
  exchangeRate = 1,
}) => {
  const formatCurrency = (size: string, product: Product) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(sizeToPrice(size, product) * exchangeRate);
  };

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white p-8 rounded-lg shadow-md my-10 mx-auto max-w-2xl">
            <Section className="text-center mb-6">
              <Img
                src="https://www.lisboutique.in/logo.png" // Replace with your actual logo URL
                width="120"
                alt="LISBT Logo"
                className="mx-auto mb-4"
              />
              <Text className="text-2xl font-bold text-gray-800">
                New Customer Inquiry Received
              </Text>
            </Section>

            <Section className="mb-6">
              <Text className="text-base text-gray-700 leading-relaxed">
                A new customer inquiry has been submitted. Please review the
                details below and respond promptly.
              </Text>
            </Section>

            <Section className="bg-gray-50 p-6 rounded-lg mb-6">
              <Text className="text-lg font-semibold text-gray-800 mb-4">
                Customer Details:
              </Text>
              <Text className="text-base text-gray-700">
                <strong>Name:</strong> {customerName}
              </Text>
              <Text className="text-base text-gray-700">
                <strong>Email:</strong> {customerEmail}
              </Text>
              <Text className="text-base text-gray-700">
                <strong>Phone:</strong> {customerPhone}
              </Text>
              {orderId && (
                <Text className="text-base text-gray-700">
                  <strong>Order ID:</strong> {orderId}
                </Text>
              )}
              <Text className="text-base text-gray-700 mt-2">
                <strong>Customer Message:</strong>
              </Text>
              <Text className="text-base text-gray-700 italic bg-white p-3 rounded-md border border-gray-200">
                "{query}"
              </Text>
            </Section>

            {cartItems && cartItems.length > 0 && (
              <Section className="mb-6">
                <Text className="text-lg font-semibold text-gray-800 mb-4">
                  Products in Inquiry (if related to an order):
                </Text>
                {cartItems.map((item, index) => (
                  <div
                    key={item.product.id + item.size + index}
                    className="mb-4 p-4 border border-gray-200 rounded-md bg-white"
                  >
                    <Row>
                      <Column className="w-1/4 pr-4">
                        <Img
                          src={item.product.media[0]}
                          width="80"
                          alt={item.product.title}
                          className="rounded-md"
                        />
                      </Column>
                      <Column className="w-3/4">
                        <Text className="text-base font-medium text-gray-800 mb-1">
                          {item.product.title}
                        </Text>
                        <Text className="text-sm text-gray-600 mb-1">
                          Price:{" "}
                          {formatCurrency(
                            item.size, item.product
                          )}
                        </Text>
                        <Text className="text-sm text-gray-600 mb-1">
                          Quantity: {item.quantity}
                        </Text>
                        <Text className="text-sm text-gray-600">
                          Size: {item.size}
                        </Text>
                      </Column>
                    </Row>
                  </div>
                ))}
              </Section>
            )}

            <Hr className="border-gray-300 my-6" />

            <Section className="text-center text-gray-600 text-sm">
              <Text>
                This is an automated notification. Please contact the customer
                at <strong>{customerEmail}</strong> (or by phone if provided in
                the query) to proceed with the order.
              </Text>
              <Text className="mt-4">
                <a
                  href="https://www.lisbt.com/admin"
                  className="text-blue-600 hover:underline"
                >
                  Go to Admin Panel
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default QueryInternalTemplate;
