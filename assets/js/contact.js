document.addEventListener("DOMContentLoaded", function () {
  var bookingForm = document.getElementById("contact-form1");
  if (!bookingForm) return;
  var successMsg = document.getElementById("success_message_col");
  var errorMsg = document.getElementById("error_message");
  var submitBtn = document.getElementById("contact_form_btn1");
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
   
    if (successMsg) {
      successMsg.textContent = "";
      successMsg.style.display = "none";
    }
    if (errorMsg) {
      errorMsg.textContent = "";
      errorMsg.style.display = "none";
    }
    console.log("Form data:", bookingForm);
    var name = bookingForm.name.value.trim();
    var email = bookingForm.email.value.trim();
    var mobile = bookingForm.querySelector("[name=mobile]")?.value.trim() || "";
    console.log("Mobile:", mobile);
    var message = bookingForm.message?.value?.trim() || "";
    console.log({ name, email, mobile, message });
    console.log("Submitting form...");
    console.log("Using BaseURL:", BaseURL);
    console.log(submitBtn);
    if (!name || !email || !mobile) {
      if (errorMsg) {
        errorMsg.style.display = "block";
        errorMsg.style.color = "#d32f2f";
        errorMsg.textContent = "Please fill all required fields.";
      }
      return;
    }
    submitBtn.disabled = true;
    var originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Submitting...";
    fetch(`${BaseURL}/api/v1/client/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project: "PROVIDENT_SUNWORTH_CITY",
        name,
        email,
        phone: mobile,
        message,
      }),
    })
      .then(function (res) {
        if (res.status !== 200) {
          throw new Error("Failed to submit. Please try again.");
        }
        return res.json();
      })
      .then(function (data) {
        if (successMsg) {
          successMsg.style.display = "block";
          successMsg.style.color = "#388e3c";
          successMsg.textContent = "Thank you! Your request has been sent.";
        }
        bookingForm.reset();
      })
      .catch(function (err) {
        if (errorMsg) {
          errorMsg.style.display = "block";
          errorMsg.style.color = "#d32f2f";
          errorMsg.textContent =
            err.message || "Submission failed. Please try again.";
        }
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var bookingForm = document.getElementById("contact-form2");
  if (!bookingForm) return;
  var successMsg = document.getElementById("success_message_col2");
  var errorMsg = document.getElementById("error_message2");
  var submitBtn = document.getElementById("contact_form_btn2");
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (successMsg) {
      successMsg.textContent = "";
      successMsg.style.display = "none";
    }
    if (errorMsg) {
      errorMsg.textContent = "";
      errorMsg.style.display = "none";
    }
    console.log("Form data:", bookingForm);
    var name = bookingForm.name.value.trim();
    var email = bookingForm?.email?.value?.trim() || "";
    var mobile = bookingForm.querySelector("[name=mobile]")?.value.trim() || "";
    console.log("Mobile:", mobile);
    var secondaryPhone =
      bookingForm.querySelector("[name=secondaryNumber]")?.value.trim() || "";
    console.log("Mobile:", mobile);
    var message = bookingForm.message?.value?.trim() || "";
    console.log({ name, email, mobile, message });
    console.log("Submitting form...");
    console.log("Using BaseURL:", BaseURL);
    console.log(submitBtn);
    if (!name || !mobile) {
      if (errorMsg) {
        errorMsg.style.display = "block";
        errorMsg.style.color = "#d32f2f";
        errorMsg.textContent = "Please fill all required fields.";
      }
      return;
    }
    submitBtn.disabled = true;
    var originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Submitting...";
    fetch(`${BaseURL}/api/v1/client/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project: "PROVIDENT_SUNWORTH_CITY",
        name,
        email,
        phone: mobile,
        message,
        secondaryPhone,
      }),
    })
      .then(function (res) {
        if (res.status !== 200) {
          throw new Error("Failed to submit. Please try again.");
        }
        return res.json();
      })
      .then(function (data) {
        if (successMsg) {
          successMsg.style.display = "block";
          successMsg.style.color = "#388e3c";
          successMsg.textContent = "Thank you! Your request has been sent.";
        }
        bookingForm.reset();
      })
      .catch(function (err) {
        if (errorMsg) {
          errorMsg.style.display = "block";
          errorMsg.style.color = "#d32f2f";
          errorMsg.textContent =
            err.message || "Submission failed. Please try again.";
        }
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      });
  });
});

