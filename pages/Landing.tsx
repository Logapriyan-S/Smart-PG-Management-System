import React, { useState } from "react";
import building from "../assets/building.png";
import dining from "../assets/dining.png";
import singleRoom from "../assets/single.jpeg";
import doubleRoom from "../assets/doublesharing.png";
import tripleRoom from "../assets/triplesharing.jpeg";

// Import your actual local photos here once ready
// import roomSingle from "../assets/room-single.jpg"; 
// import roomTwin from "../assets/room-twin.jpg";
// import roomTriple from "../assets/room-triple.jpg";

interface LandingProps {
  onLoginClick: () => void;
}

const Landing: React.FC<LandingProps> = ({ onLoginClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="bg-[#030614] text-slate-300 font-sans selection:bg-[#D4AF37] selection:text-[#030614] sm:scroll-smooth overflow-x-hidden">
      
      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-xl bg-[#030614]/70 border-b border-white/[0.05] shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-white">
            Sri Sai Balaji <span className="text-[#D4AF37] font-light">PG</span>
          </h1>

          {/* mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <nav className="hidden md:flex gap-10 text-xs font-semibold tracking-widest uppercase text-slate-400">
            <a href="#rooms" className="hover:text-[#D4AF37] transition-colors duration-300">Rooms</a>
            <a href="#food" className="hover:text-[#D4AF37] transition-colors duration-300">Dining</a>
            <a href="#facilities" className="hover:text-[#D4AF37] transition-colors duration-300">Facilities</a>
            <a href="#contact" className="hover:text-[#D4AF37] transition-colors duration-300">Contact</a>
          </nav>

          <button 
            onClick={onLoginClick}
            className="hidden md:block bg-gradient-to-r from-[#E5C07B] via-[#D4AF37] to-[#AA771C] text-[#030614] text-xs font-bold tracking-wider uppercase px-6 py-2.5 rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 active:scale-95"
          >
            Login
          </button>
        </div>

        {/* mobile menu panel */}
        {menuOpen && (
          <div className="md:hidden bg-[#030614]/90">
            <nav className="flex flex-col gap-4 px-6 py-4 text-sm font-semibold uppercase text-slate-400">
              <a href="#rooms" className="hover:text-[#D4AF37] transition-colors duration-300" onClick={()=>setMenuOpen(false)}>Rooms</a>
              <a href="#food" className="hover:text-[#D4AF37] transition-colors duration-300" onClick={()=>setMenuOpen(false)}>Dining</a>
              <a href="#facilities" className="hover:text-[#D4AF37] transition-colors duration-300" onClick={()=>setMenuOpen(false)}>Facilities</a>
              <a href="#contact" className="hover:text-[#D4AF37] transition-colors duration-300" onClick={()=>setMenuOpen(false)}>Contact</a>
              <button 
                onClick={onLoginClick}
                className="mt-2 w-full bg-gradient-to-r from-[#E5C07B] via-[#D4AF37] to-[#AA771C] text-[#030614] text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 active:scale-95"
              >
                Login
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* ================= HERO SECTION (LOCKED) ================= */}
      <section className="relative min-h-[100dvh] flex items-center pt-20 pb-12 overflow-hidden bg-[#030614]">
        
        {/* --- SMOOTH SILK GOLD RIBBONS (Background) --- */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-900/15 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
          {/* golden glitter particles */}
          {[...Array(15)].map((_, i) => (
            <span
              key={i}
              className="absolute bg-[#D4AF37] rounded-full w-1 h-1 opacity-0 animate-ping"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
          
          <svg className="absolute w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="silkGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E5C07B" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#AA771C" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path d="M-100,100 C300,-100 600,600 1540,200" fill="none" stroke="url(#silkGold)" strokeWidth="2" filter="url(#glow)" opacity="0.4" />
            <path d="M-100,150 C400,0 700,750 1540,300" fill="none" stroke="url(#silkGold)" strokeWidth="8" filter="url(#glow)" opacity="0.7" />
            <path d="M-100,200 C500,100 800,900 1540,400" fill="none" stroke="url(#silkGold)" strokeWidth="1" filter="url(#glow)" opacity="0.3" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          
          <div className="lg:col-span-6 flex flex-col justify-center relative z-20 -mt-12 lg:-mt-28">
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="h-[2px] w-12 bg-gradient-to-r from-[#D4AF37] to-transparent"></span>
              <p className="text-xs tracking-[0.3em] font-bold uppercase text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
                Exclusive Gents Residence
              </p>
            </div>

            <h2 className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-white leading-[1.05]">
              Where Comfort<br />
              Meets Convenience.<br />
            </h2>

            <p className="mt-8 text-lg text-slate-400 max-w-lg leading-relaxed font-light relative pl-4">
              {/* golden accent bar */}
              <span className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#D4AF37] to-transparent rounded-full" />
              Thoughtfully designed rooms, rooftop dining, and top-tier facilities<br />
              crafted to give students a peaceful, productive, and premium living experience.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <a href="#rooms" className="bg-gradient-to-r from-[#E5C07B] via-[#D4AF37] to-[#AA771C] text-[#030614] px-8 py-4 rounded-full text-sm font-bold tracking-wide hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300">
                Explore Rooms
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative z-10">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#D4AF37]/40 via-transparent to-[#D4AF37]/10 blur-[2px] transform group-hover:scale-105 transition-all duration-700"></div>
            <div className="relative aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#030614] border border-[#D4AF37]/20 shadow-[0_30px_60px_rgba(0,0,0,0.9)] group">
              <img src={building} alt="Sri Sai Balaji PG" className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-[2s] ease-out opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#030614] via-[#030614]/40 to-transparent w-full sm:w-1/2 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#030614] via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ROOMS SECTION ================= */}
      <section id="rooms" className="py-32 bg-[#050917] relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
           <svg className="absolute w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
             <path d="M-100,700 C400,200 1000,900 1540,100" fill="none" stroke="url(#silkGold)" strokeWidth="1" opacity="0.15" filter="url(#glow)"/>
           </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">Curated Living Spaces</h3>
            <p className="text-slate-400 text-lg font-light">Designed for focus, comfort, and peace of mind.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { type: "Single Suite", price: "18,000", popular: false, img: singleRoom },
              { type: "Twin Sharing", price: "14,000", popular: true, img: doubleRoom },
              { type: "Triple Sharing", price: "12,000", popular: false, img: tripleRoom },
            ].map((room, index) => (
              <div key={index} className={`group relative rounded-[2rem] transition-all duration-500 hover:-translate-y-2 overflow-hidden backdrop-blur-xl flex flex-col ${room.popular ? "bg-[#030614]/80 border border-[#D4AF37]/80 shadow-[0_10px_40px_rgba(212,175,55,0.15)]" : "bg-white/[0.02] border border-white/[0.05] hover:border-[#D4AF37]/40 hover:bg-[#030614]/80 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"}`}>
                <div className="relative h-48 w-full overflow-hidden">
                  <img src={room.img} alt={room.type} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030614] to-transparent"></div>
                </div>
                {room.popular && <div className="absolute top-0 right-0 bg-gradient-to-bl from-[#E5C07B] via-[#D4AF37] to-[#AA771C] text-[#030614] text-[10px] font-bold tracking-widest uppercase px-5 py-2 rounded-bl-2xl shadow-md z-10">Most Popular</div>}
                <div className="p-8 flex-grow flex flex-col">
                  <h4 className="text-xl font-bold tracking-tight text-white mb-2">{room.type}</h4>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-3xl font-extrabold tracking-tighter text-[#D4AF37]">₹{room.price}</span>
                    <span className="text-slate-500 text-sm">/ month</span>
                  </div>
                  <button onClick={onLoginClick} className={`w-full py-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 mt-auto ${room.popular ? "bg-gradient-to-r from-[#E5C07B] via-[#D4AF37] to-[#AA771C] text-[#030614]" : "bg-transparent border border-white/20 text-white group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]"}`}>Inquire Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOD & AMENITIES ================= */}
<section id="food" className="py-32 bg-[#030614]">
  <div className="max-w-7xl mx-auto px-6">
    <div className="bg-white/[0.02] backdrop-blur-xl rounded-[3rem] p-8 sm:p-16 overflow-hidden relative border border-white/[0.05] grid lg:grid-cols-2 gap-16 items-center">
      
      <div className="relative z-10">
        <p className="text-xs tracking-[0.3em] font-bold uppercase text-[#D4AF37] mb-6">
          Culinary Experience
        </p>

        <h3 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
          Elevated Rooftop <br /> Dining.
        </h3>

        <p className="text-slate-400 text-lg font-light leading-relaxed mb-8">
          Nutritious, hygienic, and delicious. Enjoy three carefully prepared meals daily served in our panoramic rooftop lounge.
        </p>

        <button
          onClick={onLoginClick}
          className="text-[#D4AF37] border-b border-[#D4AF37]/50 pb-1 font-semibold tracking-wide hover:border-[#D4AF37] transition-all"
        >
          View Menu →
        </button>
      </div>

      <div className="aspect-video bg-[#050917] rounded-3xl border border-white/5 overflow-hidden relative group">
        <img
          src={dining}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700"
          alt="Dining"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030614]/90 via-transparent to-transparent"></div>
      </div>

    </div>
  </div>
</section>

      {/* ================= FACILITIES (WITH IMAGES) ================= */}
      <section id="facilities" className="py-32 bg-[#050917] relative">
        {/* subtle gold bar above facilities */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-[#D4AF37]/60 via-[#E5C07B]/40 to-[#D4AF37]/60"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4 relative inline-block">
              Premium Facilities
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-6px] block w-24 h-1 bg-gradient-to-r from-[#D4AF37] via-[#E5C07B] to-[#D4AF37] rounded-full"></span>
            </h3>
            <p className="text-slate-400 text-lg font-light max-w-2xl mx-auto">Everything you need for a seamless and comfortable stay.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Washing Machine", img: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=800&auto=format&fit=crop" }, 
              { title: "Hot Water Geyser", img: "data:image/jpeg;base64,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" },
              { title: "Iron Box", img: "data:image/jpeg;base64,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" },
              { title: "Elevator Access", img: "data:image/jpeg;base64,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" },
              { title: "24/7 Power Backup", img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop" },
              { title: "High-Speed Wi-Fi", img: "data:image/png;base64,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" },
            ].map((facility, index) => (
              <div key={index} className="group relative rounded-3xl overflow-hidden aspect-[4/3] border border-white/5 hover:border-[#D4AF37]/50 shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500">
                <img 
                  src={facility.img} 
                  alt={facility.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out opacity-60 group-hover:opacity-90" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030614] via-[#030614]/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-8 h-1 mb-3 bg-gradient-to-r from-[#D4AF37] to-[#AA771C] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h4 className="text-lg md:text-xl font-bold text-white tracking-wide">{facility.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer id="contact" className="bg-[#030614] pt-20 pb-10 border-t border-[#D4AF37]/20 relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h4 className="text-2xl font-bold tracking-[0.2em] uppercase text-white mb-4">
            Sri Sai Balaji <span className="text-[#D4AF37] font-light">PG</span>
          </h4>
          <p className="text-slate-500 font-light max-w-md mx-auto mb-6 text-sm">Premium student living, steps from CHRIST University, Kengeri Campus.</p>
          <div className="mb-6">
            <p className="text-sm">📞 <a href="tel:9875372790" className="hover:text-[#D4AF37]">9875372790</a></p>
            <p className="text-sm">✉️ <a href="mailto:balajipg@gmail.com" className="hover:text-[#D4AF37]">balajipg@gmail.com</a></p>
            <p className="text-sm">📍 <a href="https://www.google.com/maps/search/?api=1&query=Sri+Sai+Balaji+PG+Kanumanikea" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37]">Sri Sai Balaji PG, Kanumanikea</a></p>
          </div>
          <div className="flex justify-center gap-8 text-sm font-semibold uppercase text-slate-400 mb-16">
            <a href="#" className="hover:text-[#D4AF37]">Instagram</a>
            <a href="#" className="hover:text-[#D4AF37]">WhatsApp</a>
          </div>
          <p className="text-xs text-slate-600 font-light tracking-wider uppercase">&copy; {new Date().getFullYear()} SRI SAI BALAJI PG. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;