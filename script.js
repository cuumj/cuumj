// script.js

// 페이지 이동 함수 (이전과 동일)
function navigateToPage(pageAndQueryString) {
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

// 좋아요 토글 함수 (이전과 동일)
function toggleLike(button) {
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
}

// 북마크 토글 함수 (이전과 동일)
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
}

// 인스타그램 연동 시뮬레이션 (이전과 동일)
function connectInstagram() {
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
    // 모달이 열릴 때 body 스크롤 방지 (선택 사항)
    document.body.style.overflow = 'hidden';
  }
}

// 댓글 모달 닫기
function closeCommentModal() {
  const modalOverlay = document.getElementById('commentModalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('show');
    // 모달이 닫힐 때 body 스크롤 허용 (선택 사항)
    document.body.style.overflow = '';
  }
}

// 페이지 로드 시 실행될 스크립트 (이전과 동일)
document.addEventListener('DOMContentLoaded', () => {
  const currentPageName = window.location.pathname.split('/').pop().split('.')[0];

  const navItems = document.querySelectorAll('.bottom-nav .nav-item');
  if (navItems.length > 0) {
      navItems.forEach(item => {
        const dataPage = item.getAttribute('data-page');

        if (currentPageName === dataPage) {
          item.classList.add('active');
        }
        
        item.onclick = () => navigateToPage(dataPage);
      });
  }

  if (currentPageName === 'main') {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('showStory') === 'true') {
      const storySection = document.getElementById('storySection');
      if (storySection) {
        storySection.style.display = 'block';
      }
    }
  }

  // 댓글 모달 외부 클릭 시 닫기 (새로 추가)
  const commentModalOverlay = document.getElementById('commentModalOverlay');
  if (commentModalOverlay) {
    commentModalOverlay.addEventListener('click', (event) => {
      // 모달 콘텐츠 영역이 아닌 오버레이를 클릭했을 때만 닫기
      if (event.target.id === 'commentModalOverlay') {
        closeCommentModal();
      }
    });

    // 모달 상단 핸들 드래그로 닫기 (선택 사항, 복잡할 수 있음. 간단한 클릭/드래그로 대체)
    const commentModalHandle = document.querySelector('.comment-modal-handle');
    if (commentModalHandle) {
        commentModalHandle.addEventListener('click', () => {
            closeCommentModal();
        });
        // 드래그로 닫는 기능을 구현하려면 더 복잡한 터치/마우스 이벤트 처리가 필요합니다.
        // 현재는 클릭으로 닫히도록 간단하게 구현했습니다.
    }
  }
});