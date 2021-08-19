import {useEffect, useState} from "react";

export function Alert(props) {
    const [show, setShow] = useState(false);
    const [color, setColor] = useState("#EF4444")

    useEffect(() => {
        if (props.color === "blue")
            setColor("#3B82F6")
        if (props.color === "yellow")
            setColor("#FBBF24")
        if (props.color === "red")
            setColor("#EF4444")
        setShow(props.show);
    }, [props.color, props.show]);

    if (props.show)
        setTimeout(() => {
            props.func()
        }, 6000)

    return (
        show && (
            <div className="flex justify-center items-center">
                <div
                    className="flex items-center justify-center fixed mt-40 md:w-full md:bottom-0 md:right-0 md:m-8 sm:max-w-sm z-40">
                    <label
                        className="close cursor-pointer flex items-center justify-center w-full p-2 md:h-24 h-18 rounded shadow-lg text-white"
                        style={{backgroundColor: color}}>
                        {props.label}
                        <button
                            className="hidden"
                            onClick={props.func}
                        />
                    </label>
                </div>
            </div>
        )
    );
}
