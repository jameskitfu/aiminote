import React from 'react';
import { ArrowUpRight, Atom, CircuitBoard, Compass, Gem, Github, Layers3, Orbit } from 'lucide-react';
import { useI18n } from '@/contexts/useI18n';

const About: React.FC = () => {
  const { lang } = useI18n();

  const copy = lang === 'zh'
    ? {
        eyebrow: '人物 / 技术人格档案',
        title: '我把前端当作一种材料学，也当作一种审美学。',
        intro:
          '我是爱米。对我来说，前端不是简单把页面做出来，而是持续研究信息如何出现、动效如何呼吸、结构如何压住复杂度，以及技术如何被做得更美。',
        visualTitle: '我想做的不是网页，而是会运行的数字作品。',
        visualBody:
          '技术不是审美的反面。相反，它让节奏、结构、呼吸、留白和动态都变得更可控。真正迷人的前端页面，应该同时像系统、像画、也像一种被精心调好的乐器。',
        profileTitle: '作者档案',
        profileSubtitle: '前端设计型工程师 / 静态内容工作流沉迷者',
        profileMeta: {
          modeLabel: '模式',
          modeValue: '静态、作者驱动、面向未来',
          focusLabel: '关注点',
          focusValue: '前端系统与界面审美判断',
          locationLabel: '领域',
          locationValue: 'Web / 档案 / 动效',
        },
        philosophyEyebrow: '立场 / 方法论',
        statementTitle: '我在意的不是“会不会做”，而是“做出来有没有判断”。',
        statementBody:
          '我喜欢那些同时拥有技术准确度、界面克制力和个性痕迹的作品。写代码的时候，我会反复打磨节奏、层级、字重、延迟、边界、材料感，直到页面开始像一个完整的系统。',
        blocks: [
          {
            title: '当前沉迷',
            icon: Orbit,
            items: ['编辑性排版系统', '静态内容工作流', '克制但有力量的动效'],
          },
          {
            title: '工作方式',
            icon: Compass,
            items: ['先建结构，再建视觉', '先定 token，再做组件', '反对无意义的热闹'],
          },
          {
            title: '技术偏好',
            icon: CircuitBoard,
            items: ['React / Next.js', 'TypeScript', 'Markdown / 内容架构'],
          },
        ],
        archiveTitle: '我的技术人格更像一份档案，而不是一份简历。',
        archiveBody:
          '我不想把自己写成传统的技能条和职位列表，那太平了。更准确的方式，是把自己看作一个不断更新中的前端档案：有偏好，有洁癖，有审美方向，也有正在形成中的方法论。',
        principlesTitle: '原则',
        principles: [
          '界面必须有秩序感，哪怕它看起来极其自由。',
          '酷炫必须服务信息，不服务噱头。',
          '女性技术表达不等于柔弱，更不等于模板化“少女感”。',
          '真正高级的页面，应该让人感觉到控制力，而不是装饰欲。',
        ],
        linksTitle: '外部入口',
        archiveEyebrow: '身份 / 档案模型',
        links: [
          { label: 'GitHub', href: 'https://github.com/jameskitfu' },
          { label: '仓库', href: 'https://github.com/jameskitfu/aiminote' },
          { label: '网站', href: 'https://www.aimi.blog' },
        ],
      }
    : {
        eyebrow: 'Profile / authored intelligence',
        title: 'I treat frontend as both material science and aesthetic discipline.',
        intro:
          'I am Aimi. To me, frontend work is not about merely shipping pages. It is about studying how information appears, how motion breathes, how structure suppresses complexity, and how technology can be made beautiful.',
        visualTitle: 'I am not trying to make webpages. I am trying to make digital works that run.',
        visualBody:
          'Technology is not the opposite of aesthetics. It is what makes rhythm, structure, breath, whitespace, and motion precise. The most compelling frontend surfaces should feel like systems, paintings, and tuned instruments at once.',
        profileTitle: 'Author profile',
        profileSubtitle: 'Frontend designer-engineer / static publishing obsessive',
        profileMeta: {
          modeLabel: 'Mode',
          modeValue: 'static, authored, future-facing',
          focusLabel: 'Focus',
          focusValue: 'frontend systems and interface taste',
          locationLabel: 'Location',
          locationValue: 'web / archive / motion',
        },
        philosophyEyebrow: 'Position / philosophy',
        statementTitle: 'What matters is not whether it can be built, but whether the result shows judgement.',
        statementBody:
          'I am drawn to work that combines technical precision, visual restraint, and a clear personal signature. When I build, I keep tuning rhythm, hierarchy, weight, delay, edges, and material until the page behaves like a coherent system.',
        blocks: [
          {
            title: 'Current obsessions',
            icon: Orbit,
            items: ['Editorial layout systems', 'Static publishing workflows', 'Restrained but powerful motion'],
          },
          {
            title: 'Working mode',
            icon: Compass,
            items: ['Structure before visuals', 'Tokens before components', 'No meaningless noise'],
          },
          {
            title: 'Preferred stack',
            icon: CircuitBoard,
            items: ['React / Next.js', 'TypeScript', 'Markdown / content architecture'],
          },
        ],
        archiveTitle: 'My technical identity feels closer to an evolving archive than a resume.',
        archiveBody:
          'I do not want to flatten myself into progress bars and job titles. A better description is an authored frontend archive: one with preferences, standards, aesthetic direction, and a methodology that keeps sharpening.',
        principlesTitle: 'Principles',
        principles: [
          'Interfaces must feel ordered, even when they look free.',
          'Spectacle must serve information, never replace it.',
          'Feminine technical expression is not softness, and not template cuteness either.',
          'The best pages communicate control, not decoration.',
        ],
        linksTitle: 'External links',
        archiveEyebrow: 'Identity / archive model',
        links: [
          { label: 'GitHub', href: 'https://github.com/jameskitfu' },
          { label: 'Repository', href: 'https://github.com/jameskitfu/aiminote' },
          { label: 'Website', href: 'https://www.aimi.blog' },
        ],
      };

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <section className="hero-canvas overflow-hidden p-8 sm:p-10 lg:p-12">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <div>
            <p className="eyebrow mb-6">{copy.eyebrow}</p>
            <h1 className="max-w-4xl text-balance font-heading text-[3.4rem] leading-[0.94] text-white sm:text-[4.8rem]">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {copy.intro}
            </p>
            <div className="mt-8 max-w-3xl border-t border-white/10 pt-6">
              <h2 className="font-heading text-3xl text-white">{copy.visualTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                {copy.visualBody}
              </p>
            </div>
          </div>

          <div className="art-panel min-h-[22rem]">
            <div className="scanline" />
            <div className="relative z-10 flex h-full flex-col justify-between p-7">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  {copy.profileTitle}
                </span>
                <Gem className="h-4 w-4 text-brand" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-[1.6rem] border border-brand/25 bg-slate-950/80 text-2xl font-semibold text-white shadow-glow">
                  A
                </div>
                <div>
                  <h2 className="font-heading text-3xl text-white">Aimi</h2>
                  <p className="mt-1 text-sm text-slate-300">
                    {copy.profileSubtitle}
                  </p>
                </div>
              </div>
              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">{copy.profileMeta.modeLabel}</span>
                  <span>{copy.profileMeta.modeValue}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">{copy.profileMeta.focusLabel}</span>
                  <span>{copy.profileMeta.focusValue}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">{copy.profileMeta.locationLabel}</span>
                  <span>{copy.profileMeta.locationValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="section-frame p-8 sm:p-10">
          <p className="eyebrow mb-5">{copy.philosophyEyebrow}</p>
          <h2 className="font-heading text-4xl leading-tight text-slate-950 dark:text-white">
            {copy.statementTitle}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
            {copy.statementBody}
          </p>
        </div>

        <div className="section-frame p-8 sm:p-10">
          <div className="space-y-4">
            {copy.blocks.map(({ title, icon: Icon, items }) => (
              <div key={title} className="info-rail p-5">
                <div className="mb-4 flex items-center gap-3">
                  <Icon className="h-5 w-5 text-brand" />
                  <h3 className="font-heading text-2xl text-white">{title}</h3>
                </div>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-300">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-signal" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="section-frame p-8 sm:p-10">
          <p className="eyebrow mb-5">{copy.archiveEyebrow}</p>
          <h2 className="font-heading text-4xl leading-tight text-slate-950 dark:text-white">
            {copy.archiveTitle}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
            {copy.archiveBody}
          </p>
        </div>

        <div className="section-frame p-8 sm:p-10">
          <div className="mb-5 flex items-center gap-3">
            <Atom className="h-5 w-5 text-brand-700 dark:text-brand-500" />
            <h2 className="font-heading text-4xl text-slate-950 dark:text-white">{copy.principlesTitle}</h2>
          </div>
          <div className="space-y-4">
            {copy.principles.map((principle, index) => (
              <div key={principle} className="flex items-start gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-brand/20 bg-slate-950 text-xs font-semibold text-brand">
                  0{index + 1}
                </span>
                <p className="pt-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-frame p-8 sm:p-10">
        <div className="mb-6 flex items-center gap-3">
          <Layers3 className="h-5 w-5 text-brand-700 dark:text-brand-500" />
          <h2 className="font-heading text-4xl text-slate-950 dark:text-white">{copy.linksTitle}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {copy.links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-[1.5rem] border border-slate-300/60 bg-white/16 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 dark:border-slate-700 dark:bg-slate-950/40"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{item.label}</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-slate-400" />
              </div>
              <p className="mt-4 break-all text-sm leading-7 text-slate-600 dark:text-slate-300">{item.href}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
