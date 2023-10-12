import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex justify-around">
        <li>
          <Link className="text-white hover:text-blue-300 px-4 py-2 transition-colors duration-200" href="/cellars">
              Cellars
          </Link>
        </li>
        <li>
          <Link className="text-white hover:text-blue-300 px-4 py-2 transition-colors duration-200" href="/wines">
              Wines
          </Link>
        </li>
        <li>
          <Link className="text-white hover:text-blue-300 px-4 py-2 transition-colors duration-200" href="/wines">
              Equipment
          </Link>
        </li>
        <li>
          <Link className="text-white hover:text-blue-300 px-4 py-2 transition-colors duration-200" href="/wines">
              PurchaseOrders
          </Link>
        </li>
        <li>
          <Link className="text-white hover:text-blue-300 px-4 py-2 transition-colors duration-200" href="/wines">
              Suppliers
          </Link>
        </li>
        <li>
          <Link className="text-white hover:text-blue-300 px-4 py-2 transition-colors duration-200" href="/wines">
              Regulations
          </Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
