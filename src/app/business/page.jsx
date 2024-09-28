"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';

function MainComponent() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [newsItems, setNewsItems] = useState([]);
  const [isHeaderWhite, setIsHeaderWhite] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      
      // FVの高さを超えたらヘッダーを白色に
      const fvHeight = window.innerHeight; // FVの高さを取得（適宜調整してください）
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

    // ニュースアイテムを設定
    setNewsItems([
      { id: '1', title: '株式会社Link AIを設立', date: '2024.02.08', category: 'プレスリリース', image: '/images/LinkAI.png' },
      { id: '2', title: 'WEBマーケティング自動化ツール リリース', date: '2024.05.15', category: 'プレスリリース', image: '/images/tool.png' },
      { id: '3', title: '株式会社Link AIのセールスAIエージェント「ウリマッチョ」、日本初AIエージェントハッカソンで優勝', date: '2024.08.26', category: 'プレスリリース', image: '/images/urimacho.png' },
    ]);
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
事業内容
            </h1>
            <button 
              className="px-6 py-3 text-black transition-all animate-text group"
              onClick={() => {
                const businessSection = document.getElementById('business-section');
                businessSection.scrollIntoView({ behavior: 'smooth' });
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
            <h2 className="text-center text-7xl font-bold mb-10">
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">Products</span>
            </h2>
            <div className="relative mb-10 w-full md:w-[85%]">
              <div className="bg-[#c81684] p-12 rounded-lg flex items-center justify-between relative overflow-hidden h-48 md:h-auto">
                <span className="text-white text-3xl font-bold z-10 md:mr-[15%]">Sales AI Agent</span>
                <div className="absolute inset-0 z-0">
                  <img src="/images/fv.png" alt="背景" className="w-full h-full object-cover opacity-30" />
                </div>
                <div className="absolute bottom-0 right-0 w-1/3 md:w-1/2 h-1/2 md:h-full overflow-visible z-20">
                  <img src="/images/product.png" alt="Urimacho" className="h-full w-full object-cover object-left" />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-20 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center md:space-x-10">
                <img src="/images/4.png" alt="マーケティング自動化ツール" className="w-full md:w-1/4 h-auto shadow-md mb-4 md:mb-0" />
                <div className="w-full md:w-3/4">
                  <h3 className="text-lg font-bold mb-2">マーケティング自動化ツール</h3>
                  <p className="text-sm">
                    マーケティング戦略の自動生成と壁打ち機能を提供。生成した戦略をもとに、Facebook、X、Instagram、メルマガ、LINEなどの投稿案を自動生成します。これにより、マーケティング業務の効率化、一貫性のあるメッセージング、クリエイティブな発想の促進、そしてマルチチャネルでの効果的な顧客エンゲージメントが可能になります。
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:space-x-10">
                <img src="/images/3.png" alt="SEO自動化ツール" className="w-full md:w-1/4 h-auto shadow-md mb-4 md:mb-0" />
                <div className="w-full md:w-3/4">
                  <h3 className="text-lg font-bold mb-2">SEO自動化ツール</h3>
                  <p className="text-sm">
                    キーワード入力だけでSEOに最適化されたタイトルから本文までの投稿案を自動生成。これにより、検索エンジンでの順位向上、コンテンツ制作時間の大幅削減、一貫性のあるSEO戦略の実施が可能になります。さらに、最新のSEOトレンドに常に対応した高品質なコンテンツを効率的に作成できます。
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:space-x-10">
                <img src="/images/5.png" alt="名刺登録自動化ツール" className="w-full md:w-1/4 h-auto shadow-md mb-4 md:mb-0" />
                <div className="w-full md:w-3/4">
                  <h3 className="text-lg font-bold mb-2">名刺登録自動化ツール</h3>
                  <p className="text-sm">
                    名刺登録からお礼メールの送信までを自動化。これにより、データ入力の手間と時間を大幅に削減し、人的エラーを最小限に抑えます。さらに、迅速かつ個別化されたフォローアップにより、新規顧客との関係構築を効率的に行えます。営業活動の生産性向上とクライアントとの関係強化に貢献します。
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:space-x-10">
                <img src="/images/7.png" alt="営業アシスタント" className="w-full md:w-1/4 h-auto shadow-md mb-4 md:mb-0" />
                <div className="w-full md:w-3/4">
                  <h3 className="text-lg font-bold mb-2">営業アシスタント</h3>
                  <p className="text-sm">
                    商談をリアルタイムで文字起こしし、議事録、営業マンへのアドバイス、提案資料、お礼メールを自動生成。リードタイムの短縮、受注率の向上、商談数の増加、新人教育の効率化などのメリットがあります。さらに、一貫性のある顧客対応、データに基づいた戦略立案、営業プロセスの標準化にも貢献し、組織全体の営業力を強化します。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="solution-section" className="py-20 px-5 text-gray-800 relative">
          <div className="absolute inset-0 bg-white opacity-80"></div>
          <div className="relative z-10">
            <h2 className="text-center text-7xl font-bold mb-10">
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">Solution</span>
            </h2>
            <div className="relative mb-10 w-full md:w-[85%]">
              <div className="bg-[#c81684] p-12 rounded-lg flex items-center justify-between relative overflow-hidden h-48 md:h-auto">
                <span className="text-white text-3xl font-bold z-10 md:mr-[15%]">AI・DXソリューション</span>
                <div className="absolute inset-0 z-0">
                  <img src="/images/fv.png" alt="背景" className="w-full h-full object-cover opacity-30" />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-20 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center md:space-x-10">
                <img src="/images/9.png" alt="AI/DXコンサルティング" className="w-full md:w-1/4 h-auto shadow-md mb-4 md:mb-0" />
                <div className="w-full md:w-3/4">
                  <h3 className="text-lg font-bold mb-2">AI/DXコンサルティング</h3>
                  <p className="text-sm">
                    生成AIなどのテクノロジーを活用して企業の生産性を向上させるためのコンサルティングを提供します。戦略の策定から実行までをトータルにサポートします。これにより、業務プロセスの最適化、意思決定の迅速化、イノベーションの促進が可能になります。また、競争力の強化、コスト削減、顧客満足度の向上など、多様なビジネス課題の解決に貢献します。
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:space-x-10">
                <img src="/images/10.png" alt="AIシステム受託開発" className="w-full md:w-1/4 h-auto shadow-md mb-4 md:mb-0" />
                <div className="w-full md:w-3/4">
                  <h3 className="text-lg font-bold mb-2">AIシステム受託開発</h3>
                  <p className="text-sm">
                    生成AIのシステムをスピード感をもって開発します。最新のAI技術を活用し、お客様のニーズに合わせたカスタマイズされたソリューションを提供します。迅速な開発プロセスにより、市場投入までの時間を短縮し、競争優位性を確保できます。また、柔軟なスケーリングが可能なため、ビジネスの成長に合わせてシステムを拡張することができます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-5 text-gray-800 relative">
          <div className="absolute inset-0 bg-white opacity-80"></div>
          <div className="relative z-10 mx-auto max-w-5xl">
            <div className="bg-white bg-opacity-80 p-10 rounded-lg mx-4 md:mx-8">
              <h2 className="text-center text-4xl font-bold mb-10">News</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {newsItems.map((item) => (
                  <Link href={`/news/${item.id}`} key={item.id} className="block">
                    <div className="p-5 border rounded shadow-sm bg-white">
                      <Image src={item.image} alt={item.title} width={150} height={100} className="h-[100px] w-full object-cover mb-2" />
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="text-sm text-gray-500">{item.date}</span>
                        <span className="px-2 py-1 bg-gray-200 text-xs text-gray-700 rounded-full">{item.category}</span>
                      </div>
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link href="/news" className="inline-block relative group">
                  <span className="text-purple-600 text-lg font-semibold">VIEW ALL →</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 bg-opacity-80 text-white py-32 text-center relative">
          <div className="absolute inset-0 z-0">
            <Image src="/images/東京タワー.png" alt="東京タワー" layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-5">AI FOR HAPPINESS</h2>
            <p className="mb-10">AIを活用して、人々の幸福を向上させる</p>
            <button className="border border-white px-5 py-3 hover:bg-white hover:text-gray-800 transition-all">
              VIEW MORE
            </button>
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

export default MainComponent;