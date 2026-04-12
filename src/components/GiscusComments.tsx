import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';

const GISCUS_CONFIG = {
  repo: import.meta.env.VITE_GISCUS_REPO,
  repoId: import.meta.env.VITE_GISCUS_REPO_ID,
  category: import.meta.env.VITE_GISCUS_CATEGORY,
  categoryId: import.meta.env.VITE_GISCUS_CATEGORY_ID,
  mapping: import.meta.env.VITE_GISCUS_MAPPING || 'pathname',
  strict: import.meta.env.VITE_GISCUS_STRICT || '0',
  reactionsEnabled: import.meta.env.VITE_GISCUS_REACTIONS || '1',
  emitMetadata: import.meta.env.VITE_GISCUS_EMIT_METADATA || '0',
  inputPosition: import.meta.env.VITE_GISCUS_INPUT_POSITION || 'top',
  lang: import.meta.env.VITE_GISCUS_LANG || 'zh-CN',
};

const isConfigured =
  !!GISCUS_CONFIG.repo &&
  !!GISCUS_CONFIG.repoId &&
  !!GISCUS_CONFIG.category &&
  !!GISCUS_CONFIG.categoryId;

const getThemeName = (isDark: boolean) => (isDark ? 'dark_dimmed' : 'light');

const GiscusComments: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    if (!containerRef.current || !isConfigured) {
      return;
    }

    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', GISCUS_CONFIG.repo);
    script.setAttribute('data-repo-id', GISCUS_CONFIG.repoId);
    script.setAttribute('data-category', GISCUS_CONFIG.category);
    script.setAttribute('data-category-id', GISCUS_CONFIG.categoryId);
    script.setAttribute('data-mapping', GISCUS_CONFIG.mapping);
    script.setAttribute('data-strict', GISCUS_CONFIG.strict);
    script.setAttribute('data-reactions-enabled', GISCUS_CONFIG.reactionsEnabled);
    script.setAttribute('data-emit-metadata', GISCUS_CONFIG.emitMetadata);
    script.setAttribute('data-input-position', GISCUS_CONFIG.inputPosition);
    script.setAttribute('data-theme', getThemeName(isDark));
    script.setAttribute('data-lang', GISCUS_CONFIG.lang);

    containerRef.current.appendChild(script);
  }, [isDark]);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');

    if (!iframe?.contentWindow) {
      return;
    }

    iframe.contentWindow.postMessage(
      {
        giscus: {
          setConfig: {
            theme: getThemeName(isDark),
          },
        },
      },
      'https://giscus.app'
    );
  }, [isDark]);

  if (!isConfigured) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-6 text-sm text-slate-500 dark:text-slate-400">
        评论区尚未配置。上线前填好 `VITE_GISCUS_*` 环境变量，这里就会自动显示评论组件。
      </div>
    );
  }

  return <div ref={containerRef} />;
};

export default GiscusComments;
