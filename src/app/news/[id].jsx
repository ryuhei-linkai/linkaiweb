import { useRouter } from 'next/router';
import Image from 'next/image';
import { getNewsById } from '../../lib/api'; // APIからニュースを取得する関数をインポート

const NewsDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const newsItem = getNewsById(id); // IDに基づいてニュースアイテムを取得

  if (!newsItem) {
    return <div>ニュースが見つかりませんでした。</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">{newsItem.title}</h1>
      <div className="mb-8">
        <Image src={newsItem.image} alt={newsItem.title} width={800} height={450} className="rounded-md" />
      </div>
      <div className="text-gray-700">
        <p className="mb-4">{newsItem.date}</p>
        <p className="mb-4">{newsItem.category}</p>
        <div dangerouslySetInnerHTML={{ __html: newsItem.content }} /> {/* マークダウンをHTMLに変換して表示 */}
      </div>
    </div>
  );
};

export default NewsDetailPage;