import {useEffect, useState} from "react";

export function Loading(props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    let circleCommonClasses = 'h-2.5 w-2.5 bg-current rounded-full bg-blue-900';

    return (
        show &&
        <div className='flex fixed top-0 right-0 bottom-0 left-0 z-50 justify-center items-center w-full h-screen'>
            <div className={`${circleCommonClasses} mr-1 animate-bounce`}/>
            <div className={`${circleCommonClasses} mr-1 animate-bounce200`}/>
            <div className={`${circleCommonClasses} animate-bounce400`}/>
        </div>
    )
}
