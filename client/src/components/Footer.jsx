export default function Footer() {
  return (
    <footer className="bg-[#111] text-[#eee] py-[40px] px-[20px] font-sans mt-50">
      <div className="flex flex-wrap justify-between max-w-[1200px] mx-auto">
        <div className="flex-1 min-w-[250px] mx-[10px]">
          <h1 className="text-[2em] text-[#00bcd4]">Tech in the Box</h1>
          <p>Your go-to shop for phones, laptops, and accessories.</p>
          <div className="mt-4">
            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mr-[15px] text-[#eee] font-bold text-[1.4em] transition-all duration-300 hover:text-[#00bcd4]"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mr-[15px] text-[#eee] font-bold text-[1.4em] transition-all duration-300 hover:text-[#00bcd4]"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mr-[15px] text-[#eee] font-bold text-[1.4em] transition-all duration-300 hover:text-[#00bcd4]"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="flex-1 min-w-[250px] mx-[10px]">
          <h3 className="text-[#00bcd4]">Contact Us</h3>
          <p>Email: support@techinthebox.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>

      <div className="text-center mt-[30px] text-[0.9em] text-[#aaa]">
        <p>&copy; 2025 Tech in the Box. All rights reserved.</p>
      </div>
    </footer>
  );
}
