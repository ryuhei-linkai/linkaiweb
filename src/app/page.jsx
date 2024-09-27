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
    <div className="relative">
      <div 
        className="w-full h-full bg-[url('/images/background.png')] bg-cover bg-center bg-fixed absolute top-0 left-0"
        style={{
          filter: `grayscale(${getGrayscaleValue()}%)`
        }}
      ></div>
      <div className="relative z-10">
        <div className="min-h-screen flex flex-col justify-center items-center text-center p-5 relative">
          <div className="absolute inset-0 bg-white opacity-80"></div>
          <header className="w-full flex justify-between items-center text-white font-bold text-sm p-5 absolute top-0">
            <div className="flex items-center space-x-2 mx-20">
              <img src="/images/logo.png" alt="会社ロゴ" className="h-10" />
            </div>
            <ul className="hidden sm:flex space-x-8 text-black">
              <li>会社情報</li>
              <li>事業内容</li>
              <li>ニュース</li>
              <li>採用情報</li>
              <li>お問い合わせ</li>
            </ul>
            <div className="flex space-x-4 mx-4">
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
            <h2 className="text-left text-9xl font-bold mb-10 ml-20 bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">Business</h2>
            <div className="flex flex-col space-y-32 ml-20 mr-20">
              <div className="relative">
                <img
                  src="/images/営業AIエージェント.jpg"
                  alt="Sales AI Agent"
                  className="w-full md:w-4/5 h-[550px] object-cover"
                />
                <div className="bg-white p-8 shadow-md rounded-none md:w-3/4 absolute bottom-0 left-1/4 transform -translate-x-1/3 translate-y-1/4 z-10">
                  <h3 className="text-2xl mb-3 tracking-wide font-bold">
                    Sales AI Agent
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed">リード獲得～受注までの商談プロセスのあらゆる活動をAIで業務効率化する。営業マン本来の仕事である顧客との対話に集中できる環境を整える。</p>
                  <div className="text-right">
                    <button className="text-purple-500 text-xs uppercase tracking-widest">View more →</button>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/images/AIシステム開発.jpg"
                  alt="AI/DXシステム開発"
                  className="w-full md:w-4/5 h-[550px] object-cover ml-auto"
                />
                <div className="bg-white p-8 shadow-md rounded-none md:w-3/4 absolute bottom-0 right-1/4 transform translate-x-1/3 translate-y-1/4 z-10">
                  <h3 className="text-2xl mb-3 tracking-wide font-bold">
                    AI/DXシステム開発
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed">1人月単位でのAI人材のアサインから、予算に適した費用感でのPoC推進、AIシステムやアプリケーションの受託開発まで、お客様にあった支援スキームを柔軟に設計。プロジェクトの成功を実現します。</p>
                  <div className="text-right">
                    <button className="text-purple-500 text-xs uppercase tracking-widest">View more →</button>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/images/DXコンサル.png"
                  alt="AI/DXコンサルティング"
                  className="w-full md:w-4/5 h-[550px] object-cover"
                />
                <div className="bg-white p-8 shadow-md rounded-none md:w-3/4 absolute bottom-0 left-1/4 transform -translate-x-1/3 translate-y-1/4 z-10">
                  <h3 className="text-2xl mb-3 tracking-wide font-bold">
                    AI/DXコンサルティング
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed">多数のプロジェクトを成功させてきたコンサルタントをアサインし、AI・DX戦略の策定から実行推進まで泥臭く伴走します。</p>
                  <div className="text-right">
                    <button className="text-purple-500 text-xs uppercase tracking-widest">View more →</button>
                  </div>
                </div>
              </div>
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
    </div>
  );
}

export default MainComponent;