// Gallery Carousel Functionality
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById('galleryCarousel');
  const track = document.getElementById('carouselTrack');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  
  if (!carousel || !track || slides.length === 0) return;
  
  let currentIndex = 0;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationId;
  
  // Create dots
  function createDots() {
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }
  
  // Update dots
  function updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  // Get slide width including margin
  function getSlideWidth() {
    const slide = slides[0];
    const slideStyle = window.getComputedStyle(slide);
    const slideWidth = slide.offsetWidth;
    const marginRight = parseInt(slideStyle.marginRight) || 16; // 1rem = 16px
    return slideWidth + marginRight;
  }
  
  // Go to specific slide
  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, slides.length - 1));
    const slideWidth = getSlideWidth();
    const containerWidth = carousel.offsetWidth;
    const maxTranslate = -(slides.length * slideWidth - containerWidth);
    
    currentTranslate = Math.max(maxTranslate, -currentIndex * slideWidth);
    prevTranslate = currentTranslate;
    
    setSliderPosition();
    updateDots();
  }
  
  // Set slider position
  function setSliderPosition() {
    track.style.transform = `translateX(${currentTranslate}px)`;
  }
  
  // Animation loop for smooth dragging
  function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
  }
  
  // Get position from event (mouse or touch)
  function getPositionX(event) {
    return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
  }
  
  // Drag start
  function dragStart(event) {
    if (event.type === 'mousedown') {
      event.preventDefault();
    }
    
    isDragging = true;
    startPos = getPositionX(event);
    track.classList.add('dragging');
    
    animationId = requestAnimationFrame(animation);
    carousel.style.cursor = 'grabbing';
  }
  
  // Drag move
  function dragMove(event) {
    if (!isDragging) return;
    
    const currentPosition = getPositionX(event);
    const diff = currentPosition - startPos;
    currentTranslate = prevTranslate + diff;
    
    // Add resistance at boundaries
    const slideWidth = getSlideWidth();
    const containerWidth = carousel.offsetWidth;
    const maxTranslate = -(slides.length * slideWidth - containerWidth);
    
    if (currentTranslate > 0) {
      currentTranslate = currentTranslate * 0.3; // Resistance
    } else if (currentTranslate < maxTranslate) {
      currentTranslate = maxTranslate + (currentTranslate - maxTranslate) * 0.3; // Resistance
    }
  }
  
  // Drag end
  function dragEnd() {
    if (!isDragging) return;
    
    isDragging = false;
    cancelAnimationFrame(animationId);
    track.classList.remove('dragging');
    carousel.style.cursor = 'grab';
    
    const slideWidth = getSlideWidth();
    const containerWidth = carousel.offsetWidth;
    const maxTranslate = -(slides.length * slideWidth - containerWidth);
    
    // Snap to nearest slide
    const movedBy = currentTranslate - prevTranslate;
    const threshold = slideWidth * 0.2;
    
    if (Math.abs(movedBy) > threshold) {
      if (movedBy > 0 && currentIndex > 0) {
        currentIndex--;
      } else if (movedBy < 0 && currentIndex < slides.length - 1) {
        const visibleSlides = Math.floor(containerWidth / slideWidth);
        if (currentIndex < slides.length - visibleSlides) {
          currentIndex++;
        }
      }
    }
    
    // Ensure bounds
    currentTranslate = Math.max(maxTranslate, Math.min(0, -currentIndex * slideWidth));
    prevTranslate = currentTranslate;
    
    setSliderPosition();
    updateDots();
  }
  
  // Navigation buttons
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  });
  
  nextBtn.addEventListener('click', () => {
    const containerWidth = carousel.offsetWidth;
    const slideWidth = getSlideWidth();
    const visibleSlides = Math.floor(containerWidth / slideWidth);
    
    if (currentIndex < slides.length - visibleSlides) {
      goToSlide(currentIndex + 1);
    }
  });
  
  // Mouse events
  carousel.addEventListener('mousedown', dragStart);
  carousel.addEventListener('mousemove', dragMove);
  carousel.addEventListener('mouseup', dragEnd);
  carousel.addEventListener('mouseleave', dragEnd);
  
  // Touch events
  carousel.addEventListener('touchstart', dragStart, { passive: false });
  carousel.addEventListener('touchmove', dragMove, { passive: false });
  carousel.addEventListener('touchend', dragEnd);
  
  // Prevent context menu on long press
  carousel.addEventListener('contextmenu', (e) => e.preventDefault());
  
  // Prevent image dragging
  slides.forEach(slide => {
    const img = slide.querySelector('img');
    if (img) {
      img.addEventListener('dragstart', (e) => e.preventDefault());
    }
  });
  
  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      goToSlide(currentIndex);
    }, 100);
  });
  
  // Initialize
  createDots();
  goToSlide(0);
  
  // Auto-play functionality (optional)
  let autoPlayInterval;
  const autoPlayDelay = 5000; // 5 seconds
  
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      const containerWidth = carousel.offsetWidth;
      const slideWidth = getSlideWidth();
      const visibleSlides = Math.floor(containerWidth / slideWidth);
      
      if (currentIndex < slides.length - visibleSlides) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(0); // Loop back to start
      }
    }, autoPlayDelay);
  }
  
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }
  
  // Start auto-play
  startAutoPlay();
  
  // Pause auto-play on hover/interaction
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);
  carousel.addEventListener('touchstart', stopAutoPlay);
  carousel.addEventListener('touchend', () => {
    setTimeout(startAutoPlay, 3000); // Resume after 3 seconds
  });
});