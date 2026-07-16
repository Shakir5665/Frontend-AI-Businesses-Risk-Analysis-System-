import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Star, ShoppingBag, Globe2, Package, Truck, Store, LayoutGrid } from "lucide-react";

const leftIntegrations = [
  { id: "daraz",    name: "Daraz",    description: "South Asia's #1 marketplace",    icon: ShoppingBag, color: "#FF6B35" },
  { id: "amazon",   name: "Amazon",   description: "Global e-commerce leader",        icon: Package,     color: "#FF9900" },
  { id: "ebay",     name: "eBay",     description: "Online auction platform",         icon: Globe2,      color: "#0064D2" },
  { id: "shopify",  name: "Shopify",  description: "Direct-to-consumer stores",       icon: Store,       color: "#96BF48" },
];

const rightIntegrations = [
  { id: "etsy",        name: "Etsy",        description: "Handmade & unique goods",      icon: Package,     color: "#F1641E" },
  { id: "aliexpress",  name: "AliExpress",  description: "Global wholesale platform",    icon: Truck,       color: "#E62117" },
  { id: "flipkart",    name: "Flipkart",    description: "India's top marketplace",      icon: ShoppingBag, color: "#2874F0" },
  { id: "woocommerce", name: "WooCommerce", description: "WordPress store builder",      icon: LayoutGrid,  color: "#7F54B3" },
];

const topValues = { 0: "0px", 1: "96px", 2: "192px", 3: "288px" };

function IntegrationCard({ item, idx, direction, isLargeScreen }) {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: direction === "left" ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
      viewport={{ once: true }}
      className={"w-[240px] sm:w-[260px] lg:w-[280px] h-[72px] lg:h-[80px] bg-white rounded-[16px] lg:rounded-[20px] p-3 lg:p-[16px] flex items-center gap-3 lg:gap-4 shadow-[0_4px_20px_rgba(4,39,24,0.02)] group hover:shadow-[0_12px_40px_rgba(4,39,24,0.06)] transition-all cursor-default border border-black/[0.02] lg:absolute"}
      style={{ top: isLargeScreen ? topValues[idx] : undefined }}
    >
      <div className="w-[48px] h-[48px] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
        style={{ background: item.color + "15" }}>
        <item.icon className="w-6 h-6" style={{ color: item.color }} />
      </div>
      <div className="flex flex-col">
        <span className="text-[#042718] font-semibold text-[14px] lg:text-[16px] leading-tight">{item.name}</span>
        <span className="text-[#042718]/40 text-[12px] lg:text-[13px] font-sans mt-0.5">{item.description}</span>
      </div>
    </motion.div>
  );
}

