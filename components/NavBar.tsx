import React from 'react'

function NavBar() {
  return (
    <div>
      <nav className="p-4 text-white">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl">nectar</div>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Services</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
