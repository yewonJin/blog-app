export const toggleTheme = () => {
  const theme = document.documentElement.getAttribute('data-theme');

  document.documentElement.setAttribute(
    'data-theme',
    theme === 'light' ? 'dark' : 'light',
  );

  localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
};
