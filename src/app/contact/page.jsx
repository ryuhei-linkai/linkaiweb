"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';

function MainComponent() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHeaderWhite, setIsHeaderWhite] = useState(false);
  const [formData, setFormData] = useState({
    inquiryType: '製品について',
    companyName: '',
    departmentName: '',
    fullName: '',
    email: '',
    inquiryContent: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }

      const data = await response.json();
      setSubmitMessage(data.message || 'お問い合わせを受け付けました。ありがとうございます。');
      setFormData({
        inquiryType: '製品について',
        companyName: '',
        departmentName: '',
        fullName: '',
        email: '',
        inquiryContent: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage(`エラーが発生しました: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
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
              お問い合わせ
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
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">Contact</span>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex border-b border-gray-300 pb-4">
                <h3 className="text-xl font-bold w-1/4">お問い合わせ内容</h3>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  className="w-3/4 border-gray-300 p-2"
                >
                  <option>製品について</option>
                  <option>サポートについて</option>
                  <option>その他</option>
                </select>
              </div>
              <div className="flex border-b border-gray-300 pb-4">
                <h3 className="text-xl font-bold w-1/4">会社名</h3>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="会社名"
                  className="w-3/4 border-gray-300 p-2"
                />
              </div>
              <div className="flex border-b border-gray-300 pb-4">
                <h3 className="text-xl font-bold w-1/4">部署名</h3>
                <input
                  type="text"
                  name="departmentName"
                  value={formData.departmentName}
                  onChange={handleInputChange}
                  placeholder="御社内の部署名"
                  className="w-3/4 border-gray-300 p-2"
                />
              </div>
              <div className="flex border-b border-gray-300 pb-4">
                <h3 className="text-xl font-bold w-1/4">お名前</h3>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="お名前"
                  className="w-3/4 border-gray-300 p-2"
                />
              </div>
              <div className="flex border-b border-gray-300 pb-4">
                <h3 className="text-xl font-bold w-1/4">メールアドレス</h3>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="メールアドレス"
                  className="w-3/4 border-gray-300 p-2"
                />
              </div>
              <div className="flex border-b border-gray-300 pb-4">
                <h3 className="text-xl font-bold w-1/4">お問い合わせ内容</h3>
                <textarea
                  name="inquiryContent"
                  value={formData.inquiryContent}
                  onChange={handleInputChange}
                  placeholder="お問い合わせ内容をご記入ください"
                  className="w-3/4 border-gray-300 p-2"
                  rows="5"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-black text-white py-2" disabled={isSubmitting}>
                {isSubmitting ? '送信中...' : '確認する'}
              </button>
              {submitMessage && <p className="text-center text-green-600">{submitMessage}</p>}
            </form>
          </div>
        </section>

        <div className="py-10 px-5 text-gray-800 relative">
          <div className="absolute inset-0 bg-white opacity-80"></div>
          <div className="relative z-10 max-w-4xl mx-auto rounded-lg border border-gray-300 p-6">
            <ul className="list-disc pl-6 text-gray-600">
              <li>お問い合わせ内容によってはお答えできない場合もあります。</li>
              <li>当社からご回答として送信するメールは個人宛てにお送りするものです。その一部または全てを転載、二次利用することはご遠慮ください。</li>
              <li>当社からの返信メールに対し、引き続きお問い合わせをいただく場合も、恐れ入りますが下記フォームより改めてお問い合わせくださいますようお願いいたします。</li>
            </ul>
          </div>
        </div>

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