import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl py-20">
      <div className="section-frame p-10 text-center sm:p-14">
        <p className="eyebrow justify-center mb-6">404 / missing section</p>
        <h1 className="font-heading text-5xl text-slate-950 dark:text-white">页面暂时不在这里</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          你访问的内容不在当前档案结构里。这个版本保留了文章、分类、评论和关于页。
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 dark:bg-slate-100 dark:text-slate-950"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
