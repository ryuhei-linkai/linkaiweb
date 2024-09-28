import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ニュース記事を全て取得する関数
export const getAllNews = () => {
  const newsDirectory = path.join(process.cwd(), 'src/content/news');
  const filenames = fs.readdirSync(newsDirectory);
  const allNews = filenames.map((filename) => {
    const filePath = path.join(newsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      id: filename.replace(/\.md$/, ''),
      ...data,
      content,
    };
  });
  return allNews;
};

// IDに基づいてニュース記事を取得する関数
export const getNewsById = (id) => {
  const newsDirectory = path.join(process.cwd(), 'src/content/news');
  const filePath = path.join(newsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    id,
    ...data,
    content,
  };
};