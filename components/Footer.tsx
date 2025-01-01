import {
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaYoutube,
  FaFacebook,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white mt-12 px-4 py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Logo and Description */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="logo" />
              <h2 className="text-xl font-semibold text-gray-700">Comforty</h2>
            </div>
            <p className="text-gray-500 mt-2">
              Vivamus tristique odio sit amet velit semper, eu posuere turpis
              interdum. Cras egestas purus.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 mt-8">
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <FaPinterest size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-gray-700 font-semibold mb-4">Category</h3>
            <ul className="space-y-2 text-gray-500">
              <li>Sofa</li>
              <li>Armchair</li>
              <li>Wing Chair</li>
              <li>Desk Chair</li>
              <li>Wooden Chair</li>
              <li>Park Bench</li>
            </ul>
          </div>

          {/* Support */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-gray-700 font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-500">
              <li>Help & Support</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Help</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="w-full md:w-1/4">
            <h3 className="text-gray-700 font-semibold mb-4">Newsletter</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
                Subscribe
              </button>
            </div>
            <p className="text-gray-500 mt-2 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              tincidunt erat enim.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
