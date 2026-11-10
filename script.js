const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  nav.classList.toggle('open', open);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '메뉴 열기');
    nav.classList.remove('open');
  });
});

const floorNames = {b1f:'B1F', '1f':'1F', '2f':'2F', '3f':'3F', '4f':'4F', '5f':'5F', '6f':'6F', '7f':'7F', '8f':'8F', '9f':'9F', '10f':'10F'};
const floorTabs = document.querySelectorAll('.floor-tab');
const floorImage = document.querySelector('#floor-image');
const floorTitle = document.querySelector('#floor-title');
const floorDialog = document.querySelector('#floor-dialog');
const dialogImage = document.querySelector('#dialog-floor-image');
const dialogTitle = document.querySelector('#dialog-floor-title');
let selectedFloor = 'b1f';

function showFloor(floor) {
  selectedFloor = floor;
  const name = floorNames[floor];
  const src = `assets/floor-${floor}.jpg`;
  floorImage.src = src;
  floorImage.alt = `${name} 층별 평면도 및 호실 안내`;
  floorTitle.textContent = `${name} 평면도`;
  floorTabs.forEach((tab) => {
    const active = tab.dataset.floor === floor;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-pressed', String(active));
  });
  if (floorDialog.open) {
    dialogTitle.textContent = `${name} 평면도`;
    dialogImage.src = src;
    dialogImage.alt = `${name} 층별 평면도 및 호실 안내`;
  }
}

floorTabs.forEach((tab) => tab.addEventListener('click', () => showFloor(tab.dataset.floor)));
function openFloorDialog() {
  dialogTitle.textContent = `${floorNames[selectedFloor]} 평면도`;
  dialogImage.src = `assets/floor-${selectedFloor}.jpg`;
  dialogImage.alt = `${floorNames[selectedFloor]} 층별 평면도 및 호실 안내`;
  floorDialog.showModal();
}
document.querySelector('.zoom-plan').addEventListener('click', openFloorDialog);
document.querySelector('.floor-image-button').addEventListener('click', openFloorDialog);
document.querySelector('.dialog-close').addEventListener('click', () => floorDialog.close());
floorDialog.addEventListener('click', (event) => {
  if (event.target === floorDialog) floorDialog.close();
});
