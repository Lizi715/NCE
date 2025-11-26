// GitHub Pages base URL configuration
// 自动检测是否在 GitHub Pages 环境
(() => {
  // 获取当前路径
  const path = window.location.pathname;
  const hostname = window.location.hostname;

  // 确定 base path
  let basePath = '';

  // GitHub Pages 检测: username.github.io/repo-name/
  // 匹配模式: /repo-name/xxx.html 或 /repo-name/
  if (hostname.includes('github.io')) {
    const match = path.match(/^\/([^\/]+)/);
    if (match) {
      const repoName = match[1];
      // 排除直接的 HTML 文件名（如果仓库名看起来像文件）
      if (!repoName.endsWith('.html')) {
        basePath = `/${repoName}`;
      }
    }
  }
  // 本地开发环境
  else if (hostname === 'localhost' || hostname === '127.0.0.1') {
    basePath = '';
  }

  // 导出全局配置
  window.NCE_CONFIG = {
    basePath: basePath,

    // 获取资源的完整路径
    getAssetPath: function(resourcePath) {
      // 移除开头的斜杠（如果有）
      const cleanPath = resourcePath.replace(/^\//, '');

      // 如果是绝对 URL，直接返回
      if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://') || cleanPath.startsWith('//')) {
        return resourcePath;
      }

      // 拼接 base path 和资源路径
      if (this.basePath) {
        return `${this.basePath}/${cleanPath}`;
      }

      return `/${cleanPath}`;
    }
  };

  console.log('NCE Config initialized - basePath:', window.NCE_CONFIG.basePath);
  console.log('NCE Config - hostname:', hostname);
  console.log('NCE Config - pathname:', path);
})();
