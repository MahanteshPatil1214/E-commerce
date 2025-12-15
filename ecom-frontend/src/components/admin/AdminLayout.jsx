import React, { useState } from 'react'
import Sidebar from '../shared/Sidebar'
import { Outlet } from 'react-router-dom'
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import { RxCross1 } from 'react-icons/rx';
import { FaBars } from 'react-icons/fa';

const AdminLayout = () => {
    let [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50"> 
            {/* Mobile Sidebar Overlay */}
            <Dialog 
                open={sidebarOpen} 
                onClose={() => setSidebarOpen(false)} 
                className="relative z-50 xl:hidden">
        
                <DialogBackdrop 
                    transition
                    className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0" />

                <div className="fixed inset-0 flex">
                    <DialogPanel 
                        transition
                        className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full">
                        
                        <TransitionChild>
                            <div className='absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0'>
                                <button type='button'
                                    onClick={() => setSidebarOpen(false)}
                                    className='-m-2.5 p-2.5'>
                                    <span className='sr-only'> Close Sidebar</span>
                                    <RxCross1 className='text-white text-2xl'/>
                                </button>
                            </div>
                        </TransitionChild>
                        <Sidebar />
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Desktop Sidebar (Fixed) */}
            <div className='hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col'>
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className='xl:pl-72'>
                
                {/* Mobile Sidebar Toggle Button (Visible only on small screens) */}
                <div className='xl:hidden p-4 border-b border-gray-200 bg-white shadow-sm flex items-center justify-between'>
                    <button
                        type='button'
                        onClick={() => setSidebarOpen(true)}
                        className='-m-2.5 text-gray-700 p-2.5'>
                        <span className='sr-only'> Open Sidebar</span>
                        <FaBars className='text-slate-800 text-2xl'/>
                    </button>
                    <span className='font-semibold text-gray-800'>Dashboard</span>
                    <div className='w-8'></div> {/* Spacer for balance */}
                </div>

                {/* Content Outlet */}
                <main className='py-8 bg-gray-50 min-h-screen'>
                    <div className='px-4 sm:px-6 xl:px-8'>
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminLayout;