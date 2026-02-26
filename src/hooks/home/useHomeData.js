import { useCallback, useEffect, useState } from "react";
import { getHomeData } from "../../api/home/getHomeData";

export const useHomeData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getHomeData();
            setData(result);
        } catch (err) {
            setError(err?.message || "Failed to load dashboard");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};
