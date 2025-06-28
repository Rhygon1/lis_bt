import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export default function HowToPlaceOrder() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="mb-4">
          LIS BOUTIQUE is a store for Indian ethnic wear, designer suits, dresses, Readymade kurtis and many more.
        </p>
        <p className="mb-4">
          Please visit our Facebook page for latest collection:
        </p>
        <p className="mb-4">
          <a href="https://www.facebook.com/share/1CtAY7hNTM/" className="text-blue-600 hover:underline">LIS BOUTIQUE Facebook Page</a>
        </p>
        <p className="mb-4">
          You can write us at <a href="mailto:Lisboutique06@gmail.com" className="text-blue-600 hover:underline">Lisboutique06@gmail.com</a> if you have any query or click on send message button on our FB page.
        </p>
        <h1 className="text-3xl font-bold mb-4">How to Place an Order</h1>
        <p className="mb-4">
          Here is the process to order:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>You can place your order send message through FB page to book your order. You can also whatsapp us on <a href="https://wa.me/16892678636" className="text-blue-600 hover:underline">+16892678636</a></li>
          <li>Payment can be done via Zelle/Venmo.</li>
          <li>Once payment is received, customer will get a confirmation email.</li>
          <li>Product (pre-order) will be shipped. So, please consider 8-10 days for the product to be dispatched. (If customer opts for the stitching option, this time may slightly increase) and the same will be updated to the customer.</li>
          <li>It will take 3-4 weeks from the date of purchase for delivery.</li>
        </ul>
        <p className="mb-4">
          All ready to ship products will be dispatched from US via UPS; the tracking will be given. Estimated Delivery for ready to ship products will be 3-5 business days.
        </p>
        <p className="mb-4">
          In case of missing or lost parcel, please follow up with the courier company.
        </p>
        <p className="mb-4">
          We try our best to assure that your ordered products are shipped out in the promised time, but if there are any chances of delay in processing due to unavailability of stock, or for any other reason, we’ll send you a formal communication requesting you to either accept a store credit of equivalent value or opt to receive a refund of your money.
        </p>
        <p className="mb-4">
          Once product is dispatched, customer will get a shipping confirmation email.
        </p>
      </main>
      <Footer />
    </>
  );
}

