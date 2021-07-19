import { useState, useEffect } from "react";

export function Alert(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    show && (
      <div className="fixed md:bottom-0 md:right-0 md:m-8 w-screen md:w-full sm:max-w-sm z-50 mt-72 ">
        <label className="close cursor-pointer flex items-center justify-center w-full p-2 bg-red-500 md:h-24 h-10 rounded shadow-lg text-white">
          Email e/ou senha inválido(s).
          <button
            className="absolute top-0 right-2 focus:outline-none"
            onClick={props.func}
          >
            X
          </button>
        </label>
      </div>
    )
  );
}
