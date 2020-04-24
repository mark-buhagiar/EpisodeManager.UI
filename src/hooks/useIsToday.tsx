import { useEffect, useState } from 'react';

const useIsToday = (date: Date): boolean => {
    const [isToday, setIsToday] = useState(false);

    useEffect(() => {
        const today = new Date();
        setIsToday(
            today.getFullYear() === date.getFullYear() &&
                today.getMonth() === date.getMonth() &&
                today.getDate() === date.getDate(),
        );
    }, [date]);

    return isToday;
};

export default useIsToday;
