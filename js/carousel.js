class TestimonialCarousel {
  constructor() {
    this.slider = document.getElementById('testimonialSlider');
    this.pages = document.querySelectorAll('.testimonial-page');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.dotsContainer = document.getElementById('carouselDots');
    this.pageIndicator = document.getElementById('pageIndicator');

    this.totalPages = this.pages.length;
    this.currentPage = 0;
    this.autoSlideInterval = null;

    this.init();
  }

  init() {
    this.createDots();
    this.updateCarousel();
    this.attachEventListeners();
    this.startAutoSlide();
  }

  createDots() {
    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < this.totalPages; i++) {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      dot.addEventListener('click', () => this.goToPage(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  updateCarousel() {
    // Move slider
    const translateX = -this.currentPage * 100;
    this.slider.style.transform = `translateX(${translateX}%)`;

    // Update navigation states
    this.prevBtn.disabled = this.currentPage === 0;
    this.nextBtn.disabled = this.currentPage === this.totalPages - 1;

    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentPage);
    });

    // Update page indicator
    this.pageIndicator.textContent = `Page ${this.currentPage + 1} sur ${this.totalPages}`;
  }

  goToPage(pageIndex) {
    if (pageIndex >= 0 && pageIndex < this.totalPages) {
      this.currentPage = pageIndex;
      this.updateCarousel();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    } else {
      this.currentPage = 0; // Loop back to first page
    }
    this.updateCarousel();
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    } else {
      this.currentPage = this.totalPages - 1; // Loop to last page
    }
    this.updateCarousel();
  }

  attachEventListeners() {
    this.nextBtn.addEventListener('click', () => {
      this.nextPage();
      this.resetAutoSlide();
    });

    this.prevBtn.addEventListener('click', () => {
      this.prevPage();
      this.resetAutoSlide();
    });

    // Pause auto-slide on hover
    const carousel = document.querySelector('.testimonial-carousel');
    carousel.addEventListener('mouseenter', () => this.stopAutoSlide());
    carousel.addEventListener('mouseleave', () => this.startAutoSlide());

    // Handle window resize
    window.addEventListener('resize', () => this.updateCarousel());
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.nextPage();
    }, 6000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TestimonialCarousel();
});
