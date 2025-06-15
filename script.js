// script.js

// 페이지 이동 함수
function navigateToPage(pageAndQueryString) {
  console.log(`Navigating to: ${pageAndQueryString}`);
  let url;
  const parts = pageAndQueryString.split('?');
  const pageName = parts[0];
  const queryString = parts.length > 1 ? '?' + parts[1] : '';

  if (pageName === 'index') {
    url = `index.html${queryString}`;
  } else {
    url = `${pageName}.html${queryString}`;
  }
  
  window.location.href = url;
}

// 좋아요 토글 함수 (이벤트 버블링 방지 추가)
function toggleLike(button, event) {
  if (event) {
    event.stopPropagation();
  }
  
  const icon = button.querySelector('i');
  if (icon.classList.contains('far')) {
    icon.classList.remove('far');
    icon.classList.add('fas');
    button.classList.add('active');
  } else {
    icon.classList.remove('fas');
    icon.classList.add('far');
    button.classList.remove('active');
  }
  console.log('Like toggled!');
}

// 북마크 토글 함수 (이벤트 버블링 방지 추가)
function toggleBookmark(button, event) {
  if (event) {
    event.stopPropagation();
  }
  
  const icon = button.querySelector('i');
  if (icon.classList.contains('far')) {
    icon.classList.remove('far');
    icon.classList.add('fas');
    button.classList.add('active');
  } else {
    icon.classList.remove('fas');
    icon.classList.add('far');
    button.classList.remove('active');
  }
  console.log('Bookmark toggled!');
}

/**
 * (추가) 북마크 페이지에서 북마크 아이템을 제거하는 함수
 * @param {HTMLButtonElement} button - 클릭된 하트 버튼 요소
 */
function toggleBookmarkItemRemove(button) {
  const bookmarkItem = button.closest('.bookmark-item');
  const icon = button.querySelector('i');

  if (bookmarkItem && icon) {
    // 1. 아이콘을 빈 하트로 변경 (사용자에게 시각적 피드백)
    icon.classList.remove('fas'); // 채워진 하트 클래스 제거
    icon.classList.add('far');   // 빈 하트 클래스 추가
    
    // 2. 버튼 비활성화 (중복 클릭 방지)
    button.disabled = true;

    // 3. CSS 애니메이션을 위해 'removing' 클래스 추가
    bookmarkItem.classList.add('removing');

    // 4. 애니메이션이 끝난 후(0.4초) DOM에서 요소를 완전히 제거
    bookmarkItem.addEventListener('transitionend', function() {
      bookmarkItem.remove();
    }, { once: true }); // 이벤트가 한 번만 실행되도록 설정
  }
}


// 인스타그램 연동 시뮬레이션
function connectInstagram() {
  console.log('Attempting Instagram connection...');
  setTimeout(() => {
    alert('인스타그램 연동이 완료되었습니다!');
    navigateToPage('main?showStory=true'); 
  }, 1000);
}

// 댓글 모달 열기
function openCommentModal() {
  const modalOverlay = document.getElementById('commentModalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    document.getElementById('commentInput').focus();
    console.log('Comment modal opened.');
  }
}

// 댓글 모달 닫기
function closeCommentModal() {
  const modalOverlay = document.getElementById('commentModalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('show');
    document.body.style.overflow = '';
    console.log('Comment modal closed.');
  }
}

// 댓글 게시 함수
function postComment() {
  const commentInput = document.getElementById('commentInput');
  const commentList = document.getElementById('commentList');
  const commentText = commentInput.value.trim();

  if (commentText) {
    const newCommentItem = document.createElement('div');
    newCommentItem.className = 'comment-item';
    newCommentItem.innerHTML = `
      <div class="current-user-avatar"></div>
      <div class="comment-content">
        <p>
          <span class="comment-author">my_account</span>
          <span>${commentText}</span>
          <span class="comment-time">방금</span>
        </p>
      </div>
    `;
    commentList.appendChild(newCommentItem);
    commentInput.value = '';
    commentList.scrollTop = commentList.scrollHeight;
    console.log(`Posted comment: ${commentText}`);
  }
}

