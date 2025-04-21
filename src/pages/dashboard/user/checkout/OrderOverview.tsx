import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const OrderOverview = () => {
  return (
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
          <TableRow>
            <TableCell>iPhone 16 Pro Max</TableCell>
            <TableCell>2 × $1600</TableCell>
            <TableCell className="text-right">$3200</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Order Summary - aligned with table */}
      <div className="grid grid-cols-3 gap-4 max-w-md ml-auto">
        <div className="col-span-2 text-right">Sub Total:</div>
        <div className="text-right">$3200</div>

        <div className="col-span-2 text-right">Home Delivery:</div>
        <div className="text-right">$30</div>

        <div className="col-span-2 text-right font-bold">Total:</div>
        <div className="text-right font-bold">$3230</div>
      </div>
    </div>
  );
};

export default OrderOverview;
