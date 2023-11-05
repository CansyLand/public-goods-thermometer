import React, { ReactNode, useEffect } from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';


const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: ReactNode;
}


export default function RootLayout({ children }: RootLayoutProps) {
    return (
      <>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl" href="/">
              <img src="hot-or-not.png" alt="Public Goods Thermometer" className="w-12 h-auto"/>
              Hot or Not
            </a>
          </div>
          <div className="flex-none flex"> {/* Ensure this div is a flex container and centers its children vertically */}
            <ul className="menu menu-horizontal px-1">
            <li className='p-3'>
                <Link href="/submit-public-good" className="btn btn-accent btn-sm">
                    Add Good
                </Link>
            </li>
              <li><w3m-button /></li>
            </ul>
          </div>
        </div>
        <div className={inter.className}>{children}</div>
      </>
    )
  }
  