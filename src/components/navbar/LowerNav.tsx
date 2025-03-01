import { Button } from "../ui/button";
import { Input } from "../ui/input";

const LowerNav = () => {
  return (
    <div className="w-full bg-green-500 h-full md:h-16">
      <div className="items flex flex-col md:flex-row gap-3 md:gap0 justify-between h-full items-center w-full max-w-screen-xl mx-auto bg-black text-white p-4">
        <ul className="flex gap-3 items-center">
          <li>Home</li>
          <li>Specials</li>
          <li>Brads</li>
          <li>Contact</li>
          <li>Blogs</li>
        </ul>
        <form>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Search Products..." />
            <Button type="submit">Search</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LowerNav;
