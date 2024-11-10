// Create a tab in the devtools area
chrome.devtools.panels.create(
  "CS50 Final Project",
  null,
  "/html/Panel.html",
  (panel) => {}
);

chrome.devtools.panels.elements.createSidebarPane("Extension 4 Rules",
  function(sidebar) {
    sidebar.setPage("/html/sidebar.html");
    sidebar.setHeight("8ex");
  }
);