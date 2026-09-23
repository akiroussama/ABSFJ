/** ABSFJ language support. No location lookup or external translation request. */
(() => {
  const dictionaries = {
    en: {
      'body > .skip-link': 'Skip to content',
      '.top-bar-left > span:last-child': 'A living connection between Tunisia and Japan',
      '.top-bar-link': 'Follow our news ↗',
      '.news-alert-label': 'LATEST NEWS',
      '.nav-links li:nth-child(1) .nav-link': '<span class="nav-link-kanji">ホーム</span>Home',
      '.nav-links li:nth-child(2) .nav-link': '<span class="nav-link-kanji">概要</span>About us',
      '.nav-links li:nth-child(3) .nav-link': '<span class="nav-link-kanji">使命</span>Our mission',
      '.nav-links li:nth-child(4) .nav-link': '<span class="nav-link-kanji">活動</span>Events',
      '.nav-links li:nth-child(5) .nav-link': '<span class="nav-link-kanji">写真</span>Gallery',
      '.nav-links li:nth-child(6) .nav-link': '<span class="nav-link-kanji">紋章</span>Our emblem',
      '.nav-links li:nth-child(7) .nav-link': '<span class="nav-link-kanji">連携</span>Partners',
      '.nav-links li:nth-child(8) .nav-link': '<span class="nav-link-kanji">連絡</span>Contact',
      '.restitution-nav span': 'Mission stories', '.btn-nav-cta span': 'Member area',
      '.hero-title': 'Two cultures.<br>One shared<br><em>ambition.</em>',
      '.hero-description': 'From Japan to Tunisia, knowledge is passed on.<br>Connections grow. The future is built together.',
      '.hero-cta-group .btn-primary': 'The ABSFJ spirit <span aria-hidden="true">↗</span>',
      '.hero-cta-group .text-link': 'Explore our work <span aria-hidden="true">→</span>',
      '.hero-signature p': 'Journeys in Japan.<br><strong>A future to share.</strong>',
      '.diorama-caption p': 'One shared horizon.',
      '.stats-section .eyebrow': 'A SHARED LEGACY',
      '.stats-section p': 'The strength of a bond.<br><em>The richness of a network.</em>',
      '#a-propos .section-header .section-title': 'Experience transforms us.<br><em>Sharing brings us together.</em>',
      '#a-propos .section-header .section-subtitle': 'The Association of Beneficiaries of JICA Training Programmes in Japan in Tunisia believes knowledge reaches its full value when it is shared.',
      '#piliers .section-header .section-title': 'Four values.<br><em>One shared horizon.</em>',
      '#piliers .section-header .section-subtitle': 'From human connections to local projects, we are united by a commitment to sharing, progress and respect.',
      '#piliers .pillar-card:nth-child(1) .pillar-title': 'Building connections',
      '#piliers .pillar-card:nth-child(1) .pillar-desc': 'Bring together and support the community of more than 1,800 Tunisian professionals trained in Japan through solidarity, mentoring and business opportunities.',
      '#piliers .pillar-card:nth-child(2) .pillar-title': 'Improving every day',
      '#piliers .pillar-card:nth-child(2) .pillar-desc': 'Promote total quality, 5S and waste reduction, while strengthening Tunisian industry, hospitals and public services.',
      '#piliers .pillar-card:nth-child(3) .pillar-title': 'Caring for our environment',
      '#piliers .pillar-card:nth-child(3) .pillar-desc': 'Share proven Japanese environmental approaches, including the Fukuoka semi-aerobic landfill method in Béja and industrial decarbonisation.',
      '#piliers .pillar-card:nth-child(4) .pillar-title': 'Bringing cultures closer',
      '#piliers .pillar-card:nth-child(4) .pillar-desc': 'Build cultural and economic bridges through visitor guides, university partnerships and investment.',
      '#evenements .section-header .section-title': 'A friendship <em>lived together.</em>',
      '#evenements .section-header .section-subtitle': 'Meetings, initiatives and shared moments: discover the people advancing Tunisian-Japanese cooperation.',
      '#evenements [data-filter="all"]': 'All updates (14)', '#evenements [data-filter="reseau"]': 'Network & talent',
      '#evenements [data-filter="kaizen"]': 'Kaizen & climate', '#evenements [data-filter="ecologie"]': 'Environment',
      '#evenements [data-filter="amitie"]': 'Sport & friendship', '#evenements [data-filter="ag"]': 'Association life',
      '#galerie .section-header .section-title': 'The faces of <em>our story.</em>',
      '#galerie .section-header .section-subtitle': 'Twenty-two glimpses of a relationship built day by day. Explore the photographs and find each original post.',
      '#galerie [data-gfilter="all"]': 'All photos (22)', '#galerie [data-gfilter="diplomatie"]': 'Diplomacy & 70 years (8)',
      '#galerie [data-gfilter="talents"]': 'Young talent & AI (8)', '#galerie [data-gfilter="kaizen"]': 'Kaizen & climate (1)',
      '#galerie [data-gfilter="sport"]': 'Sport & community (2)', '#galerie [data-gfilter="ecologie"]': 'Projects & Béja (1)',
      '#galerie [data-gfilter="afrique"]': 'Africa & network (1)', '#galerie [data-gfilter="amitie"]': 'Japanese volunteers (1)',
      '#restitution .section-title': 'From Japan to Tunisia,<br><em>sharing what matters.</em>',
      '#restitution .section-subtitle': 'Every mission in Japan can benefit the whole community. ABSFJ members can prepare a short, practical account for the network here.',
      '#restitution h3': 'Share my experience', '#restitution .form-card-intro': 'Write two or three paragraphs. A document ready to send to the association board will be created.',
      'label[for="restitution-name"]': 'Full name', 'label[for="restitution-year"]': 'Year of mission',
      'label[for="restitution-title"]': 'Mission or training title', 'label[for="restitution-text"]': 'My account · 2 to 3 paragraphs',
      '#restitution-submit': 'Prepare my account ↗', '.restitution-submit': 'Prepare my account ↗',
      '#logo-section .section-title': 'Two shores, <em>one emblem.</em>',
      '#logo-section .section-subtitle': 'Discover the meaning behind our emblem and download high-resolution vector formats.',
      '#adhesion .section-header .section-title': 'Your journey continues <em>with us.</em>',
      '#adhesion .section-header .section-subtitle': 'Completed a JICA training programme in Japan? Prepare your request to join the community and preview your alumni card.',
      '#adhesion label[for="card-input-name"]': 'Full name', '#adhesion label[for="card-input-year"]': 'JICA training year', '#adhesion label[for="card-input-domain"]': 'Field of expertise', '#adhesion label[for="member-email"]': 'Professional email address', '#adhesion label[for="member-org"]': 'Organisation / employer', '.site-footer .footer-invitation h2': 'Let us keep writing<br><em>this story together.</em>',
    },
    ja: {
      'body > .skip-link': '本文へ移動',
      '.top-bar-left > span:last-child': 'チュニジアと日本を結ぶ、生きた絆', '.top-bar-link': '最新情報をフォロー ↗', '.news-alert-label': '最新ニュース',
      '.nav-links li:nth-child(1) .nav-link': '<span class="nav-link-kanji">ホーム</span>ホーム', '.nav-links li:nth-child(2) .nav-link': '<span class="nav-link-kanji">概要</span>協会について',
      '.nav-links li:nth-child(3) .nav-link': '<span class="nav-link-kanji">使命</span>活動理念', '.nav-links li:nth-child(4) .nav-link': '<span class="nav-link-kanji">活動</span>活動・イベント',
      '.nav-links li:nth-child(5) .nav-link': '<span class="nav-link-kanji">写真</span>ギャラリー', '.nav-links li:nth-child(6) .nav-link': '<span class="nav-link-kanji">紋章</span>公式ロゴ',
      '.nav-links li:nth-child(7) .nav-link': '<span class="nav-link-kanji">連携</span>パートナー', '.nav-links li:nth-child(8) .nav-link': '<span class="nav-link-kanji">連絡</span>お問い合わせ',
      '.restitution-nav span': '研修報告', '.btn-nav-cta span': '会員ページ',
      '.hero-title': '二つの文化。<br>一つの<br><em>志。</em>', '.hero-description': '日本からチュニジアへ、知識をつなぐ。<br>絆を育み、未来を共に築きます。',
      '.hero-cta-group .btn-primary': 'ABSFJの精神 <span aria-hidden="true">↗</span>', '.hero-cta-group .text-link': '活動を見る <span aria-hidden="true">→</span>',
      '.hero-signature p': '日本での学び。<br><strong>共に描く未来。</strong>', '.diorama-caption p': '共に見つめる未来。', '.stats-section .eyebrow': '共有する遺産',
      '.stats-section p': '絆の力。<br><em>広がるネットワーク。</em>',
      '#a-propos .section-header .section-title': '経験が人を変える。<br><em>分かち合いが人を結ぶ。</em>',
      '#a-propos .section-header .section-subtitle': 'チュニジアJICA研修生同窓会は、日本で得た知識は伝え合うことで真価を発揮すると信じています。',
      '#piliers .section-header .section-title': '四つの価値。<br><em>共に描く未来。</em>', '#piliers .section-header .section-subtitle': '人と人との絆から現場のプロジェクトまで、知識の共有、進歩、敬意を大切にします。',
      '#piliers .pillar-card:nth-child(1) .pillar-title': '絆を育む', '#piliers .pillar-card:nth-child(1) .pillar-desc': '日本で研修を受けた1,800人以上のチュニジア人専門家をつなぎ、助け合い、メンタリング、ビジネス機会を育みます。',
      '#piliers .pillar-card:nth-child(2) .pillar-title': '日々、改善する', '#piliers .pillar-card:nth-child(2) .pillar-desc': '総合的品質管理、5S、無駄の削減を広め、チュニジアの産業、病院、公共サービスの発展を支えます。',
      '#piliers .pillar-card:nth-child(3) .pillar-title': '環境を守る', '#piliers .pillar-card:nth-child(3) .pillar-desc': 'ベジャの福岡方式による準好気性埋立てや産業の脱炭素化など、日本の環境技術を共有します。',
      '#piliers .pillar-card:nth-child(4) .pillar-title': '文化をつなぐ', '#piliers .pillar-card:nth-child(4) .pillar-desc': '観光案内、大学連携、投資を通じて、文化と経済の架け橋を築きます。',
      '#evenements .section-header .section-title': '友情を、<em>共に生きる。</em>', '#evenements .section-header .section-subtitle': '出会い、取り組み、分かち合う時間。チュニジアと日本の協力を進める人々をご紹介します。',
      '#evenements [data-filter="all"]': 'すべて (14)', '#evenements [data-filter="reseau"]': 'ネットワーク・人材', '#evenements [data-filter="kaizen"]': '改善・気候', '#evenements [data-filter="ecologie"]': '環境', '#evenements [data-filter="amitie"]': 'スポーツ・友情', '#evenements [data-filter="ag"]': '協会の活動',
      '#galerie .section-header .section-title': '<em>私たちの歩み。</em>', '#galerie .section-header .section-subtitle': '日々築かれる関係を写した22枚の写真をご覧ください。各投稿の原文もご覧いただけます。',
      '#galerie [data-gfilter="all"]': 'すべての写真 (22)', '#galerie [data-gfilter="diplomatie"]': '外交・70周年 (8)', '#galerie [data-gfilter="talents"]': '若い才能・AI (8)', '#galerie [data-gfilter="kaizen"]': '改善・気候 (1)', '#galerie [data-gfilter="sport"]': 'スポーツ・交流 (2)', '#galerie [data-gfilter="ecologie"]': 'プロジェクト・ベジャ (1)', '#galerie [data-gfilter="afrique"]': 'アフリカ・ネットワーク (1)', '#galerie [data-gfilter="amitie"]': '日本人ボランティア (1)',
      '#restitution .section-title': '日本からチュニジアへ、<br><em>学びを伝える。</em>', '#restitution .section-subtitle': '日本での研修をコミュニティ全体の力に。ABSFJ会員は、ネットワークに役立つ短い報告をここで準備できます。', '#restitution h3': '研修経験を共有する', '#restitution .form-card-intro': '2〜3段落でご記入ください。協会の理事会に送るための文書を作成します。',
      'label[for="restitution-name"]': '氏名', 'label[for="restitution-year"]': '研修年', 'label[for="restitution-title"]': '研修・プログラム名', 'label[for="restitution-text"]': '研修報告（2〜3段落）', '.restitution-submit': '報告書を作成 ↗',
      '#logo-section .section-title': '二つの岸、<em>一つの紋章。</em>', '#logo-section .section-subtitle': '公式ロゴに込められた意味をご覧いただき、高解像度のベクター形式をダウンロードできます。', '#adhesion .section-header .section-title': 'あなたの旅は<em>ここから続く。</em>', '#adhesion .section-header .section-subtitle': '日本でJICA研修に参加されましたか？コミュニティへの参加申請を準備し、同窓生カードのプレビューをご覧ください。', '#adhesion label[for="card-input-name"]': '氏名', '#adhesion label[for="card-input-year"]': 'JICA研修の年', '#adhesion label[for="card-input-domain"]': '専門分野', '#adhesion label[for="member-email"]': '勤務先メールアドレス', '#adhesion label[for="member-org"]': '所属機関・企業', '.site-footer .footer-invitation h2': 'この物語を、<br><em>共に紡ぎ続けましょう。</em>',
    },
  };
  const languages = { fr: { label: 'Français', dir: 'ltr', locale: 'fr-TN' }, en: { label: 'English', dir: 'ltr', locale: 'en' }, ja: { label: '日本語', dir: 'ltr', locale: 'ja' } };
  const originalMarkup = new Map();
  function initialLanguage() {
    try {
      const saved = localStorage.getItem('absfj-language');
      if (languages[saved]) return saved;
    } catch { /* Storage may be disabled. */ }
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (timezone === 'Asia/Tokyo') return 'ja';
    const requested = (navigator.languages || [navigator.language || 'fr']).map(x => x.toLowerCase());
    if (timezone === 'Africa/Tunis') return 'fr';
    for (const lang of requested) if (lang.startsWith('ja')) return 'ja';
    for (const lang of requested) if (lang.startsWith('en')) return 'en';
    return 'fr';
  }
  function applyLanguage(lang) {
    const root = document.documentElement;
    root.lang = languages[lang].locale;
    root.dir = languages[lang].dir;
    root.dataset.language = lang;
    for (const [node, markup] of originalMarkup) node.innerHTML = markup;
    const dict = dictionaries[lang] || {};
    for (const [selector, copy] of Object.entries(dict)) {
      document.querySelectorAll(selector).forEach(node => {
        if (!originalMarkup.has(node)) originalMarkup.set(node, node.innerHTML);
        if (node.matches('input,textarea,option')) node.setAttribute('placeholder', copy);
        else node.innerHTML = copy;
      });
    }
    document.querySelectorAll('[data-language]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.language === lang));
    });
    const pickerNames = { fr: ['Choisir une langue', 'Choisir une langue', 'Fermer'], en: ['Choose your language', 'Choose a language', 'Close'], ja: ['言語を選択', '言語を選択', '閉じる'] }[lang];
    document.querySelector('.language-nudge-label').textContent = pickerNames[0];
    document.getElementById('language-nudge').setAttribute('aria-label', pickerNames[1]);
    document.querySelector('.language-nudge-close').setAttribute('aria-label', pickerNames[2]);
    document.getElementById('language-trigger').setAttribute('aria-label', pickerNames[1]);
    document.title = ({ fr: 'ABSFJ Tunisie | Association des Bénéficiaires des Sessions de Formation au Japon (JICA)', en: 'ABSFJ Tunisia | JICA Alumni', ja: 'チュニジア JICA 研修生同窓会 | ABSFJ' })[lang];
  }
  document.addEventListener('DOMContentLoaded', () => {
    const nudge = document.getElementById('language-nudge');
    const lang = initialLanguage();
    applyLanguage(lang);
    document.querySelectorAll('.language-nudge-options [data-language]').forEach(button => button.addEventListener('click', () => {
      const selected = button.dataset.language;
      applyLanguage(selected);
      try { localStorage.setItem('absfj-language', selected); } catch { /* Keep this page's selection. */ }
      document.querySelector('.language-trigger span:last-child').textContent = selected.toUpperCase();
      dismiss();
    }));
    let timer;
    const trigger = document.getElementById('language-trigger');
    function dismiss() {
      clearTimeout(timer);
      nudge.classList.remove('is-visible');
      nudge.classList.add('is-dismissed');
      trigger.setAttribute('aria-expanded', 'false');
      try { sessionStorage.setItem('absfj-language-invited', 'yes'); } catch { /* Dismiss for this page even without session storage. */ }
      window.removeEventListener('scroll', dismiss);
    }
    trigger.addEventListener('click', () => {
      nudge.hidden = false;
      nudge.classList.remove('is-dismissed');
      requestAnimationFrame(() => nudge.classList.add('is-visible'));
      trigger.setAttribute('aria-expanded', 'true');
    });
    nudge.querySelector('.language-nudge-close').addEventListener('click', dismiss);
    let hasSavedLanguage = false;
    try { hasSavedLanguage = Boolean(localStorage.getItem('absfj-language')); } catch { /* Continue with browser defaults. */ }
    let alreadyInvited = false;
    try { alreadyInvited = sessionStorage.getItem('absfj-language-invited') === 'yes'; } catch { /* Session storage is optional. */ }
    if (!hasSavedLanguage && !alreadyInvited) {
      timer = setTimeout(() => {
        nudge.removeAttribute('hidden');
        requestAnimationFrame(() => nudge.classList.add('is-visible'));
      }, 500);
      timer = setTimeout(dismiss, 9000);
      window.addEventListener('scroll', dismiss, { once: true, passive: true });
      document.addEventListener('click', event => { if (!nudge.contains(event.target)) dismiss(); }, { once: true });
      document.addEventListener('keydown', event => { if (event.key === 'Escape') dismiss(); }, { once: true });
    } else {
      nudge.classList.add('is-dismissed');
    }
    trigger.querySelector('span:last-child').textContent = lang.toUpperCase();
  });
})();
