export type Lang = "en" | "fr" | "ar";

export type Step = { n: string; title: string; body: string };
export type Row = [string, string, string];

export type Translations = {
  dir: "ltr" | "rtl";
  lang: Lang;
  nav_cta: string;
  badge: string;
  hero_h1: string;
  hero_sub: string;
  founding_pre: string;
  pct: string;
  founding_forever: string;
  founding_note: string;
  spots_label: string;
  cta_btn: string;
  cta_meta: string;
  how_eyebrow: string;
  how_title: string;
  steps: Step[];
  compare_eyebrow: string;
  compare_title: string;
  col_founding: string;
  col_standard: string;
  rows: Row[];
  final_title: (spotsLeft: number) => string;
  final_sub: string;
  final_btn: string;
  footer: string;
};

export const T: Record<Lang, Translations> = {
  en: {
    dir: "ltr",
    lang: "en",
    nav_cta: "Join Now",
    badge: "Founding Member — 1 of 100",
    hero_h1: "Your COD Orders,<br/><em>Confirmed by AI.</em>",
    hero_sub:
      "Snailon connects to your WhatsApp Business number and confirms every order automatically — collecting GPS pins, checking risk scores, and cutting your return rate.",
    founding_pre: "First 100 store owners are locked in at",
    pct: "1%",
    founding_forever: "commission — forever.",
    founding_note: "After 100 members, the standard rate goes to 2%.",
    spots_label: "founding spots remaining",
    cta_btn: "Top Up 100 MAD & Secure My Spot",
    cta_meta:
      "Minimum 100 MAD · No subscription · Balance applied to confirmed orders",
    how_eyebrow: "HOW IT WORKS",
    how_title: "Three steps. Zero work.",
    steps: [
      {
        n: "01",
        title: "Connect Your WhatsApp",
        body: "Scan a QR code. Snailon links to your own WhatsApp Business number — not ours. Your brand stays yours.",
      },
      {
        n: "02",
        title: "Orders Come In",
        body: "From Youcan, Shopify, Instagram DMs, or manual entry — Snailon sees every order in one dashboard.",
      },
      {
        n: "03",
        title: "AI Confirms for You",
        body: "Snailon messages your customer, collects their GPS pin, runs a risk check, and alerts you on suspicious orders — automatically.",
      },
    ],
    compare_eyebrow: "THE OFFER",
    compare_title: "What you lock in today.",
    col_founding: "Founding",
    col_standard: "Standard",
    rows: [
      ["Commission per confirmed order", "1%", "2%"],
      ["Available to", "First 100 only", "Everyone"],
      ["Rate locked", "Forever", "May change"],
      ["Minimum to join", "100 MAD", "100 MAD"],
    ],
    final_title: (n) => `${n} ${n === 1 ? "spot" : "spots"} left.`,
    final_sub:
      "Once filled, this offer disappears. The founding rate is locked forever for the store owners who join now.",
    final_btn: "Secure My Founding Spot",
    footer:
      "Snailon is pre-launch in Morocco. Your balance is fully reserved and applied to your first confirmed orders. No subscriptions. No surprises.",
  },
  fr: {
    dir: "ltr",
    lang: "fr",
    nav_cta: "Rejoindre",
    badge: "Membre Fondateur — 1 sur 100",
    hero_h1: "Vos Commandes COD,<br/><em>Confirmées par l'IA.</em>",
    hero_sub:
      "Snailon se connecte à votre numéro WhatsApp Business et confirme chaque commande automatiquement — collectant les pins GPS, vérifiant les scores de risque et réduisant vos retours.",
    founding_pre: "Les 100 premiers marchands sont bloqués à",
    pct: "1%",
    founding_forever: "de commission — pour toujours.",
    founding_note: "Après 100 membres, le taux standard passe à 2%.",
    spots_label: "places fondatrices restantes",
    cta_btn: "Recharger 100 MAD & Sécuriser Ma Place",
    cta_meta:
      "Minimum 100 MAD · Sans abonnement · Solde appliqué aux commandes confirmées",
    how_eyebrow: "COMMENT ÇA MARCHE",
    how_title: "Trois étapes. Zéro effort.",
    steps: [
      {
        n: "01",
        title: "Connectez votre WhatsApp",
        body: "Scannez un QR code. Snailon se lie à votre propre numéro WhatsApp Business — pas le nôtre. Votre marque reste la vôtre.",
      },
      {
        n: "02",
        title: "Les commandes arrivent",
        body: "De Youcan, Shopify, DMs Instagram, ou saisie manuelle — Snailon voit chaque commande dans un seul tableau de bord.",
      },
      {
        n: "03",
        title: "L'IA confirme pour vous",
        body: "Snailon contacte votre client, collecte son pin GPS, vérifie le risque et vous alerte sur les commandes suspectes — automatiquement.",
      },
    ],
    compare_eyebrow: "L'OFFRE",
    compare_title: "Ce que vous bloquez aujourd'hui.",
    col_founding: "Fondateur",
    col_standard: "Standard",
    rows: [
      ["Commission par commande confirmée", "1%", "2%"],
      ["Disponible pour", "100 premiers seulement", "Tout le monde"],
      ["Taux bloqué", "Pour toujours", "Peut changer"],
      ["Minimum pour rejoindre", "100 MAD", "100 MAD"],
    ],
    final_title: (n) => `${n} ${n === 1 ? "place restante" : "places restantes"}.`,
    final_sub:
      "Une fois remplie, cette offre disparaît. Le taux fondateur est verrouillé pour toujours pour les marchands qui rejoignent maintenant.",
    final_btn: "Sécuriser Ma Place Fondatrice",
    footer:
      "Snailon est en pré-lancement au Maroc. Votre solde est entièrement réservé et appliqué à vos premières commandes confirmées. Sans abonnement. Sans surprises.",
  },
  ar: {
    dir: "rtl",
    lang: "ar",
    nav_cta: "انضم الآن",
    badge: "عضو مؤسس — 1 من 100",
    hero_h1:
      "طلبياتك بالدفع عند الاستلام،<br/><em>مؤكدة بالذكاء الاصطناعي.</em>",
    hero_sub:
      "سنيلون يتصل برقم واتساب الأعمال الخاص بك ويؤكد كل طلبية تلقائياً — يجمع مواقع GPS، يفحص درجات المخاطرة، ويقلل نسبة مرتجعاتك.",
    founding_pre: "أول 100 متجر يحصل على",
    pct: "1٪",
    founding_forever: "عمولة — للأبد.",
    founding_note: "بعد 100 عضو، تصبح العمولة المعتادة 2٪.",
    spots_label: "مكاناً مؤسساً متبقياً",
    cta_btn: "اشحن 100 درهم واحجز مكاني",
    cta_meta:
      "الحد الأدنى 100 درهم · بدون اشتراك · الرصيد يُطبق على الطلبيات المؤكدة",
    how_eyebrow: "كيف يعمل",
    how_title: "ثلاث خطوات. صفر جهد.",
    steps: [
      {
        n: "٠١",
        title: "ربط واتساب الأعمال",
        body: "امسح رمز QR. سنيلون يتصل برقم واتساب الأعمال الخاص بك — ليس رقمنا. علامتك التجارية تبقى لك.",
      },
      {
        n: "٠٢",
        title: "الطلبيات تصل",
        body: "من يوكان، شوبيفاي، رسائل إنستغرام المباشرة، أو الإدخال اليدوي — سنيلون يرى كل طلبية في لوحة تحكم واحدة.",
      },
      {
        n: "٠٣",
        title: "الذكاء الاصطناعي يؤكد عنك",
        body: "سنيلون يراسل عميلك، يجمع موقعه GPS، يفحص درجة المخاطرة، وينبهك من الطلبيات المشبوهة — تلقائياً.",
      },
    ],
    compare_eyebrow: "العرض",
    compare_title: "ما تضمنه اليوم.",
    col_founding: "مؤسس",
    col_standard: "عادي",
    rows: [
      ["العمولة لكل طلبية مؤكدة", "1٪", "2٪"],
      ["متاح لـ", "100 أول فقط", "الجميع"],
      ["العمولة مثبتة", "للأبد", "قد تتغير"],
      ["الحد الأدنى للانضمام", "100 درهم", "100 درهم"],
    ],
    final_title: (n) => `${n} مكاناً متبقياً.`,
    final_sub:
      "بمجرد امتلائها، يختفي هذا العرض. العمولة المؤسسة مثبتة للأبد للمتاجر التي تنضم الآن.",
    final_btn: "احجز مكاني كعضو مؤسس",
    footer:
      "سنيلون في مرحلة ما قبل الإطلاق في المغرب. رصيدك محجوز بالكامل ويُطبق على طلبياتك الأولى المؤكدة. بدون اشتراكات. بدون مفاجآت.",
  },
};
