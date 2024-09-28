"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';

function MainComponent() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [newsItems, setNewsItems] = useState([]);
  const [isHeaderWhite, setIsHeaderWhite] = useState(false);
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

    setNewsItems([
      { id: '1', title: '株式会社Link AIを設立', date: '2024.02.08', category: 'プレスリリース', image: '/images/LinkAI.png' },
      { id: '2', title: 'WEBマーケティング自動化ツール リリース', date: '2024.05.15', category: 'プレスリリース', image: '/images/tool.png' },
      { id: '3', title: '株式会社Link AIのセールスAIエージェント「ウリマッチョ」、日本初AIエージェントハッカソンで優勝', date: '2024.08.26', category: 'プレスリリース', image: '/images/urimacho.png' },
    ]);
  }, []);

  const getGrayscaleValue = () => {
    const maxScroll = 1000;
    const grayscale = Math.min(scrollPosition / maxScroll * 100, 100);
    return grayscale;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
          <ul className="hidden md:flex space-x-8 text-black">
            <li><Link href="/company">会社情報</Link></li>
            <li><Link href="/business">事業内容</Link></li>
            <li><Link href="/news">ニュース</Link></li>
            <li><Link href="/contact">お問い合わせ</Link></li>
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
            <h1 className="text-3xl md:text-4xl lg:text-7xl font-bold mb-4 animate-text leading-relaxed">
              興味の赴くままに生きられる
              <br className="mb-4" />
              世の中を創る
            </h1>
            <p className="text-sm md:text-lg mb-8 animate-text">生成AIを社会に実装し、より人間が人間らしい暮らしができる世の中を創造する</p>
            <button 
              className="px-6 py-3 text-black transition-all animate-text group"
              onClick={() => {
                const newsSection = document.getElementById('business-section');
                newsSection.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="block transition-transform duration-300 group-hover:translate-y-1">VIEW MORE</span>
              <span className="block mt-1 transform transition-all duration-300 group-hover:translate-y-1 group-hover:opacity-70">↓</span>
            </button>
          </main>
        </div>

        <section id="business-section" className="py-20 px-5 text-gray-800 relative">
          <div className="absolute inset-0 bg-white opacity-80"></div>
          <div className="relative z-10">
            <h2 className="text-left text-5xl md:text-7xl lg:text-9xl font-bold mb-10 ml-4 md:ml-20">
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">Business</span>
            </h2>
            <div className="flex flex-col space-y-16 md:space-y-32 mx-4 md:mx-20">
              <div className="relative group">
                <img
                  src="/images/営業AIエージェント.jpg"
                  alt="Sales AI Agent"
                  className="w-full md:w-4/5 h-[300px] md:h-[550px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="bg-white p-4 md:p-8 shadow-md rounded-none md:w-3/4 absolute bottom-0 left-0 md:left-1/4 transform md:-translate-x-1/3 translate-y-1/4 z-10 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                  <h3 className="text-xl md:text-2xl mb-3 tracking-wide font-bold">
                    Sales AI Agent
                  </h3>
                  <p className="mb-4 text-xs md:text-sm leading-relaxed">リード獲得～受注までの商談プロセスのあらゆる活動をAIで業務効率化する。営業マン本来の仕事である顧客との対話に集中できる環境を整える。</p>
                  <div className="text-right">
                    <Link href="/business" className="text-purple-600 text-xs uppercase tracking-widest hover:text-purple-800 transition-colors duration-300 relative group">
                      <span className="relative z-10">View more →</span>
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <img
                  src="/images/AIシステム開発.jpg"
                  alt="AI/DXシステム開発"
                  className="w-full md:w-4/5 h-[300px] md:h-[550px] object-cover ml-auto transition-transform duration-300 group-hover:scale-105"
                />
                <div className="bg-white p-4 md:p-8 shadow-md rounded-none md:w-3/4 absolute bottom-0 right-0 md:right-1/4 transform md:translate-x-1/3 translate-y-1/4 z-10 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                  <h3 className="text-xl md:text-2xl mb-3 tracking-wide font-bold">
                    AI/DXシステム開発
                  </h3>
                  <p className="mb-4 text-xs md:text-sm leading-relaxed">1人月単位でのAI人材のアサインから、予算に適した費用感でのPoC推進、AIシステムやアプリケーションの受託開発まで、お客様にあった支援スキームを柔軟に設計。プロジェクトの成功を実現します。</p>
                  <div className="text-right">
                    <Link href="/business" className="text-purple-600 text-xs uppercase tracking-widest hover:text-purple-800 transition-colors duration-300 relative group">
                      <span className="relative z-10">View more →</span>
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <img
                  src="/images/DXコンサル.png"
                  alt="AI/DXコンサルティング"
                  className="w-full md:w-4/5 h-[300px] md:h-[550px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="bg-white p-4 md:p-8 shadow-md rounded-none md:w-3/4 absolute bottom-0 left-0 md:left-1/4 transform md:-translate-x-1/3 translate-y-1/4 z-10 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                  <h3 className="text-xl md:text-2xl mb-3 tracking-wide font-bold">
                    AI/DXコンサルティング
                  </h3>
                  <p className="mb-4 text-xs md:text-sm leading-relaxed">多数のプロジェクトを成功させてきたコンサルタントをアサインし、AI・DX戦略の策定から実行推進まで泥臭く伴走します。</p>
                  <div className="text-right">
                    <Link href="/business" className="text-purple-600 text-xs uppercase tracking-widest hover:text-purple-800 transition-colors duration-300 relative group">
                      <span className="relative z-10">View more →</span>
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-5 text-gray-800 relative">
          <div className="absolute inset-0 bg-white opacity-80"></div>
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="bg-white bg-opacity-80 p-4 md:p-10 rounded-lg mx-2 md:mx-8">
              <h2 className="text-center text-3xl md:text-4xl font-bold mb-10">News</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {newsItems.map((item) => (
                  <Link href={`/news/${item.id}`} key={item.id} className="block">
                    <div className="p-4 md:p-5 bg-white">
                      <Image src={item.image} alt={item.title} width={200} height={150} className="h-[150px] w-full object-cover mb-2" />
                      <div className="flex flex-wrap items-center space-x-2 md:space-x-4 mb-2">
                        <span className="text-xs md:text-sm text-gray-500">{item.date}</span>
                        <span className="px-2 py-1 bg-gray-200 text-xs text-gray-700 rounded-full">{item.category}</span>
                      </div>
                      <h3 className="text-sm md:text-base font-semibold">{item.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link href="/news" className="inline-block relative group">
                  <span className="text-purple-600 text-base md:text-lg font-semibold">VIEW ALL →</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 bg-opacity-80 text-white py-20 md:py-32 text-center relative">
          <div className="absolute inset-0 z-0">
            <Image src="/images/東京タワー.png" alt="東京タワー" layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-5xl font-bold mb-5">AI FOR HAPPINESS</h2>
            <p className="mb-10">AIを活用して、人々の幸福を向上させる</p>
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

export default MainComponent;