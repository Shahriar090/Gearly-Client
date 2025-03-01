import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Language = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>🌐Language</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select Any Language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>English</DropdownMenuItem>
          <DropdownMenuItem>বাংলা (Bengali)</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Language;
