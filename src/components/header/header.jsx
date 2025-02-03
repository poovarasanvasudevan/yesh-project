import { Button } from 'flowbite-react'
import { IoMdMenu } from "react-icons/io";

const Header = () => {
  return (
    <div className={"flex items-center justify-between p-2 border-b border-neutral-200 shadow-sm"}>
      <Button variant="outlined" color="neutral" size="sm">
        <IoMdMenu />
      </Button>
    </div>
  );
};

export default Header;
