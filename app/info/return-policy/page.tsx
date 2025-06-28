import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export default function ReturnPolicy() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Returns and Cancellations</h1>
        <p className="mb-4">
          At LIS BOUTIQUE, we strive to make sure that customer has the best experience while selecting and buying Indian ethnic outfits. Despite this there are times when you feel the need to cancel or return the product.
        </p>
        <p className="mb-4">
          Please consider below points for Returns or Cancellation.
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>If payment is not received within 48 hrs of placing the order, your order will be considered as cancelled and the same will be communicated to the customer.</li>
        </ul>
        <p className="mb-4">
          At LIS BOUTIQUE, we take stringent measure to deliver fashion delight to our customers, in the best possible conditions but there’s always a possibility that
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Product may get damaged during transit or</li>
          <li>There may be a manufacturing defect which did not get noticed during packing or</li>
          <li>A wrong item is shipped out to you by mistake.</li>
        </ul>
        <p className="mb-4">
          Please reach out to us within 24hrs of receiving the order for reporting any complaints with regards to product received as damaged or found with manufacturing defect.
        </p>
        <p className="mb-4">
          Please share the product image/video while reporting any damaged/ defective product. Without the image returns will not be entertained.
        </p>
        <p className="mb-4">
          It is mandatory to provide product unboxing video so that in case of any defect/damage, we can resolve the issue. Please cooperate in this as this is online shopping store and without the unboxing video we won’t be able to return the product.
        </p>
        <p className="mb-4">
          Please select size as per your measurement. In each post sizes will be mentioned. We can guide you but ultimately it will be your call to decide the size as without seeing you, we can't suggest any size.
        </p>
        <p className="mb-4">
          No exchange/return possible due to size issue unless wrong size send by us.
        </p>
        <p className="mb-4">
          If you are not sure, you can always go for one size big.
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Please note that returns are only accepted for damaged/defective product and not against customer not liking the product after receiving it. Everybody has different perception about quality and expectations. What some people feel as good quality, the same some may perceive as average. So, It is completely subjective and can not be the reason for return or exchange.</li>
          <li>Product colour may slightly vary due to monitor settings and digital photography and this can not be the reason to return.</li>
          <li>This is an online store. Please place your order once you are completely satisfied with the product details. If you have any query related to the product you are always welcome to contact us before placing the order.</li>
          <li>We do not accept returns if the product is dispatched to us after 7 days of receiving shipment. So, please make sure that you report the matter to us and dispatch the product at the earliest once we accept the return request.</li>
          <li>Please do not ship product before any acknowledgement received from us otherwise we will be unable to process any return without any return authorisation reference.</li>
          <li>Post inspection of returned item, We’ll propose remedial solutions to you. Customer can either choose an alternate product of equal value or a store credit to be used later for shopping at LIS BOUTIQUE or a refund.</li>
        </ul>
        <p className="mb-4">
          Happy Shopping
        </p>
        <p className="mb-4">
          Thanks and Regards
        </p>
        <p className="mb-4">
          LIS BOUTIQUE
        </p>
      </main>
      <Footer />
    </>
  );
}
