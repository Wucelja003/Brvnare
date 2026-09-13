/**
 * Podaci o paketima — PLACEHOLDER sadržaj (cene, rokovi i specifikacije se menjaju
 * kada dobijemo konačne podatke od Jela Komerc). Sve na jednom mestu da ista
 * cifra ne bi stajala na dva različita mesta na sajtu.
 */

export interface PackagePlan {
  id: 'vikendica' | 'porodicna' | 'premium'
  name: string
  tagline: string
  pricePerM2: string
  priceNote: string
  sizeRange: string
  buildTime: string
  warranty: string
  badge?: string
  highlight?: boolean
  /** Kratak opis za karticu */
  summary: string
  /** Glavne stavke na kartici */
  features: string[]
  /** Detaljno objašnjenje na stranici paketa */
  paragraphs: string[]
  idealFor: string[]
}

export const packagePlans: PackagePlan[] = [
  {
    id: 'vikendica',
    name: 'Vikendica',
    tagline: 'Kompaktna kućica za odmor i kraće boravke.',
    pricePerM2: '350 €',
    priceNote: 'od, po m² — bez PDV-a',
    sizeRange: '20 – 45 m²',
    buildTime: '4 – 6 nedelja',
    warranty: '5 godina',
    summary:
      'Osnovni paket sa svim što je potrebno da kućica bude useljiva: nosiva konstrukcija od sušenog drveta, izolacija, krov, stolarija i osnovne instalacije.',
    features: [
      'Konstrukcija od sušene smreke, 10 cm',
      'Termoizolacija 10 cm i limeni krov',
      'PVC stolarija sa dvostrukim staklom',
      'Elektro instalacije i osnovna rasveta',
      'Jedno kupatilo sa osnovnom sanitarijom',
      'Idejni 3D projekat, transport i montaža',
    ],
    paragraphs: [
      'Vikendica je najjednostavniji način da dođete do svoje brvnare. Radimo je po jednom od proverenih tipskih rasporeda, uz manje izmene po vašoj želji — pomeranje pregrade, dodatni prozor, veća terasa.',
      'Kućica se izrađuje u našoj radionici, a na vašu parcelu stiže kao gotov sklop koji montiramo za nekoliko dana. Vi pripremate temeljnu ploču i priključke, mi donosimo sve ostalo.',
      'Paket je zamišljen za sezonski boravak — proleće i jesen bez problema, zima uz dogrevanje. Ako planirate celogodišnji život, preporučujemo Porodičnu brvnaru zbog deblje izolacije.',
    ],
    idealFor: [
      'Vikend odmor i boravak u prirodi',
      'Izdavanje turistima (glamping, seoski turizam)',
      'Gostinsku kućicu u dvorištu',
      'Manje parcele i ograničen budžet',
    ],
  },
  {
    id: 'porodicna',
    name: 'Porodična brvnara',
    tagline: 'Topao dom za celogodišnji boravak cele porodice.',
    pricePerM2: '550 €',
    priceNote: 'od, po m² — bez PDV-a',
    sizeRange: '45 – 90 m²',
    buildTime: '6 – 10 nedelja',
    warranty: '7 godina',
    badge: 'Najtraženiji',
    highlight: true,
    summary:
      'Sve iz Vikendice, ali sa debljom izolacijom, kvalitetnijom stolarijom, opremljenom kuhinjom i rasporedom koji crtamo isključivo po vašoj meri.',
    features: [
      'Konstrukcija od sušene smreke/bora, 14 cm',
      'Termo i zvučna izolacija 16 cm',
      'Drvo-alu stolarija sa trostrukim staklom',
      'Opremljena kuhinja i do dva kupatila',
      'Raspored i enterijer po vašoj meri',
      '3D projekat enterijera i projekt menadžer',
    ],
    paragraphs: [
      'Ovo je paket koji bira većina naših klijenata. Kreće od praznog papira: sedimo sa vama, slušamo kako živite i crtamo raspored oko toga — koliko soba, gde ide kuhinja, sa koje strane hoćete jutarnje sunce.',
      'Izolacija i stolarija su na nivou savremene montažne kuće, pa je boravak prijatan i zimi, uz razumne račune za grejanje. Kuhinja stiže opremljena, a kupatila u potpunosti završena.',
      'Kroz ceo posao vodi vas jedan projekt menadžer — jedan broj telefona za sva pitanja, od potpisa ugovora do primopredaje ključeva.',
    ],
    idealFor: [
      'Stalno stanovanje četvoročlane porodice',
      'Zamenu stana kućom na periferiji',
      'Kuću za izdavanje tokom cele godine',
      'Parcele sa lepim pogledom koje traže poseban raspored',
    ],
  },
  {
    id: 'premium',
    name: 'Premium brvnara',
    tagline: 'Brvnara po meri, do najsitnijeg detalja enterijera.',
    pricePerM2: '800 €',
    priceNote: 'od, po m² — bez PDV-a',
    sizeRange: '70 – 150+ m²',
    buildTime: '10 – 16 nedelja',
    warranty: '10 godina',
    badge: 'Ključ u ruke',
    summary:
      'Kompletan projekat ključ u ruke: lepljena lamela, podno grejanje, pametna kuća, nameštaj po meri i završna obrada u premium materijalima.',
    features: [
      'Konstrukcija od lepljene lamele, 16 cm',
      'Izolacija 20 cm i energetski razred A',
      'Podno grejanje i toplotna pumpa',
      'Pametna kuća, scenska rasveta',
      'Nameštaj i stolarija po meri',
      'Garancija 10 godina i servis 3 godine',
    ],
    paragraphs: [
      'Premium paket je za one koji žele da se ušetaju u gotovu kuću — sa nameštajem, posteljinom u ormanu i upaljenim grejanjem. Ništa nije tipsko: svaki element se crta, bira i pravi za vas.',
      'Radimo sa lepljenom lamelom koja se ne uvija i drži savršenu geometriju i na velikim rasponima, pa su moguća staklena platna po celoj visini i otvoreni prostori bez stubova u sredini.',
      'Kuća se predaje sa podnim grejanjem, toplotnom pumpom, rekuperacijom i pametnim sistemom kojim upravljate sa telefona — grejanje, rasveta, roletne i nadzor.',
    ],
    idealFor: [
      'Reprezentativne kuće i vile u planini',
      'Butik smeštaj visoke kategorije',
      'Velike raspone i staklene fasade',
      'Klijente koji žele ključ u ruke bez svakodnevnog angažovanja',
    ],
  },
]

