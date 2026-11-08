/* Home-only integration. Galleries and project cards own their respective views. */
(() => {
  const copy = {
    en: {
      share: 'Share my photos', discover: 'Discover the projects',
      projectTag: 'TOGETHER, ON THE GROUND <span lang="ja">未来</span>',
      projectTitle: 'Ideas becoming <em>shared projects.</em>',
      projectSubtitle: 'Health, the environment and human connections: three initiatives turning shared knowledge into practical action.',
      allProjects: 'Explore the projects <span aria-hidden="true">↗</span>',
      projectNote: 'Three example projects for discussion. Owners, budgets and progress are demonstration proposals to be validated by the association.',
      mediaTag: 'OUR SHARED MEMORIES <span lang="ja">思い出</span>',
      mediaTitle: 'Your moments. <em>Our story.</em>',
      mediaSubtitle: 'Discover the latest photos from our community. Gatherings, journeys to Japan and memories worth sharing.',
      allPhotos: 'Open the media library <span aria-hidden="true">↗</span>',
      uploadTitle: 'You were there too?', uploadText: 'Add your photos to an album, without creating an account.',
      uploadButton: 'Share my photos <span aria-hidden="true">＋</span>',
      navMedia: '<span class="nav-link-kanji">写真</span>Media library',
      navProjects: '<span class="nav-link-kanji">未来</span>Projects'
    },
    ja: {
      share: '写真を共有する', discover: 'プロジェクトを見る',
      projectTag: '共に取り組む <span lang="ja">未来</span>',
      projectTitle: 'アイデアから、<em>共に歩むプロジェクトへ。</em>',
      projectSubtitle: '医療、環境、人と人との交流。共有する知識を具体的な行動につなぐ三つの取り組み。',
      allProjects: 'プロジェクトを見る <span aria-hidden="true">↗</span>',
      projectNote: '検討用の三つのプロジェクト例です。担当者、予算、進捗はデモ用の提案であり、協会による確認が必要です。',
      mediaTag: 'みんなの思い出 <span lang="ja">思い出</span>',
      mediaTitle: 'あなたのひととき。<em>私たちの物語。</em>',
      mediaSubtitle: '交流会、日本への旅、分かち合いたい思い出。コミュニティの最新写真をご覧ください。',
      allPhotos: '写真ライブラリを見る <span aria-hidden="true">↗</span>',
      uploadTitle: 'あなたの思い出も、ここに。', uploadText: 'アカウント登録なしで、アルバムに写真を追加できます。',
      uploadButton: '写真を共有する <span aria-hidden="true">＋</span>',
      navMedia: '<span class="nav-link-kanji">写真</span>写真ライブラリ',
      navProjects: '<span class="nav-link-kanji">未来</span>プロジェクト'
    }
  };
  const original = new Map();
  function translate(language) {
    document.querySelectorAll('[data-community]').forEach(node => {
      if (!original.has(node)) original.set(node, node.innerHTML);
      node.innerHTML = copy[language]?.[node.dataset.community] || original.get(node);
    });
    const navMedia = document.querySelector('.nav-links a[href="#galerie"]');
    const navProjects = document.querySelector('.nav-links a[href="#projets"]');
    if (navMedia) navMedia.innerHTML = copy[language]?.navMedia || '<span class="nav-link-kanji">写真</span>Médiathèque';
    if (navProjects) navProjects.innerHTML = copy[language]?.navProjects || '<span class="nav-link-kanji">未来</span>Projets';
  }
  window.addEventListener('absfj:languagechange', event => translate(event.detail.language));
  const start = () => {
    translate(document.documentElement.dataset.language || 'fr');
    const media = document.getElementById('media-home-grid');
    if (media && window.ABSFJMedia) window.ABSFJMedia.renderPreview(media);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
