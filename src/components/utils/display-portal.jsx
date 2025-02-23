import { createPortal } from "react-dom";
import { useEffect } from "react";

export const DisplayPortal = ({children}) => {

  let containerEl = null;
  let externalWindow = null;

  useEffect(() => {
    containerEl = document.createElement('div');
    externalWindow = window.open('', '_blank', 'width=600,height=400,left=200,top=200');
    externalWindow.document.body.appendChild(containerEl);

    return () => {
      externalWindow.close();
    };
  }, []);
  return <> {containerEl ? createPortal(children, containerEl) : <></>} </>;
}