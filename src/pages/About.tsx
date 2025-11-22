import React from 'react';
import { Github, Mail, Linkedin, Code, Database, Palette, Zap, Link } from 'lucide-react';

const About: React.FC = () => {
  const skills = [
    { name: 'React', level: 90, icon: Code, color: 'bg-blue-500' },
    { name: 'Vue.js', level: 85, icon: Code, color: 'bg-green-500' },
    { name: 'TypeScript', level: 88, icon: Code, color: 'bg-blue-600' },
    { name: 'JavaScript', level: 92, icon: Code, color: 'bg-yellow-500' },
    { name: 'CSS/SASS', level: 85, icon: Palette, color: 'bg-pink-500' },
    { name: 'Node.js', level: 80, icon: Database, color: 'bg-green-600' },
  ];

  const experiences = [
    {
      title: '高级前端工程师',
      company: '某知名互联网公司',
      period: '2021 - 至今',
      description: '负责大型前端项目的架构设计和核心功能开发，带领团队完成多个重要项目。',
    },
    {
      title: '前端工程师',
      company: '某科技公司',
      period: '2019 - 2021',
      description: '参与多个 Web 应用的开发，积累了丰富的 React 和 Vue 项目经验。',
    },
    {
      title: '初级前端开发',
      company: '某创业公司',
      period: '2018 - 2019',
      description: '学习前端开发技术，参与产品原型开发和用户界面设计。',
    },
  ];

  return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-brand-700 to-brand px-8 py-12 text-white rounded-2xl shadow-soft dark:from-brand-700/40 dark:to-brand/30">
            <div className="flex items-center space-x-6">
              <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-brand-700">爱米</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">爱米</h1>
                <p className="text-white/90 text-lg">前端开发工程师 & 技术博主</p>
                <p className="text-white/80 mt-2">
                  专注于前端技术分享，热爱探索新技术，致力于构建优雅的用户界面
                </p>
              </div>
            </div>
          </div>
          
          <div className="px-8 py-6">
            <div className="flex space-x-6">
              <a href="mailto:aimi@example.com" className="flex items-center text-slate-600 hover:text-blue-600 transition-colors">
                <Mail className="h-5 w-5 mr-2" />
                aimi@example.com
              </a>
              <a href="https://github.com/aimi" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-600 hover:text-blue-600 transition-colors">
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </a>
              <a href="https://linkedin.com/in/aimi" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-600 hover:text-blue-600 transition-colors">
                <Linkedin className="h-5 w-5 mr-2" />
                LinkedIn
              </a>
              <a href="https://www.xiaohongshu.com/" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-600 hover:text-blue-600 transition-colors">
                <Link className="h-5 w-5 mr-2" />
                小红书
              </a>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="px-8 py-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center">
              <Zap className="h-6 w-6 mr-3 text-yellow-500" />
              技术技能
            </h2>
          </div>
          <div className="px-8 py-6">
            <div className="grid gap-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${skill.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                        <span className="text-sm text-slate-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${skill.color} transition-all duration-500`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="px-8 py-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">工作经历</h2>
          </div>
          <div className="px-8 py-6">
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-semibold text-slate-900">{exp.title}</h3>
                      <span className="text-sm text-slate-500">{exp.period}</span>
                    </div>
                    <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                    <p className="text-slate-600 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Personal Introduction */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">关于我</h2>
          </div>
          <div className="px-8 py-6">
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
              <p className="mb-4">
                大家好，我是爱米，一名充满热情的前端开发工程师。从事前端开发工作已有 6 年多，
                在这期间我见证了前端技术的快速发展，也积累了丰富的项目经验。
              </p>
              
              <p className="mb-4">
                我热爱技术，喜欢探索新的前端框架和工具。在日常工作中，我不仅关注代码的功能实现，
                更注重代码的可维护性、性能优化和用户体验。我相信好的前端开发不仅是实现功能，
                更是创造优秀的用户体验。
              </p>
              
              <p className="mb-4">
                创建这个博客的目的是希望能够分享我在前端开发过程中学到的知识和经验，
                同时也希望能够与更多的前端开发者交流学习。我相信通过分享和交流，
                我们可以共同进步，推动前端技术的发展。
              </p>
              
              <p>
                如果您对我的文章有任何问题或建议，欢迎通过邮箱或社交媒体与我联系。
                让我们一起在前端技术的道路上不断前进！
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default About;
