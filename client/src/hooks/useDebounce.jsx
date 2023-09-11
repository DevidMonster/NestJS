import { useEffect, useState } from "react";

function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState()

    useEffect(() => {
        const event = setTimeout(() => setDebounceValue(value), delay)

        return () => clearTimeout(event)
    }, [value, delay])

    return debounceValue;
}

export default useDebounce;