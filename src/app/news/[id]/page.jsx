import { getNewsById } from '@/lib/api';
import { notFound } from 'next/navigation';

export default async function NewsArticle({ params }) {
  const article = await getNewsById(params.id);

  if (!article) {
    notFound();
  }

  return (
    <article>
      <h1>{article.title}</h1>
      <p>{article.date}</p>
      <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
    </article>
  );
}