/** Vrednost u tabeli: true = uključeno, false = nije uključeno, string = detalj */
export type CompareValue = boolean | string

export interface CompareGroup {
  group: string
  rows: { label: string; values: [CompareValue, CompareValue, CompareValue] }[]
}

export const compareGroups: CompareGroup[] = [
  {
    group: 'Konstrukcija i temelji',
    rows: [
      {
        label: 'Nosiva konstrukcija',
        values: [
          'Sušena smreka 10 cm',
          'Sušena smreka/bor 14 cm',
          'Lepljena lamela 16 cm',
        ],
      },
      {
        label: 'Podna konstrukcija',
        values: ['12 cm', '18 cm', '24 cm + podno grejanje'],
      },
      { label: 'Projekat temeljne ploče', values: [true, true, true] },
      { label: 'Statički proračun', values: [false, true, true] },
      { label: 'Terasa', values: ['Opciono', 'Uključena', 'Uključena, po meri'] },
    ],
  },
  {
    group: 'Izolacija i krov',
    rows: [
      {
        label: 'Termoizolacija zidova',
        values: ['10 cm', '16 cm', '20 cm + paropropusna folija'],
      },
      { label: 'Zvučna izolacija', values: [false, true, true] },
      {
        label: 'Krovni pokrivač',
        values: ['Limeni pokrivač', 'Lim ili šindra', 'Falcovani lim / šindra po izboru'],
      },
      { label: 'Oluci i opšivke', values: [true, true, true] },
      { label: 'Energetski razred (procena)', values: ['C', 'B', 'A'] },
    ],
  },
  {
    group: 'Stolarija',
    rows: [
      {
        label: 'Prozori',
        values: [
          'PVC, dvostruko staklo',
          'Drvo-alu, trostruko staklo',
          'Drvo-alu po meri, trostruko staklo',
        ],
      },
      {
        label: 'Ulazna vrata',
        values: ['Sigurnosna', 'Sigurnosna, termo', 'Premium, pametna brava'],
      },
      {
        label: 'Unutrašnja vrata',
        values: ['Standardna', 'Furnirana', 'Po meri'],
      },
      { label: 'Roletne / zastori', values: [false, 'Roletne', 'Motorne roletne'] },
    ],
  },
  {
    group: 'Instalacije',
    rows: [
      { label: 'Elektro instalacije', values: [true, true, 'Sa pametnom kućom'] },
      {
        label: 'Vodovod i kanalizacija',
        values: ['Osnovno', 'Kompletno', 'Kompletno + rekuperacija'],
      },
      {
        label: 'Grejanje',
        values: ['Priprema', 'Klima ili peć na pelet', 'Podno grejanje + toplotna pumpa'],
      },
      { label: 'Rasveta', values: ['Osnovna', 'LED po projektu', 'Scenska, dizajnerska'] },
      { label: 'Internet i nadzor', values: [false, 'Priprema', 'Kompletno instalirano'] },
    ],
  },
  {
    group: 'Kupatilo, kuhinja i enterijer',
    rows: [
      { label: 'Kupatilo', values: ['1, osnovno', '1–2, opremljeno', '2+, po meri'] },
      {
        label: 'Kuhinja',
        values: ['Priprema instalacija', 'Opremljena, tipska', 'Po meri, sa uređajima'],
      },
      { label: 'Sanitarija i pločice', values: ['Standard', 'Srednja klasa', 'Premium'] },
      {
        label: 'Obloge zidova i plafona',
        values: ['Lamperija', 'Lamperija ili gips', 'Kombinacija po projektu'],
      },
      { label: 'Nameštaj', values: [false, 'Osnovni set', 'Kompletno po meri'] },
    ],
  },
  {
    group: 'Projekat i podrška',
    rows: [
      { label: 'Idejni 3D projekat', values: [true, true, true] },
      { label: 'Izmene projekta', values: ['1 krug', '3 kruga', 'Neograničeno'] },
      { label: '3D projekat enterijera', values: [false, true, true] },
      { label: 'Podrška oko dozvola', values: [false, 'Savetovanje', 'Kompletna podrška'] },
      { label: 'Projekt menadžer', values: [false, true, 'Dedicirani'] },
    ],
  },
  {
    group: 'Isporuka i garancija',
    rows: [
      {
        label: 'Transport',
        values: ['Do 100 km u ceni', 'Do 300 km u ceni', 'Srbija i region'],
      },
      { label: 'Montaža na lokaciji', values: [true, true, true] },
      { label: 'Rok izrade', values: ['4–6 nedelja', '6–10 nedelja', '10–16 nedelja'] },
      { label: 'Garancija na konstrukciju', values: ['5 godina', '7 godina', '10 godina'] },
      { label: 'Servis nakon primopredaje', values: ['12 meseci', '24 meseca', '36 meseci'] },
    ],
  },
]

