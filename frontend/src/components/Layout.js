import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar with mobile toggle props */}
      <Sidebar
        isOpen={isSidebarOpen}
        closeMobile={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with sidebar toggle trigger */}
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
