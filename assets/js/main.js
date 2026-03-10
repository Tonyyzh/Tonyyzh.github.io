document.addEventListener('DOMContentLoaded', () => {
  // 1. 初始化控制按钮（即使语言没加载完也能点）
  initThemeToggle();
  initLangToggle();
  initSmoothScroll();
});

// 2. 监听语言加载完成事件 (核心：重绘所有动态模块)
window.addEventListener('i18nLoaded', () => {
  console.log('[main] i18n loaded, rendering content...');
  initProjects();
  initOpenSource();
  initTimeline();
  initTechStack();
  initContactLinks();
});

// ================= 主题切换 (修复版) =================
function initThemeToggle() {
  const toggleBtn = document.querySelector('.theme-toggle');
  const htmlEl = document.documentElement;

  if (!toggleBtn) return;

  // 初始化状态
  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlEl.setAttribute('data-theme', savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // 设置 DOM 和存储
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    console.log(`[Theme] Switched to ${newTheme}`);
  });
}

// ================= 语言切换 =================
function initLangToggle() {
  const toggleBtn = document.querySelector('.lang-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const current = window.i18n.currentLang();
    const next = current === 'en' ? 'zh' : 'en';
    console.log(`[Lang] Switching to ${next}...`);
    window.i18n.changeLang(next);
  });
}

// ... (Previous code remains the same)

