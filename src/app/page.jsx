"use client";
import React, { useEffect, useState } from "react";

function MainComponent() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
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
    const maxScroll = 1000; // FVセクションの高さに応じて調整してください
    const grayscale = Math.min(scrollPosition / maxScroll * 100, 100);
    return grayscale;
  };

  return (
    <div 
      className="w-full bg-[url('/images/background.png')] bg-cover bg-center bg-fixed"
      style={{
        filter: `grayscale(${getGrayscaleValue()}%)`
      }}
    >
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-5 relative">
        <div className="absolute inset-0 bg-white opacity-80"></div>
        <header className="w-full flex justify-between items-center text-white font-bold text-sm p-5 absolute top-0">
          <div className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="会社ロゴ" className="h-10" />
          </div>
          <ul className="hidden sm:flex space-x-8 text-black">
            <li>会社情報</li>
            <li>事業内容</li>
            <li>ニュース</li>
            <li>採用情報</li>
            <li>お問い合わせ</li>
          </ul>
          <div className="flex space-x-4">
          </div>
        </header>
        <main className="text-black mt-32 relative z-10">
          <h1 className="text-4xl md:text-7xl font-bold mb-4 animate-text">
            興味の赴くままに生きられる
            <br />
            世の中を創る
          </h1>
          <p className="text-sm md:text-lg mb-8 animate-text">生成AIを社会に実装し、より人間が人間らしい暮らしができる世の中を創造する</p>
          <button className="px-6 py-3 border border-black text-black hover:border-red-500 hover:text-red-500 transition-all animate-text">
            VIEW MORE →
          </button>
        </main>
      </div>

      <section className="py-20 px-5 text-gray-800 relative">
        <div className="absolute inset-0 bg-white opacity-80"></div>
        <div className="relative z-10">
          <h2 className="text-center text-4xl font-bold mb-10">Our Business</h2>
          <div className="flex flex-col space-y-20">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="relative flex flex-col md:flex-row items-center md:items-start space-y-5 md:space-y-0 md:space-x-5"
              >
                <img
                  src={`/image${index + 1}.jpg`}
                  alt="サービスイメージ"
                  className="w-full md:w-1/2 h-[300px] object-cover"
                />
                <div className="bg-white p-5 shadow-lg rounded md:w-1/2 relative -mt-10 z-10">
                  <h3 className="text-2xl font-bold mb-2">
                    CXプラットフォーム KARTE
                  </h3>
                  <p className="mb-4">あらゆるサービスの顧客体験の向上に</p>
                  <button className="text-red-500">VIEW MORE →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-5 text-gray-800 relative">
        <div className="absolute inset-0 bg-white opacity-80"></div>
        <div className="relative z-10">
          <h2 className="text-center text-4xl font-bold mb-10">News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 border rounded shadow-sm bg-white">
              <img
                src="/news1.jpg"
                alt="ニュースイメージ"
                className="h-[150px] w-full object-cover mb-2"
              />
              <p>丸井グループとの連携ニュース</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-800 bg-opacity-80 text-white py-20 text-center relative">
        <div className="relative z-10">
          <h2 className="text-5xl font-bold mb-5">PLAY with us!!</h2>
          <p className="mb-10">PLAiDで働く未来の仲間に向けて。</p>
          <button className="border border-white px-5 py-3 hover:bg-white hover:text-gray-800 transition-all">
            VIEW MORE
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-5 flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-5">
            <img src="/logo.png" alt="会社ロゴ" className="w-10 h-10 mb-5" />©
            PLAID Inc. All rights reserved.
          </div>
          <div className="w-full md:w-3/4 flex flex-wrap justify-around">
            <div className="mb-5">
              <p>会社情報</p>
              <ul>
                <li>Purpose & Mission</li>
                <li>会社概要</li>
              </ul>
            </div>
            <div className="mb-5">
              <p>事業内容</p>
              <ul>
                <li>事業内容</li>
                <li>ニュース</li>
                <li>サステナビリティ</li>
                <li>お問い合わせ</li>
              </ul>
            </div>
            <div className="mb-5">
              <p>IR</p>
              <ul>
                <li>IR資料</li>
                <li>IRカレンダー</li>
              </ul>
            </div>
            <div className="mb-5">
              <p>採用情報</p>
              <ul>
                <li>採用中ポジション</li>
              </ul>
            </div>
            <div className="mb-5">
              <p>メディア・ブログ</p>
              <ul>
                <li>プレイド公式Note</li>
                <li>エンジニアブログ</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainComponent;