import React from 'react'
import { FaWhatsapp } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { FaFacebookF } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-slate-200 py-8'>
      {/* <div className='container mx-auto p-4 '>
        <p className='text-center font-bold' title='Youtube Channel'>This is the footer </p>
      </div> */}

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
    
        <div>
          <h2 className="text-xl font-semibold mb-2">Jando</h2>
          <p className="text-sm text-gray-400">Simple. Fast. Reliable.</p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-500">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-2">Connect</h3>
          <div className="flex space-x-4">
            <a href="https://www.whatsapp.com" className="text-gray-500 hover:text-gray-700 hover:scale-110">
              <FaWhatsapp />
            </a>
            <a href="https://www.x.com" className="text-gray-500 hover:text-gray-700 hover:scale-110">
              <FaXTwitter />
            </a>
                        <a href="https://www.facebook.com" className="text-gray-500 hover:text-gray-700 hover:scale-110">
              <FaFacebookF />
            </a>
                        <a href="https://www.instagtam.com" className="text-gray-500 hover:text-gray-700 hover:scale-110">
              <FaInstagram />
            </a>
            
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
        &copy; {currentYear} Jando. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer