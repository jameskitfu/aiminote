import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-4">
        404
      </p>
      <h1 className="text-4xl font-heading font-bold text-slate-900 dark:text-slate-100 mb-4">
        页面暂时不在这里
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
        这个静态版本只保留文章浏览、分类筛选和评论互动。
      </p>
      <Link
        to="/"
        className="inline-flex items-center rounded-xl bg-brand px-5 py-3 text-white hover:opacity-90 transition-opacity"
      >
        返回首页
      </Link>
    </div>
  );
};

export default NotFound;
