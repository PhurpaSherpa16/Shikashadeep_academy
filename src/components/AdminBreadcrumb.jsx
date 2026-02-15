import { useLocation, Link } from "react-router-dom"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

export default function AdminBreadcrumb() {
    const location = useLocation()
    const pathnames = location.pathname.split("/").filter((x) => x)

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/admin" className="flex items-center gap-1">
                            <Home className="size-3.5" />
                            Home
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {pathnames.length > 1 && <BreadcrumbSeparator />}

                {pathnames.slice(1).map((value, index) => {
                    const last = index === pathnames.length - 2
                    const to = `/${pathnames.slice(0, index + 2).join("/")}`
                    const name = value.charAt(0).toUpperCase() + value.slice(1)

                    return (
                        <BreadcrumbItem key={to}>
                            {last ? (
                                <BreadcrumbPage>{name}</BreadcrumbPage>
                            ) : (
                                <>
                                    <BreadcrumbLink asChild>
                                        <Link to={to}>{name}</Link>
                                    </BreadcrumbLink>
                                    <BreadcrumbSeparator />
                                </>
                            )}
                        </BreadcrumbItem>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
