const Navbar = () => {
    return (
      <nav className="bg-base-200 p-7 flex items-center justify-between shadow-lg h-24">
        {/* Logo / Company Name */}
        <div className="text-4xl text-primary">HandyGo</div>
  
        {/* Navigation Links */}
        <div className="flex gap-12 text-xl">
          {["Home", "Notifications", "Profile", "Help"].map((item, index) => (
            <a
              key={index}
              href="#"
              className="hover:text-primary transition-all duration-300 relative after:content-[''] after:block after:w-full after:h-[1.5px] after:bg-primary after:scale-x-0 after:transition-transform after:duration-500 hover:after:scale-x-100"
            >
              {item}
            </a>
          ))}
        </div>
  
        {/* Logout Button */}
        <button className="btn btn-error btn-md px-6 text-lg">Logout</button>
      </nav>
    );
  };
  
  export default Navbar;