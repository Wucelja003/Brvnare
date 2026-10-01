export type Lang = 'sr' | 'en' | 'de'

export const languages: { code: Lang; label: string; flag: string }[] = [
  { code: 'sr', label: 'Srpski', flag: '🇷🇸' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
]

export const translations: Record<Lang, Record<string, string>> = {
  sr: {
    'nav.process': 'Proces',
    'nav.models': 'Modeli kuća',
    'nav.packages': 'Naši Paketi',
    'nav.about': 'O nama',
    'nav.gallery': 'Modeli Kuća',
    'nav.contact': 'Kontakt',
    'nav.inquiry': 'Pošaljite upit',
    'nav.menu': 'Meni',
    'nav.close': 'Zatvori',
    'nav.language': 'Jezik',
    'nav.social': 'Društvene mreže',

    'home.title': 'Vaša brvnara iz snova',
    'home.subtitle':
      'Ručno izrađene drvene kućice i brvnare — od projekta do useljenja. Prirodni materijali, moderan komfor i topao dom.',
    'home.cta': 'Pogledaj pakete',
    'home.badge': 'Jela Komerc × Brvnara',
    'home.titlePre': 'Vaša brvnara',
    'home.titleHighlight': 'iz snova',
    'home.fact1': 'Ručna izrada',
    'home.fact2': 'Od projekta do ključa',
    'home.fact3': 'Enterijer po meri',
    'home.scroll': 'Skrolujte',

    'intro.eyebrow': '(01) — Saradnja',
    'intro.titlePre': 'Kućice',
    'intro.titleHighlight': 'po vašoj meri',
    'intro.body1':
      'U saradnji sa firmom Jela Komerc gradimo drvene kućice potpuno po vašoj meri — od eksterijera do najsitnijeg detalja enterijera.',
    'intro.body2':
      'Svaki projekat prilagođavamo vašim željama i prostoru — od izbora drveta i fasade, do rasporeda, obloga i završne obrade unutra.',
    'intro.cta': 'Pogledaj modele',
    'intro.caption': 'Kućice po meri — izrada',
    'intro.placeholder': 'Ovde ide slika kućica',
    'intro.cta2': 'Kako radimo',
    'intro.stat1': 'po vašoj meri',
    'intro.stat2': 'paketa opremljenosti',
    'intro.stat3': 'god. garancije',
    'intro.upTo': 'do',
    'intro.outside': 'Spolja',
    'intro.inside': 'Iznutra',
    'intro.exterior': 'Eksterijer',
    'intro.interior': 'Enterijer',
    'intro.cardCaption': 'Od eksterijera do najsitnijeg detalja enterijera',
    'intro.scrollHint': 'Skrolujte i uđite unutra',

    'process.eyebrow': '(02) — Kako radimo',
    'process.titlePre': 'Proces',
    'process.titleHighlight': 'izgradnje',
    'process.subtitle':
      'Od prvog dogovora do primopredaje ključeva — svaki korak je jasan i pod kontrolom.',
    'process.viewAll': 'Pogledaj ceo proces',
    'process.step1.title': 'Konsultacije',
    'process.step1.desc':
      'Upoznajemo vaše želje, potrebe i budžet i predlažemo najbolje rešenje.',
    'process.step2.title': 'Projektovanje',
    'process.step2.desc':
      'Izrađujemo idejni projekat i 3D prikaz vaše buduće kućice.',
    'process.step3.title': 'Izrada konstrukcije',
    'process.step3.desc':
      'Gradimo drvenu konstrukciju od kvalitetnog, sušenog drveta.',
    'process.step4.title': 'Enterijer i završni radovi',
    'process.step4.desc':
      'Uređujemo enterijer do najsitnijeg detalja, po vašoj meri.',
    'process.step5.title': 'Primopredaja',
    'process.step5.desc':
      'Predajemo vam useljivu kućicu, spremnu za uživanje.',
    'process.step': 'Korak',
    'process.duration': 'Trajanje',
    'process.step1.time': '1–2 dana',
    'process.step1.points': 'Obilazak parcele ili video poziv|Želje, potrebe i budžet|Predlog paketa i okvirna cena',
    'process.step2.time': '1–3 nedelje',
    'process.step2.points': 'Idejni projekat i raspored|Fotorealističan 3D prikaz|Izmene dok ne bude savršeno',
    'process.step3.time': '3–8 nedelja',
    'process.step3.points': 'Sušeno drvo iz proverenih izvora|Izrada u našoj radionici|Montaža na vašoj parceli',
    'process.step4.time': '2–6 nedelja',
    'process.step4.points': 'Instalacije, podovi i obloge|Kuhinja i nameštaj po meri|Rasveta i završna obrada',
    'process.step5.time': '1 dan',
    'process.step5.points': 'Zajednički obilazak kuće|Ključevi i dokumentacija|Garancija i servis',

    'models.eyebrow': '(03) — 3D model',
    'models.titlePre': 'Vaš dom u',
    'models.titleHighlight': '3D prikazu',
    'models.body':
      'Pre nego što počne gradnja, dobijate fotorealističan 3D model svoje kućice — da vidite svaki detalj i ništa ne prepustite slučaju.',
    'models.tag': '3D render',
    'models.viewAll': 'Svi modeli',
    'models.hint': '3D renderi i realizovane kuće — kliknite za sve modele',
    'marquee.items': 'Drvo|Toplina|Po meri|Ključ u ruke|Priroda|Mir',

    'showcase.title': 'Naše brvnare',
    'showcase.subtitle':
      'Pogledajte kuće koje smo izgradili — svaka je priča za sebe.',
    'showcase.cta': 'Pogledaj modele',

    'packages.eyebrow': '(04) — Ponuda',
    'packages.title': 'Paketi',
    'packages.subtitle':
      'Svaka brvnara je priča za sebe — izaberite nivo koji odgovara vašim željama i prostoru.',
    'packages.priceLabel': 'Cena',

    'faq.eyebrow': '(05) — Česta pitanja',
    'faq.title': 'Kako možemo da pomognemo?',
    'faq.search': 'Pretraži pitanja…',
    'faq.empty': 'Nema rezultata za',
    'faq.clear': 'Očisti filtere',
    'faq.help': 'Ne nalazite odgovor?',
    'faq.helpCta': 'Pišite nam',
    'packages.priceFrom': 'od',
    'pkg.cabin.name': 'Vikendica',
    'pkg.family.name': 'Porodična brvnara',
    'pkg.premium.name': 'Premium brvnara',

    'about.title': 'O nama',
    'about.body':
      'Ovde ide priča o Brvnari — ko smo, čime se bavimo i zašto gradimo drvene kuće. (Placeholder sadržaj.)',
    'gallery.title': 'Galerija',
    'gallery.body': 'Ovde ide galerija naših brvnara. (Placeholder sadržaj.)',
    'contact.title': 'Kontakt',
    'contact.body':
      'Ovde ide kontakt forma / podaci za kontakt. (Placeholder sadržaj.)',

    'footer.tagline': 'drvene kućice i brvnare',
    'footer.rights': 'Sva prava zadržana.',
  },
  en: {
    'nav.home': 'Home',
    'nav.process': 'Process',
    'nav.models': 'House models',
    'nav.packages': 'Packages',
    'nav.about': 'About us',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    'nav.inquiry': 'Send an inquiry',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.language': 'Language',
    'nav.social': 'Social media',

    'home.title': 'Your dream log cabin',
    'home.subtitle':
      'Handcrafted wooden houses and log cabins — from design to move-in. Natural materials, modern comfort and a warm home.',
    'home.cta': 'View packages',
    'home.badge': 'Jela Komerc × Brvnara',
    'home.titlePre': 'Your dream',
    'home.titleHighlight': 'log cabin',
    'home.fact1': 'Handcrafted',
    'home.fact2': 'From design to keys',
    'home.fact3': 'Custom interiors',
    'home.scroll': 'Scroll',

    'intro.eyebrow': '(01) — Partnership',
    'intro.titlePre': 'Cabins',
    'intro.titleHighlight': 'made to measure',
    'intro.body1':
      'In collaboration with Jela Komerc we build wooden cabins entirely to your specification — from the exterior to the smallest interior detail.',
    'intro.body2':
      'We tailor every project to your wishes and space — from the choice of wood and façade to the layout, cladding and interior finish.',
    'intro.cta': 'View models',
    'intro.caption': 'Custom cabins — in the making',
    'intro.placeholder': 'Cabin image goes here',
    'intro.cta2': 'How we work',
    'intro.stat1': 'made to measure',
    'intro.stat2': 'equipment packages',
    'intro.stat3': 'yr warranty',
    'intro.upTo': 'up to',
    'intro.outside': 'Outside',
    'intro.inside': 'Inside',
    'intro.exterior': 'Exterior',
    'intro.interior': 'Interior',
    'intro.cardCaption': 'From the exterior to the smallest interior detail',
    'intro.scrollHint': 'Scroll to step inside',

    'process.eyebrow': '(02) — How we work',
    'process.titlePre': 'The build',
    'process.titleHighlight': 'process',
    'process.subtitle':
      'From the first meeting to the handover of keys — every step is clear and under control.',
    'process.viewAll': 'See the full process',
    'process.step1.title': 'Consultation',
    'process.step1.desc':
      'We get to know your wishes, needs and budget and propose the best solution.',
    'process.step2.title': 'Design',
    'process.step2.desc':
      'We create the concept design and a 3D preview of your future cabin.',
    'process.step3.title': 'Structure',
    'process.step3.desc':
      'We build the wooden structure from quality, kiln-dried timber.',
    'process.step4.title': 'Interior & finishing',
    'process.step4.desc':
      'We fit out the interior down to the smallest detail, made to measure.',
    'process.step5.title': 'Handover',
    'process.step5.desc':
      'We hand over a move-in ready cabin, ready to enjoy.',
    'process.step': 'Step',
    'process.duration': 'Duration',
    'process.step1.time': '1–2 days',
    'process.step1.points': 'Site visit or video call|Wishes, needs and budget|Package proposal and estimate',
    'process.step2.time': '1–3 weeks',
    'process.step2.points': 'Concept design and layout|Photorealistic 3D render|Revisions until it is perfect',
    'process.step3.time': '3–8 weeks',
    'process.step3.points': 'Kiln-dried timber from trusted sources|Built in our workshop|Assembled on your plot',
    'process.step4.time': '2–6 weeks',
    'process.step4.points': 'Installations, floors and cladding|Custom kitchen and furniture|Lighting and finishing',
    'process.step5.time': '1 day',
    'process.step5.points': 'Joint walkthrough of the house|Keys and documentation|Warranty and service',

    'models.eyebrow': '(03) — 3D model',
    'models.titlePre': 'Your home in',
    'models.titleHighlight': '3D',
    'models.body':
      'Before construction begins, you receive a photorealistic 3D model of your cabin — so you can see every detail and leave nothing to chance.',
    'models.tag': '3D render',
    'models.viewAll': 'All models',
    'models.hint': '3D renders and finished homes — click to see all models',
    'marquee.items': 'Timber|Warmth|Made to measure|Turnkey|Nature|Calm',

    'showcase.title': 'Our cabins',
    'showcase.subtitle':
      "See the homes we've built — each one a story of its own.",
    'showcase.cta': 'View models',

    'packages.eyebrow': '(04) — Offer',
    'packages.title': 'Packages',
    'packages.subtitle':
      'Every cabin is a story of its own — choose the level that fits your wishes and space.',
    'packages.priceLabel': 'Price',

    'faq.eyebrow': '(05) — FAQ',
    'faq.title': 'How can we help?',
    'faq.search': 'Search questions…',
    'faq.empty': 'No results for',
    'faq.clear': 'Clear filters',
    'faq.help': "Can't find what you need?",
    'faq.helpCta': 'Contact us',
    'packages.priceFrom': 'from',
    'pkg.cabin.name': 'Weekend cabin',
    'pkg.family.name': 'Family cabin',
    'pkg.premium.name': 'Premium cabin',

    'about.title': 'About us',
    'about.body':
      "Here goes the story of Brvnara — who we are, what we do and why we build wooden homes. (Placeholder content.)",
    'gallery.title': 'Gallery',
    'gallery.body': 'A gallery of our cabins goes here. (Placeholder content.)',
    'contact.title': 'Contact',
    'contact.body':
      'A contact form / contact details go here. (Placeholder content.)',

    'footer.tagline': 'wooden houses and log cabins',
    'footer.rights': 'All rights reserved.',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.process': 'Ablauf',
    'nav.models': 'Hausmodelle',
    'nav.packages': 'Pakete',
    'nav.about': 'Über uns',
    'nav.gallery': 'Galerie',
    'nav.contact': 'Kontakt',
    'nav.inquiry': 'Anfrage senden',
    'nav.menu': 'Menü',
    'nav.close': 'Schließen',
    'nav.language': 'Sprache',
    'nav.social': 'Soziale Medien',

    'home.title': 'Ihr Traum-Blockhaus',
    'home.subtitle':
      'Handgefertigte Holzhäuser und Blockhäuser — vom Entwurf bis zum Einzug. Natürliche Materialien, moderner Komfort und ein warmes Zuhause.',
    'home.cta': 'Pakete ansehen',
    'home.badge': 'Jela Komerc × Brvnara',
    'home.titlePre': 'Ihr',
    'home.titleHighlight': 'Traum-Blockhaus',
    'home.fact1': 'Handgefertigt',
    'home.fact2': 'Vom Entwurf bis zum Schlüssel',
    'home.fact3': 'Interieur nach Maß',
    'home.scroll': 'Scrollen',

    'intro.eyebrow': '(01) — Zusammenarbeit',
    'intro.titlePre': 'Blockhäuser',
    'intro.titleHighlight': 'nach Maß',
    'intro.body1':
      'In Zusammenarbeit mit der Firma Jela Komerc bauen wir Holzhäuser ganz nach Ihren Wünschen — vom Äußeren bis ins kleinste Detail der Inneneinrichtung.',
    'intro.body2':
      'Wir passen jedes Projekt an Ihre Wünsche und Ihren Raum an — von der Wahl des Holzes und der Fassade bis zu Grundriss, Verkleidung und Innenausbau.',
    'intro.cta': 'Modelle ansehen',
    'intro.caption': 'Häuser nach Maß — in Arbeit',
    'intro.placeholder': 'Hier kommt ein Bild der Häuser hin',
    'intro.cta2': 'So arbeiten wir',
    'intro.stat1': 'nach Maß',
    'intro.stat2': 'Ausstattungspakete',
    'intro.stat3': 'Jahre Garantie',
    'intro.upTo': 'bis zu',
    'intro.outside': 'Außen',
    'intro.inside': 'Innen',
    'intro.exterior': 'Exterieur',
    'intro.interior': 'Interieur',
    'intro.cardCaption': 'Vom Exterieur bis ins kleinste Detail des Interieurs',
    'intro.scrollHint': 'Scrollen Sie hinein',

    'process.eyebrow': '(02) — Wie wir arbeiten',
    'process.titlePre': 'Der Bau-',
    'process.titleHighlight': 'prozess',
    'process.subtitle':
      'Vom ersten Gespräch bis zur Schlüsselübergabe — jeder Schritt ist klar und unter Kontrolle.',
    'process.viewAll': 'Ganzer Ablauf',
    'process.step1.title': 'Beratung',
    'process.step1.desc':
      'Wir lernen Ihre Wünsche, Bedürfnisse und Ihr Budget kennen und schlagen die beste Lösung vor.',
    'process.step2.title': 'Planung',
    'process.step2.desc':
      'Wir erstellen den Entwurf und eine 3D-Vorschau Ihres künftigen Hauses.',
    'process.step3.title': 'Konstruktion',
    'process.step3.desc':
      'Wir bauen die Holzkonstruktion aus hochwertigem, kammergetrocknetem Holz.',
    'process.step4.title': 'Innenausbau & Finish',
    'process.step4.desc':
      'Wir gestalten den Innenraum bis ins kleinste Detail, ganz nach Maß.',
    'process.step5.title': 'Übergabe',
    'process.step5.desc':
      'Wir übergeben ein bezugsfertiges Haus, bereit zum Genießen.',
    'process.step': 'Schritt',
    'process.duration': 'Dauer',
    'process.step1.time': '1–2 Tage',
    'process.step1.points': 'Besichtigung oder Videoanruf|Wünsche, Bedarf und Budget|Paketvorschlag und Kostenschätzung',
    'process.step2.time': '1–3 Wochen',
    'process.step2.points': 'Entwurf und Grundriss|Fotorealistische 3D-Ansicht|Änderungen, bis alles passt',
    'process.step3.time': '3–8 Wochen',
    'process.step3.points': 'Getrocknetes Holz aus geprüften Quellen|Fertigung in unserer Werkstatt|Montage auf Ihrem Grundstück',
    'process.step4.time': '2–6 Wochen',
    'process.step4.points': 'Installationen, Böden und Verkleidungen|Küche und Möbel nach Maß|Beleuchtung und Endausbau',
    'process.step5.time': '1 Tag',
    'process.step5.points': 'Gemeinsame Hausbegehung|Schlüssel und Unterlagen|Garantie und Service',

    'models.eyebrow': '(03) — 3D-Modell',
    'models.titlePre': 'Ihr Zuhause in',
    'models.titleHighlight': '3D',
    'models.body':
      'Noch vor Baubeginn erhalten Sie ein fotorealistisches 3D-Modell Ihres Hauses — so sehen Sie jedes Detail und überlassen nichts dem Zufall.',
    'models.tag': '3D-Render',
    'models.viewAll': 'Alle Modelle',
    'models.hint': '3D-Renderings und fertige Häuser — klicken für alle Modelle',
    'marquee.items': 'Holz|Wärme|Nach Maß|Schlüsselfertig|Natur|Ruhe',

    'showcase.title': 'Unsere Häuser',
    'showcase.subtitle':
      'Sehen Sie die Häuser, die wir gebaut haben — jedes eine eigene Geschichte.',
    'showcase.cta': 'Modelle ansehen',

    'packages.eyebrow': '(04) — Angebot',
    'packages.title': 'Pakete',
    'packages.subtitle':
      'Jedes Haus ist eine eigene Geschichte — wählen Sie das Paket, das zu Ihren Wünschen passt.',
    'packages.priceLabel': 'Preis',

    'faq.eyebrow': '(05) — FAQ',
    'faq.title': 'Wie können wir helfen?',
    'faq.search': 'Fragen durchsuchen…',
    'faq.empty': 'Keine Ergebnisse für',
    'faq.clear': 'Filter zurücksetzen',
    'faq.help': 'Nicht gefunden, was Sie suchen?',
    'faq.helpCta': 'Kontaktieren Sie uns',
    'packages.priceFrom': 'ab',
    'pkg.cabin.name': 'Wochenendhaus',
    'pkg.family.name': 'Familien-Blockhaus',
    'pkg.premium.name': 'Premium-Blockhaus',

    'about.title': 'Über uns',
    'about.body':
      'Hier steht die Geschichte von Brvnara — wer wir sind, was wir tun und warum wir Holzhäuser bauen. (Platzhalter-Inhalt.)',
    'gallery.title': 'Galerie',
    'gallery.body': 'Hier kommt eine Galerie unserer Blockhäuser hin. (Platzhalter-Inhalt.)',
    'contact.title': 'Kontakt',
    'contact.body':
      'Hier kommen ein Kontaktformular / Kontaktdaten hin. (Platzhalter-Inhalt.)',

    'footer.tagline': 'Holzhäuser und Blockhäuser',
    'footer.rights': 'Alle Rechte vorbehalten.',
  },
}
