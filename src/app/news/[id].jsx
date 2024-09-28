import { useRouter } from 'next/router';
import Image from 'next/image';

const newsItems = [
  { id: '1', title: '楽天グループ、KASTEシリーズを導入し、顧客体験と事業成果を最大化', date: '2024.02.29', category: 'プレスリリース', image: '/images/news-image-1.jpg', content: '楽天グループは、KASTEシリーズを導入することで、顧客体験と事業成果を最大化しました。これにより、顧客満足度が大幅に向上し、売上も増加しました。' },
  { id: '2', title: 'プレイド、KASTEのカスタマーサクセス組織が「CSAT STARS 2023」を受賞', date: '2024.01.15', category: 'プレスリリース', image: '/images/news-image-2.jpg', content: 'プレイドのカスタマーサクセス組織は、「CSAT STARS 2023」を受賞しました。この賞は、顧客満足度の向上に貢献した企業に贈られるもので、プレイドの取り組みが高く評価されました。' },
  { id: '3', title: '年末年始の営業日程について', date: '2023.12.20', category: 'お知らせ', image: '/images/news-image-3.jpg', content: '年末年始の営業日程についてお知らせします。弊社は、12月29日から1月3日まで休業いたします。1月4日から通常営業を再開いたしますので、よろしくお願いいたします。' },
];

const NewsDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const newsItem = newsItems.find(item => item.id === id);

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
        <p>{newsItem.content}</p>
      </div>
    </div>
  );
};

export default NewsDetailPage;