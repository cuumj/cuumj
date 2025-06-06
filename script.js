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

// 좋아요 토글 함수 (AI_result 페이지에도 사용될 수 있음)
function toggleLike(button) {
  const icon = button.querySelector('i');
  if (icon.classList.contains('far')) { // 현재 빈 하트라면
    icon.classList.remove('far');
    icon.classList.add('fas'); // 채워진 하트로 변경
    button.classList.add('active'); // 활성화 상태 추가
  } else { // 현재 채워진 하트라면
    icon.classList.remove('fas');
    icon.classList.add('far'); // 빈 하트로 변경
    button.classList.remove('active'); // 활성화 상태 제거
  }
  console.log('Like toggled!');
}

// 북마크 토글 함수 (기존 피드 화면에 사용)
function toggleBookmark(button) {
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
    document.body.style.overflow = 'hidden'; // 스크롤 방지
    console.log('Comment modal opened.');
  }
}

// 댓글 모달 닫기
function closeCommentModal() {
  const modalOverlay = document.getElementById('commentModalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('show');
    document.body.style.overflow = ''; // 스크롤 허용
    console.log('Comment modal closed.');
  }
}

// AI_result 페이지를 위한 이미지 및 슬라이더 관련 변수 및 함수
// import.html에서 선택된 이미지들이 여기에 Base64 형태로 저장될 것임
let aiResultImages = []; 
let currentAIResultIndex = 0; // 현재 AI_result 페이지에서 보여줄 이미지 인덱스

// AI_result 페이지 이미지 디스플레이 업데이트
function updateAIResultDisplay() {
    const mainImage = document.querySelector('.result-image-container img');
    const prevBtn = document.querySelector('.result-nav-btn.left');
    const nextBtn = document.querySelector('.result-nav-btn.right');
    const likeBtnIcon = document.querySelector('.result-action-btn.like-btn i');
    const likeBtnContainer = document.querySelector('.result-action-btn.like-btn');

    if (mainImage && aiResultImages.length > 0) {
        mainImage.src = aiResultImages[currentAIResultIndex];
    } else if (mainImage) {
        // 이미지가 없을 경우, 빈 상태로 설정하거나 기본 placeholder 이미지로 설정
        mainImage.src = ''; 
        console.warn('No images available for AI_result display.');
    }

    // 네비게이션 버튼 가시성 업데이트 (이미지가 1개 초과일 때만 표시)
    if (prevBtn) {
        prevBtn.style.display = currentAIResultIndex > 0 && aiResultImages.length > 1 ? 'flex' : 'none';
    }
    if (nextBtn) {
        nextBtn.style.display = currentAIResultIndex < aiResultImages.length - 1 && aiResultImages.length > 1 ? 'flex' : 'none';
    }

    // 좋아요 버튼 상태 초기화 (새로운 이미지를 볼 때마다 좋아요 상태를 리셋)
    if (likeBtnIcon && likeBtnContainer) {
        likeBtnIcon.classList.remove('fas');
        likeBtnIcon.classList.add('far');
        likeBtnContainer.classList.remove('active');
    }

    console.log(`Displaying AI result image: ${currentAIResultIndex + 1}/${aiResultImages.length}`);
}

// AI_result 페이지에서 이전 이미지로 이동
function prevResult() {
    if (currentAIResultIndex > 0) {
        currentAIResultIndex--;
        updateAIResultDisplay();
        console.log('Previous AI result image.');
    }
}

// AI_result 페이지에서 다음 이미지로 이동
function nextResult() {
    if (currentAIResultIndex < aiResultImages.length - 1) {
        currentAIResultIndex++;
        updateAIResultDisplay();
        console.log('Next AI result image.');
    }
}

// "Shop the look" 아이템 클릭 시 이동
function navigateToShopItem(itemId) {
    console.log(`Navigating to shop item: ${itemId}`);
    // 실제 쇼핑몰 페이지로 이동하는 로직을 여기에 구현
    // 예: window.location.href = `shop_detail.html?id=${itemId}`;
    alert(`"${itemId}" 상품 페이지로 이동합니다. (실제 연결 필요)`);
}


