if (window.location.pathname === '/') {
  const subscriptionsUrl = `${window.location.protocol}//${window.location.host}/feed/subscriptions`;
  window.location.replace(subscriptionsUrl);
}

function isMenuItemToRemove(ytdGuideEntryRendererNode) {
  for (const node of ytdGuideEntryRendererNode.childNodes) {
    if (node.nodeName === 'A' && node.nodeType === Node.ELEMENT_NODE) {
      return ['Home', 'Shorts'].includes(node.getAttribute('title'));
    }
  }
  return false;
}

const menuItemTagNames = [
  'YTD-GUIDE-ENTRY-RENDERER',
  'YTD-MINI-GUIDE-ENTRY-RENDERER',
];
const observer = new MutationObserver((mutationList) => {
  for (const mutation of mutationList) {
    for (const node of mutation.addedNodes) {
      if (
        menuItemTagNames.includes(node.nodeName) &&
        node.nodeType === Node.ELEMENT_NODE &&
        isMenuItemToRemove(node)
      ) {
        node.parentElement?.removeChild(node);
      }
    }
  }
});

const menu = document.querySelector('div[id="guide-inner-content"]');
const collapsedMenu = document.querySelector('ytd-mini-guide-renderer');
const config = { childList: true, subtree: true };

if (collapsedMenu) observer.observe(collapsedMenu, config);
if (menu) observer.observe(menu, config);
