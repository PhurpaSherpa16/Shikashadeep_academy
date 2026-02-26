import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Link, useNavigate } from "react-router-dom"
import { useGetAllItemsWithCache } from "../../api/getAllItemsWithCache"


export default function MenuList() {
  const {data} = useGetAllItemsWithCache('blogs')
  const latestBlog = data?.data?.blogs?.slice(0,5)
  const navigate = useNavigate()
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink asChild>
            <Link to="/" className="font-medium">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Admission */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Admissions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-60">
                <NavigationMenuLink asChild>
                  <Link to="/admission" className="flex-row items-center gap-2">
                    Admission Procedure
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link to="/admission#notice" className="flex-row items-center gap-2">
                    Notice
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link to="/admission#application-form" className="flex-row items-center gap-2">
                    Application
                  </Link>
                </NavigationMenuLink>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* 2nd menu item */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Blog & News</NavigationMenuTrigger>

          <NavigationMenuContent>
            <div className="p-3">
              <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground">
                Latest
              </p>

              <ul className="grid gap-2 sm:w-100 md:w-125 md:grid-cols-2 lg:w-150">
                {latestBlog?.map((item, index) => (
                  <ListItem
                    key={index}
                    title={item.title}
                    onClick={()=>{navigate(`/blog/${item.id}`)}}>
                      {item.description}
                  </ListItem> 
                ))}
                <div className="flex items-end justify-end w-full">
                  <ListItem asChild>
                    <Link to="/blog_news">
                      View All Blogs & News
                    </Link>
                  </ListItem>
                </div>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        

        {/* Gallery */}
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink asChild>
            <Link to="/gallery" className="font-medium">Gallery</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* 5th menu item */}
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink asChild>
            <Link to="/career" className="font-medium">Career</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* 5th menu item */}
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink asChild>
            <Link to="/about_us#introduction" className="font-medium">About Us</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink asChild>
            <Link to="/contact" className="font-medium">Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({title,children,href,...props}){
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
