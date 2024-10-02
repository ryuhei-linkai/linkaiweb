"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';

function CompanyPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-text">
              会社概要
            </h1>
            <button 
              className="px-6 py-3 text-black transition-all animate-text group"
              onClick={() => {
                const companySection = document.getElementById('company-section');
                companySection.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="block transition-transform duration-300 group-hover:translate-y-1">VIEW MORE</span>
              <span className="block mt-1 transform transition-all duration-300 group-hover:translate-y-1 group-hover:opacity-70">↓</span>
            </button>
          </main>
        </div>

        <section id="company-section" className="py-20 px-5 text-gray-800 relative">
          <div className="absolute inset-0 bg-white opacity-80"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-center text-7xl font-bold mb-24">
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">Company</span>
            </h2>
            <div className="space-y-6">
              <div className="flex border-b border-gray-300 pb-4">
                <h3 className="text-xl font-bold w-1/4">会社名</h3>
                <p className="w-3/4">株式会社Link AI</p>
              </div>
              <div className="flex border-b border-gray-300 pb-4">
                <h3 className="text-xl font-bold w-1/4">所在地</h3>
                <p className="w-3/4">〒108-0023 東京都港区芝浦２－１４－１８サカイビル５階</p>
              </div>
              <div className="flex border-b border-gray-300 pb-4">
                <h3 className="text-xl font-bold w-1/4">設立</h3>
                <p className="w-3/4">2024年2月8日</p>
              </div>
              <div className="flex border-b border-gray-300 pb-4">
                <h3 className="text-xl font-bold w-1/4">代表者</h3>
                <p className="w-3/4">安東竜平</p>
              </div>
              <div className="flex border-b border-gray-300 pb-4">
                <h3 className="text-xl font-bold w-1/4">事業内容</h3>
                <ul className="w-3/4 list-disc list-inside">
                  <li>マーケティング/営業プロセスのAIXプロダクトの提供</li>
                  <li>AIシステム開発</li>
                  <li>AI/DXコンサルティング</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="access-section" className="py-20 px-5 text-gray-800 relative">
          <div className="absolute inset-0 bg-white opacity-80"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-center text-7xl font-bold mb-10">
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">Access</span>
            </h2>
            <div className="w-full h-96">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3242.2775328616!2d139.74726687677547!3d35.64577413128075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bb8d4094a39%3A0x57e8d9e0c96df2cc!2z44CSMTQwLTAwMTEg5p2x5Lqs6YO95riv5Yy65aCA5rWm77yS5LiB55uu77yR77yU4oiS77yR77yYIOOCteOCq-OCpOODk-ODqw!5e0!3m2!1sja!2sjp!4v1709534639705!5m2!1sja!2sjp" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            <div className="mt-8 mb-8 border-t border-b border-gray-300 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl font-bold">最寄り駅</h3>
                </div>
                <div>
                  <p>JR山手線・JR京浜東北線「田町」駅　徒歩５分</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="member-section" className="py-20 px-5 text-gray-800 relative">
          <div className="absolute inset-0 bg-white opacity-80"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-center text-7xl font-bold mb-24">
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">Member</span>
            </h2>
            <div className="space-y-24">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/3 mb-12 md:mb-0">
                  <div className="w-64 h-64 mx-auto">
                    <Image src="/images/ando.jpg" alt="CEO" width={256} height={256} className="object-cover" />
                  </div>
                </div>
                <div className="w-full md:w-2/3 md:pl-16">
                  <h3 className="text-2xl font-bold mb-6">CEO 安東竜平</h3>
                  <p className="text-lg mb-4">
                  中学から大学まで、駅伝強豪校で全国優勝を目指し競技に打ち込んでいた。そこで「1番になる」という強い想いを培い、大学時代から、「起業して大企業を創る」ことに憧れを持つ。
そのために、ビジネスの基礎を固める目的で卒業後はデジタルマーケティング企業で営業職として経験を積む。
その後、ChatGPTの台頭により「世の中が変わる」という予感と、大きなチャンスを同時に感じ、この革新的な技術を社会に役立てる事業を起こしたいと思い起業を決意。AIの進化の速さと、人々の課題を解決する可能性の大きさに感銘を受け、「AIの社会実装」こそが今後の社会に必要なことだと確信し、現在はその信念のもと、AIで社会をより良くするための事業に挑戦している。
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/3 mb-12 md:mb-0">
                  <div className="w-64 h-64 mx-auto">
                    <Image src="/images/kohata.jpg" alt="COO" width={256} height={256} className="object-cover" />
                  </div>
                </div>
                <div className="w-full md:w-2/3 md:pl-16">
                  <h3 className="text-2xl font-bold mb-6">COO 木幡靖彦</h3>
                  <p className="text-lg mb-4">
                    データ分析・デジタルマーケティング支援企業で10年の経験を経て、Link AIを創業。生成AIを活用した"圧倒的"な業務自動化を自社で実現し、それらをサービスとして提供。営業、データ活用コンサルティング、プロダクトマネジメントの経験を活かし、AIとビジネスの実践的融合に取り組む。自社での成功事例を基に、企業のAI導入と活用を支援。複雑なAI技術をビジネス現場で実装し、具体的な成果につなげることに注力。
                  </p>
                </div>
              </div>
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

export default CompanyPage;