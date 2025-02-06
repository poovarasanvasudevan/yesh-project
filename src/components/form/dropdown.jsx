import { useEffect, useRef, useState } from "react";

export const DropDownMenu = ( { render , options }) => {
  const [open, setOpen] = useState(false);
  const container = useRef(null);

  const handleClickOutside = event => {
    if (container.current && !container.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="container" ref={container}>
      <button type="button" className="button" onClick={() => setOpen(!open)}>
        {render}
      </button>

        <div className="bg-black z-20 absolute">
          <ul className="dropdown-menu">
            {options.map((option) => (
              <li key={option.id} className="dropdown-menu__item">{option.label}</li>
            ))}
          </ul>
        </div>

    </div>
  );
};