// AI_result 페이지 관련 변수 및 함수
let aiResultImages = []; 
let currentAIResultIndex = 0;

function updateAIResultDisplay() {
    const mainImage = document.querySelector('.result-image-container img');
    const prevBtn = document.querySelector('.result-nav-btn.left');
    const nextBtn = document.querySelector('.result-nav-btn.right');
    const likeBtnIcon = document.querySelector('.result-action-btn.like-btn i');
    const likeBtnContainer = document.querySelector('.result-action-btn.like-btn');

    if (mainImage && aiResultImages.length > 0) {
        mainImage.src = aiResultImages[currentAIResultIndex];
    }
    if (prevBtn) prevBtn.style.display = currentAIResultIndex > 0 && aiResultImages.length > 1 ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = currentAIResultIndex < aiResultImages.length - 1 && aiResultImages.length > 1 ? 'flex' : 'none';
    if (likeBtnIcon && likeBtnContainer) {
        likeBtnIcon.classList.remove('fas');
        likeBtnIcon.classList.add('far');
        likeBtnContainer.classList.remove('active');
    }
    console.log(`Displaying AI result image: ${currentAIResultIndex + 1}/${aiResultImages.length}`);
}

function prevResult() {
    if (currentAIResultIndex > 0) {
        currentAIResultIndex--;
        updateAIResultDisplay();
    }
}

function nextResult() {
    if (currentAIResultIndex < aiResultImages.length - 1) {
        currentAIResultIndex++;
        updateAIResultDisplay();
    }
}

function navigateToShopItem(itemId) {
    console.log(`Navigating to shop item: ${itemId}`);
    alert(`"${itemId}" 상품 페이지로 이동합니다. (실제 연결 필요)`);
}


