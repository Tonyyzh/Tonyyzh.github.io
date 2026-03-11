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

  const projectSection = window.i18n.get('projects');
  if (!projectSection || !Array.isArray(projectSection.items)) {
    console.error('[Projects] projects.items not found in i18n data');
    return;
  }

  const imageMap = {
    hero: "assets/images/hero-gen2/hero.jpg",
    drone: "assets/images/drone2025/Drone2025.jpg",
    infantry: "assets/images/infantry/infantry outdoor.JPG",
    wheelleg: "assets/images/wheelleg/wheelleg.jpg",
    ongoing: "assets/images/ongoing-temp.png",
    gallery: "assets/images/gallery/2024 UC/TGL_FLAG.jpg"
  };

  const linkMap = {
    hero: "pages/projects/hero-gen2.html",
    drone: "pages/projects/drone.html",
    infantry: "pages/projects/infantry.html",
    wheelleg: "pages/projects/wheelleg.html",
    ongoing: "#",
    gallery: "pages/projects/gallery.html"
  };

  projectSection.items.forEach(project => {
    const tagsHtml = Array.isArray(project.tags)
      ? `<div class="project-tags">${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}</div>`
      : '';

    const card = document.createElement('div');
    card.className = 'card';

    const imgSrc = imageMap[project.id] || "assets/images/ongoing-temp.png";
    const linkHref = linkMap[project.id] || "#";

    card.innerHTML = `
      <div style="overflow:hidden;">
        <img src="${imgSrc}" alt="${projectSection.imgAlt || 'Project image'}" class="project-thumbnail">
      </div>
      <div class="project-info">
        <h3>${project.title || ''}</h3>
        <p>${project.desc || ''}</p>
        ${tagsHtml}
        <a href="${linkHref}" class="project-link">${projectSection.viewDetail || 'View Details'}</a>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ... (Rest of the code remains the same)

// // ================= 2. 开源贡献渲染 =================
function initOpenSource() {
  const grid = document.querySelector('.opensource-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const items = [
    { key: "opensource.item1", linkCode: "#", linkDoc: "#" },
    { key: "opensource.item2", linkCode: "#", linkDoc: "#" },
    { key: "opensource.item3", linkCode: "#", linkDoc: "#" }
  ];

  items.forEach(item => {
    const tags = window.i18n.get(`${item.key}.tags`) || [];
    const tagsHtml = Array.isArray(tags)
      ? tags.map(t => `<span class="os-tag">${t}</span>`).join('')
      : '';

    let buttonsHtml = '';
    if (item.linkCode) {
      buttonsHtml += `<a href="${item.linkCode}" target="_blank" class="os-btn"><i class="fab fa-github"></i> ${window.i18n.get('opensource.btnCode')}</a>`;
    }
    if (item.linkDoc) {
      buttonsHtml += `<a href="${item.linkDoc}" target="_blank" class="os-btn"><i class="fas fa-book"></i> ${window.i18n.get('opensource.btnDoc')}</a>`;
    }

    const card = document.createElement('div');
    card.className = 'os-card';
    card.innerHTML = `
      <div class="os-header">
        <div class="os-title">${window.i18n.get(`${item.key}.title`)}</div>
        <i class="fas fa-code-branch" style="color:var(--primary); opacity:0.5;"></i>
      </div>
      <p class="os-desc">${window.i18n.get(`${item.key}.desc`)}</p>
      <div class="os-tags">${tagsHtml}</div>
      <div class="os-actions">${buttonsHtml}</div>
    `;
    grid.appendChild(card);
  });
}

// ================= 3. 时间轴渲染 =================
function initTimeline() {
  const container = document.querySelector('.timeline-container');
  if (!container) return;
  container.innerHTML = '';

  const events = [
    "timeline.event1",
    "timeline.event2",
    "timeline.event3",
    "timeline.event4",
    "timeline.event5",
    "timeline.event6",
    "timeline.event7"
  ];

  events.forEach(key => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
      <div class="timeline-date">${window.i18n.get(`${key}.date`)}</div>
      <div class="timeline-marker">
        <div class="timeline-dot"></div>
        <div class="timeline-line"></div>
      </div>
      <div class="timeline-card">
        <h3>${window.i18n.get(`${key}.title`)}</h3>
        <p>${window.i18n.get(`${key}.desc`)}</p>
      </div>
    `;
    container.appendChild(item);
  });

  const lastLine = container.querySelector('.timeline-item:last-child .timeline-line');
  if (lastLine) lastLine.style.display = 'none';
}
// // ================= 4. 技术栈渲染 =================
function initTechStack() {
  const container = document.querySelector('.skills-wrapper');
  if (!container) return;
  container.innerHTML = ''; // 【关键】清空

const stack = [
  {
    category: "skills.mechanical",
    items: [
      { name: "SolidWorks", icon: "fas fa-drafting-compass" },
      { name: "Mechanical System Design", icon: "fas fa-gears" },
      { name: "Robotics Mechanisms", icon: "fas fa-robot" },
      { name: "Rapid Prototyping", icon: "fas fa-wrench" }
    ]
  },
  {
    category: "skills.manufacturing",
    items: [
      { name: "3D Printing", icon: "fas fa-cube" },
      { name: "CNC Machining", icon: "fas fa-industry" },
      { name: "Lathe / Milling / Drilling", icon: "fas fa-screwdriver-wrench" },
      { name: "Sheet Metal & Wire EDM", icon: "fas fa-bolt" }
    ]
  },
  {
    category: "skills.electronics",
    items: [
      { name: "PCB Design (LCSC / LCCAD)", icon: "fas fa-microchip" },
      { name: "Embedded Systems", icon: "fas fa-cogs" },
      { name: "Motor Control", icon: "fas fa-sliders-h" },
      { name: "Robotics Electronics Integration", icon: "fas fa-plug" }
    ]
  },
  {
    category: "skills.analog",
    items: [
      { name: "Cadence Virtuoso", icon: "fas fa-wave-square" },
      { name: "PLL / Clock Circuits", icon: "fas fa-clock" },
      { name: "ADC / DAC", icon: "fas fa-signal" },
      { name: "Buck / Boost Power Design", icon: "fas fa-bolt" }
    ]
  }
];

  stack.forEach(group => {
    const itemsHtml = group.items.map(s => `
      <div class="skill-badge"><i class="${s.icon}"></i> ${s.name}</div>
    `).join('');
    
    const col = document.createElement('div');
    col.className = 'skill-category';
    col.innerHTML = `<h3>${window.i18n.get(group.category)}</h3><div class="skill-list">${itemsHtml}</div>`;
    container.appendChild(col);
  });
}

