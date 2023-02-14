// Redirect the home page to subscriptions
if (window.location.pathname === '/') {
  const subscriptionsUrl = `${window.location.protocol}//${window.location.host}/feed/subscriptions`;
  window.location.replace(subscriptionsUrl);
}

const sectionTagName = 'YTD-GUIDE-SECTION-RENDERER'
const menuItemTagNames = [
  'YTD-GUIDE-ENTRY-RENDERER',
  'YTD-MINI-GUIDE-ENTRY-RENDERER',
]

const elementsToDelete = [
  // Menu items: Home, Shorts
  (node) => {
    if (!menuItemTagNames.includes(node.nodeName)) return false
    return !!node.querySelector('a[title="Home"], a[title="Shorts"]')
  },
  // Sections: Explore, More from YouTube
  (node) => {
    if (node.nodeName !== sectionTagName) return false
    const section = node.querySelector('#guide-section-title')
    if (section) {
      return ['Explore', 'More from YouTube'].includes(section.textContent)
    }
    return false
  }
]

const observer = new MutationObserver((mutationList) => {
  for (const mutation of mutationList) {
    for (const node of mutation.addedNodes) {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        elementsToDelete.some(shouldBeDeleted => shouldBeDeleted(node))
      ) {
        node.parentElement?.removeChild(node);
      }
    }
  }
});

const menu = document.querySelector('div[id="guide-inner-content"]');
const collapsedMenu = document.querySelector('ytd-mini-guide-renderer');
const config = { childList: true, subtree: true };

if (menu) observer.observe(menu, config);
if (collapsedMenu) observer.observe(collapsedMenu, config);