// 페이지 로드 시 실행될 스크립트
document.addEventListener('DOMContentLoaded', () => {
  const currentPageName = window.location.pathname.split('/').pop().split('.')[0] || 'index';
  console.log(`Current Page: ${currentPageName}`);

  // Bottom navigation logic
  const navItems = document.querySelectorAll('.bottom-nav .nav-item');
  if (navItems.length > 0) {
      navItems.forEach(item => {
        const dataPage = item.getAttribute('data-page');
        if (currentPageName === dataPage) {
          item.classList.add('active');
        }
        item.onclick = (e) => {
            const targetItem = e.target.closest('.nav-item');
            if (targetItem) {
                navigateToPage(targetItem.getAttribute('data-page'));
            }
        }
      });
  }

  // 댓글 모달 관련 이벤트 리스너
  const commentModalOverlay = document.getElementById('commentModalOverlay');
  if (commentModalOverlay) {
    commentModalOverlay.addEventListener('click', (event) => {
      if (event.target.id === 'commentModalOverlay') {
        closeCommentModal();
      }
    });

    const commentInput = document.getElementById('commentInput');
    if (commentInput) {
        commentInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                postComment();
            }
        });
    }

    const commentModalHandle = document.querySelector('.comment-modal-handle');
    if (commentModalHandle) {
        commentModalHandle.addEventListener('click', closeCommentModal);
    }
  }

  // AI_result 페이지일 경우
  if (currentPageName === 'AI_result') {
      const importNavItem = document.querySelector('.bottom-nav .nav-item[data-page="import"]');
      if (importNavItem) {
          navItems.forEach(item => item.classList.remove('active')); 
          importNavItem.classList.add('active'); 
      }
      
      const storedImages = sessionStorage.getItem('aiSelectedImages');
      if (storedImages) {
          try {
              aiResultImages = JSON.parse(storedImages);
              sessionStorage.removeItem('aiSelectedImages'); 
          } catch (e) {
              console.error('Failed to parse stored images:', e);
              aiResultImages = [];
          }
      }
      updateAIResultDisplay(); 
  }

  // Main page story section logic
  if (currentPageName === 'main') {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('showStory') === 'true') {
      const storySection = document.getElementById('storySection');
      if (storySection) {
        storySection.style.display = 'block';
      }
    }
  }

  // Import screen specific logic
  if (currentPageName === 'import') {
      const galleryBtn = document.getElementById('galleryBtn');
      const imageInput = document.getElementById('imageInput');
      const imageSliderWrapper = document.getElementById('imageSliderWrapper');
      const previewPlaceholder = document.getElementById('previewPlaceholder');
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      const aiAnalyzeBtn = document.getElementById('aiAnalyzeBtn');
      const aiAnalysisOverlay = document.getElementById('aiAnalysisOverlay');
      const imagePreviewArea = document.getElementById('imagePreviewArea');

      let selectedFiles = [];
      let currentImageIndex = 0;

      function renderSliderImages() {
          if (!imageSliderWrapper || !previewPlaceholder || !aiAnalyzeBtn || !prevBtn || !nextBtn) return;
          imageSliderWrapper.innerHTML = '';
          if (selectedFiles.length === 0) {
              previewPlaceholder.style.display = 'block';
              aiAnalyzeBtn.style.display = 'none';
              prevBtn.style.display = 'none';
              nextBtn.style.display = 'none';
              imageSliderWrapper.style.visibility = 'hidden';
              return;
          }
          previewPlaceholder.style.display = 'none';
          aiAnalyzeBtn.style.display = 'block';
          imageSliderWrapper.style.visibility = 'visible';
          selectedFiles.forEach(file => {
              const reader = new FileReader();
              reader.onload = e => {
                  const img = document.createElement('img');
                  img.src = e.target.result;
                  imageSliderWrapper.appendChild(img);
              };
              reader.readAsDataURL(file);
          });
          updateSlider();
      }

      function updateSlider() {
          if (selectedFiles.length === 0 || !imagePreviewArea) return;
          const slideWidth = imagePreviewArea.clientWidth;
          const marginBetweenImages = 10;
          const offset = (slideWidth + marginBetweenImages) * currentImageIndex;
          imageSliderWrapper.style.transform = `translateX(-${offset}px)`;
          prevBtn.style.display = currentImageIndex > 0 ? 'flex' : 'none';
          nextBtn.style.display = currentImageIndex < selectedFiles.length - 1 ? 'flex' : 'none';
      }

      if (galleryBtn) galleryBtn.addEventListener('click', () => imageInput.click());

      if (imageInput) {
          imageInput.addEventListener('change', (event) => {
              const newFiles = Array.from(event.target.files);
              let addedNew = false;
              newFiles.forEach(newFile => {
                  if (!selectedFiles.some(f => f.name === newFile.name && f.size === newFile.size)) {
                      selectedFiles.push(newFile);
                      addedNew = true;
                  }
              });
              if (addedNew) {
                  currentImageIndex = selectedFiles.length - newFiles.length;
                  if (currentImageIndex < 0) currentImageIndex = 0;
              }
              renderSliderImages();
          });
      }

      if (prevBtn) prevBtn.addEventListener('click', () => {
          if (currentImageIndex > 0) {
              currentImageIndex--;
              updateSlider();
          }
      });

      if (nextBtn) nextBtn.addEventListener('click', () => {
          if (currentImageIndex < selectedFiles.length - 1) {
              currentImageIndex++;
              updateSlider();
          }
      });

      if (aiAnalyzeBtn) aiAnalyzeBtn.addEventListener('click', () => {
          aiAnalysisOverlay.classList.add('show');
          let conversionPromises = selectedFiles.map(file => {
              return new Promise(resolve => {
                  const reader = new FileReader();
                  reader.onload = e => resolve(e.target.result);
                  reader.readAsDataURL(file);
              });
          });
          Promise.all(conversionPromises).then(imagesToBase64 => {
              sessionStorage.setItem('aiSelectedImages', JSON.stringify(imagesToBase64));
              setTimeout(() => navigateToPage('AI_result'), 2000);
          });
      });
      window.addEventListener('resize', updateSlider);
      renderSliderImages();
  }
});