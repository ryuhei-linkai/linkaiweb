"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';

function NewsPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHeaderWhite, setIsHeaderWhite] = useState(false);
  const [activeCategory, setActiveCategory] = useState('すべて');

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

  const newsItems = [
    { id: '1', title: '株式会社Link AIを設立', date: '2024.02.08', category: 'プレスリリース', image: '/images/LinkAI.png' },
    { id: '2', title: 'WEBマーケティング自動化ツール リリース', date: '2024.05.15', category: 'プレスリリース', image: '/images/tool.png' },
    { id: '3', title: '株式会社Link AIのセールスAIエージェント「ウリマッチョ」、日本初AIエージェントハッカソンで優勝', date: '2024.08.26', category: 'プレスリリース', image: '/images/urimacho.png' },
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
          <div className="flex items-center space-x-2 mx-20">
            <img src="/images/file.png" alt="会社ロゴ" className="h-8" />
          </div>
          <ul className="hidden sm:flex space-x-8 text-black">
            <li><Link href="/company">会社情報</Link></li>
            <li><Link href="/business">事業内容</Link></li>
            <li><Link href="/news">ニュース</Link></li>
            <li><Link href="/contact">お問い合わせ</Link></li>
          </ul>
          <div className="flex space-x-4 mx-4">
          </div>
        </header>
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
                  <li>Purpose & Mission</li>
                  <li>会社概要</li>
                </ul>
              </div>
              <div className="mb-5">
                <ul>
                  <li>事業内容</li>
                  <li>ニュース</li>
                  <li>お問い合わせ</li>
                </ul>
              </div>
              <div className="mb-5">
                <ul>
                  <li>採用情報</li>
                </ul>
              </div>
              <div className="mb-5">
                <p>メディア・ブログ</p>
                <ul>
                  <li>X</li>
                  <li>ブログ</li>
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