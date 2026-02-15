import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { privateNavbarMenuList } from '../constants/privateNavbarMenuList';
import { LogOut, ChevronLeft, ChevronRight, GraduationCap, ChevronDown, UserPen, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLogout } from '../hooks/auth/useLogout';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar"

export default function PrivateSidebar() {
    const navigate = useNavigate()
    const location = useLocation()
    const { state, isMobile } = useSidebar()
    const collapsed = state === "collapsed"
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const profileRef = useRef(null)

    // user info from local storage
    const userString = localStorage.getItem("user")
    const user = userString ? JSON.parse(userString) : null
    const { logout, isLoading } = useLogout()

    // Close profile menu on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <Sidebar collapsible="icon" className="bg-white border-r border-gray-100">
            {/* Header / Logo */}
            <SidebarHeader className="h-20 border-b border-gray-100 flex items-center justify-center overflow-hidden">
                <Link to="/admin" className="flex items-center gap-3 px-4 w-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
                    <div className="flex aspect-square size-12 shrink-0 items-center justify-center rounded-lg">
                        <img src='/logo.svg' alt="logo" className="size-10" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                        <span className="truncate font-serif font-bold text-lg text-(--blueDark)">
                            Shikshadeep
                        </span>
                        <span className="truncate text-xs font-medium text-gray-500">Academy</span>
                    </div>
                </Link>
            </SidebarHeader>

            {/* Navigation Menu */}
            <SidebarContent className="py-2">
                {privateNavbarMenuList.map((group, groupIdx) => (
                    <SidebarGroup key={groupIdx}>
                        <SidebarGroupLabel className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4">
                            {group.group}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    const isActive = location.pathname === item.path || (item.path === '/admin' && location.pathname === '/admin')
                                    return (
                                        <SidebarMenuItem key={item.path}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isActive}
                                                tooltip={item.title}
                                                className={cn(
                                                    "transition-all",
                                                    "group-data-[collapsible=icon]:!size-12 group-data-[collapsible=icon]:justify-center",
                                                    isActive
                                                        ? "bg-(--blueDark) text-white font-bold hover:bg-(--blueDark) hover:text-white"
                                                        : "text-gray-500 hover:bg-gray-50 hover:text-(--blueDark)"
                                                )}
                                            >
                                                <NavLink to={item.path} end={item.path === '/admin'} className="flex items-center gap-3">
                                                    <item.icon className="size-5 shrink-0" />
                                                    <span className="font-medium text-sm group-data-[collapsible=icon]:hidden">{item.title}</span>
                                                </NavLink>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            {/* Footer / User Profile */}
            <SidebarFooter className="p-4 border-t border-gray-100" ref={profileRef}>
                <SidebarMenu>
                    <SidebarMenuItem className="relative">
                        {/* Profile Popup Menu - Manually positioned since we're not using DropdownMenu component yet */}
                        {isProfileOpen && (
                            <div className={cn(
                                "absolute bottom-full mb-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-2 w-64 transition-all duration-300 z-50",
                                collapsed ? "left-0" : "left-0 right-0 w-full"
                            )}>
                                <div className="p-3 mb-2 border-b border-gray-50">
                                    <p className="font-bold text-sm text-(--blueDark)">{user?.first_name} {user?.last_name}</p>
                                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                                </div>

                                <button onClick={() => { navigate('/admin/settings'); setIsProfileOpen(false); }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50
                                    hover:text-(--blueDark) rounded-lg transition-colors text-left"
                                >
                                    <UserPen className="size-4" />
                                    Edit Profile
                                </button>

                                <button onClick={logout}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors text-left">
                                    <LogOut className="size-4" />
                                    Log Out
                                </button>
                            </div>
                        )}

                        <SidebarMenuButton
                            size="lg"
                            className={cn(
                                "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
                                "group-data-[collapsible=icon]:!size-12 group-data-[collapsible=icon]:justify-center",
                                isProfileOpen && "bg-gray-50"
                            )}
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                        >
                            <div className="size-8 rounded-full bg-linear-to-tr from-blue-400 to-indigo-500 flex items-center 
                                    justify-center text-white font-bold text-sm shadow-inner shrink-0 leading-none">
                                {user?.first_name?.[0] || 'A'}
                            </div>

                            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                <span className="truncate font-semibold">{user?.first_name} {user?.last_name}</span>
                                <span className="truncate text-xs capitalize text-gray-400">{user?.role}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}