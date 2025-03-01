import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Currency = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>$ Currency</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select Any Currency</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>BDT</DropdownMenuItem>
          <DropdownMenuItem>USD</DropdownMenuItem>
          <DropdownMenuItem>Euro</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Currency;
