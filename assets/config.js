// GitHub Pages base URL configuration
// 自动检测是否在 GitHub Pages 环境
(() => {
  // 获取当前路径，判断是否有子目录
  const path = window.location.pathname;

  // 如果在 GitHub Pages 上 (如 /NCE/), 提取 base path
  // 如果在本地 (如 /), 使用根路径
  let basePath = '/';

  // 匹配类似 /NCE/ 或 /repo-name/ 的模式
  const match = path.match(/^\/([^\/]+)\//);
  if (match && !path.startsWith('/localhost')) {
    basePath = `/${match[1]}/`;
  }

  // 如果页面在根目录的 HTML 文件中，确保正确处理
  if (path === '/' || path.endsWith('.html')) {
    basePath = path.substring(0, path.lastIndexOf('/') + 1);
    if (basePath.includes('.html')) {
      basePath = basePath.substring(0, basePath.lastIndexOf('/') + 1);
    }
  }

  // 导出全局配置
  window.NCE_CONFIG = {
    basePath: basePath,

    // 获取资源的完整路径
    getAssetPath: function(path) {
      // 移除开头的斜杠（如果有）
      const cleanPath = path.replace(/^\//, '');

      // 如果是绝对路径或外部链接，直接返回
      if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://') || cleanPath.startsWith('//')) {
        return path;
      }

      // 对于本地路径，确保正确拼接
      if (this.basePath === '/') {
        return '/' + cleanPath;
      }

      return this.basePath + cleanPath;
    }
  };

  console.log('NCE Config initialized:', window.NCE_CONFIG.basePath);
})();