/** Šta cena po m² ne pokriva — da ne bude iznenađenja */
export const notIncluded: string[] = [
  'Zemljani radovi i izrada temeljne ploče (izvodi lokalni izvođač po našem projektu)',
  'Priključci struje, vode i kanalizacije do parcele',
  'Građevinska dozvola, takse i naknade',
  'Transport preko kilometraže uključene u paket',
  'Dizalica ako je pristup parceli otežan',
  'Uređenje okućnice, ograda i prilazne staze',
  'PDV — sve cene su iskazane bez PDV-a',
]

/** Od čega zavisi konačna cena */
export const priceFactors: { title: string; text: string }[] = [
  {
    title: 'Kvadratura i oblik',
    text: 'Veća kuća ima nižu cenu po kvadratu. Složeni oblici, potkrovlje i veliki rasponi je podižu.',
  },
  {
    title: 'Nivo završne obrade',
    text: 'Najveća razlika u ceni nije u konstrukciji nego u onome što se vidi — podovi, pločice, kuhinja, nameštaj.',
  },
  {
    title: 'Lokacija i pristup',
    text: 'Udaljenost od radionice, nagib terena i mogućnost prilaza kamionu utiču na transport i montažu.',
  },
  {
    title: 'Dodaci',
    text: 'Terasa, sauna, garaža, pergola ili staklena fasada računaju se posebno, uz jasnu cenu u ponudi.',
  },
]

/** Kratki koraci do ponude */
export const offerSteps: { title: string; text: string }[] = [
  {
    title: 'Pošaljete upit',
    text: 'Napišete okvirnu kvadraturu, lokaciju i šta vam je važno. Nije potrebno da imate projekat.',
  },
  {
    title: 'Razgovor i procena',
    text: 'U roku od 48h javljamo se sa okvirnom cenom i predlogom paketa koji vam odgovara.',
  },
  {
    title: 'Detaljna ponuda',
    text: 'Nakon usaglašavanja rasporeda dobijate specifikaciju sa fiksnom cenom i rokom.',
  },
]
