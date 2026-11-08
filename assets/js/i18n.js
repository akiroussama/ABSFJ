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
      '.nav-links li:nth-child(5) .nav-link': '<span class="nav-link-kanji">写真</span>Media library',
      '.nav-links li:nth-child(6) .nav-link': '<span class="nav-link-kanji">未来</span>Projects',
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
      '.stat-item:nth-child(2) .stat-label': 'Talents trained in Japan',
      '.stat-item:nth-child(3) .stat-label': 'Years of JICA cooperation',
      '.stat-item:nth-child(4) .stat-label': 'Cultures, one shared ambition',
      '#a-propos .section-header .section-title': 'Experience transforms us.<br><em>Sharing brings us together.</em>',
      '#a-propos .section-tag': '01 / ABOUT THE ASSOCIATION <span lang="ja">私たちについて</span>', '#piliers .section-tag': '02 / OUR MISSION <span lang="ja">私たちの使命</span>', '#evenements .section-tag': '03 / OUR JOURNAL <span lang="ja">活動日誌</span>', '#galerie .section-tag': '04 / SHARED MOMENTS <span lang="ja">思い出</span>', '#restitution .section-tag': '05 / MEMBER STORIES <span lang="ja">研修報告</span>', '#logo-section .section-tag': '06 / OUR EMBLEM <span lang="ja">シンボル</span>', '#adhesion .section-tag': '07 / JOIN THE NETWORK <span lang="ja">共に歩む</span>',
      '#a-propos .section-header .section-subtitle': 'The Association of Beneficiaries of JICA Training Programmes in Japan in Tunisia believes knowledge reaches its full value when it is shared.',
      '#a-propos .president-portrait figcaption span:first-child': 'MESSAGE FROM THE PRESIDENT',
      '#a-propos .representative-portrait figcaption span:first-child': 'JICA IN TUNISIA',
      '#a-propos .president-message .quote-text': 'ABSFJ is more than an association of former JICA trainees: it is a place for ideas, practical action and <em>a living bridge between Tunisia and Japan.</em>',
      '#a-propos .representative-message .quote-text': 'Since 1975, cooperation between JICA and Tunisia has grown through <em>sharing knowledge and building lasting human connections.</em>',
      '#a-propos .president-full summary': 'Read the full message <span aria-hidden="true">＋</span>',
      '#a-propos .voice-card:first-child .president-full p': 'Having benefited from advanced training in Japan, we have a moral and patriotic responsibility to bring a culture of rigour, KAIZEN methods and mutual respect to every Tunisian institution and business.',
      '#a-propos .voice-card:last-child .president-full p': 'More than 1,800 Tunisians have taken part in training or study programmes in Japan. This community carries forward half a century of cooperation across vital fields, from energy and health to the environment and industry, and passes this friendship on to new generations.',
      '#a-propos .voice-card:first-child .president-info p': 'Diplomat · President of ABSFJ',
      '#a-propos .voice-card:last-child .president-info p': 'Resident Representative · JICA Office in Tunisia',
      '#a-propos .president-honour > div > span': 'ORDER OF THE RISING SUN',
      '#a-propos .president-honour p': 'Gold Rays with Rosette · Japan, 2025',
      '#a-propos .voice-source-note': 'English adaptation of JICA’s official message',
      '#a-propos .voice-source': 'Official JICA message and portrait ↗',
      '#a-propos .history-line > div:nth-child(1) h3': 'The first connections',
      '#a-propos .history-line > div:nth-child(1) p': 'JICA training programmes opened new horizons for Tunisian talent.',
      '#a-propos .history-line > div:nth-child(2) h3': 'Knowledge in motion',
      '#a-propos .history-line > div:nth-child(2) p': 'Engineers, doctors, researchers and professionals share their experience in Japan.',
      '#a-propos .history-line > div:nth-child(3) h3': 'A renewed collective spirit',
      '#a-propos .history-line > div:nth-child(3) p': 'ABSFJ was launched on 14 February at the Cité des Sciences in Tunis.',
      '#bureau .section-tag': 'THE EXECUTIVE BOARD <span lang="ja">共に</span>',
      '#governance-title': 'A shared <em>commitment.</em>',
      '.governance-context': 'The board members are listed in the association’s founding notice published in the Official Gazette on 25 December 2024.',
      '.governance-grid > div:nth-child(1) dt': 'President', '.governance-grid > div:nth-child(2) dt': 'Vice-President', '.governance-grid > div:nth-child(3) dt': 'Secretary General', '.governance-grid > div:nth-child(4) dt': 'Treasurer',
      '.governance-source': 'View the official notice · JORT No. 149, p. 3066 · 25 December 2024 ↗',
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
      '#evenements .section-header .section-title': 'A friendship <em>lived together.</em>', '.upcoming-art-kicker span:first-child': 'ALUMNI GATHERING', '.event-card-upcoming .event-date-overlay': 'SUNDAY · RAS JBEL',
      '#evenements .section-header .section-subtitle': 'Meetings, initiatives and shared moments: discover the people advancing Tunisian-Japanese cooperation.',
      '#evenements [data-filter="all"]': 'All updates (15)', '#evenements [data-filter="reseau"]': 'Network & talent',
      '#evenements [data-filter="kaizen"]': 'Kaizen & climate', '#evenements [data-filter="ecologie"]': 'Environment',
      '#evenements [data-filter="amitie"]': 'Sport & friendship', '#evenements [data-filter="ag"]': 'Association life',
      '#evenements .event-card[data-event-id="team-building-ras-jbel"] .event-title': 'ABSFJ Team-Building Day',
      '#evenements .event-card[data-event-id="team-building-ras-jbel"] .event-desc': '“Tunisia–Japan: learn, share, create” — a day of activities and conversation to strengthen bonds among ABSFJ members.',
      '#event-team-building-ras-jbel .open-modal-btn': 'View programme →',
      '#evenements .event-card[data-event-id="team-building-ras-jbel"] .event-location': 'Ras Jbel · Tunisia',
      '#event-bridging-japan-tunisia-enit .event-title': 'Bridging Japan and Tunisia at ENIT',
      '#event-bridging-japan-tunisia-enit .event-desc': 'JICA Tunisia invites ABSFJ to a meeting on study opportunities in Japan and academic, professional and cultural ties, on 11 November 2026 at ENIT.',
      '#event-bridging-japan-tunisia-enit .event-location': 'ENIT · Tunis',
      '#event-bridging-japan-tunisia-enit .event-type-badge-overlay': 'Research, innovation & culture',
      '#event-bridging-japan-tunisia-enit .event-text-art-month': '11 NOV · ENIT',
      '#evenements .event-card[data-event-id="team-building-ras-jbel"] .event-type-badge-overlay': 'Coming up · Association life', '#evenements .event-card[data-event-id="restitution-yosra-ben-fadhel"] .event-type-badge-overlay': 'JICA training report', '#evenements .event-card[data-event-id="ia-distinction-akir"] .event-type-badge-overlay': 'Excellence & AI', '#evenements .event-card[data-event-id="dejeuner-abe-jica"] .event-type-badge-overlay': 'ABE Initiative & diplomacy', '#evenements .event-card[data-event-id="reseau-afrique-alumni"] .event-type-badge-overlay': 'Pan-African network', '#evenements .event-card[data-event-id="accueil-volontaires-japon"] .event-type-badge-overlay': 'Tunisia–Japan friendship', '#evenements .event-card[data-event-id="felicitations-laureats"] .event-type-badge-overlay': 'Excellence & graduates', '#evenements .event-card[data-event-id="seminaire-penthouse-kaizen"] .event-type-badge-overlay': 'Kaizen & climate', '#evenements .event-card[data-event-id="football-amitie-japon"] .event-type-badge-overlay': 'Sport & fair play', '#evenements .event-card[data-event-id="visite-mitsui-yoko-jica"] .event-type-badge-overlay': 'JICA Tokyo leadership', '#evenements .event-card[data-event-id="reception-70-ans-empereur"] .event-type-badge-overlay': 'Diplomacy & 70 years', '#evenements .event-card[data-event-id="projet-decharge-beja"] .event-type-badge-overlay': 'Environment & Fukuoka method', '#evenements .event-card[data-event-id="ag-ordinaire-utica"] .event-type-badge-overlay': 'General assembly', '#evenements .event-card[data-event-id="lancement-solennel-cite-sciences"] .event-type-badge-overlay': 'Founding ceremony',
      '#evenements .event-card[data-event-id="restitution-yosra-ben-fadhel"] .event-location': 'Japan · Tunisia', '#evenements .event-card[data-event-id="ia-distinction-akir"] .event-location': 'Tokyo · Tunis', '#evenements .event-card[data-event-id="dejeuner-abe-jica"] .event-location': 'Japanese Embassy & JICA Office, Tunis', '#evenements .event-card[data-event-id="reseau-afrique-alumni"] .event-location': 'Pan-African JICA video conference', '#evenements .event-card[data-event-id="accueil-volontaires-japon"] .event-location': 'Tunis, Tunisia', '#evenements .event-card[data-event-id="felicitations-laureats"] .event-location': 'Tunis · JICA programmes', '#evenements .event-card[data-event-id="seminaire-penthouse-kaizen"] .event-location': 'The Penthouse Hotel, Tunis', '#evenements .event-card[data-event-id="football-amitie-japon"] .event-location': 'Juventus Academy Club, Tunis', '#evenements .event-card[data-event-id="visite-mitsui-yoko-jica"] .event-location': 'JICA Residence, Tunis', '#evenements .event-card[data-event-id="reception-70-ans-empereur"] .event-location': 'Residence of the Japanese Embassy, Tunis', '#evenements .event-card[data-event-id="projet-decharge-beja"] .event-location': 'Béja landfill, Tunisia', '#evenements .event-card[data-event-id="ag-ordinaire-utica"] .event-location': 'UTICA headquarters, Tunis', '#evenements .event-card[data-event-id="lancement-solennel-cite-sciences"] .event-location': 'Cité des Sciences, Tunis',
      '#evenements .event-card[data-event-id="restitution-yosra-ben-fadhel"] .event-title': 'Yosra Ben Fadhel shares her JICA training experience in Japan',
      '#evenements .event-card[data-event-id="restitution-yosra-ben-fadhel"] .event-desc': 'After completing JICA training in the management and maintenance of medical equipment, Yosra Ben Fadhel shares the lessons from her experience in Japan.',
      '#evenements .event-card[data-event-id="ia-distinction-akir"] .event-title': 'ABSFJ honours Oussama Akir for his distinction in artificial intelligence',
      '#evenements .event-card[data-event-id="ia-distinction-akir"] .event-desc': 'An AI researcher recognised in Tokyo among 25,000 candidates from 120 countries. A source of national pride and a talent shaping the future of ABSFJ.',
      '#evenements .event-card[data-event-id="dejeuner-abe-jica"] .event-title': 'Luncheon honouring young talents from the ABE Initiative',
      '#evenements .event-card[data-event-id="dejeuner-abe-jica"] .event-desc': 'A high-level meeting with President Jamel Boujdaria, JICA’s Miyata Mayumi, the First Secretary of the Japanese Embassy, and four young talents, including ABE fellows and AI experts.',
      '#evenements .event-card[data-event-id="reseau-afrique-alumni"] .event-title': 'Meeting of African JICA alumni associations',
      '#evenements .event-card[data-event-id="reseau-afrique-alumni"] .event-desc': 'A multilateral exchange chaired by Djibouti with Gabon, Burkina Faso, Mali, the DRC and JICA to develop shared pan-African initiatives.',
      '#evenements .event-card[data-event-id="accueil-volontaires-japon"] .event-title': 'Welcoming Japanese volunteers and friends to Tunisia',
      '#evenements .event-card[data-event-id="accueil-volontaires-japon"] .event-desc': 'ABSFJ welcomes the Japanese volunteers and cooperation partners arriving in Tunisia and reaffirms its commitment to supporting them.',
      '#evenements .event-card[data-event-id="felicitations-laureats"] .event-title': 'Celebrating JICA training programme graduates',
      '#evenements .event-card[data-event-id="felicitations-laureats"] .event-desc': 'A formal presentation of distinctions and tributes to graduates of JICA training programmes in Japan. Gallery of six official photographs.',
      '#evenements .event-card[data-event-id="seminaire-penthouse-kaizen"] .event-title': 'National seminar: how Kaizen can help address climate change',
      '#evenements .event-card[data-event-id="seminaire-penthouse-kaizen"] .event-desc': 'A landmark conference co-organised with JICA, bringing together Japan’s Ambassador, Miyata Mayumi, BSB Toyota, ANME and the Ministry of Industry.',
      '#evenements .event-card[data-event-id="football-amitie-japon"] .event-title': 'Tunisian-Japanese friendship football match',
      '#evenements .event-card[data-event-id="football-amitie-japon"] .event-desc': 'A friendly match bringing together young Tunisians and Japanese and their families, with Ambassador Saito Jun and Miyata Mayumi in attendance.',
      '#evenements .event-card[data-event-id="visite-mitsui-yoko-jica"] .event-title': 'Strategic luncheon with JICA Tokyo Senior Vice-President Yoko Mitsui',
      '#evenements .event-card[data-event-id="visite-mitsui-yoko-jica"] .event-desc': 'Official visit by JICA Tokyo Senior Vice-President Yoko Mitsui. ABSFJ presented its work and discussed strengthening the partnership.',
      '#evenements .event-card[data-event-id="reception-70-ans-empereur"] .event-title': '70 years of bilateral relations and the Emperor’s Birthday',
      '#evenements .event-card[data-event-id="reception-70-ans-empereur"] .event-desc': 'ABSFJ attended the Japanese Embassy’s diplomatic reception marking 70 years of Tunisia-Japan relations. Gallery of five official photographs.',
      '#evenements .event-card[data-event-id="projet-decharge-beja"] .event-title': 'Fukuoka method pilot at Béja landfill',
      '#evenements .event-card[data-event-id="projet-decharge-beja"] .event-desc': 'A Japanese ecological engineering project using semi-aerobic aeration to sharply reduce methane emissions.',
      '#evenements .event-card[data-event-id="ag-ordinaire-utica"] .event-title': 'ABSFJ’s first ordinary general assembly',
      '#evenements .event-card[data-event-id="ag-ordinaire-utica"] .event-desc': 'Review of the first successful year of the board under President Jamel Boujdaria and the organisation of working committees.',
      '#evenements .event-card[data-event-id="lancement-solennel-cite-sciences"] .event-title': 'Official launch ceremony of ABSFJ',
      '#evenements .event-card[data-event-id="lancement-solennel-cite-sciences"] .event-desc': 'The association was formally launched with the Japanese Embassy, JICA and more than 200 professionals trained in Japan since 1975.',
      '#galerie .section-header .section-title': 'The faces of <em>our story.</em>',
      '#galerie .section-header .section-subtitle': 'Twenty-two glimpses of a relationship built day by day. Explore the photographs and find each original post.',
      '#galerie [data-gfilter="all"]': 'All photos (22) a', '#galerie [data-gfilter="diplomatie"]': 'Diplomacy & 70 years (8) a',
      '#galerie [data-gfilter="talents"]': 'Young talent & AI (8) a', '#galerie [data-gfilter="kaizen"]': 'Kaizen & climate (1) a',
      '#galerie [data-gfilter="sport"]': 'Sport & community (2) a', '#galerie [data-gfilter="ecologie"]': 'Projects & Béja (1) a',
      '#galerie [data-gfilter="afrique"]': 'Africa & network (1) a', '#galerie [data-gfilter="amitie"]': 'Japanese volunteers (1) a',
      '#restitution .section-title': 'From Japan to Tunisia,<br><em>sharing what matters.</em>',
      '#restitution .section-subtitle': 'Every mission in Japan can benefit the whole community. ABSFJ members can prepare a short, practical account for the network here.',
      '#restitution .restitution-meta span:nth-child(2)': '180–2,400 characters', '#restitution .restitution-guides span:nth-child(1)': '01 · What I observed', '#restitution .restitution-guides span:nth-child(2)': '02 · What I learned', '#restitution .restitution-guides span:nth-child(3)': '03 · What I can share',
      '#restitution-text': 'Paragraph 1: context and observations…\n\nParagraph 2: lessons and methods…\n\nParagraph 3: ways to share them in Tunisia…',
      '#restitution-form > p.form-note:last-of-type': 'This file stays on your device. Publication requires ABSFJ approval.',
      '#restitution h3': 'Share my experience', '#restitution .form-card-intro': 'Write two or three paragraphs. A document ready to send to the association board will be created.',
      'label[for="restitution-name"]': 'Full name', 'label[for="restitution-year"]': 'Year of mission',
      'label[for="restitution-title"]': 'Mission or training title', 'label[for="restitution-text"]': 'My account · 2 to 3 paragraphs',
      '#restitution-submit': 'Prepare my account ↗', '.restitution-submit': 'Prepare my account ↗',
      '#logo-section .section-title': 'Two shores, <em>one emblem.</em>',
      '#logo-section .section-subtitle': 'Discover the meaning behind our emblem and download high-resolution vector formats.',
      '#logo-section .logo-explanation h3': 'A symbolic harmony between two nations',
      '#logo-section .logo-explanation > p': 'Designed to embody mutual respect, rigour and the growth of skills, the official ABSFJ emblem brings together:',
      '#logo-section .symbol-item:nth-child(1) strong': 'Sacred Mount Fuji (富士山):',
      '#logo-section .symbol-item:nth-child(1) p': 'Shown in vermilion, the colour of energy and the rising sun, with a brilliant snow-covered summit that represents the heights of Japanese excellence and wisdom.',
      '#logo-section .symbol-item:nth-child(2) strong': 'A meeting of two seas (Mediterranean and Pacific):',
      '#logo-section .symbol-item:nth-child(2) p': 'A flowing curve in turquoise and deep indigo recalls both the Great Wave of Kanagawa and the sparkling waters of Carthage and Sidi Bou Saïd.',
      '#logo-section .symbol-item:nth-child(3) strong': 'Two flags, side by side:',
      '#logo-section .symbol-item:nth-child(3) p': 'Tunisia’s crescent and star to the left, and Japan’s Hinomaru sun to the right, frame the ABSFJ initials in diplomatic balance.',
      '#logo-section .symbol-item:nth-child(4) strong': 'A golden radiance:',
      '#logo-section .symbol-item:nth-child(4) p': 'The golden lines stand for the light of knowledge, the value of shared skills and the enduring friendship between the two countries.',
      '#logo-section #btn-download-svg': 'Download the official logo',
      '#logo-section .btn-gold': 'View the Facebook source',
      '#piliers .pillar-card:nth-child(1) .pillar-tag': 'Alumni network',
      '#piliers .pillar-card:nth-child(2) .pillar-tag': 'Productivity & quality',
      '#piliers .pillar-card:nth-child(3) .pillar-tag': 'Sustainability & climate',
      '#piliers .pillar-card:nth-child(4) .pillar-tag': 'People-to-people diplomacy',
      '#adhesion .section-header .section-title': 'Your journey continues <em>with us.</em>',
      '#adhesion .section-header .section-subtitle': 'Completed a JICA training programme in Japan? Prepare your request to join the community and preview your alumni card.',
      '#adhesion label[for="card-input-name"]': 'Full name', '#adhesion label[for="card-input-year"]': 'JICA training year', '#adhesion label[for="card-input-domain"]': 'Field of expertise', '#adhesion label[for="member-email"]': 'Professional email address', '#adhesion label[for="member-org"]': 'Organisation / employer', '.site-footer .footer-invitation h2': 'Let us keep writing<br><em>this story together.</em>',
      '#adhesion .form-card h3': 'Let’s get to know you.',
      '#form-success-alert': 'Your request is ready to download. Send the document to the ABSFJ office through its official Facebook page. No information is sent automatically.',
      '#adhesion #card-input-name': 'e.g. Dr Mohamed Ben Salem', '#adhesion #card-input-year': 'e.g. 2024',
      '#adhesion #card-input-domain option:nth-child(1) a': 'KAIZEN & Productivity', '#adhesion #card-input-domain option:nth-child(2) a': 'Environment (Fukuoka method) a', '#adhesion #card-input-domain option:nth-child(3) a': 'Health & hospitals', '#adhesion #card-input-domain option:nth-child(4) a': 'Energy & decarbonisation', '#adhesion #card-input-domain option:nth-child(5) a': 'Agriculture & water resources', '#adhesion #card-input-domain option:nth-child(6) a': 'Information technology', '#adhesion #card-input-domain option:nth-child(7) a': 'Other JICA specialisation',
      '#adhesion .form-card .btn-primary': 'Download my application ↗', '#adhesion .form-note': 'Your information stays on this page. Download your application, then contact ABSFJ to send it.',
      '#adhesion .virtual-card-preview h3': 'Your next story starts here.', '#adhesion .virtual-card-preview > .member-id-card > div:nth-child(2) a': 'PERSONALISED PREVIEW · JICA ALUMNI', '#adhesion .card-details-row > div:first-child > span': 'JICA SPECIALISATION', '#adhesion .card-details-row > div:last-child > span': 'JAPAN PROGRAMME', '#adhesion .member-id-card > div:last-child span:last-child': 'NOT VALIDATED', '#adhesion .virtual-card-preview > p': 'The official physical and digital card is issued after ABSFJ and JICA validate your training programme.',
      '#partenaires .partners-title': 'INSTITUTIONAL PARTNERS & COOPERATION NETWORK',
      '.footer-brand > p': 'The Association of Beneficiaries of JICA Training Programmes in Japan. Founded in February 2025 to honour 50 years of friendship and shared expertise between Tunisia and Japan.',
      '.footer-brand .btn-secondary': 'Official Facebook page', '.site-footer .footer-grid > div:nth-child(2) .footer-title': 'Navigation', '.site-footer .footer-grid > div:nth-child(3) .footer-title': 'Our work', '.site-footer .footer-grid > div:nth-child(4) .footer-title': 'Official contact',
      '.site-footer .footer-grid > div:nth-child(2) li:nth-child(1) a': 'Home', '.site-footer .footer-grid > div:nth-child(2) li:nth-child(2) a': 'About us & message from the president', '.site-footer .footer-grid > div:nth-child(2) li:nth-child(3) a': 'The association board', '.site-footer .footer-grid > div:nth-child(2) li:nth-child(4) a': 'Our mission & four pillars', '.site-footer .footer-grid > div:nth-child(2) li:nth-child(5) a': 'News & events', '.site-footer .footer-grid > div:nth-child(2) li:nth-child(6) a': 'Member stories', '.site-footer .footer-grid > div:nth-child(2) li:nth-child(7) a': 'Our official emblem',
      '.site-footer .footer-grid > div:nth-child(3) li:nth-child(1) a': 'Kaizen philosophy', '.site-footer .footer-grid > div:nth-child(3) li:nth-child(2) a': 'Fukuoka method (Béja)', '.site-footer .footer-grid > div:nth-child(3) li:nth-child(3) a': 'Energy transition', '.site-footer .footer-grid > div:nth-child(3) li:nth-child(4) a': 'Tunisia–Japan tourism', '.site-footer .footer-grid > div:nth-child(3) li:nth-child(5) a': 'Alumni member area',
      '.footer-contact-item:nth-of-type(1) > span:last-child': 'Tunis, Republic of Tunisia', '.footer-contact-item:nth-of-type(2) > span:last-child': 'Official Facebook page: <br><a href="https://www.facebook.com/61573098115073/" target="_blank" rel="noopener noreferrer" style="color: var(--gold-accent); word-break: break-all">facebook.com/61573098115073</a>', '.footer-contact-item:nth-of-type(3) > span:last-child': 'In direct contact with the JICA Office in Tunisia', '.footer-bottom > div:first-child': '© 2025–2026 ABSFJ Tunisia. All rights reserved.',
    },
    ja: {
      'body > .skip-link': '本文へ移動',
      '.top-bar-left > span:last-child': 'チュニジアと日本を結ぶ、生きた絆', '.top-bar-link': '最新情報をフォロー ↗', '.news-alert-label': '最新ニュース',
      '.nav-links li:nth-child(1) .nav-link': '<span class="nav-link-kanji">ホーム</span>ホーム', '.nav-links li:nth-child(2) .nav-link': '<span class="nav-link-kanji">概要</span>協会について',
      '.nav-links li:nth-child(3) .nav-link': '<span class="nav-link-kanji">使命</span>活動理念', '.nav-links li:nth-child(4) .nav-link': '<span class="nav-link-kanji">活動</span>活動・イベント',
      '.nav-links li:nth-child(5) .nav-link': '<span class="nav-link-kanji">写真</span>写真ライブラリ', '.nav-links li:nth-child(6) .nav-link': '<span class="nav-link-kanji">未来</span>プロジェクト',
      '.nav-links li:nth-child(7) .nav-link': '<span class="nav-link-kanji">連携</span>パートナー', '.nav-links li:nth-child(8) .nav-link': '<span class="nav-link-kanji">連絡</span>お問い合わせ',
      '.restitution-nav span': '研修報告', '.btn-nav-cta span': '会員ページ',
      '.hero-title': '二つの文化。<br>一つの<br><em>志。</em>', '.hero-description': '日本からチュニジアへ、知識をつなぐ。<br>絆を育み、未来を共に築きます。',
      '.hero-cta-group .btn-primary': 'ABSFJの精神 <span aria-hidden="true">↗</span>', '.hero-cta-group .text-link': '活動を見る <span aria-hidden="true">→</span>',
      '.hero-signature p': '日本での学び。<br><strong>共に描く未来。</strong>', '.diorama-caption p': '共に見つめる未来。', '.stats-section .eyebrow': '共有する遺産',
      '.stats-section p': '絆の力。<br><em>広がるネットワーク。</em>',
      '.stat-item:nth-child(2) .stat-label': '日本で研修を受けたチュニジア人材', '.stat-item:nth-child(3) .stat-label': 'JICA協力の歩み', '.stat-item:nth-child(4) .stat-label': '二つの文化、共に描く未来',
      '#a-propos .section-header .section-title': '経験が人を変える。<br><em>分かち合いが人を結ぶ。</em>',
      '#a-propos .section-tag': '01 / 協会について <span lang="ja">私たちについて</span>', '#piliers .section-tag': '02 / 私たちの使命 <span lang="ja">私たちの使命</span>', '#evenements .section-tag': '03 / 活動日誌 <span lang="ja">活動日誌</span>', '#galerie .section-tag': '04 / 共に歩んだ瞬間 <span lang="ja">思い出</span>', '#restitution .section-tag': '05 / 研修報告 <span lang="ja">研修報告</span>', '#logo-section .section-tag': '06 / 公式エンブレム <span lang="ja">シンボル</span>', '#adhesion .section-tag': '07 / 仲間になる <span lang="ja">共に歩む</span>',
      '#a-propos .section-header .section-subtitle': 'チュニジアJICA研修生同窓会は、日本で得た知識は伝え合うことで真価を発揮すると信じています。',
      '#a-propos .president-portrait figcaption span:first-child': '会長のメッセージ',
      '#a-propos .representative-portrait figcaption span:first-child': 'チュニジアのJICAから',
      '#a-propos .president-message .quote-text': 'ABSFJはJICA研修修了者の同窓会にとどまりません。アイデアを生み、実践的な行動につなげ、<em>チュニジアと日本を結ぶ生きた架け橋です。</em>',
      '#a-propos .representative-message .quote-text': '1975年以来、JICAとチュニジアの協力は、<em>知識の共有と長く続く人のつながりによって築かれてきました。</em>',
      '#a-propos .president-full summary': 'メッセージ全文を読む <span aria-hidden="true">＋</span>',
      '#a-propos .voice-card:first-child .president-full p': '日本で高度な研修を受けた私たちには、規律、KAIZENの手法、相互尊重の文化を、チュニジアのあらゆる機関や企業に伝える道義的、愛国的責任があります。',
      '#a-propos .voice-card:last-child .president-full p': '1,800人を超えるチュニジアの人々が、日本で研修や留学に参加してきました。このコミュニティは、エネルギー、保健、環境、産業など幅広い分野で半世紀にわたる協力を支え、この友好を次の世代へつないでいます。',
      '#a-propos .voice-card:first-child .president-info p': '外交官 · ABSFJ会長',
      '#a-propos .voice-card:last-child .president-info p': '駐チュニジアJICA事務所 所長',
      '#a-propos .president-honour > div > span': '旭日章',
      '#a-propos .president-honour p': '旭日章・ロゼット付き金色光線章 · 日本、2025年',
      '#a-propos .voice-source-note': 'JICA公式メッセージの日本語訳',
      '#a-propos .voice-source': 'JICA公式メッセージと写真 ↗',
      '#a-propos .history-line > div:nth-child(1) h3': '最初のつながり',
      '#a-propos .history-line > div:nth-child(1) p': 'JICA研修がチュニジアの人材に新たな可能性を開きました。',
      '#a-propos .history-line > div:nth-child(2) h3': '動き続ける知識',
      '#a-propos .history-line > div:nth-child(2) p': '技術者、医師、研究者などが日本での経験を共有しています。',
      '#a-propos .history-line > div:nth-child(3) h3': '新たな一歩を共に',
      '#a-propos .history-line > div:nth-child(3) p': '2025年2月14日、チュニスの科学都市でABSFJが発足しました。',
      '#bureau .section-tag': '執行役員会 <span lang="ja">共に</span>',
      '#governance-title': '共に取り組む。',
      '.governance-context': '役員構成は、2024年12月25日付の官報に掲載された協会設立公告に記載されています。',
      '.governance-grid > div:nth-child(1) dt': '会長', '.governance-grid > div:nth-child(2) dt': '副会長', '.governance-grid > div:nth-child(3) dt': '事務局長', '.governance-grid > div:nth-child(4) dt': '会計',
      '.governance-source': '官報掲載の公告を見る · JORT 第149号、3066頁 · 2024年12月25日 ↗',
      '#piliers .section-header .section-title': '四つの価値。<br><em>共に描く未来。</em>', '#piliers .section-header .section-subtitle': '人と人との絆から現場のプロジェクトまで、知識の共有、進歩、敬意を大切にします。',
      '#piliers .pillar-card:nth-child(1) .pillar-title': '絆を育む', '#piliers .pillar-card:nth-child(1) .pillar-desc': '日本で研修を受けた1,800人以上のチュニジア人専門家をつなぎ、助け合い、メンタリング、ビジネス機会を育みます。',
      '#piliers .pillar-card:nth-child(2) .pillar-title': '日々、改善する', '#piliers .pillar-card:nth-child(2) .pillar-desc': '総合的品質管理、5S、無駄の削減を広め、チュニジアの産業、病院、公共サービスの発展を支えます。',
      '#piliers .pillar-card:nth-child(3) .pillar-title': '環境を守る', '#piliers .pillar-card:nth-child(3) .pillar-desc': 'ベジャの福岡方式による準好気性埋立てや産業の脱炭素化など、日本の環境技術を共有します。',
      '#piliers .pillar-card:nth-child(1) .pillar-tag': '同窓生ネットワーク', '#piliers .pillar-card:nth-child(2) .pillar-tag': '生産性と品質', '#piliers .pillar-card:nth-child(3) .pillar-tag': '持続可能性と気候', '#piliers .pillar-card:nth-child(4) .pillar-tag': '民間外交',
      '#piliers .pillar-card:nth-child(4) .pillar-title': '文化をつなぐ', '#piliers .pillar-card:nth-child(4) .pillar-desc': '観光案内、大学連携、投資を通じて、文化と経済の架け橋を築きます。',
      '#evenements .section-header .section-title': '友情を、<em>共に生きる。</em>', '.upcoming-art-kicker span:first-child': '同窓生交流会', '.event-card-upcoming .event-date-overlay': '日曜日 · ラスジェベル', '#evenements .section-header .section-subtitle': '出会い、取り組み、分かち合う時間。チュニジアと日本の協力を進める人々をご紹介します。',
      '#evenements [data-filter="all"]': 'すべて (15)', '#evenements [data-filter="reseau"]': 'ネットワーク・人材', '#evenements [data-filter="kaizen"]': '改善・気候', '#evenements [data-filter="ecologie"]': '環境', '#evenements [data-filter="amitie"]': 'スポーツ・友情', '#evenements [data-filter="ag"]': '協会の活動',
      '#evenements .event-card[data-event-id="team-building-ras-jbel"] .event-title': 'ABSFJチームビルディング交流会',
      '#evenements .event-card[data-event-id="team-building-ras-jbel"] .event-desc': '「チュニジアと日本：学び、分かち合い、創造する」をテーマに、ABSFJ会員の絆を深める交流と活動の一日です。',
      '#event-team-building-ras-jbel .open-modal-btn': 'プログラムを見る →',
      '#evenements .event-card[data-event-id="team-building-ras-jbel"] .event-location': 'ラスジェベル · チュニジア',
      '#event-bridging-japan-tunisia-enit .event-title': 'ENITで「日本とチュニジアをつなぐ」交流会',
      '#event-bridging-japan-tunisia-enit .event-desc': 'JICAチュニジア事務所はABSFJを、日本留学と学術・専門・文化交流をテーマとする2026年11月11日のENITでのイベントへ招待しています。',
      '#event-bridging-japan-tunisia-enit .event-location': 'ENIT · チュニス',
      '#event-bridging-japan-tunisia-enit .event-type-badge-overlay': '研究・イノベーション・文化',
      '#event-bridging-japan-tunisia-enit .event-text-art-month': '11月 · ENIT',
      '#evenements .event-card[data-event-id="team-building-ras-jbel"] .event-type-badge-overlay': '開催予定 · 協会交流会', '#evenements .event-card[data-event-id="restitution-yosra-ben-fadhel"] .event-type-badge-overlay': 'JICA研修報告', '#evenements .event-card[data-event-id="ia-distinction-akir"] .event-type-badge-overlay': '卓越性・AI', '#evenements .event-card[data-event-id="dejeuner-abe-jica"] .event-type-badge-overlay': 'ABEイニシアティブ・外交', '#evenements .event-card[data-event-id="reseau-afrique-alumni"] .event-type-badge-overlay': 'アフリカ同窓生ネットワーク', '#evenements .event-card[data-event-id="accueil-volontaires-japon"] .event-type-badge-overlay': 'チュニジア・日本友好', '#evenements .event-card[data-event-id="felicitations-laureats"] .event-type-badge-overlay': '研修修了生・表彰', '#evenements .event-card[data-event-id="seminaire-penthouse-kaizen"] .event-type-badge-overlay': 'カイゼン・気候', '#evenements .event-card[data-event-id="football-amitie-japon"] .event-type-badge-overlay': 'スポーツ・フェアプレー', '#evenements .event-card[data-event-id="visite-mitsui-yoko-jica"] .event-type-badge-overlay': 'JICA東京幹部', '#evenements .event-card[data-event-id="reception-70-ans-empereur"] .event-type-badge-overlay': '外交関係70周年', '#evenements .event-card[data-event-id="projet-decharge-beja"] .event-type-badge-overlay': '環境・福岡方式', '#evenements .event-card[data-event-id="ag-ordinaire-utica"] .event-type-badge-overlay': '通常総会', '#evenements .event-card[data-event-id="lancement-solennel-cite-sciences"] .event-type-badge-overlay': '設立記念式典',
      '#evenements .event-card[data-event-id="restitution-yosra-ben-fadhel"] .event-location': '日本 · チュニジア', '#evenements .event-card[data-event-id="ia-distinction-akir"] .event-location': '東京 · チュニス', '#evenements .event-card[data-event-id="dejeuner-abe-jica"] .event-location': '在チュニジア日本大使館・JICA事務所', '#evenements .event-card[data-event-id="reseau-afrique-alumni"] .event-location': 'JICAアフリカ広域オンライン会議', '#evenements .event-card[data-event-id="accueil-volontaires-japon"] .event-location': 'チュニス、チュニジア', '#evenements .event-card[data-event-id="felicitations-laureats"] .event-location': 'チュニス · JICA研修', '#evenements .event-card[data-event-id="seminaire-penthouse-kaizen"] .event-location': 'ザ・ペントハウスホテル、チュニス', '#evenements .event-card[data-event-id="football-amitie-japon"] .event-location': 'ユベントス・アカデミークラブ、チュニス', '#evenements .event-card[data-event-id="visite-mitsui-yoko-jica"] .event-location': 'JICAチュニジア事務所、チュニス', '#evenements .event-card[data-event-id="reception-70-ans-empereur"] .event-location': '在チュニジア日本大使公邸', '#evenements .event-card[data-event-id="projet-decharge-beja"] .event-location': 'ベジャ廃棄物処分場、チュニジア', '#evenements .event-card[data-event-id="ag-ordinaire-utica"] .event-location': 'UTICA本部、チュニス', '#evenements .event-card[data-event-id="lancement-solennel-cite-sciences"] .event-location': 'チュニス科学都市',
      '#evenements .event-card[data-event-id="restitution-yosra-ben-fadhel"] .event-title': 'ヨスラ・ベン・ファデル氏、日本でのJICA研修経験を共有',
      '#evenements .event-card[data-event-id="restitution-yosra-ben-fadhel"] .event-desc': '医療機器の管理・保守に関するJICA研修を終えたヨスラ・ベン・ファデル氏が、日本で学んだことを共有しました。',
      '#evenements .event-card[data-event-id="ia-distinction-akir"] .event-title': 'AI分野での功績を称え、ウサマ・アキル氏を表彰',
      '#evenements .event-card[data-event-id="ia-distinction-akir"] .event-desc': '120か国から集まった25,000人の候補者の中から東京で表彰されたAI研究者。国の誇りであり、ABSFJの未来を担う人材です。',
      '#evenements .event-card[data-event-id="dejeuner-abe-jica"] .event-title': 'ABEイニシアティブの若手人材を囲む昼食会',
      '#evenements .event-card[data-event-id="dejeuner-abe-jica"] .event-desc': 'ジャメル・ブジュダリア会長、JICAの宮田真由美氏、日本大使館の一等書記官、ABE奨学生やAI専門家を含む若手4人が参加しました。',
      '#evenements .event-card[data-event-id="reseau-afrique-alumni"] .event-title': 'アフリカJICA同窓会ネットワーク会合',
      '#evenements .event-card[data-event-id="reseau-afrique-alumni"] .event-desc': 'ジブチが議長を務め、ガボン、ブルキナファソ、マリ、コンゴ民主共和国、JICAと共にアフリカ共通の取り組みを協議しました。',
      '#evenements .event-card[data-event-id="accueil-volontaires-japon"] .event-title': 'チュニジアに到着した日本人ボランティアを歓迎',
      '#evenements .event-card[data-event-id="accueil-volontaires-japon"] .event-desc': 'ABSFJはチュニジアに到着した日本人ボランティアと協力関係者を歓迎し、活動を支援する姿勢を改めて表明しました。',
      '#evenements .event-card[data-event-id="felicitations-laureats"] .event-title': 'JICA研修修了生を祝う表彰式',
      '#evenements .event-card[data-event-id="felicitations-laureats"] .event-desc': '日本でJICA研修を修了した参加者を称え、表彰状を授与しました。公式写真6点をご覧いただけます。',
      '#evenements .event-card[data-event-id="seminaire-penthouse-kaizen"] .event-title': '全国セミナー：気候変動対策に活かすカイゼン',
      '#evenements .event-card[data-event-id="seminaire-penthouse-kaizen"] .event-desc': 'JICAと共催した重要な会議に、日本大使、宮田真由美氏、BSB Toyota、ANME、産業省が参加しました。',
      '#evenements .event-card[data-event-id="football-amitie-japon"] .event-title': 'チュニジア・日本友好サッカー交流試合',
      '#evenements .event-card[data-event-id="football-amitie-japon"] .event-desc': '齋藤純大使と宮田真由美氏の出席のもと、両国の若者と家族が親善試合を通じて交流しました。',
      '#evenements .event-card[data-event-id="visite-mitsui-yoko-jica"] .event-title': 'JICA東京の三井陽子上級副理事長との戦略昼食会',
      '#evenements .event-card[data-event-id="visite-mitsui-yoko-jica"] .event-desc': 'JICA東京の三井陽子上級副理事長が公式訪問。ABSFJの活動を紹介し、今後の連携強化について協議しました。',
      '#evenements .event-card[data-event-id="reception-70-ans-empereur"] .event-title': '外交関係樹立70周年と天皇誕生日を祝う',
      '#evenements .event-card[data-event-id="reception-70-ans-empereur"] .event-desc': 'チュニジアと日本の外交関係70周年を記念する日本大使館のレセプションにABSFJが出席しました。公式写真5点をご覧いただけます。',
      '#evenements .event-card[data-event-id="projet-decharge-beja"] .event-title': 'ベジャ廃棄物処分場での福岡方式の実証事業',
      '#evenements .event-card[data-event-id="projet-decharge-beja"] .event-desc': '準好気性埋立て方式を用いてメタン排出の大幅削減を目指す、日本の環境技術プロジェクトです。',
      '#evenements .event-card[data-event-id="ag-ordinaire-utica"] .event-title': 'ABSFJ第1回通常総会',
      '#evenements .event-card[data-event-id="ag-ordinaire-utica"] .event-desc': 'ジャメル・ブジュダリア会長のもとでの初年度の活動と、各運営委員会の設置について報告しました。',
      '#evenements .event-card[data-event-id="lancement-solennel-cite-sciences"] .event-title': 'ABSFJ設立記念式典',
      '#evenements .event-card[data-event-id="lancement-solennel-cite-sciences"] .event-desc': '日本大使館、JICA、日本で研修を受けた200人以上の専門家と共に、協会の正式な発足を祝いました。',
      '#galerie .section-header .section-title': '<em>私たちの歩み。</em>', '#galerie .section-header .section-subtitle': '日々築かれる関係を写した22枚の写真をご覧ください。各投稿の原文もご覧いただけます。',
      '#galerie [data-gfilter="all"]': 'すべての写真 (22) a', '#galerie [data-gfilter="diplomatie"]': '外交・70周年 (8) a', '#galerie [data-gfilter="talents"]': '若い才能・AI (8) a', '#galerie [data-gfilter="kaizen"]': '改善・気候 (1) a', '#galerie [data-gfilter="sport"]': 'スポーツ・交流 (2) a', '#galerie [data-gfilter="ecologie"]': 'プロジェクト・ベジャ (1) a', '#galerie [data-gfilter="afrique"]': 'アフリカ・ネットワーク (1) a', '#galerie [data-gfilter="amitie"]': '日本人ボランティア (1) a',
      '#restitution .section-title': '日本からチュニジアへ、<br><em>学びを伝える。</em>', '#restitution .section-subtitle': '日本での研修をコミュニティ全体の力に。ABSFJ会員は、ネットワークに役立つ短い報告をここで準備できます。', '#restitution h3': '研修経験を共有する', '#restitution .form-card-intro': '2〜3段落でご記入ください。協会の理事会に送るための文書を作成します。',
      '#restitution .restitution-meta span:nth-child(2)': '180〜2,400文字', '#restitution .restitution-guides span:nth-child(1)': '01 · 気づいたこと', '#restitution .restitution-guides span:nth-child(2)': '02 · 学んだこと', '#restitution .restitution-guides span:nth-child(3)': '03 · 伝えたいこと',
      '#restitution-text': '第1段落：背景と観察したこと…\n\n第2段落：学んだことと方法…\n\n第3段落：チュニジアに伝えたいこと…',
      '#restitution-form > p.form-note:last-of-type': 'このファイルはお使いの端末に保存されます。公開にはABSFJの承認が必要です。',
      'label[for="restitution-name"]': '氏名', 'label[for="restitution-year"]': '研修年', 'label[for="restitution-title"]': '研修・プログラム名', 'label[for="restitution-text"]': '研修報告（2〜3段落）', '.restitution-submit': '報告書を作成 ↗',
      '#logo-section .section-title': '二つの岸を結ぶ、<em>一つの象徴。</em>', '#logo-section .section-subtitle': 'ABSFJのエンブレムに込められた意味と、高解像度のベクターデータをご覧ください。',
      '#logo-section .logo-explanation h3': '二つの国を結ぶ象徴の調和',
      '#logo-section .logo-explanation > p': '相互尊重、規律、能力向上を表すABSFJの公式ロゴには、次の意味が込められています。',
      '#logo-section .symbol-item:nth-child(1) strong': '聖なる富士山 (富士山)：', '#logo-section .symbol-item:nth-child(1) p': '活力と日の出を象徴する朱色で描かれ、雪を頂く輝く山頂は、日本の卓越性と知恵の高みを表しています。',
      '#logo-section .symbol-item:nth-child(2) strong': '二つの海の出会い（地中海と太平洋）：', '#logo-section .symbol-item:nth-child(2) p': 'ターコイズと深い藍色の流れる曲線は、神奈川沖浪裏とカルタゴ、シディ・ブ・サイドのきらめく海を表しています。',
      '#logo-section .symbol-item:nth-child(3) strong': '並び立つ二つの国旗：', '#logo-section .symbol-item:nth-child(3) p': '左のチュニジアの三日月と星、右の日の丸が、外交的な調和の中でABSFJの頭文字を囲みます。',
      '#logo-section .symbol-item:nth-child(4) strong': '黄金の輝き：', '#logo-section .symbol-item:nth-child(4) p': '金色の線は、知識の光、共有する技能の価値、そして両国の変わらぬ友好を表しています。',
      '#logo-section #btn-download-svg': '公式ロゴをダウンロード', '#logo-section .btn-gold': 'Facebook掲載元を見る',
      '#piliers .pillar-card:nth-child(1) .pillar-tag': '同窓生ネットワーク', '#piliers .pillar-card:nth-child(2) .pillar-tag': '生産性と品質', '#piliers .pillar-card:nth-child(3) .pillar-tag': '持続可能性と気候', '#piliers .pillar-card:nth-child(4) .pillar-tag': '民間外交',
      '#adhesion .form-card h3': 'まずはプロフィールをご入力ください。', '#form-success-alert': '申請書をダウンロードできます。書類をABSFJ公式Facebookページから事務局へお送りください。情報が自動送信されることはありません。',
      '#adhesion #card-input-name': '例：モハメド・ベン・サレム博士', '#adhesion #card-input-year': '例：2024',
      '#adhesion #card-input-domain option:nth-child(1) a': 'KAIZEN・生産性', '#adhesion #card-input-domain option:nth-child(2) a': '環境（福岡方式）', '#adhesion #card-input-domain option:nth-child(3) a': '保健・病院', '#adhesion #card-input-domain option:nth-child(4) a': 'エネルギー・脱炭素', '#adhesion #card-input-domain option:nth-child(5) a': '農業・水資源', '#adhesion #card-input-domain option:nth-child(6) a': '情報技術', '#adhesion #card-input-domain option:nth-child(7) a': 'その他のJICA専門分野',
      '#adhesion .form-card .btn-primary': '申請書をダウンロード ↗', '#adhesion .form-note': '入力情報はこのページ内に保管されます。申請書をダウンロードし、ABSFJへお送りください。',
      '#adhesion .virtual-card-preview h3': '次の物語はここから始まります。', '#adhesion .virtual-card-preview > .member-id-card > div:nth-child(2) a': 'プレビュー · JICA研修修了生', '#adhesion .card-details-row > div:first-child > span': 'JICA研修分野', '#adhesion .card-details-row > div:last-child > span': '日本での研修年度', '#adhesion .member-id-card > div:last-child span:last-child': '未認証', '#adhesion .virtual-card-preview > p': 'ABSFJとJICAによる研修履歴の確認後、正式なカード（デジタル版・実物）が発行されます。',
      '#partenaires .partners-title': '協力機関・パートナー',
      '.footer-brand > p': 'チュニジアJICA研修生同窓会。チュニジアと日本の50年にわたる友好と知見の共有を称え、2025年2月に設立されました。',
      '.footer-brand .btn-secondary': '公式Facebookページ', '.site-footer .footer-grid > div:nth-child(2) .footer-title': 'サイト案内', '.site-footer .footer-grid > div:nth-child(3) .footer-title': '活動内容', '.site-footer .footer-grid > div:nth-child(4) .footer-title': 'お問い合わせ',
      '.site-footer .footer-grid > div:nth-child(2) li:nth-child(1) a': 'ホーム', '.site-footer .footer-grid > div:nth-child(2) li:nth-child(2) a': '協会について・会長の言葉', '.site-footer .footer-grid > div:nth-child(2) li:nth-child(3) a': '協会役員', '.site-footer .footer-grid > div:nth-child(2) li:nth-child(4) a': '使命と四つの柱', '.site-footer .footer-grid > div:nth-child(2) li:nth-child(5) a': 'ニュース・イベント', '.site-footer .footer-grid > div:nth-child(2) li:nth-child(6) a': '会員の研修報告', '.site-footer .footer-grid > div:nth-child(2) li:nth-child(7) a': '公式エンブレム',
      '.site-footer .footer-grid > div:nth-child(3) li:nth-child(1) a': 'カイゼンの理念', '.site-footer .footer-grid > div:nth-child(3) li:nth-child(2) a': '福岡方式（ベジャ）', '.site-footer .footer-grid > div:nth-child(3) li:nth-child(3) a': 'エネルギー転換', '.site-footer .footer-grid > div:nth-child(3) li:nth-child(4) a': 'チュニジア・日本観光', '.site-footer .footer-grid > div:nth-child(3) li:nth-child(5) a': '同窓生会員ページ',
      '.footer-contact-item:nth-of-type(1) > span:last-child': 'チュニジア共和国、チュニス', '.footer-contact-item:nth-of-type(2) > span:last-child': '公式Facebookページ：<br><a href="https://www.facebook.com/61573098115073/" target="_blank" rel="noopener noreferrer" style="color: var(--gold-accent); word-break: break-all">facebook.com/61573098115073</a>', '.footer-contact-item:nth-of-type(3) > span:last-child': 'チュニジアJICA事務所と連携しています', '.footer-bottom > div:first-child': '© 2025–2026 ABSFJチュニジア。無断転載を禁じます。',
      '#adhesion .section-header .section-title': 'あなたの旅は<em>ここから続く。</em>', '#adhesion .section-header .section-subtitle': '日本でJICA研修に参加されましたか？コミュニティへの参加申請を準備し、同窓生カードのプレビューをご覧ください。', '#adhesion label[for="card-input-name"]': '氏名', '#adhesion label[for="card-input-year"]': 'JICA研修の年', '#adhesion label[for="card-input-domain"]': '専門分野', '#adhesion label[for="member-email"]': '勤務先メールアドレス', '#adhesion label[for="member-org"]': '所属機関・企業', '.site-footer .footer-invitation h2': 'この物語を、<br><em>共に紡ぎ続けましょう。</em>',
    },
  };
  const languages = { fr: { label: 'Français', dir: 'ltr', locale: 'fr-TN' }, en: { label: 'English', dir: 'ltr', locale: 'en' }, ja: { label: '日本語', dir: 'ltr', locale: 'ja' } };
  const galleryCopy = {
    en: [
      ['Mr Oussama Akir · Tokyo International AI Award', 'AI & skills', 'Oussama Akir receives an award for excellence in Tokyo, selected from 25,000 international candidates representing 120 countries.'],
      ['Working lunch with JICA and ABE fellows', 'ABE Initiative & JICA', 'President Jamel Boujdaria, JICA representative Miyata Mayumi, the First Secretary of the Japanese Embassy and four young Tunisian talents meet.'],
      ['Fukuoka pilot project at Béja landfill', 'Fukuoka method', 'Technical and media review of the semi-aerobic landfill project designed to reduce methane emissions in Béja.'],
      ['Pan-African meeting of JICA alumni associations', 'African alumni network', 'Multilateral video conference with Djibouti, Gabon, Burkina Faso, Mali, the DRC and JICA.'],
      ['Welcoming new Japanese volunteers to Tunisia', 'JICA volunteers', 'ABSFJ welcomes Japanese volunteers arriving for their mission in Tunisia.'],
      ['Celebrating Tunisian JICA programme graduates', 'Celebrating achievement', 'Recognition of beneficiaries of specialist training programmes in Japan.'],
      ['Certificates and honours for JICA fellows', 'JICA graduates', 'A tribute to the academic and professional achievement gained in Japan.'],
      ['Official certificates recognising Japanese expertise', 'Certificates of excellence', 'Recognition of advanced skills shared by Japanese experts.'],
      ['Tunisian professionals trained in Japan', 'Alumni community', 'Celebrating the Tunisian community of JICA programme alumni.'],
      ['A success story and a stronger partnership', 'Alumni ceremony', 'Honouring outstanding achievements made possible through bilateral cooperation.'],
      ['ABSFJ honours exemplary JICA fellows', 'Recognition & pride', 'Warm congratulations from the president and executive board to the programme graduates.'],
      ['Kaizen and climate seminar', 'Kaizen & climate', 'Opening remarks by ABSFJ President Jamel Boujdaria, JICA’s Miyata Mayumi and the Japanese Ambassador.'],
      ['Tunisia–Japan friendship football match', 'Sport & friendship', 'Young Tunisian and Japanese players meet on the pitch with ABSFJ and JICA.'],
      ['Invitation to the Tunisia–Japan sports event', 'Youth invitation', 'Families and children are invited to celebrate fair play and friendship.'],
      ['Working lunch with JICA Tokyo Senior Vice-President Yoko Mitsui', 'JICA Tokyo leadership', 'High-level meeting with Yoko Mitsui, Reiko Kawamura and Miyata Mayumi.'],
      ['ABSFJ outreach and institutional presence', 'Official communication', 'An official visual highlighting the association’s initiatives.'],
      ['70 years of diplomatic relations', '70 years of diplomacy', 'Remarks at the Japanese Ambassador’s residence in honour of His Majesty the Emperor.'],
      ['ABSFJ board members at the diplomatic reception', 'ABSFJ executive board', 'ABSFJ representatives welcomed by Japanese officials at the Emperor’s Birthday reception.'],
      ['ABSFJ representatives and institutional partners', 'Official delegation', 'A cordial meeting to strengthen cooperation with Japanese diplomats.'],
      ['ABSFJ banner at the diplomatic ceremony', 'Official banner', 'The ABSFJ banner displayed alongside the Tunisian and Japanese flags.'],
      ['The Japanese Embassy reception', 'Diplomatic reception', 'Celebrating 70 years of friendly diplomatic relations between Tunisia and Japan.'],
      ['Yosra Ben Fadhel · Medical equipment management', 'JICA training report', 'Yosra Ben Fadhel shares her JICA training experience in Japan in medical equipment management and maintenance.'],
    ],
    ja: [
      ['オウサマ・アキル氏、東京でAI分野の国際賞', 'AI・人材育成', '120か国から集まった25,000人の候補者の中から、東京でオウサマ・アキル氏が表彰されました。'],
      ['JICA・ABE留学生との昼食会', 'ABEイニシアティブ・JICA', 'ジャメル・ブジュダリア会長、JICAの宮田真由美氏、日本大使館一等書記官、チュニジアの若手人材4名が出席しました。'],
      ['ベジャ埋立地での福岡方式実証事業', '福岡方式', 'ベジャでメタン排出の削減を目指す準好気性埋立事業の技術・報道レビュー。'],
      ['JICA帰国研修員同窓会のアフリカ会合', 'アフリカ同窓生ネットワーク', 'ジブチ、ガボン、ブルキナファソ、マリ、コンゴ民主共和国、JICAとの多国間オンライン会議。'],
      ['チュニジアに着任した日本人ボランティアを歓迎', 'JICAボランティア', 'チュニジアで活動を始める日本人ボランティアをABSFJが歓迎しました。'],
      ['JICA研修を修了したチュニジア人を祝う', '修了生への祝意', '日本で専門研修を受けたチュニジア人修了生を称えます。'],
      ['JICA研修生への修了証と表彰', 'JICA研修修了生', '日本で身につけた学術・専門分野の成果を称える式典です。'],
      ['日本で培った専門性を証明する公式認定証', '優秀な成果', '日本の専門家と共有した高度な技能を認定します。'],
      ['日本で学んだチュニジアの専門人材', '同窓生コミュニティ', 'JICA研修を修了したチュニジア人コミュニティの活躍を紹介します。'],
      ['成功の歩みと二国間交流', '同窓生表彰式', '二国間協力によって実現した優れた成果を称えます。'],
      ['優れたJICA研修生を称えるABSFJ', '表彰と誇り', '会長と理事会から研修修了生へ、心からのお祝いを贈ります。'],
      ['カイゼンと気候変動セミナー', 'カイゼン・気候', 'ジャメル・ブジュダリア会長、JICAの宮田真由美氏、日本大使による開会挨拶。'],
      ['チュニジア・日本友好サッカー交流', 'スポーツ・友好', 'ABSFJとJICAのもと、チュニジアと日本の若者がピッチで交流しました。'],
      ['チュニジア・日本スポーツ交流へのご案内', '青少年交流', '家族や子どもたちを招き、フェアプレーと友好を祝います。'],
      ['JICA東京・三井陽子上級副理事長との昼食会', 'JICA東京幹部', '三井陽子氏、川村玲子氏、宮田真由美氏とのハイレベル会合。'],
      ['ABSFJの活動発信と組織的な広報', '公式広報', '協会の取り組みを紹介する公式ビジュアルです。'],
      ['外交関係樹立70周年', '外交70周年', '天皇陛下を祝賀するため、日本大使公邸で挨拶が行われました。'],
      ['外交レセプションに出席したABSFJ理事会', 'ABSFJ理事会', '天皇誕生日レセプションで、日本の関係者がABSFJ代表団を迎えました。'],
      ['ABSFJ代表と協力機関', '公式代表団', '日本の外交関係者と交流し、協力関係を深めました。'],
      ['外交式典に掲げられたABSFJのバナー', '公式バナー', 'チュニジアと日本の国旗と並んで掲げられたABSFJのバナー。'],
      ['在チュニジア日本大使館のレセプション', '外交レセプション', 'チュニジアと日本の友好関係樹立70周年を祝いました。'],
      ['ヨスラ・ベン・ファドゥル氏・医療機器管理', 'JICA研修報告', '医療機器の管理・保守に関する日本でのJICA研修について、ヨスラ・ベン・ファドゥル氏が経験を共有します。'],
    ],
  };
  const originalMarkup = new Map();
  // Publications edited in the admin remain in their authored language.
  function isManagedPublication(node) {
    return Boolean(node.closest('.event-card[data-publication-managed="true"]'));
  }
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
  function localizedDate(source, lang) {
    const months = { janvier: 0, février: 1, mars: 2, avril: 3, mai: 4, juin: 5, juillet: 6, août: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11 };
    const match = source.trim().toLocaleLowerCase('fr').match(/(?:(?:lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\s+)?(\d{1,2})\s+(\p{L}+)\s+(\d{4})/u);
    if (!match || months[match[2]] === undefined) return source;
    return new Intl.DateTimeFormat(languages[lang].locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(Date.UTC(Number(match[3]), months[match[2]], Number(match[1]), 12)));
  }
  function applyLanguage(lang) {
    const root = document.documentElement;
    root.lang = languages[lang].locale;
    root.dir = languages[lang].dir;
    root.dataset.language = lang;
    for (const [node, markup] of originalMarkup) {
      if (!node.isConnected || isManagedPublication(node)) {
        originalMarkup.delete(node);
        continue;
      }
      node.innerHTML = markup;
    }
    const dict = dictionaries[lang] || {};
    for (const [selector, copy] of Object.entries(dict)) {
      document.querySelectorAll(selector).forEach(node => {
        if (isManagedPublication(node)) return;
        if (!originalMarkup.has(node)) originalMarkup.set(node, node.innerHTML);
        if (node.matches('input,textarea')) node.setAttribute('placeholder', copy);
        else if (node.matches('option')) node.textContent = copy;
        else node.innerHTML = copy;
      });
    }
    window.absfjGalleryCopy = galleryCopy[lang] || null;
    document.querySelectorAll('.gallery-item').forEach((card, index) => {
      const entry = galleryCopy[lang]?.[index];
      const tag = card.querySelector('.gallery-tag');
      const title = card.querySelector('.gallery-title');
      const image = card.querySelector('img');
      if (!card.dataset.originalTitle) {
        card.dataset.originalTitle = title.textContent.trim();
        card.dataset.originalTag = tag.textContent.trim();
        card.dataset.originalAlt = image.alt;
      }
      const translatedTitle = entry?.[0] || card.dataset.originalTitle;
      tag.textContent = entry?.[1] || card.dataset.originalTag;
      title.textContent = translatedTitle;
      image.alt = entry?.[0] || card.dataset.originalAlt;
      card.setAttribute('aria-label', lang === 'fr' ? `Agrandir : ${card.dataset.originalAlt}` : (lang === 'ja' ? '拡大表示：' : 'Enlarge: ') + translatedTitle);
      const dateLine = card.querySelector('.gallery-overlay > div:last-child');
      if (dateLine) {
        const originalDate = dateLine.dataset.originalDate || dateLine.textContent.trim().split(' • ')[0];
        dateLine.dataset.originalDate = originalDate;
        if (!dateLine.dataset.originalEvent) dateLine.dataset.originalEvent = dateLine.textContent.trim().split(' • ').slice(1).join(' • ');
        const eventName = lang === 'fr' ? '' : ({ en: ['Honouring Oussama Akir', 'ABE Initiative working lunch', 'Fukuoka pilot project', 'Pan-African alumni network', 'Welcoming Japanese volunteers', 'JICA graduates celebrated', 'JICA graduates celebrated', 'JICA graduates celebrated', 'JICA graduates celebrated', 'JICA graduates celebrated', 'JICA graduates celebrated', 'National Kaizen seminar', 'Tunisia–Japan football match', 'Tunisia–Japan football match', 'JICA Tokyo visit', 'JICA Tokyo visit', '70 years of bilateral relations', '70 years of bilateral relations', '70 years of bilateral relations', '70 years of bilateral relations', '70 years of bilateral relations', 'JICA training report'], ja: ['オウサマ・アキル氏表彰', 'ABE留学生との昼食会', '福岡方式実証事業', 'アフリカ同窓生会合', '日本人ボランティア歓迎', 'JICA研修修了生表彰', 'JICA研修修了生表彰', 'JICA研修修了生表彰', 'JICA研修修了生表彰', 'JICA研修修了生表彰', 'JICA研修修了生表彰', 'カイゼン全国セミナー', 'チュニジア・日本サッカー交流', 'チュニジア・日本サッカー交流', 'JICA東京訪問', 'JICA東京訪問', '二国間関係70周年', '二国間関係70周年', '二国間関係70周年', '二国間関係70周年', '二国間関係70周年', 'JICA研修報告'] })[lang][index];
        const formattedDate = localizedDate(originalDate, lang);
        dateLine.textContent = lang === 'fr' ? `${originalDate} · ${dateLine.dataset.originalEvent}` : `${formattedDate} · ${eventName}`;
      }
    });
    document.querySelectorAll('.event-card').forEach(card => {
      const title = card.querySelector('.event-title');
      const more = card.querySelector('.open-modal-btn');
      if (more) {
        more.textContent = ({ fr: 'En savoir plus →', en: 'Read more →', ja: '詳しく見る →' })[lang];
        const eventTitle = title?.textContent.trim() || '';
        more.setAttribute('aria-label', ({ fr: `Lire : ${eventTitle}`, en: `Read more: ${eventTitle}`, ja: `詳しく見る：${eventTitle}` })[lang]);
      }
      const sourceLink = card.querySelector('.event-footer .btn-link[title]');
      if (sourceLink) sourceLink.title = ({ fr: 'Voir la publication sur Facebook', en: 'View the Facebook post', ja: 'Facebookの投稿を見る' })[lang];
      // Utility buttons follow the UI language; publication content, dates and alt text do not.
      if (isManagedPublication(card)) return;
      const image = card.querySelector('.event-card-img');
      if (image && title) {
        if (!image.dataset.originalAlt) image.dataset.originalAlt = image.alt;
        image.alt = lang === 'fr' ? image.dataset.originalAlt : title.textContent.trim();
      }
      card.querySelectorAll('.event-date-overlay, .event-announcement-date, .upcoming-date').forEach(node => {
        if (!node.dataset.originalMarkup) node.dataset.originalMarkup = node.innerHTML;
        if (node.classList.contains('upcoming-date') && !node.dataset.originalAriaLabel) node.dataset.originalAriaLabel = node.getAttribute('aria-label') || '';
        if (lang === 'fr') {
          node.innerHTML = node.dataset.originalMarkup;
          if (node.classList.contains('upcoming-date')) node.setAttribute('aria-label', node.dataset.originalAriaLabel);
          return;
        }
        if (node.classList.contains('upcoming-date')) {
          const month = node.querySelector('.upcoming-month');
          if (month) month.innerHTML = lang === 'ja' ? '11月<br />2026' : 'NOVEMBER<br />2026';
          node.setAttribute('aria-label', lang === 'ja' ? '2026年11月8日' : '8 November 2026');
          return;
        }
        if (card.classList.contains('event-card-upcoming') && node.classList.contains('event-date-overlay')) return;
        const source = node.dataset.originalText || (node.dataset.originalText = node.textContent.trim());
        node.textContent = localizedDate(source, lang);
      });
    });
    const guides = document.querySelector('.restitution-guides');
    if (guides) {
      if (!guides.dataset.originalLabel) guides.dataset.originalLabel = guides.getAttribute('aria-label') || '';
      guides.setAttribute('aria-label', ({ fr: guides.dataset.originalLabel, en: 'Writing suggestions', ja: '報告書作成のヒント' })[lang]);
    }
    const diorama = document.querySelector('.diorama-viewport');
    if (diorama) {
      if (!diorama.dataset.originalLabel) diorama.dataset.originalLabel = diorama.getAttribute('aria-label') || '';
      diorama.setAttribute('aria-label', ({
        fr: diorama.dataset.originalLabel,
        en: 'Relief diorama of Mount Fuji, the Mediterranean coast and Sidi Bou Saïd, with a Tunisian flag and an origami crane. The scene moves gently with the pointer.',
        ja: '富士山、地中海沿岸、シディ・ブ・サイドの立体ジオラマ。チュニジア国旗と折り鶴があり、ポインターに合わせてゆっくり動きます。',
      })[lang]);
    }
    document.querySelectorAll('[data-language]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.language === lang));
    });
    const pickerNames = { fr: ['Choisir une langue', 'Choisir une langue', 'Fermer'], en: ['Choose your language', 'Choose a language', 'Close'], ja: ['言語を選択', '言語を選択', '閉じる'] }[lang];
    document.querySelector('.language-nudge-label').textContent = pickerNames[0];
    document.getElementById('language-nudge').setAttribute('aria-label', pickerNames[1]);
    document.querySelector('.language-nudge-close').setAttribute('aria-label', pickerNames[2]);
    document.getElementById('language-trigger').setAttribute('aria-label', pickerNames[1]);
    document.title = ({ fr: 'ABSFJ Tunisie | Association des Bénéficiaires des Sessions de Formation au Japon (JICA) a', en: 'ABSFJ Tunisia | JICA Alumni', ja: 'チュニジア JICA 研修生同窓会 | ABSFJ' })[lang];
    window.dispatchEvent(new CustomEvent('absfj:languagechange', { detail: { language: lang } }));
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
      document.addEventListener('click', event => {
        if (!nudge.contains(event.target) && !trigger.contains(event.target)) dismiss();
      });
      document.addEventListener('keydown', event => { if (event.key === 'Escape') dismiss(); }, { once: true });
    } else {
      nudge.classList.add('is-dismissed');
    }
    trigger.querySelector('span:last-child').textContent = lang.toUpperCase();
  });
})();
