import API_URL from "../api";

const fetchWithLimit = async (endpoint, limit) => {
    const url = `${API_URL}/${endpoint}?page=1&limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return res.json();
};

export const getHomeData = async () => {
    const [programsRes, admissionsRes, queriesRes, galleryRes, subscriberRes, blogs] = await Promise.allSettled([
        fetchWithLimit("programs", 2),
        fetchWithLimit("admission/applications", 3),
        fetchWithLimit("query", 3),
        fetchWithLimit("gallery/images", 3),
        fetchWithLimit("subscriber", 5),
        fetchWithLimit("blogs", 3),
    ]);

    const programs = programsRes.status === "fulfilled" ? programsRes.value?.data?.programs ?? [] : [];
    const admissions = admissionsRes.status === "fulfilled" ? admissionsRes.value?.data?.result ?? [] : [];
    const queriesData = queriesRes.status === "fulfilled" ? queriesRes.value?.data?.data ?? [] : [];
    const images = galleryRes.status === "fulfilled" ? galleryRes.value?.data?.images ?? [] : [];
    const subscriberData = subscriberRes.status === "fulfilled" ? subscriberRes.value?.data : null;
    const blogsData = blogs.status === "fulfilled" ? blogs.value?.data?.blogs ?? [] : [];

    return {
        programs,
        admissions,
        queries: queriesData,
        galleryImages: images,
        blogs: blogsData,
        totalSubscribers: subscriberData?.totalSubscriber ?? 0,
        totalPrograms: programsRes.status === "fulfilled" ? programsRes.value?.data?.total_items ?? 0 : 0,
        totalAdmissions: admissionsRes.status === "fulfilled" ? admissionsRes.value?.data?.total ?? 0 : 0,
        totalQueries: queriesRes.status === "fulfilled" ? queriesRes.value?.data?.total_items ?? 0 : 0,
        totalImages: galleryRes.status === "fulfilled" ? galleryRes.value?.data?.total_items ?? 0 : 0,
        totalBlogs: blogs.status === "fulfilled" ? blogs.value?.data?.total_items ?? 0 : 0,
    };
};
