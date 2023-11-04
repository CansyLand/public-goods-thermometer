import React, { ReactNode, useEffect } from 'react';
import { Inter } from 'next/font/google';



const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: ReactNode;
}


export default function RootLayout({ children }: RootLayoutProps) {
    return (
      
        <>
        
             <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">Public Goods Thermometer</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                    <li><w3m-button /></li>
                    <li><a>Vote</a></li>
                    <li><a>Wish</a></li>
                    </ul>
                </div>
            </div>
            <div className={inter.className}>{children}</div>

        
        </>
      
    )
  }