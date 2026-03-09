/**
 * 东晋门阀政治 - 主 JavaScript 文件
 * 提供导航、动画和交互功能
 */

document.addEventListener('DOMContentLoaded', function() {
  // 移动端导航切换
  initMobileNav();
  
  // 滚动动画
  initScrollAnimations();
  
  // 导航栏滚动效果
  initNavbarScroll();
  
  // 当前页面导航高亮
  highlightCurrentNav();
});

/**
 * 移动端导航切换
 */
function initMobileNav() {
  const toggle = document.querySelector('.navbar-toggle');
  const menu = document.querySelector('.nav-menu');
  
  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      menu.classList.toggle('active');
      
      // 切换汉堡菜单动画
      const spans = toggle.querySelectorAll('span');
      if (menu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }
}

/**
 * 滚动动画 - 元素进入视口时淡入
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // 观察需要动画的元素
  const animatedElements = document.querySelectorAll('.card, .timeline-item, .quote-block, .section-title');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

/**
 * 导航栏滚动效果
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
        navbar.style.padding = '0.7rem 2rem';
      } else {
        navbar.style.boxShadow = '0 2px 20px rgba(44, 62, 80, 0.15)';
        navbar.style.padding = '1rem 2rem';
      }
    });
  }
}

/**
 * 高亮当前页面导航项
 */
function highlightCurrentNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/**
 * 平滑滚动到页面内锚点
 */
function smoothScrollTo(selector) {
  const element = document.querySelector(selector);
  if (element) {
    const offsetTop = element.offsetTop - 80; // 减去导航栏高度
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

/**
 * 复制文本到剪贴板
 */
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('已复制到剪贴板');
    }).catch(err => {
      console.error('复制失败:', err);
    });
  } else {
    // 降级方案
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('已复制到剪贴板');
  }
}

/**
 * 显示提示消息
 */
function showToast(message, duration = 2000) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #8B2E2E, #5A1E1E);
    color: #fff;
    padding: 12px 24px;
    border-radius: 50px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    z-index: 9999;
    animation: fadeInUp 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'fadeInDown 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * 页面加载完成后的初始化
 */
function onPageLoad() {
  // 添加页面加载动画类
  document.body.classList.add('loaded');
}

// 页面加载完成后执行
window.addEventListener('load', onPageLoad);

// 导出函数供外部使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    smoothScrollTo,
    copyToClipboard,
    showToast
  };
}
