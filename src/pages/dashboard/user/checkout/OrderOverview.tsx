import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCart } from "@/hooks/useCart";

const OrderOverview = () => {
  const { cart } = useCart();
  const deliveryCharge = cart?.shippingCharge || 0;
  const subTotal = cart?.totalAmount || 0;
  const grandTotal = cart?.grandTotal || 0;
  return (
    <>
      {" "}
      <div className="space-y-4 bg-[var(--color-white)] p-2">
        <h1 className="text-sm text-[var(--color-black)] font-medium flex items-center">
          <span className="bg-[var(--color-blue)] p-2 rounded-full text-[var(--color-text)] mr-2">
            4
          </span>
          Order Overview
        </h1>

        <Table className="border-b-2">
          <TableHeader className="bg-[var(--color-bg-gray)] text-[var(--color-gray)]">
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart?.items?.map((item) => {
              const product =
                typeof item.product === "string" ? null : item.product;

              return (
                <TableRow key={item._id}>
                  <TableCell>{product?.modelName ?? "N/A"}</TableCell>
                  <TableCell>
                    {item.quantity} x ${item.price}
                  </TableCell>
                  <TableCell className="text-right">
                    ${item.totalPrice.toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Order Summary - aligned with table */}
        <div className="grid grid-cols-3 gap-4 max-w-md ml-auto">
          <div className="col-span-2 text-right">Sub Total:</div>
          <div className="text-right">${subTotal.toFixed(2)}</div>

          <div className="col-span-2 text-right">Home Delivery:</div>
          <div className="text-right">${deliveryCharge.toFixed(2)}</div>

          <div className="col-span-2 text-right font-bold">Total:</div>
          <div className="text-right font-bold">${grandTotal.toFixed(2)}</div>
        </div>
      </div>
    </>
  );
};

export default OrderOverview;
