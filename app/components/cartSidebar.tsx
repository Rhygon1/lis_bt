"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "./cartContext";
import { useUser } from "./auth-context";
import CartItem from "./cartItem";
import { sendQuery } from "@/app/(data)/sendQuery";
import { useState, useContext } from "react";
import { CurrencyContext } from "@/app/currencyContext";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/app/components/phone-input";

const formSchema = z.object({
  customerPhone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
});

export default function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen } = useCart();
  const { user, customData } = useUser();
  const [isSendingQuery, setIsSendingQuery] = useState(false);
  const [queryStatus, setQueryStatus] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({
    message: "",
    type: null,
  });
  const [currencyType, _, exchangeRate] = useContext(CurrencyContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerPhone: "+1",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      setQueryStatus({
        message: "Please log in to send a query.",
        type: "error",
      });
      return;
    }
    if (cart.length === 0) {
      setQueryStatus({
        message: "Your wishlist is empty. Add items before sending a query.",
        type: "error",
      });
      return;
    }

    setIsSendingQuery(true);
    setQueryStatus({ message: "", type: null }); // Clear previous status
    try {
      const customerName = customData?.fullName || user.email || "Customer";
      const customerEmail = user.email || "";
      const query = "I would like to inquire about the items in my wishlist.";

      const { success, error, orderId } = await sendQuery({
        customerName,
        customerEmail,
        customerPhone: values.customerPhone,
        query,
        cartItems: cart,
        currencyCode: currencyType,
        exchangeRate,
      });

      if (success) {
        setQueryStatus({
          message: `Your query has been sent successfully! Your Inquiry ID is: ${orderId}`,
          type: "success",
        });
        form.reset(); // Clear the form after successful submission
        // Optionally close sidebar after a delay
        // setTimeout(() => setIsCartOpen(false), 3000);
      } else {
        setQueryStatus({
          message: `Failed to send query: ${error}`,
          type: "error",
        });
      }
    } catch (err) {
      console.error("Error sending query:", err);
      setQueryStatus({
        message: "An unexpected error occurred while sending your query.",
        type: "error",
      });
    } finally {
      setIsSendingQuery(false);
    }
  };

  const getButtonTooltip = () => {
    if (!user) {
      return "Log in to send a query";
    }
    if (cart.length === 0) {
      return "Add items to your wishlist to send a query";
    }
    return "";
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger>
        <Heart className="flex justify-start"></Heart>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0"
      >
        <SheetHeader className="p-6 pb-4">
          <SheetTitle>Wishlist</SheetTitle>
        </SheetHeader>
        {!user && (
          <p className="text-sm bg-yellow-100 text-gray-700 p-3 mx-4 rounded-md mb-4">
            Your cart changes will not be saved unless you log in.
          </p>
        )}
        <div className="flex-1 overflow-y-auto px-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              Your wishlist is empty.
            </p>
          ) : (
            cart.map((item) => (
              <div key={`${item.product.id}${item.size}`} className="mb-4">
                <CartItem
                  product={item.product}
                  size={item.size}
                  quantity={item.quantity}
                />
                <Separator className="my-4" />
              </div>
            ))
          )}
        </div>
        <div className="mt-auto p-6 border-t">
          {queryStatus.message && (
            <div
              className={`p-3 mb-4 rounded-md text-sm ${queryStatus.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {queryStatus.type === "success" ? (
                <>
                  <p>{queryStatus.message}. Please check your email for details.</p>
                  <p>To move forward with your order, please contact us via:</p>
                  <p>
                    <a href="https://wa.me/16892678636" target="_blank" rel="noopener noreferrer" className="underline">
                      +1 (689) 267-8636 (WhatsApp)
                    </a>
                  </p>
                  <p>
                    <a href="tel:+16892678636" className="underline">
                      +1 (689) 267-8636 (Call)
                    </a>
                  </p>
                </>
              ) : (
                <p>{queryStatus.message}</p>
              )}
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        placeholder="Enter your phone number"
                        defaultCountry="US"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full p-4"
                type="submit"
                disabled={
                  !user ||
                  cart.length === 0 ||
                  isSendingQuery ||
                  !form.formState.isValid
                }
                title={getButtonTooltip()}
              >
                {isSendingQuery ? "Sending..." : "Send Query"}
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
