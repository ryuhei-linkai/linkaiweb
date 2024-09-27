import React from "react";

function MainComponent() {
  return (
    <div className="w-full bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="h-screen flex flex-col justify-center items-center text-center p-5 relative">
        <header className="w-full flex justify-between items-center text-black font-bold text-sm p-5 absolute top-0">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="会社ロゴ" className="w-8 h-8" />
            <span>PLAiD</span>
          </div>
          <ul className="hidden sm:flex space-x-4">
            <li>会社情報</li>
            <li>事業内容</li>
            <li>ニュース</li>
            <li>IR</li>
            <li>サステナビリティ</li>
            <li>採用情報</li>
            <li>お問い合わせ</li>
          </ul>
          <div className="flex space-x-2">
            <span>JP</span>
            <span>| EN</span>
          </div>
        </header>
        <div className="flex flex-col items-center mt-32">
          <img
            src="/feature-image.jpg"
            alt="事業内容イメージ"
            className="w-full max-w-[800px] h-auto mb-8"
          />
          <button className="px-6 py-3 border border-black text-black hover:border-red-500 hover:text-red-500 transition-all">
            VIEW MORE →
          </button>
        </div>
        <div className="w-full flex justify-center mt-10">
          <div className="w-[80%] h-[300px] bg-gray-100 flex shadow-lg rounded overflow-hidden">
            <img
              src="/service1.jpg"
              alt="サービスイメージ"
              className="w-1/5 h-full object-cover"
            />
            <img
              src="/service2.jpg"
              alt="サービスイメージ"
              className="w-1/5 h-full object-cover"
            />
            <img
              src="/service3.jpg"
              alt="サービスイメージ"
              className="w-1/5 h-full object-cover"
            />
            <img
              src="/service4.jpg"
              alt="サービスイメージ"
              className="w-1/5 h-full object-cover"
            />
            <img
              src="/service5.jpg"
              alt="サービスイメージ"
              className="w-1/5 h-full object-cover"
            />
          </div>
        </div>
      </div>

      <section className="py-20 px-5 bg-gray-100 text-gray-800">
        <h2 className="text-center text-4xl font-bold mb-10">Our Business</h2>
        <div className="flex flex-col space-y-20 items-center">
          {[
            { name: "KARTE", image: "/service1.jpg" },
            { name: "KARTE Datahub", image: "/service2.jpg" },
            { name: "KARTE Blocks", image: "/service3.jpg" },
            { name: "KARTE RightSupport", image: "/service4.jpg" },
            { name: "KARTE Signals", image: "/service5.jpg" },
          ].map((service, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center md:items-start shadow-lg rounded overflow-hidden w-full"
            >
              <img
                src={service.image}
                alt={`${service.name}イメージ`}
                className="w-full md:w-1/4 h-[200px] object-cover"
              />
              <div className="bg-white p-5 md:w-3/4">
                <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                <p className="mb-4">
                  カスタマーエクスペリエンスの向上に貢献します。
                </p>
                <button className="text-red-500">VIEW MORE →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-5 bg-green-300 text-gray-800">
        <h2 className="text-center text-4xl font-bold mb-10">
          Professional Service
        </h2>
        <div className="flex justify-center">
          <div className="bg-gray-200 p-5 rounded-lg shadow-md flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-5 md:mb-0">
              <h3 className="text-xl font-bold">Professional Service</h3>
              <p>専門的な知識と経験を持ったチーム.</p>
            </div>
            <img
              src="/professional.jpg"
              alt="プロフェッショナルサービスイメージ"
              className="md:w-1/2 h-[200px] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-5 bg-white text-gray-800">
        <h2 className="text-center text-4xl font-bold mb-10">
          Databeat & Codatum
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-around">
          {[
            { name: "Databeat", image: "/databeat.jpg" },
            { name: "Codatum", image: "/codatum.jpg" },
          ].map((product, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center shadow-lg rounded overflow-hidden w-full md:w-1/3 mb-10"
            >
              <img
                src={product.image}
                alt={`${product.name}イメージ`}
                className="w-full h-[200px] object-cover"
              />
              <div className="bg-white p-5">
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="mb-4">最新のデータ管理技術。</p>
                <button className="text-red-500">VIEW MORE →</button>
              </div>
            </div>
          ))}
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