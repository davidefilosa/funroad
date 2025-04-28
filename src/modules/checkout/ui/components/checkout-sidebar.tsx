import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { CircleXIcon } from "lucide-react";

interface CheckoutSidebarProps {
  total: number;
  onCheckout?: () => void;
  isCanceled?: boolean;
  isPending?: boolean;
}
export const CheckoutSidebar = ({
  total,
  isCanceled,
  isPending,
  onCheckout,
}: CheckoutSidebarProps) => {
  return (
    <div className="bg-white border rounded-md overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h4 className="text-lg font-medium">Total</h4>
        <p className="text-lg font-medium">{formatPrice(total)}</p>
      </div>
      <div className="p-4 flex items-center justify-center">
        <Button
          className="text-base w-full text-white bg-primary hover:bg-pink-400 hover:text-primary"
          variant={"elevated"}
          disabled={isPending}
          onClick={onCheckout}
          size={"lg"}
        >
          Checkout
        </Button>
      </div>
      {isCanceled && (
        <div className="p-4 flex justify-center items-center border-t">
          <div className="bg-red-100 border-red-400 font-medium px-4 py-3 rounded flex items-center justify-center">
            <div className="flex items-center">
              <CircleXIcon className="size-6 mr-2 fill-red-500 text-red-100" />
              <span className="w-full">Checkout failed. Please try again.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
