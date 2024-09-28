"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState('すべて');

  const newsItems = [
    { id: '1', title: '株式会社Link AIを設立', date: '2024.02.08', category: 'プレスリリース', image: '/images/LinkAI.png' },
    { id: '2', title: 'WEBマーケティング自動化ツール リリース', date: '2024.05.15', category: 'プレスリリース', image: '/images/tool.png' },
    { id: '3', title: '株式会社Link AIのセールスAIエージェント「ウリマッチョ」、日本初AIエージェントハッカソンで優勝', date: '2024.08.26', category: 'プレスリリース', image: '/images/urimacho.png' },
  ];

  const filteredNews = activeCategory === 'すべて' ? newsItems : newsItems.filter(item => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">ニュース</h1>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">カテゴリ</h2>
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
        {filteredNews.map((item) => (
          <Link href={`/news/${item.id}`} key={item.id} className="block">
            <div className="flex items-start space-x-6 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="w-1/4">
                <Image src={item.image} alt={item.title} width={200} height={120} className="rounded-md" />
              </div>
              <div className="w-3/4">
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-sm text-gray-500">{item.date}</span>
                  <span className="px-2 py-1 bg-gray-200 text-xs text-gray-700 rounded-full">{item.category}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;