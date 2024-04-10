import React from 'react';
import { FaBook, FaComments, FaGithub } from 'react-icons/fa'; // Importing the GitHub icon along with others

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-6"> {/* Increased padding for a taller navbar */}
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold"> {/* Increased text size */}
          Majestic Coding Chat
        </div>
        <div className="flex gap-4 text-lg"> {/* Increased text size for links */}
          <a href="/" className="hover:text-gray-300 flex items-center">
            <FaBook className="mr-2" />Docs {/* Added icon */}
          </a>
          <a href="/chat" className="hover:text-gray-300 flex items-center">
            <FaComments className="mr-2" />Chat {/* Added icon */}
          </a>
          {/* Adding the GitHub link with an icon */}
          <a href="https://github.com/mattmajestic/huggingface-js" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 flex items-center">
            <FaGithub className="mr-2" />GitHub {/* Added icon */}
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
