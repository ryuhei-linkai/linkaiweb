"use client";
import React from "react";

function MainComponent() {
  return (
    <div className="w-full">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-5 py-4 flex justify-between items-center">
          <img src="/logo.png" alt="会社ロゴ" className="w-10 h-10" />
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  ホーム
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  会社情報
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  事業内容
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  IR
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  採用情報
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  お問い合わせ
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="py-20 px-5 bg-gray-100 text-gray-800">
        <h2 className="text-center text-4xl font-bold mb-10">お問い合わせ</h2>
        <div className="max-w-[800px] mx-auto bg-white p-10 shadow-md">
          <form className="space-y-5">
            <div>
              <label htmlFor="inquiry-type" className="block mb-1">
                お問い合わせ内容
              </label>
              <select
                id="inquiry-type"
                name="inquiry-type"
                className="w-full border-gray-300 p-2"
              >
                <option>製品について</option>
                <option>サポートについて</option>
                <option>その他</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                name="company-name"
                placeholder="会社名"
                className="w-full border-gray-300 p-2"
              />
            </div>
            <div>
              <input
                type="text"
                name="department-name"
                placeholder="御社内の部署名"
                className="w-full border-gray-300 p-2"
              />
            </div>
            <div>
              <input
                type="text"
                name="full-name"
                placeholder="お名前"
                className="w-full border-gray-300 p-2"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="メールアドレス"
                className="w-full border-gray-300 p-2"
              />
            </div>
            <div>
              <textarea
                name="inquiry-content"
                placeholder="お問い合わせ内容をご記入ください"
                className="w-full border-gray-300 p-2"
                rows="5"
              ></textarea>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="privacy-check" name="privacy-check" />
              <label htmlFor="privacy-check" className="text-sm">
                個人情報保護方針に同意します
              </label>
            </div>
            <button type="submit" className="w-full bg-black text-white py-2">
              確認する
            </button>
          </form>
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