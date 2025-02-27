// 轮播图功能模块
let currentIndex = 0;
const slider = document.querySelector('.slider');
const totalSlides = 3; // 明确3张图

// 切换轮播图
function goToSlide(index) {
    // 约束索引范围在0-2之间
    currentIndex = (index + totalSlides) % totalSlides;
    slider.style.transform = `translateX(-${currentIndex * 33.333}%)`;
}

// 自动播放
let autoPlayTimer = setInterval(() => goToSlide(currentIndex + 1), 3000);

// 重置自动播放计时器
function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(() => goToSlide(currentIndex + 1), 3000);
}

// 事件绑定示例
document.querySelector('.next').addEventListener('click', () => {
    goToSlide(currentIndex + 1);
    resetAutoPlay();
});

document.querySelector('.prev').addEventListener('click', () => {
    goToSlide(currentIndex - 1);
    resetAutoPlay();
});

// 小圆点点击事件
document.querySelectorAll('.slider-dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
        resetAutoPlay();
    });
});

// 移动端菜单交互模块
const menuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

/**
 * 切换移动菜单显示状态
 */
function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
}

// 菜单按钮点击事件
menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu();
});

// 点击页面其他区域关闭菜单
document.addEventListener('click', (e) => {
    const isClickInsideMenu = e.target.closest('.mobile-menu');
    const isClickMenuButton = e.target.closest('.mobile-menu-btn');
    
    if (!isClickInsideMenu && !isClickMenuButton) {
        mobileMenu.classList.remove('active');
    }
});

// 平滑滚动功能模块
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSelector = this.getAttribute('href');
        const targetElement = document.querySelector(targetSelector);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // 移动端点击后自动关闭菜单
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    });
});

// 图片懒加载增强
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        img.dataset.src = img.src;
        img.removeAttribute('src');
        observer.observe(img);
    });
});

// 获取所有快速询盘按钮
const quickViewButtons = document.querySelectorAll('.quick-view');

// 为每个按钮绑定点击事件
quickViewButtons.forEach(button => {
  button.addEventListener('click', function() {
    // 获取产品信息（需要先添加数据属性）
    const productCard = this.closest('.product-card');
    const productCode = productCard.querySelector('.product-title').textContent;
    const productImage = productCard.querySelector('img').src;

    // 构建预填消息（URL编码）
    const message = encodeURIComponent(
        `Hello, I'm interested in your product:\n` +
        `Product Code: ${productCode.replace('ProductCode:', '').trim()}\n` +
        `Product Image: ${productImage}`
      );

    // 跳转至WhatsApp（香港号码需加852前缀）
    const whatsappUrl = `https://wa.me/85246198431?text=${message}`;
    
    // 兼容移动端直接跳转App
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = whatsappUrl;
    } else {
      window.open(whatsappUrl, '_blank');
    }
  });
});
