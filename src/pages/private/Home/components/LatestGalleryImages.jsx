import { Link } from "react-router-dom";
import { Image, ChevronRight, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Loading from "@/components/Loading";
import NoDataAvailable from "@/components/NoDataAvailable";

export default function LatestGalleryImages({ images, loading }) {
    if (loading) {
        return (
            <Card className="border-gray-100 shadow-sm overflow-hidden min-h-[300px]">
                <CardContent className="p-6 flex items-center justify-center">
                    <Loading container={true} text="Loading gallery..." />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-gray-100 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
            <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-pink-50">
                        <Image className="size-4 text-pink-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">Latest Gallery</h3>
                </div>
                <Link
                    to="/admin/gallery"
                    className="text-xs font-semibold text-pink-600 hover:text-pink-700 flex items-center gap-1 group/link"
                >
                    View Gallery <ArrowRight className="size-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
            </div>
            <CardContent className="p-0">
                {!images?.length ? (
                    <div className="py-12">
                        <NoDataAvailable message="No images yet" link="/admin/gallery/new" linkText="Add Images" height="h-32" />
                    </div>
                ) : (
                    <div className="relative group/carousel">
                        <div className="flex overflow-x-auto gap-4 px-5 no-scrollbar scroll-smooth">
                            {images.map((img) => (
                                <Link key={img.id} to="/admin/gallery" className="shrink-0 min-w-[40px] h-[120px] rounded-2xl overflow-hidden bg-gray-100 group/card relative shadow-sm border border-gray-100/50">
                                    <img src={img.image_url} alt={img.post?.title || "Gallery"} className="h-full w-full object-cover group-hover/card:scale-110 transition-transform duration-500"/>
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <p className="text-white text-xs font-medium truncate">
                                            {img.post?.title || "View Details"}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {/* Shadow indicators for scroll */}
                        <div className="absolute top-0 right-0 h-full w-12 bg-linear-to-l from-white/20 to-transparent pointer-events-none" />
                        <div className="absolute top-0 left-0 h-full w-12 bg-linear-to-r from-white/20 to-transparent pointer-events-none" />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
