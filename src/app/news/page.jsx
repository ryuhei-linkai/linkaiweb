"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';

function NewsPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHeaderWhite, setIsHeaderWhite] = useState(false);
  const [activeCategory, setActiveCategory] = useState('すべて');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      
      const fvHeight = window.innerHeight;
      setIsHeaderWhite(position > fvHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const textElements = document.querySelectorAll(".animate-text");
    textElements.forEach((element) => {
      const text = element.innerText;
      element.innerHTML = "";
      text.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.innerText = char;
        span.style.opacity = 0;
        span.style.transform = "translateX(-100px)";
        span.style.transition = `opacity 0.3s ease-out ${index * 0.05}s, transform 0.3s ease-out ${index * 0.05}s`;
        element.appendChild(span);
      });
    });

    setTimeout(() => {
      textElements.forEach((element) => {
        const spans = element.querySelectorAll("span");
        spans.forEach((span) => {
          span.style.opacity = 1;
          span.style.transform = "translateX(0)";
        });
      });
    }, 300);
  }, []);

  const getGrayscaleValue = () => {
    const maxScroll = 1000;
    const grayscale = Math.min(scrollPosition / maxScroll * 100, 100);
    return grayscale;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const newsItems = [
    { id: '1', title: 'WEBマーケティング自動化ツール リリース', date: '2024.09.15', category: 'プレスリリース', image: '/images/tool.png' },
    { id: '2', title: 'セールスAIエージェント「ウリマッチョ」が日本初AI Agentハッカソンで優勝', date: '2024.08.26', category: 'プレスリリース', image: '/images/urimacho.png' },
    { id: '3', title: '株式会社Link AIを設立', date: '2024.02.08', category: 'プレスリリース', image: '/images/LinkAI.png' },
  ];

  const filteredNews = activeCategory === 'すべて' ? newsItems : newsItems.filter(item => item.category === activeCategory);

  return (
    <div className="relative">
      <div 
        className="w-full h-full bg-[url('/images/background.png')] bg-cover bg-center bg-fixed absolute top-0 left-0"
        style={{
          filter: `grayscale(${getGrayscaleValue()}%)`
        }}
      ></div>
      <div className="relative z-10">
        <header className={`w-full flex justify-between items-center font-bold text-sm p-5 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHeaderWhite ? 'bg-white' : 'bg-transparent'}`}>
          <div className="flex items-center space-x-2 mx-4 md:mx-20">
            <Link href="/">
              <img src="/images/file.png" alt="会社ロゴ" className="h-8 cursor-pointer" />
            </Link>
          </div>
          <ul className="hidden md:flex space-x-8 text-black mr-20">
            <li><Link href="/company">会社情報</Link></li>
            <li><Link href="/business">事業内容</Link></li>
            <li><Link href="/news">ニュース</Link></li>
            <li className="mr-10"><Link href="/contact">お問い合わせ</Link></li>
          </ul>
          <button 
            className="md:hidden text-black z-50 relative"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </header>
        <div 
          className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          style={{
            clipPath: isMobileMenuOpen ? 'circle(150% at 100% 0)' : 'circle(0% at 100% 0)',
            transition: 'clip-path 0.5s ease-in-out, opacity 0.5s ease-in-out, visibility 0.5s ease-in-out'
          }}
        >
          <ul className="text-black text-xl space-y-6">
            <li><Link href="/company" onClick={toggleMobileMenu}>会社情報</Link></li>
            <li><Link href="/business" onClick={toggleMobileMenu}>事業内容</Link></li>
            <li><Link href="/news" onClick={toggleMobileMenu}>ニュース</Link></li>
            <li><Link href="/contact" onClick={toggleMobileMenu}>お問い合わせ</Link></li>
          </ul>
        </div>
        <div className="min-h-screen flex flex-col justify-center items-center text-center p-5 relative">
          <div className="absolute inset-0 bg-white opacity-80"></div>
          <main className="text-black mt-32 relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-text">
              ニュース
            </h1>
            <button 
              className="px-6 py-3 text-black transition-all animate-text group"
              onClick={() => {
                const newsSection = document.getElementById('news-section');
                newsSection.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="block transition-transform duration-300 group-hover:translate-y-1">VIEW MORE</span>
              <span className="block mt-1 transform transition-all duration-300 group-hover:translate-y-1 group-hover:opacity-70">↓</span>
            </button>
          </main>
        </div>

        <section id="news-section" className="py-20 px-5 text-gray-800 relative">
          <div className="absolute inset-0 bg-white opacity-80"></div>
          <div className="relative z-10 max-w-5xl mx-auto">
            <h2 className="text-center text-7xl font-bold mb-10">
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">News</span>
            </h2>
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">カテゴリ</h3>
              <div className="flex space-x-4">
                {['すべて', 'プレスリリース', 'お知らせ'].map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm ${activeCategory === category ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              {filteredNews.map((item, index) => (
                <Link href={`/news/${item.id}`} key={item.id} className="block">
                  <div className={`flex items-start space-x-6 p-6 ${index !== filteredNews.length - 1 ? 'border-b border-gray-400' : ''}`}>
                    <div className="w-1/4">
                      <Image src={item.image} alt={item.title} width={200} height={120} className="rounded-md" />
                    </div>
                    <div className="w-3/4">
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="text-sm text-gray-500">{item.date}</span>
                        <span className="px-2 py-1 bg-gray-200 text-xs text-gray-700 rounded-full">{item.category}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-white py-10">
          <div className="container mx-auto px-5 flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-5">
              ©
              Link AI Inc.
            </div>
            <div className="w-full md:w-3/4 flex flex-wrap justify-around">
              <div className="mb-5">
                <ul>
                  <li><a href="/company" target="_blank" rel="noopener noreferrer">会社概要</a></li>
                </ul>
              </div>
              <div className="mb-5">
                <ul>
                  <li><a href="/business" target="_blank" rel="noopener noreferrer">事業内容</a></li>
                  <li><a href="/news" target="_blank" rel="noopener noreferrer">ニュース</a></li>
                  <li><a href="/contact" target="_blank" rel="noopener noreferrer">お問い合わせ</a></li>
                </ul>
              </div>
              <div className="mb-5">
                <ul>
                  <li><a href="/recruit" target="_blank" rel="noopener noreferrer">採用情報</a></li>
                </ul>
              </div>
              <div className="mb-5">
                <p>メディア・ブログ</p>
                <ul>
                  <li><a href="https://x.com/airunner_linkai" target="_blank" rel="noopener noreferrer">X</a></li>
                  <li><a href="https://note.com/gabc/" target="_blank" rel="noopener noreferrer">ブログ</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default NewsPage;