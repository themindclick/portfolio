export const siteConfig = {
  brand: { name: "LensArt Studio", tagline: "Capturing Moments. Crafting Memories.", logo: "📷" },
  hero: {
    headline: "Every Moment Deserves to Be Beautiful",
    subheadline: "Professional photography that tells your unique story — from golden-hour portraits to milestone celebrations.",
    ctaPrimary: { label: "View Gallery", href: "#gallery" },
    ctaSecondary: { label: "Book a Session", href: "#contact" },
    stats: [
      { value: "500+", label: "Happy Clients" },
      { value: "5K+", label: "Photos Delivered" },
      { value: "8+", label: "Years Experience" },
      { value: "50+", label: "Awards Won" }
    ],
    heroImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN6Uiup15xP2dr8_4RdncJFbfWLW1u_AFNWD3xDzPhWw&s=10",
      "https://d21qxd5qkegi1o.cloudfront.net/wp-content/uploads/2016/09/aasmi_2016_09-bay-area-san-francisco-one-year-baby-birthday-cake-smash-001.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxiXlyH7P9bzLWv9Y6FCDdsjkcXqKmHbAcHsUWzJfaEw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQslHw5ZJOVLzeZWppPGSOjQo3U_NzkplJ60MfF1lXew&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQfPBfzwQ4SCBTNUydjGXsp3x_O-IjUaV2PYCRvx4jCw&s=10"
    ]
  },
  about: {
    name: "Alex Morgan",
    title: "Lead Photographer & Visual Artist",
    bio: "I believe every person has a story worth telling through light and lens. With over 8 years of experience capturing life's most precious moments, I bring both technical expertise and genuine warmth to every shoot.",
    bio2: "From intimate family sessions to grand celebrations, my goal is simple: make you feel comfortable, have fun, and walk away with images you'll treasure forever.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIy5BgCFeVOhFiQx4V4oKvFHifPKr58bVeb0WmayLmOT80NYyMB_Cqltf3&s=10",
    highlights: [
      { icon: "🏆", label: "Award-Winning Photography" },
      { icon: "🎓", label: "BFA in Visual Arts" },
      { icon: "❤️", label: "Passion-Driven Approach" },
      { icon: "🌍", label: "Available Worldwide" }
    ]
  },
  services: [
    { id: "portraits", icon: "👤", title: "Portrait Sessions", description: "Stunning individual portraits that capture your personality and essence in every frame.", price: "Starting at $150", features: ["1-2 hours session", "2 outfit changes", "30 edited photos", "Online gallery"] },
    { id: "events", icon: "🎉", title: "Events & Celebrations", description: "From graduations to birthdays, we capture every joyful moment of your special day.", price: "Starting at $350", features: ["Full event coverage", "Candid + posed shots", "100+ edited photos", "Same-week delivery"] },
    { id: "family", icon: "👨‍👩‍👧", title: "Family Sessions", description: "Warm, natural family portraits that you'll proudly display for years to come.", price: "Starting at $200", features: ["Up to 6 people", "1 location", "50 edited photos", "Print release"] },
    { id: "weddings", icon: "💍", title: "Wedding Photography", description: "Complete wedding day coverage from getting ready to the last dance.", price: "Starting at $1,200", features: ["8-hour coverage", "2nd shooter included", "400+ edited photos", "Album design"] },
    { id: "commercial", icon: "🏢", title: "Commercial & Brand", description: "Professional imagery that elevates your brand and connects with your audience.", price: "Starting at $500", features: ["Brand strategy session", "Studio or on-location", "50+ edited images", "Commercial license"] },
    { id: "lifestyle", icon: "🌸", title: "Lifestyle Sessions", description: "Empowering, tasteful sessions that celebrate you in your most authentic self.", price: "Starting at $250", features: ["Private studio session", "Styling guidance", "40 edited photos", "Makeup artist optional"] }
  ],
  gallery: {
    categories: ["All", "Portraits", "Events", "Family", "Weddings", "Commercial"],
    items: [
      { id: 1, category: "Portraits", title: "Golden Hour Portrait", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnQsqxG-ybRb5u7M8s8ESNkAAwU8pGPF-WNUt4GUuCkgKTObyv4g7K0Q&s=10" },
      { id: 2, category: "Weddings", title: "Wedding Bliss", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtlgfRnCn_Kvthu2PKZUZ7SDWVPuKF0xkCjxzYhlMkt6xV1pidjfm5_efF&s=10" },
      { id: 3, category: "Events", title: "Cultural Show", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIhXOcefG70C6YFVN7UqxjWLiU0Nox4rL4Dl7N43vBZNpkiF7oGjCFDsk&s=10" },
      { id: 4, category: "Family", title: "Family Memories", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUuL0Lj3Ca69zLJ8ZBBZy2__CKwE-E8e9uEzC8UinDhQ&s=10" },
      { id: 5, category: "Commercial", title: "Brand Story", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWaujYMnFbispvTf6UXAUSk79mYPoo61IbtXUe2LemGQ&s=10" },
      { id: 6, category: "Portraits", title: "Studio Session", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDKkp16tthZNdQXEVNSPpdR3Yw9fDsMLC-AknzLEfCWQ&s=10" },
      { id: 7, category: "Weddings", title: "Forever Together", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsampzVklhdPMbfCGZE-L0JGEMUL_kfk8FXrVz96jtb_XD_-9UleULsZ0&s=10" },
      { id: 8, category: "Events", title: "Cultural Show", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz4h3bokufJp_dICHN3tyZLNtVTgltKqU6I88CPYroVzdXkYNrvNabZ4i5&s=10" },
      { id: 9, category: "Family", title: "Autumn Walk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_61Zp6_T3G5DtXw0qI9e4_RCPr8Ci8HMc0g6pQvUIVg&s=10" },
      { id: 3, category: "Events", title: "Graduation", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BZWfyYruvkTua6WbAaZqmLSaHdwcdmp5cemeJR9cT6r0oVMIjH-bOc50&s=10" },
      { id: 10, category: "Portraits", title: "Natural Light", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaMjII4jPj1Nf2O9xp_BeJ8VEGVdRQDWZXe91mBqZso9wJjKlU1miR7GI&s=10" },
      { id: 11, category: "Commercial", title: "Product Story", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdjjCC_DsAMuVG-OQ-KMxGofaLStkcVlBne_RFNcNc-tCRGtdX5rb4-E8&s=10" },
      { id: 12, category: "Weddings", title: "Love Story", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZbVwhy_cUmKtB67GZ4fnxdIh3VRaNxRYQQY4-E6YKPg&s=10" }
    ]
  },

  // Photography packages (read by PricingSection.jsx).
  // Use one photo per package that matches it. Package prices and the last lines
  // of Package Two and all of Package Three are placeholders, replace with your real details.
  pricingTagline: "Events / Fashion / Creativity / Weddings",
  pricing: [
    {
      tag: "Package One",
      name: "The Solo Achievement Session",
      price: "12,000 LKR",
      period: "session",
      popular: false,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BZWfyYruvkTua6WbAaZqmLSaHdwcdmp5cemeJR9cT6r0oVMIjH-bOc50&s=10",
      imageAlt: "Graduate posing in a black gown with a purple stole",
      features: [
        { label: "The Spotlight", text: "Capture your milestone with a dedicated, premium spotlight." },
        { label: "The Experience", text: "1 Full Hour of comprehensive coverage." },
        { label: "The Photos", text: "High end individual portraits plus timeless family and friend group shots." },
        { label: "The Reward", text: "Full gallery of unedited images plus 70 to 80 expertly edited masterpieces on your choice." }
      ]
    },
    {
      tag: "Package Two",
      name: "The Shared Success Session",
      price: "9,000 LKR", // placeholder, confirm your real price
      period: "graduate",
      popular: true,
      image: "https://t3.ftcdn.net/jpg/02/46/52/02/360_F_246520253_0Tk0kTbvEUIGEYhCx8q422sT0TcQXOxN.jpg",
      imageAlt: "Graduate in a blue gown holding a degree",
      features: [
        { label: "The Celebration", text: "Celebrate your hard work alongside your favorite classmates." },
        { label: "The Experience", text: "20 Minutes of dedicated shooting time per graduate (Min. 2 graduates to book)." },
        { label: "The Photos", text: "Individual milestone portraits, family and group shots." }, // placeholder, complete from your real text
        { label: "The Reward", text: "Edited gallery delivered online." } // placeholder
      ]
    },
    {
      tag: "Package Three",
      name: "The Grand Graduation Story",
      price: "25,000 LKR", // placeholder package, replace or delete
      period: "session",
      popular: false,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa-o1WfwZdLh7Y3lEbbnoVTaI_Ddew-Gsy7c4V-jF0IQ&s=10", // add this photo to public/images/pricing/ or paste a link
      imageAlt: "Graduation group celebration",
      features: [
        { label: "The Experience", text: "3 Full Hours of coverage across your graduation day." },
        { label: "The Photos", text: "Portraits, ceremony moments, family and friend groups." },
        { label: "The Reward", text: "Full unedited gallery plus 150 expertly edited images." }
      ]
    }
  ],

  process: [
    { step: "01", icon: "💬", title: "Consultation", description: "We start with a free consultation to understand your vision, style preferences, and what moments matter most to you." },
    { step: "02", icon: "📅", title: "Book & Plan", description: "Choose your package, pick your date, and we'll handle all the planning — locations, timing, and shot lists." },
    { step: "03", icon: "📸", title: "The Shoot", description: "Relax and be yourself! We guide you through poses and capture genuine, beautiful moments naturally." },
    { step: "04", icon: "✨", title: "Delivery", description: "Receive your professionally edited gallery within 5–7 days, with sneak peeks delivered within 48 hours!" }
  ],
  testimonials: [
    { name: "Sarah & James", role: "Wedding Clients", avatar: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=100&q=80", rating: 5, text: "Alex made our wedding day absolutely magical. Every photo is stunning, candid and full of emotion. We've printed them all over our home!" },
    { name: "Emily Chen", role: "Graduate Portrait", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80", rating: 5, text: "I was so nervous for my shoot but Alex made everything so comfortable. My graduation photos turned out beyond what I imagined. Pure perfection!" },
    { name: "The Martinez Family", role: "Family Session", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80", rating: 5, text: "Capturing our family of 5 is not easy but Alex did it beautifully. Every child was engaged and the final photos are absolutely priceless." },
    { name: "Marcus Williams", role: "Commercial Client", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80", rating: 5, text: "The brand photos completely transformed our marketing. Professional, creative, and delivered ahead of schedule. Highly recommend!" },
    { name: "Priya Sharma", role: "Portrait Session", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80", rating: 5, text: "I finally have photos I'm proud to share! Alex has a gift for making you feel seen and beautiful. The results are simply breathtaking." },
    { name: "David & Lisa K.", role: "Engagement Photos", avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&q=80", rating: 5, text: "Our engagement session was so fun and the photos tell our love story perfectly. We can't wait for Alex to shoot our wedding!" }
  ],
  faq: [
    { q: "How far in advance should I book?", a: "We recommend booking 4–8 weeks in advance for portraits and 6–12 months for weddings. Popular dates fill up fast, especially in spring and fall." },
    { q: "What should I wear to my session?", a: "Wear something that makes you feel confident and comfortable. We'll send you a full style guide after booking with color palette suggestions and outfit ideas." },
    { q: "How long until I receive my photos?", a: "Portrait and event galleries are delivered within 5–7 business days. Weddings take 3–4 weeks. Sneak peeks are always delivered within 48 hours!" },
    { q: "Do you shoot in bad weather?", a: "We monitor the forecast and always have a backup plan! Overcast days actually make for beautiful, soft light. We'll reschedule at no charge for severe weather." },
    { q: "Can I bring family or friends to my session?", a: "Absolutely! For portrait sessions, a small support crew is welcome. For couples and family sessions, the more the merrier — we love capturing authentic group moments." },
    { q: "Do you offer payment plans?", a: "Yes! We offer flexible payment plans for packages over $400. A 25% deposit secures your date, with the balance due the day of the session." }
  ],
  contact: {
    email: "hello@lensartstudio.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA & Available Worldwide",
    socials: [
      { name: "Instagram", href: "#", icon: "instagram" },
      { name: "Facebook", href: "#", icon: "facebook" }
    ]
  }
};