// ================= 1. 精选项目渲染 =================
function initProjects() {
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const projects = [
    { 
      img: "assets/images/Hero-gen2/hero.jpg",
      titleKey: "hero-gen2.title", 
      descKey: "hero-gen2.desc",
      tagsKey: "hero-gen2.tags",
      link: "pages/projects/hero-gen2.html"
    },
    { 
      img: "assets/images/drone2025/Drone2025.jpg",
      titleKey: "projects.drone.title", 
      descKey: "projects.drone.desc",
      tagsKey: "projects.drone.tags",
      link: "pages/projects/drone.html"
    },
    { 
      img: "assets/images/standard2022wide.jpg",
      titleKey: "projects.infantry.title", 
      descKey: "projects.infantry.desc",
      tagsKey: "projects.infantry.tags",
      link: "pages/projects/infantry.html"
    },
    { 
      img: "assets/images/wheelleg.jpg",
      titleKey: "projects.wheelleg.title", 
      descKey: "projects.wheelleg.desc",
      tagsKey: "projects.wheelleg.tags",
      link: "pages/projects/wheelleg.html"
    },
    { 
      img: "assets/images/ongoing-temp.png",
      titleKey: "projects.ongoing.title", 
      descKey: "projects.ongoing.desc",
      tagsKey: "projects.ongoing.tags",
      link: "#"
    }
  ];

  projects.forEach(p => {
    const tags = window.i18n.get(p.tagsKey);
    const tagsHtml = Array.isArray(tags) 
      ? `<div class="project-tags">${tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>`
      : '';

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div style="overflow:hidden;">
        <img src="${p.img}" alt="${window.i18n.get('projects.imgAlt')}" class="project-thumbnail">
      </div>
      <div class="project-info">
        <h3>${window.i18n.get(p.titleKey)}</h3>
        <p>${window.i18n.get(p.descKey)}</p>
        ${tagsHtml}
        <a href="${p.link}" class="project-link">${window.i18n.get('projects.viewDetail')}</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ... (Rest of the code remains the same)

// // ================= 2. 开源贡献渲染 =================
// function initOpenSource() {
//   const grid = document.querySelector('.opensource-grid');
//   if (!grid) return;
//   grid.innerHTML = ''; // 【关键】清空

//   const items = [
//     { key: "opensource.item1", linkCode: "https://github.com/Lain-Ego0/BRS-Parallel-Robot", linkDoc: null },
//     { key: "opensource.item2", linkCode: "https://github.com/Lain-Ego0/SliverWolf-ArmRobotDog", linkDoc: null },
//     { key: "opensource.item3", linkCode: null, linkDoc: "https://wcn9j5638vrr.feishu.cn/wiki/space/7570988375279517715" },
//     { key: "opensource.item4", linkCode: "https://github.com/Lain-Ego0/ROBOCON2024-R1", linkDoc: null },
//     { key: "opensource.item5", linkCode: "https://github.com/Lain-Ego0/ROBOCON2024-3508DOG", linkDoc: null },
//     { key: "opensource.item6", linkCode: "https://github.com/Lain-Ego0/HTDW4438_Isaacgym", linkDoc: null },
//     { key: "opensource.item7", linkCode: "https://github.com/Lain-Ego0/HTDW4438-OpenDog", linkDoc: null },
//     { key: "opensource.item8", linkCode: "https://github.com/Lain-Ego0/Lain-s-Note", linkDoc: null },
//     { key: "opensource.item9", linkCode: "https://github.com/Lain-Ego0/Lain-s-PDF2PNG", linkDoc: null }
//   ];

//   items.forEach(item => {
//     const tags = window.i18n.get(`${item.key}.tags`) || [];
//     const tagsHtml = Array.isArray(tags) ? tags.map(t => `<span class="os-tag">${t}</span>`).join('') : '';
    
//     let buttonsHtml = '';
//     if (item.linkCode) buttonsHtml += `<a href="${item.linkCode}" target="_blank" class="os-btn"><i class="fab fa-github"></i> ${window.i18n.get('opensource.btnCode')}</a>`;
//     if (item.linkDoc) buttonsHtml += `<a href="${item.linkDoc}" target="_blank" class="os-btn"><i class="fas fa-book"></i> ${window.i18n.get('opensource.btnDoc')}</a>`;

//     const card = document.createElement('div');
//     card.className = 'os-card';
//     card.innerHTML = `
//       <div class="os-header">
//         <div class="os-title">${window.i18n.get(`${item.key}.title`)}</div>
//         <i class="fas fa-code-branch" style="color:var(--primary); opacity:0.5;"></i>
//       </div>
//       <p class="os-desc">${window.i18n.get(`${item.key}.desc`)}</p>
//       <div class="os-tags">${tagsHtml}</div>
//       <div class="os-actions">${buttonsHtml}</div>
//     `;
//     grid.appendChild(card);
//   });
// }

// ================= 3. 时间轴渲染 =================
function initTimeline() {
  const container = document.querySelector('.timeline-container');
  if (!container) return;
  container.innerHTML = ''; // 【关键】清空

  const events = [
    "timeline.event9", "timeline.event8", "timeline.event7", 
    "timeline.event6", "timeline.event5", "timeline.event4", 
    "timeline.event3", "timeline.event2", "timeline.event1"
  ];

  events.forEach(key => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
      <div class="timeline-dot"></div>
      <span class="timeline-date">${window.i18n.get(`${key}.date`)}</span>
      <div class="timeline-content">
        <h3>${window.i18n.get(`${key}.title`)}</h3>
        <p>${window.i18n.get(`${key}.desc`)}</p>
      </div>
    `;
    container.appendChild(item);
  });
}

// // ================= 4. 技术栈渲染 =================
// function initTechStack() {
//   const container = document.querySelector('.skills-wrapper');
//   if (!container) return;
//   container.innerHTML = ''; // 【关键】清空

//   const stack = [
//     {
//       category: "skills.embedded",
//       items: [
//         { name: "STM32", icon: "fas fa-microchip" },
//         { name: "ESP32", icon: "fas fa-wifi" },
//         { name: "FreeRTOS", icon: "fas fa-cogs" },
//         { name: "C/C++", icon: "fas fa-code" }
//       ]
//     },
//     {
//       category: "skills.robotics",
//       items: [
//         { name: "ROS/ROS2", icon: "fas fa-robot" },
//         { name: "Gazebo", icon: "fas fa-cube" },
//         { name: "Motion Control", icon: "fas fa-wave-square" },
//         { name: "RL", icon: "fas fa-brain" }
//       ]
//     },
//     {
//       category: "skills.hardware",
//       items: [
//         { name: "Altium", icon: "fas fa-pencil-ruler" },
//         { name: "SolidWorks", icon: "fas fa-drafting-compass" },
//         { name: "PCB", icon: "fas fa-layer-group" }
//       ]
//     },
//     {
//       category: "skills.software",
//       items: [
//         { name: "Linux", icon: "fab fa-linux" },
//         { name: "Python", icon: "fab fa-python" },
//         { name: "Git", icon: "fab fa-git-alt" }
//       ]
//     }
//   ];

//   stack.forEach(group => {
//     const itemsHtml = group.items.map(s => `
//       <div class="skill-badge"><i class="${s.icon}"></i> ${s.name}</div>
//     `).join('');
    
//     const col = document.createElement('div');
//     col.className = 'skill-category';
//     col.innerHTML = `<h3>${window.i18n.get(group.category)}</h3><div class="skill-list">${itemsHtml}</div>`;
//     container.appendChild(col);
//   });
// }

// ================= 联系方式 =================
function initContactLinks() {
  const container = document.querySelector('.contact-links');
  if (!container) return;
  container.innerHTML = '';
  
const contacts = [
  { icon: "fab fa-linkedin", key: "contact.linkedin", link: "https://www.linkedin.com/in/zehao-yuan-02960b29b/" },
  { icon: "fab fa-github", key: "contact.github", link: "https://github.com/Tonyyzh" },
  { icon: "fas fa-envelope", key: "contact.email", link: "mailto:zehaoyuan2002@gmail.com" },
  { icon: "fas fa-file-pdf", key: "contact.resume", link: "assets/files/Yuan_Zehao_Resume.pdf" }
  // 可选：bilibili/zhihu/x
  // { icon: "fab fa-bilibili", key: "contact.bilibili", link: "https://space.bilibili.com/xxxxx" },
  // { icon: "fab fa-x-twitter", key: "contact.twitter", link: "https://x.com/xxxx" }
];
  
  contacts.forEach(c => {
    const item = document.createElement('div');
    item.className = 'contact-item';
    item.innerHTML = `<a href="${c.link}" target="_blank"><i class="${c.icon}"></i><p>${window.i18n.get(c.key)}</p></a>`;
    container.appendChild(item);
  });
}

// ================= 平滑滚动 =================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}