export default function IntegrationSection({ className }) {
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
      setWindowWidth(window.innerWidth);
    }, 0);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => { clearTimeout(timer); window.removeEventListener("resize", handleResize); };
  }, []);

  const isLargeScreen = isMounted && windowWidth >= 1024;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&display=swap" rel="stylesheet" crossOrigin="anonymous" />

      <section className={"w-full bg-[#F4FAFB] py-16 md:py-[100px] overflow-hidden relative flex justify-center " + (className || "")}>
        <div className="w-full max-w-[1440px] px-6 lg:px-[96px]">
          <div className="w-full max-w-[1248px] mx-auto">

            {/* Header Content */}
            <div className="flex flex-col items-center text-center mb-12 md:mb-[80px]">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#138E5F]/5 border border-[#138E5F]/10 mb-6"
              >
                <Star className="w-4 h-4 text-[#138E5F] fill-[#138E5F]" />
                <span className="text-[#138E5F] text-[14px] font-medium font-sans">Supported Platforms</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-[32px] sm:text-[40px] md:text-[52px] font-semibold text-[#042718] leading-[1.2] md:leading-[58px] tracking-tight md:tracking-[-1.8px] mb-6 max-w-2xl text-center"
                style={{ fontFamily: "'Onest', sans-serif" }}
              >
                Analyze products from all your{" "}
                <span className="italic text-[rgba(0,0,0,0.40)]">e-commerce platforms</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[15px] md:text-[18px] text-[#042718] leading-[1.6] md:leading-[28px] max-w-[612px] font-sans font-normal opacity-80 text-center"
              >
                Paste a product URL from any supported platform and our AI handles the rest — scraping, analyzing, and delivering actionable insights automatically.
              </motion.p>
            </div>

            {/* Integration Visualization */}
            <div className="relative w-full max-w-[1240px] mx-auto min-h-[400px] lg:h-[368px] flex items-center justify-center">

              {/* Desktop Only SVG Visualization */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" viewBox="0 0 1240 368">
                <defs>
                  <linearGradient id="line-gradient-left" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#138E5F" stopOpacity="0.02" />
                    <stop offset="100%" stopColor="#138E5F" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="line-gradient-right" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#138E5F" stopOpacity="0.02" />
                    <stop offset="100%" stopColor="#138E5F" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* Left Connection Paths */}
                {[225, 195, 165, 135].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const startX = 620 + 84 * Math.cos(rad);
                  const startY = 184 + 84 * Math.sin(rad);
                  const cardY = [40, 136, 232, 328][i];
                  const dPath = "M " + startX + " " + startY + " Q " + (startX - 150) + " " + startY + " 280 " + cardY;
                  return (
                    <React.Fragment key={"path-left-" + i}>
                      <path d={dPath} stroke="url(#line-gradient-left)" fill="none" strokeWidth="1.8" strokeDasharray="4 4" opacity="0.9" />
                      <motion.circle r="3.5" fill="#138E5F">
                        <animateMotion dur="3.5s" repeatCount="indefinite" path={dPath} begin={i * 0.4 + "s"} />
                      </motion.circle>
                    </React.Fragment>
                  );
                })}

                {/* Right Connection Paths */}
                {[-45, -15, 15, 45].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const startX = 620 + 84 * Math.cos(rad);
                  const startY = 184 + 84 * Math.sin(rad);
                  const cardY = [40, 136, 232, 328][i];
                  const dPath = "M " + startX + " " + startY + " Q " + (startX + 150) + " " + startY + " 960 " + cardY;
                  return (
                    <React.Fragment key={"path-right-" + i}>
                      <path d={dPath} stroke="url(#line-gradient-right)" fill="none" strokeWidth="1.8" strokeDasharray="4 4" opacity="0.9" />
                      <motion.circle r="3.5" fill="#138E5F">
                        <animateMotion dur="3.5s" repeatCount="indefinite" path={dPath} begin={(i * 0.4 + 0.2) + "s"} />
                      </motion.circle>
                    </React.Fragment>
                  );
                })}

                {/* Static Connection Dots at Center */}
                {[225, 195, 165, 135, -45, -15, 15, 45].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  return (
                    <motion.circle
                      key={"seal-dot-" + i}
                      cx={620 + 84 * Math.cos(rad)}
                      cy={184 + 84 * Math.sin(rad)}
                      r="5"
                      fill="#138E5F"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.9, 1, 0.9] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
                    />
                  );
                })}
              </svg>

              {/* Visualization Container */}
              <div className="w-full flex flex-col lg:block relative z-10 lg:h-full">

                {/* Left column items */}
                <div className="flex flex-wrap lg:grid justify-center gap-4 lg:absolute lg:left-0 lg:top-0 lg:h-full lg:w-[280px] mb-8 lg:mb-0">
                  {leftIntegrations.map((item, idx) => (
                    <IntegrationCard key={item.id} item={item} idx={idx} direction="left" isLargeScreen={isLargeScreen} />
                  ))}
                </div>

                {/* Center Seal */}
                <div className="flex items-center justify-center py-8 lg:py-0 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
                  <div className="relative w-[100px] lg:w-[124px] h-[100px] lg:h-[124px] flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 -m-8 lg:-m-[58px] rounded-full bg-[#E4F3EB]/60 shadow-[inset_0_0_40px_rgba(19,142,95,0.03)]"
                    />
                    <div className="absolute inset-0 -m-4 lg:-m-[32px] rounded-full bg-white/40 backdrop-blur-[1px]" />

                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      viewport={{ once: true }}
                      className="w-full h-full rounded-full bg-white shadow-[0_12px_48px_rgba(19,142,95,0.12)] flex items-center justify-center relative z-10"
                    >
                      <div className="w-[84px] lg:w-[104px] h-[84px] lg:h-[104px] rounded-full bg-[#FAFFFD] flex flex-col items-center justify-center">
                        <span className="text-[#042718] font-bold text-[14px] lg:text-[16px] tracking-tight"
                          style={{ fontFamily: "'Onest', sans-serif" }}>
                          RiskAI
                        </span>
                        <span className="text-[#138E5F] text-[9px] font-medium mt-0.5">ANALYSIS</span>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Right column items */}
                <div className="flex flex-wrap lg:grid justify-center gap-4 lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-[280px] mt-8 lg:mt-0">
                  {rightIntegrations.map((item, idx) => (
                    <IntegrationCard key={item.id} item={item} idx={idx} direction="right" isLargeScreen={isLargeScreen} />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Info */}
            <div className="flex flex-col items-center mt-12 md:mt-[80px] gap-6 md:gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-5 md:px-[24px] py-2 md:py-[11px] rounded-full border border-[#138E5F]/15 bg-white/50 shadow-[0_4px_24px_rgba(19,142,95,0.03)]"
              >
                <ShieldCheck className="w-5 h-5 text-[#138E5F]" />
                <p className="text-[13px] md:text-[15px] font-sans">
                  <span className="text-[#138E5F] font-semibold">Secure analysis.</span>{" "}
                  <span className="text-[#042718]/40">Your data is processed privately and never stored long-term.</span>
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-[13px] md:text-[15px] text-[#042718]/40 font-sans tracking-tight text-center px-4"
              >
                Trusted by{" "}
                <span className="font-semibold text-[#138E5F]">500+</span>{" "}
                businesses. Analyzing products from{" "}
                <span className="font-semibold text-[#138E5F]">8+</span>{" "}
                major e-commerce platforms worldwide.
              </motion.p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
