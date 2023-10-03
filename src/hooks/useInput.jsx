import { useState } from "react";

const useInput = (defaultValue) => {
    const [value , setValue] = useState(defaultValue);
    const handleValue = (event) => setValue(event.target.value);
    return [value, handleValue];
}

export default useInput;