import React from 'react';
import { Outlet } from 'react-router-dom';
import PrivateSidebar from '../components/PrivateSidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

import AdminBreadcrumb from '../components/AdminBreadcrumb';
import NotificationBell from '../components/NotificationBell';

export default function AdminLayout() {
    return (
        <SidebarProvider>
            <div className="min-h-screen bg-gray-50 flex w-full">
                <PrivateSidebar />

                <SidebarInset className="flex flex-col transition-all duration-300">
                    {/* Dashboard Toolbar / Content Header */}
                    <header className="bg-white border-b border-gray-200 flex items-center px-8 h-20 sticky top-0 z-30 shadow-sm gap-4">
                        <SidebarTrigger />
                        <AdminBreadcrumb />
                        <div className="ml-auto flex items-center gap-4">
                            <NotificationBell />
                            {/* Add more header tools here if needed */}
                        </div>
                    </header>

                    {/* Page Content */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1">
                        <Outlet />
                    </div>

                    {/* Admin Footer */}
                    <footer className="mt-auto py-6 px-8 bg-white border-t border-gray-200 text-center text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Shikshadeep Academy Administration Portal. All rights reserved.
                    </footer>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}