// 페이지 로드 시 실행될 스크립트
document.addEventListener('DOMContentLoaded', () => {
  const currentPageName = window.location.pathname.split('/').pop().split('.')[0];
  console.log(`Current Page: ${currentPageName}`);

  // Bottom navigation logic
  const navItems = document.querySelectorAll('.bottom-nav .nav-item');
  if (navItems.length > 0) {
      navItems.forEach(item => {
        const dataPage = item.getAttribute('data-page');

        // 기본 활성 페이지 설정 (현재 페이지와 data-page가 일치하는 경우)
        if (currentPageName === dataPage) {
          item.classList.add('active');
        }
        
        item.onclick = () => navigateToPage(dataPage);
      });
  }

  // AI_result 페이지일 경우, '추가' (import) 버튼을 하단 네비게이션에서 활성화
  if (currentPageName === 'AI_result') {
      const importNavItem = document.querySelector('.bottom-nav .nav-item[data-page="import"]');
      if (importNavItem) {
          // 기존 활성 클래스를 모두 제거
          navItems.forEach(item => item.classList.remove('active')); 
          // 'import' 아이템에 활성 클래스 추가
          importNavItem.classList.add('active'); 
      }
      
      // sessionStorage에서 이미지 데이터 로드
      const storedImages = sessionStorage.getItem('aiSelectedImages');
      if (storedImages) {
          try {
              aiResultImages = JSON.parse(storedImages);
              // 이미지 로드 후 session storage 비워주기 (새로운 분석 시 과거 데이터 방지)
              sessionStorage.removeItem('aiSelectedImages'); 
              console.log(`Loaded ${aiResultImages.length} images from session storage.`);
          } catch (e) {
              console.error('Failed to parse stored images:', e);
              aiResultImages = [];
          }
      } else {
          // sessionStorage에 이미지가 없을 경우를 대비하여 기본 이미지 경로를 넣을 수 있음
          // 예: aiResultImages.push('path/to/default_image.jpg');
          console.log('No images found in session storage. Displaying blank or default.');
      }

      // AI_result 페이지 로드 시 이미지 및 버튼 초기화
      updateAIResultDisplay(); 

      // Shop the look 드래그 스크롤 기능 추가
      const shopItemsScroll = document.getElementById('shopItemsScroll');
      if (shopItemsScroll) {
          let isDown = false;
          let startX;
          let scrollLeft;
          let moved = false; // 드래그로 움직였는지 확인하는 플래그

          shopItemsScroll.addEventListener('mousedown', (e) => {
              isDown = true;
              moved = false; // 새로 드래그 시작 시 초기화
              shopItemsScroll.classList.add('active-drag'); // (스타일링 목적)
              startX = e.pageX - shopItemsScroll.offsetLeft;
              scrollLeft = shopItemsScroll.scrollLeft;
              console.log('MouseDown: StartX', startX);
          });

          shopItemsScroll.addEventListener('mouseleave', () => {
              isDown = false;
              shopItemsScroll.classList.remove('active-drag');
          });

          shopItemsScroll.addEventListener('mouseup', (e) => {
              isDown = false;
              shopItemsScroll.classList.remove('active-drag');
              // 마우스 업 시 moved 상태를 유지하여 클릭 이벤트가 발생하지 않도록
          });

          shopItemsScroll.addEventListener('mousemove', (e) => {
              if (!isDown) return;
              e.preventDefault(); // 기본 드래그 동작(텍스트 선택 등) 방지
              const x = e.pageX - shopItemsScroll.offsetLeft;
              const walk = (x - startX) * 1.5; // 스크롤 속도 조절
              if (Math.abs(walk) > 5) { // 5px 이상 움직이면 드래그로 간주
                  moved = true;
              }
              shopItemsScroll.scrollLeft = scrollLeft - walk;
          });

          // 터치 이벤트 (모바일)
          shopItemsScroll.addEventListener('touchstart', (e) => {
            isDown = true;
            moved = false;
            startX = e.touches[0].pageX - shopItemsScroll.offsetLeft;
            scrollLeft = shopItemsScroll.scrollLeft;
          });

          shopItemsScroll.addEventListener('touchend', () => {
            isDown = false;
          });

          shopItemsScroll.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault(); // 기본 터치 스크롤 방지
            const x = e.touches[0].pageX - shopItemsScroll.offsetLeft;
            const walk = (x - startX) * 1.5;
            if (Math.abs(walk) > 5) {
                moved = true;
            }
            shopItemsScroll.scrollLeft = scrollLeft - walk;
          });

          // 자식 요소의 클릭 이벤트 처리: 드래그 중에는 클릭 방지
          shopItemsScroll.querySelectorAll('.shop-item-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (moved) { // 드래그 동작 후 발생한 클릭이라면
                    e.preventDefault(); // 클릭 이벤트를 막음
                    e.stopPropagation(); // 이벤트 버블링도 막음
                    console.log('Click prevented due to drag.');
                    // moved = false; // 클릭을 방지했으니 다음 동작을 위해 초기화 (mousedown에서 초기화되므로 여기서 필수 아님)
                }
            });
          });
      }

      console.log('AI result page scripts initialized.');
  }


  // Main page story section logic
  if (currentPageName === 'main') {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('showStory') === 'true') {
      const storySection = document.getElementById('storySection');
      if (storySection) {
        storySection.style.display = 'block';
        console.log('Story section shown on main page.');
      }
    }
  }

  // Comment modal overlay close on outside click
  const commentModalOverlay = document.getElementById('commentModalOverlay');
  if (commentModalOverlay) {
    commentModalOverlay.addEventListener('click', (event) => {
      if (event.target.id === 'commentModalOverlay') { // 오버레이 자체를 클릭한 경우에만 닫기
        closeCommentModal();
      }
    });

    const commentModalHandle = document.querySelector('.comment-modal-handle');
    if (commentModalHandle) {
        commentModalHandle.addEventListener('click', () => { // 핸들 클릭 시 닫기
            closeCommentModal();
        });
    }
  }

  // Import screen specific logic
  if (currentPageName === 'import') {
      const galleryBtn = document.getElementById('galleryBtn');
      const imageInput = document.getElementById('imageInput');
      const importTitle = document.getElementById('importTitle');
      const imageSliderWrapper = document.getElementById('imageSliderWrapper');
      const previewPlaceholder = document.getElementById('previewPlaceholder');
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      const aiAnalyzeBtn = document.getElementById('aiAnalyzeBtn');
      const aiAnalysisOverlay = document.getElementById('aiAnalysisOverlay');
      const imagePreviewArea = document.getElementById('imagePreviewArea');

      let selectedFiles = []; // 이미지 파일들을 저장할 배열
      let currentImageIndex = 0; // 현재 슬라이더 이미지 인덱스

      // 슬라이더에 모든 이미지를 렌더링하는 함수
      function renderSliderImages() {
          imageSliderWrapper.innerHTML = ''; // 기존 이미지 지우기

          if (selectedFiles.length === 0) {
              importTitle.style.display = 'block';
              previewPlaceholder.style.display = 'block';
              aiAnalyzeBtn.style.display = 'none';
              prevBtn.style.display = 'none';
              nextBtn.style.display = 'none';
              imageSliderWrapper.style.transform = `translateX(0px)`; // 스크롤 위치 초기화
              imageSliderWrapper.style.visibility = 'hidden'; // 슬라이더 숨기기
              console.log('No images selected. Showing placeholder.');
              return;
          }

          importTitle.style.display = 'none';
          previewPlaceholder.style.display = 'none';
          aiAnalyzeBtn.style.display = 'block';
          imageSliderWrapper.style.visibility = 'visible'; // 슬라이더 보이기
          
          let imagesLoadedCount = 0;
          selectedFiles.forEach((file, index) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                  const img = document.createElement('img');
                  img.src = e.target.result;
                  img.alt = `Image Preview ${index + 1}`;
                  imageSliderWrapper.appendChild(img);
                  imagesLoadedCount++;

                  if (imagesLoadedCount === selectedFiles.length) {
                      console.log('All images loaded and appended.');
                      updateSlider(); // 모든 이미지 로드 후 슬라이더 위치 업데이트
                  }
              };
              reader.readAsDataURL(file); // 파일을 Data URL로 읽기
          });
          console.log(`Rendering ${selectedFiles.length} images.`);
      }

      // 슬라이더 위치 및 버튼 가시성을 업데이트하는 함수
      function updateSlider() {
          if (selectedFiles.length === 0) {
              prevBtn.style.display = 'none';
              nextBtn.style.display = 'none';
              imageSliderWrapper.style.transform = `translateX(0px)`;
              return;
          }

          // 현재 인덱스가 유효한 범위 내에 있는지 확인
          if (currentImageIndex >= selectedFiles.length) {
              currentImageIndex = selectedFiles.length - 1;
          }
          if (currentImageIndex < 0) {
              currentImageIndex = 0;
          }

          const slideWidth = imagePreviewArea.clientWidth; // 미리보기 영역의 너비
          const marginBetweenImages = 10; // CSS에 설정된 이미지 간 마진

          // 현재 이미지가 중앙에 오도록 오프셋 계산
          const offset = (slideWidth + marginBetweenImages) * currentImageIndex;
          imageSliderWrapper.style.transform = `translateX(-${offset}px)`;

          // 네비게이션 버튼 가시성 업데이트
          prevBtn.style.display = currentImageIndex > 0 ? 'flex' : 'none';
          nextBtn.style.display = currentImageIndex < selectedFiles.length - 1 ? 'flex' : 'none';
          console.log(`Slider updated to index: ${currentImageIndex}. Offset: ${offset}px`);
      }

      // 갤러리 버튼 클릭 시 파일 입력 요소 트리거
      if (galleryBtn && imageInput) {
          galleryBtn.addEventListener('click', () => {
              imageInput.click(); 
              console.log('Gallery button clicked. Triggering image input.');
          });
      } else {
          console.error('Gallery button or Image input not found!');
      }

      // 파일 선택 완료 시 (파일 누적)
      if (imageInput) {
          imageInput.addEventListener('change', (event) => {
              console.log('Image input change event triggered.');
              const newFiles = Array.from(event.target.files);
              
              if (newFiles.length === 0 && selectedFiles.length === 0) {
                  renderSliderImages(); // 선택 취소되었고 기존 파일도 없으면 초기 상태로 복원
                  return;
              }

              let addedNew = false;
              // 중복 파일 필터링 후 새 파일 추가
              newFiles.forEach(newFile => {
                  const isDuplicate = selectedFiles.some(existingFile => 
                      existingFile.name === newFile.name && existingFile.size === newFile.size
                  );
                  if (!isDuplicate) {
                      selectedFiles.push(newFile);
                      addedNew = true;
                      console.log(`Added new file: ${newFile.name}`);
                  } else {
                      console.log(`Skipped duplicate file: ${newFile.name}`);
                  }
              });

              // 새 파일이 추가되었다면, 새로 추가된 파일의 첫 번째 위치로 이동
              if (addedNew) {
                  currentImageIndex = selectedFiles.length - newFiles.length; 
                  if (currentImageIndex < 0) currentImageIndex = 0; // 음수가 되지 않도록 보장
                  console.log(`New files added. Setting currentImageIndex to ${currentImageIndex}.`);
              } else if (selectedFiles.length > 0) {
                  console.log('No new files added. Re-rendering existing images.');
              } else {
                  currentImageIndex = 0; // 파일이 아예 없으면 인덱스 리셋
                  console.log('No files selected, no previous files. Resetting.');
              }
              
              renderSliderImages(); // 모든 이미지 다시 렌더링
          });
      }

      // 슬라이더 이전 버튼 이벤트 리스너
      if (prevBtn) {
          prevBtn.addEventListener('click', () => {
              if (currentImageIndex > 0) {
                  currentImageIndex--;
                  updateSlider();
                  console.log('Prev button clicked.');
              }
          });
      }
      // 슬라이더 다음 버튼 이벤트 리스너
      if (nextBtn) {
          nextBtn.addEventListener('click', () => {
              if (currentImageIndex < selectedFiles.length - 1) {
                  currentImageIndex++;
                  updateSlider();
                  console.log('Next button clicked.');
              }
          });
      }

      // AI 분석 버튼 클릭 시
      if (aiAnalyzeBtn && aiAnalysisOverlay) {
          aiAnalyzeBtn.addEventListener('click', () => {
              aiAnalysisOverlay.classList.add('show'); // 오버레이 표시
              console.log('AI Analyze button clicked. Overlay shown.');

              // 선택된 이미지들을 Base64 문자열로 변환하여 sessionStorage에 저장
              const imagesToBase64 = [];
              let conversionPromises = [];

              if (selectedFiles.length === 0) {
                  console.warn('No images selected for AI analysis.');
                  // 이미지가 없어도 AI_result 페이지로 이동해야 한다면 처리
                  // 예: imagesToBase64.push('path/to/default_no_image_found.jpg');
              }

              selectedFiles.forEach(file => {
                  conversionPromises.push(new Promise((resolve) => {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                          imagesToBase64.push(e.target.result);
                          resolve();
                      };
                      reader.onerror = (error) => {
                          console.error("Error reading file:", file.name, error);
                          // 오류 발생 시 빈 문자열 또는 특정 오류 이미지 추가 가능
                          imagesToBase64.push(''); 
                          resolve();
                      };
                      reader.readAsDataURL(file);
                  }));
              });

              Promise.all(conversionPromises).then(() => {
                  sessionStorage.setItem('aiSelectedImages', JSON.stringify(imagesToBase64));
                  console.log(`Stored ${imagesToBase64.length} images in session storage.`);
                  // 모든 이미지 변환 및 저장 후 페이지 이동
                  setTimeout(() => {
                      navigateToPage('AI_result'); 
                  }, 5000); // 5초 대기
              }).catch(error => {
                  console.error("Error converting images to Base64:", error);
                  // 오류 발생 시에도 페이지는 이동할 수 있도록 처리 (또는 오류 메시지 표시)
                  setTimeout(() => {
                      navigateToPage('AI_result'); 
                  }, 5000);
              });
          });
      }

      // 키보드 방향키로 슬라이더 탐색 (document에 이벤트 리스너 추가)
      const handleSliderKeyPress = (event) => {
          if (currentPageName === 'import' && selectedFiles.length > 0 && 
              !aiAnalysisOverlay.classList.contains('show')) { // 오버레이가 보이지 않을 때만 작동
              if (event.key === 'ArrowLeft') {
                  if (currentImageIndex > 0) {
                      currentImageIndex--;
                      updateSlider();
                      event.preventDefault(); // 브라우저 기본 스크롤 방지
                      console.log('ArrowLeft pressed.');
                  }
              } else if (event.key === 'ArrowRight') {
                  if (currentImageIndex < selectedFiles.length - 1) {
                      currentImageIndex++;
                      updateSlider();
                      event.preventDefault(); // 브라우저 기본 스크롤 방지
                      console.log('ArrowRight pressed.');
                  }
              }
          }
      };
      document.addEventListener('keydown', handleSliderKeyPress);

      // 창 크기 조절 시 슬라이더 위치 재계산
      window.addEventListener('resize', updateSlider);

      // 페이지 로드 시 초기 슬라이더 상태 설정
      renderSliderImages(); 
      console.log('Import page scripts initialized.');
  }
});