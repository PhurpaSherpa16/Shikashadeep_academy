import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"
import {QuickBlogNews} from '../../data/blogNews'

export default function MenuList() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap hidden lg:inline-flex">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-100 lg:w-125 lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                    href="/"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      shadcn/ui
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
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
                {QuickBlogNews.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>



        {/* Admission */}
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink asChild>
            <Link to="/home" className="font-medium">Admission</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Gallery */}
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink asChild>
            <Link to="/home" className="font-medium">Admission</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* 5th menu item */}
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink asChild>
            <Link to="/home" className="font-medium">About Us</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink asChild>
            <Link to="/home" className="font-medium">Contact</Link>
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
