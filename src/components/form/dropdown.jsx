import { useEffect, useRef, useState } from 'react';
import './dropdown.css'
import Tippy from "@tippyjs/react";

const Dropdown = ({options, render, onChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const tippyRef = useRef();

  const hide = () => setIsOpen(false);

  const handleOptionClick = (option) => {
    hide();
    onChange(option);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      hide()
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menu = (
    <ul className="dropdown-menu">
      {options.map((option, index) => (
        <li key={index} onClick={() => handleOptionClick(option)}>
          {option}
        </li>
      ))}
    </ul>
  )

  return (
    <Tippy
      ref={tippyRef}
      content={menu}
      visible={isOpen}
      onClickOutside={hide}
      allowHTML={true}
      arrow={false}
      appendTo={document.body}
      interactive={true}
      placement="right"
      //moveTransition='transform 0.1s ease-out'
    >
      <button onClick={toggleDropdown}>
        {render}
      </button>
    </Tippy>
  );
};

export default Dropdown;