// ================= 联系方式 =================
function initContactLinks() {
  const container = document.querySelector('.contact-links');
  if (!container) return;
  container.innerHTML = '';
  
// const contacts = [
//   { icon: "fab fa-linkedin", key: "contact.linkedin", link: "https://www.linkedin.com/in/zehao-yuan-02960b29b/" },
//   { icon: "fab fa-github", key: "contact.github", link: "https://github.com/Tonyyzh" },
//   { icon: "fas fa-envelope", key: "contact.email", link: "mailto:zehaoyuan2002@gmail.com" },
//   { icon: "fas fa-file-pdf", key: "contact.resume", link: "assets/files/Yuan_Zehao_Resume.pdf" }
//   // 可选：bilibili/zhihu/x
//   // { icon: "fab fa-bilibili", key: "contact.bilibili", link: "https://space.bilibili.com/xxxxx" },
//   // { icon: "fab fa-x-twitter", key: "contact.twitter", link: "https://x.com/xxxx" }
// ];

const contacts = [
{
  icon: "fab fa-linkedin",
  key: "contact.linkedin",
  link: "https://www.linkedin.com/in/zehao-yuan-02960b29b/",
  label: "linkedin.com/in/zehao-yuan"
},
{
  icon: "fab fa-github",
  key: "contact.github",
  link: "https://github.com/Tonyyzh",
  label: "github.com/Tonyyzh"
},
{
  icon: "fas fa-envelope",
  key: "contact.email",
  link: "mailto:zehaoyuan2002@gmail.com",
  label: "zehaoyuan2002@gmail.com"
},
{
  icon: "fas fa-file-pdf",
  key: "contact.resume",
  link: "assets/files/Yuan_Zehao_Resume_2025.pdf",
  label: "Download Resume"
}
];

  
  contacts.forEach(c => {
    const item = document.createElement('div');
    item.className = 'contact-item';
    // item.innerHTML = `<a href="${c.link}" target="_blank"><i class="${c.icon}"></i><p>${window.i18n.get(c.key)}</p></a>`;
    item.innerHTML = `
    <a href="${c.link}" target="_blank">
      <i class="${c.icon}"></i>
      <p class="contact-title">${window.i18n.get(c.key)}</p>
      <span class="contact-info">${c.label}</span>
    </a>
    `;
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