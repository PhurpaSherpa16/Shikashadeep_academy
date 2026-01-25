import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"
import { blogs } from '../../data/blogNews'
import {gallery} from '../../data/gallery'


export default function MenuList() {

  const latestBlog = [...blogs].sort((a,b)=>new Date(b.date) - new Date(a.date))
  const latestPhotos = gallery.filter(item => item.highlight).sort((a,b)=>new Date(b.date) - new Date(a.date)).slice(0,4)


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
                {latestBlog.slice(0,5).map((item, index) => (
                  <ListItem
                    key={index}
                    title={item.label}>
                      <Link to={`/blog_news?q=${item.label}`}>
                        {item.description}
                      </Link>
                  </ListItem> 
                ))}
                <div className=" flex items-end justify-end w-full">
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
          <NavigationMenuTrigger>Gallery
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-100 lg:w-125 lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="from-muted/50 to-muted flex h-full w-full flex-col 
                    relative p-0!
                    justify-end rounded-md bg-linear-to-b no-underline outline-hidden 
                    transition-all duration-200 
                    select-none focus:shadow-md border"
                    to="/gallery?q=Culture"
                  >
                    <img src={latestPhotos[0].image} alt="image" className="absolute z-0
                    h-full w-full inset-0 object-center object-cover"/>
                    <div className="relative z-10 p-4 w-full bg-linear-to-t from-black via-50% to-transparent">
                      <h2 className=" mb-2 text-lg text-white font-medium sm:mt-4">
                        {latestPhotos[0].label}
                      </h2>
                      <p className=" text-white/60 text-sm leading-tight">
                        {latestPhotos[0].caption}
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title={latestPhotos[1].label}>
                <Link to="/gallery?q=yoga">
                  {latestPhotos[1].caption}
                </Link>
              </ListItem>
              <ListItem href="/docs/installation" title={latestPhotos[2].label}>
                <Link to="/gallery?q=farewell">
                  {latestPhotos[2].caption}
                </Link>
              </ListItem>
              <div className="flex items-end justify-end">
                  <ListItem asChild>
                    <Link to="/gallery">
                      View All Photos
                    </Link>
                  </ListItem>
              </div>
            </ul>
          </NavigationMenuContent>
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
