export type Lang = "en" | "fr" | "ar";

export type Step = { n: string; title: string; body: string };
export type Row = [string, string, string];
export type Faq = { q: string; a: string };

export type Translations = {
  dir: "ltr" | "rtl";
  lang: Lang;

  // Nav
  nav_how: string;
  nav_offer: string;
  nav_faq: string;
  nav_signin: string;
  nav_cta: string;

  // Hero
  hero_eyebrow_place: string;
  hero_eyebrow_year: string;
  hero_h1: string;
  hero_lede: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  hero_meta: string[];

  // Counter
  counter_label: string;
  counter_stamp: string;
  counter_of: string;
  counter_sub: string;
  counter_rate_text: string;

  // How it works
  how_eyebrow: string;
  how_title: string;
  how_note: string;
  steps: Step[];

  // Compare
  compare_eyebrow: string;
  compare_title: string;
  compare_note: string;
  col_founding: string;
  col_standard: string;
  rows: Row[];

  // FAQ
  faq_eyebrow: string;
  faq_title: string;
  faq_note: string;
  faq_items: Faq[];

  // Final CTA
  final_title: (spotsLeft: number) => string;
  final_sub: string;
  final_btn: string;

  // Footer
  footer_text: string;
  footer_year: string;

  // Auth
  auth_signin_title: string;
  auth_signin_sub: string;
  auth_signin_side_h2: string;
  auth_signin_side_p: string;
  auth_email_label: string;
  auth_email_placeholder: string;
  auth_btn_send: string;
  auth_btn_sending: string;
  auth_btn_verify: string;
  auth_btn_verifying: string;
  auth_code_label: string;
  auth_code_sent: (email: string) => string;
  auth_resend: string;
  auth_err_generic: string;
  auth_err_invalid_code: string;
  auth_back: string;

  // Thanks
  thanks_stamp: string;
  thanks_h1: string;
  thanks_p_found: (spot: number) => string;
  thanks_p_pending: string;
  thanks_row_order: string;
  thanks_row_amount: string;
  thanks_row_spot: string;
  thanks_row_rate: string;
  thanks_btn_account: string;
  thanks_btn_home: string;

  // Dashboard
  dash_nav_overview: string;
  dash_nav_orders: string;
  dash_nav_whatsapp: string;
  dash_nav_risk: string;
  dash_nav_team: string;
  dash_nav_settings: string;
  dash_nav_signout: string;
  dash_soon: string;
  dash_greeting: (email: string) => string;
  dash_sub_founding: string;
  dash_sub_pending: string;
  dash_status_founding: string;
  dash_status_pending: string;
  dash_status_no_payment: string;
  dash_balance: string;
  dash_commission: string;
  dash_spot: string;
  dash_mad: string;
  dash_forever: string;
  dash_claim_cta: string;
  dash_tiles_title: string;
  dash_tile_wa_title: string;
  dash_tile_wa_body: string;
  dash_tile_orders_title: string;
  dash_tile_orders_body: string;
  dash_tile_risk_title: string;
  dash_tile_risk_body: string;
  dash_tile_team_title: string;
  dash_tile_team_body: string;
  dash_tile_settings_title: string;
  dash_tile_settings_body: string;
  dash_tile_reports_title: string;
  dash_tile_reports_body: string;
};

export const T: Record<Lang, Translations> = {
  en: {
    dir: "ltr",
    lang: "en",

    nav_how: "How it works",
    nav_offer: "The offer",
    nav_faq: "FAQ",
    nav_signin: "Sign in",
    nav_cta: "Join as founder",

    hero_eyebrow_place: "Morocco",
    hero_eyebrow_year: "Vol. 01 · 2026",
    hero_h1: "Your COD orders,<br/><em>confirmed</em> before they ship.",
    hero_lede:
      "Snailon is an AI agent on your own WhatsApp Business number. It calls every customer, verifies the order, captures a GPS pin, and flags the refusals before they cost you.",
    hero_cta_primary: "Claim a founding spot",
    hero_cta_secondary: "How it works",
    hero_meta: [
      "Your WhatsApp number",
      "Arabic · French · Darija",
      "No subscription",
    ],

    counter_label: "Founding spots remaining",
    counter_stamp: "Limited · First 100",
    counter_of: "of 100",
    counter_sub: "Once filled, founders keep their rate. Everyone else pays standard.",
    counter_rate_text: "commission — locked forever",

    how_eyebrow: "How it works",
    how_title: "Three moves. Everything else is Snailon's job.",
    how_note:
      "Built to run silently behind the WhatsApp number your customers already trust.",
    steps: [
      {
        n: "01",
        title: "Connect your WhatsApp",
        body: "Scan a QR code from your own WhatsApp Business — the same number your customers already know. Snailon never routes through ours.",
      },
      {
        n: "02",
        title: "Orders flow in",
        body: "From Youcan, Shopify, Instagram DMs, or typed in by hand. Snailon sees every order the moment it appears.",
      },
      {
        n: "03",
        title: "The agent confirms",
        body: "It messages the customer in their language, collects a GPS pin, runs a cross-store risk check, and flags anything worth your attention.",
      },
    ],

    compare_eyebrow: "The offer",
    compare_title: "What <em>founders</em> lock in today.",
    compare_note:
      "The first 100 merchants keep this rate for life. After that, rates move to standard and never return.",
    col_founding: "Founding",
    col_standard: "Standard",
    rows: [
      ["Commission per confirmed order", "1%", "2%"],
      ["Available to", "First 100", "Everyone"],
      ["Rate locked", "Forever", "May change"],
      ["Top-up minimum", "100 MAD", "100 MAD"],
    ],

    faq_eyebrow: "Questions",
    faq_title: "The short version.",
    faq_note: "Everything founders ask before signing up.",
    faq_items: [
      {
        q: "Do I need a new WhatsApp number?",
        a: "No. Snailon connects to your existing WhatsApp Business number. Your customers see the brand they already trust — nothing routed through us.",
      },
      {
        q: "What languages does the AI speak?",
        a: "Moroccan Darija, Standard Arabic, French, and English. The agent detects the customer's language from their first reply and continues in it.",
      },
      {
        q: "How does the 100 MAD balance work?",
        a: "You top up 100 MAD (≈ $10) when you join. For each confirmed order, we deduct your commission — 1% for founding members. You're paying for work done, not a subscription.",
      },
      {
        q: "What happens after 100 founding spots fill?",
        a: "The founding rate closes forever. New merchants pay 2% per confirmed order. Founders keep 1% for life — no grandfather clause you can lose.",
      },
      {
        q: "When does the product launch?",
        a: "Snailon is in private beta with first merchants. Founding members get early access as features roll out: WhatsApp connect, then orders, then cross-store risk scoring.",
      },
      {
        q: "What if I want a refund?",
        a: "Your 100 MAD balance stays yours. If you change your mind before using any of it, we'll refund in full. Write to us from the same email you signed up with.",
      },
    ],

    final_title: (n) => `${n} ${n === 1 ? "spot" : "spots"} remain.`,
    final_sub:
      "When the hundredth spot is taken, founding rates close. The merchants inside keep 1% for life.",
    final_btn: "Claim my founding spot",

    footer_text:
      "Snailon is in private beta. Your balance is fully reserved and applied to confirmed orders. No subscriptions.",
    footer_year: "Snailon · 2026 · Tanger",

    auth_signin_title: "Sign in",
    auth_signin_sub: "Enter your email — we'll send a 6-digit code.",
    auth_signin_side_h2: "Your WhatsApp.<br/><em>Your customers.</em><br/>Our AI.",
    auth_signin_side_p:
      "The number your customers already trust, answered by an agent that never sleeps.",
    auth_email_label: "Email",
    auth_email_placeholder: "you@merchant.ma",
    auth_btn_send: "Send code →",
    auth_btn_sending: "Sending…",
    auth_btn_verify: "Verify & continue →",
    auth_btn_verifying: "Verifying…",
    auth_code_label: "Six-digit code",
    auth_code_sent: (email) => `We sent a code to ${email}.`,
    auth_resend: "Use a different email",
    auth_err_generic: "Something went wrong. Try again.",
    auth_err_invalid_code: "That code didn't work. Double-check and try again.",
    auth_back: "← Back to home",

    thanks_stamp: "Payment received · founding member",
    thanks_h1: "Welcome <em>to the founding 100</em>.",
    thanks_p_found: (spot) =>
      `You're founding member #${spot}. Your balance is reserved and your 1% rate is locked for life.`,
    thanks_p_pending:
      "Your payment is being processed. This usually takes under a minute — your spot will be reserved the moment Whop confirms.",
    thanks_row_order: "Order",
    thanks_row_amount: "Balance",
    thanks_row_spot: "Spot",
    thanks_row_rate: "Commission rate",
    thanks_btn_account: "Create my account",
    thanks_btn_home: "Back to home",

    dash_nav_overview: "Overview",
    dash_nav_orders: "Orders",
    dash_nav_whatsapp: "WhatsApp",
    dash_nav_risk: "Risk",
    dash_nav_team: "Team",
    dash_nav_settings: "Settings",
    dash_nav_signout: "Sign out",
    dash_soon: "Soon",
    dash_greeting: (email) => `${email}`,
    dash_sub_founding: "Founding member · you're one of the first 100.",
    dash_sub_pending: "Welcome. Claim your founding spot to unlock 1% forever.",
    dash_status_founding: "Founding member",
    dash_status_pending: "No founding spot yet",
    dash_status_no_payment: "No payment on file",
    dash_balance: "Balance",
    dash_commission: "Commission rate",
    dash_spot: "Spot number",
    dash_mad: "MAD",
    dash_forever: "locked forever",
    dash_claim_cta: "Claim your founding spot →",
    dash_tiles_title: "Coming next",
    dash_tile_wa_title: "Connect WhatsApp",
    dash_tile_wa_body: "Scan a QR from your WhatsApp Business. Once connected, Snailon sees every new conversation in real time.",
    dash_tile_orders_title: "Orders",
    dash_tile_orders_body: "Every order from every source, in one feed — Youcan, Shopify, Instagram, manual. Confirmed, pending, and flagged.",
    dash_tile_risk_title: "Cross-store risk",
    dash_tile_risk_body: "A shared signal: which numbers have refused orders from other Snailon merchants. Hashed phones, never raw.",
    dash_tile_team_title: "Team",
    dash_tile_team_body: "Invite your confirmations team. Role-based access, shared activity, no password sharing.",
    dash_tile_settings_title: "Settings",
    dash_tile_settings_body: "Your top-up balance, invoices, language preferences, and data exports — all in one place.",
    dash_tile_reports_title: "Reports",
    dash_tile_reports_body: "Weekly digests: refusal rate by region, confirmation speed, top refund reasons.",
  },

  fr: {
    dir: "ltr",
    lang: "fr",

    nav_how: "Comment ça marche",
    nav_offer: "L'offre",
    nav_faq: "FAQ",
    nav_signin: "Connexion",
    nav_cta: "Rejoindre",

    hero_eyebrow_place: "Maroc",
    hero_eyebrow_year: "Vol. 01 · 2026",
    hero_h1: "Vos commandes COD,<br/><em>confirmées</em> avant l'expédition.",
    hero_lede:
      "Snailon est un agent IA sur votre propre numéro WhatsApp Business. Il appelle chaque client, vérifie la commande, capte un pin GPS et repère les refus avant qu'ils vous coûtent.",
    hero_cta_primary: "Réserver une place fondatrice",
    hero_cta_secondary: "Comment ça marche",
    hero_meta: [
      "Votre numéro WhatsApp",
      "Arabe · Français · Darija",
      "Sans abonnement",
    ],

    counter_label: "Places fondatrices restantes",
    counter_stamp: "Limité · Les 100 premiers",
    counter_of: "sur 100",
    counter_sub: "Une fois complet, les fondateurs gardent leur taux. Les autres passent au standard.",
    counter_rate_text: "de commission — verrouillée à vie",

    how_eyebrow: "Comment ça marche",
    how_title: "Trois gestes. Snailon fait le reste.",
    how_note:
      "Conçu pour fonctionner en coulisse derrière le numéro WhatsApp que vos clients connaissent déjà.",
    steps: [
      {
        n: "01",
        title: "Connectez votre WhatsApp",
        body: "Scannez un QR code depuis votre WhatsApp Business — le même numéro que vos clients connaissent. Snailon ne passe jamais par le nôtre.",
      },
      {
        n: "02",
        title: "Les commandes arrivent",
        body: "Depuis Youcan, Shopify, DMs Instagram, ou saisie manuelle. Snailon voit chaque commande dès qu'elle apparaît.",
      },
      {
        n: "03",
        title: "L'agent confirme",
        body: "Il contacte le client dans sa langue, récupère un pin GPS, effectue une vérification inter-boutiques et signale ce qui mérite votre attention.",
      },
    ],

    compare_eyebrow: "L'offre",
    compare_title: "Ce que les <em>fondateurs</em> verrouillent aujourd'hui.",
    compare_note:
      "Les 100 premiers marchands gardent ce taux à vie. Après, les taux passent au standard et ne reviennent jamais.",
    col_founding: "Fondateur",
    col_standard: "Standard",
    rows: [
      ["Commission par commande confirmée", "1%", "2%"],
      ["Disponible pour", "100 premiers", "Tout le monde"],
      ["Taux verrouillé", "Pour toujours", "Peut changer"],
      ["Recharge minimum", "100 MAD", "100 MAD"],
    ],

    faq_eyebrow: "Questions",
    faq_title: "La version courte.",
    faq_note: "Tout ce que les fondateurs demandent avant de s'inscrire.",
    faq_items: [
      {
        q: "Dois-je utiliser un nouveau numéro WhatsApp ?",
        a: "Non. Snailon se connecte à votre numéro WhatsApp Business existant. Vos clients voient la marque qu'ils connaissent — rien ne passe par nous.",
      },
      {
        q: "Quelles langues parle l'IA ?",
        a: "Darija marocaine, arabe standard, français et anglais. L'agent détecte la langue du client dès sa première réponse et continue dans celle-ci.",
      },
      {
        q: "Comment fonctionne le solde de 100 MAD ?",
        a: "Vous rechargez 100 MAD (≈ 10 $) en rejoignant. Pour chaque commande confirmée, nous déduisons votre commission — 1 % pour les fondateurs. Vous payez un travail réel, pas un abonnement.",
      },
      {
        q: "Que se passe-t-il quand les 100 places sont pleines ?",
        a: "Le tarif fondateur se ferme à vie. Les nouveaux marchands paient 2 % par commande confirmée. Les fondateurs gardent 1 % — aucune clause que vous pouvez perdre.",
      },
      {
        q: "Quand le produit est-il lancé ?",
        a: "Snailon est en bêta privée avec les premiers marchands. Les fondateurs accèdent aux fonctionnalités au fur et à mesure : WhatsApp, puis commandes, puis scoring de risque inter-boutiques.",
      },
      {
        q: "Et si je veux un remboursement ?",
        a: "Votre solde de 100 MAD vous appartient. Si vous changez d'avis avant d'en utiliser une partie, nous remboursons intégralement. Écrivez-nous depuis l'email d'inscription.",
      },
    ],

    final_title: (n) => `${n} ${n === 1 ? "place restante" : "places restantes"}.`,
    final_sub:
      "Quand la centième place sera prise, le tarif fondateur se ferme. Les marchands à l'intérieur gardent 1 % à vie.",
    final_btn: "Réserver ma place fondatrice",

    footer_text:
      "Snailon est en bêta privée. Votre solde est entièrement réservé et appliqué aux commandes confirmées. Sans abonnement.",
    footer_year: "Snailon · 2026 · Tanger",

    auth_signin_title: "Connexion",
    auth_signin_sub: "Entrez votre email — nous envoyons un code à 6 chiffres.",
    auth_signin_side_h2: "Votre WhatsApp.<br/><em>Vos clients.</em><br/>Notre IA.",
    auth_signin_side_p:
      "Le numéro que vos clients connaissent déjà, répondu par un agent qui ne dort jamais.",
    auth_email_label: "Email",
    auth_email_placeholder: "vous@marchand.ma",
    auth_btn_send: "Envoyer le code →",
    auth_btn_sending: "Envoi…",
    auth_btn_verify: "Vérifier et continuer →",
    auth_btn_verifying: "Vérification…",
    auth_code_label: "Code à six chiffres",
    auth_code_sent: (email) => `Nous avons envoyé un code à ${email}.`,
    auth_resend: "Utiliser un autre email",
    auth_err_generic: "Une erreur s'est produite. Réessayez.",
    auth_err_invalid_code: "Code invalide. Vérifiez et réessayez.",
    auth_back: "← Retour à l'accueil",

    thanks_stamp: "Paiement reçu · membre fondateur",
    thanks_h1: "Bienvenue <em>parmi les 100 fondateurs</em>.",
    thanks_p_found: (spot) =>
      `Vous êtes le membre fondateur n°${spot}. Votre solde est réservé et votre taux de 1 % est verrouillé à vie.`,
    thanks_p_pending:
      "Votre paiement est en cours de traitement. Généralement moins d'une minute — votre place sera réservée dès que Whop confirme.",
    thanks_row_order: "Commande",
    thanks_row_amount: "Solde",
    thanks_row_spot: "Place",
    thanks_row_rate: "Taux de commission",
    thanks_btn_account: "Créer mon compte",
    thanks_btn_home: "Retour à l'accueil",

    dash_nav_overview: "Aperçu",
    dash_nav_orders: "Commandes",
    dash_nav_whatsapp: "WhatsApp",
    dash_nav_risk: "Risque",
    dash_nav_team: "Équipe",
    dash_nav_settings: "Paramètres",
    dash_nav_signout: "Déconnexion",
    dash_soon: "Bientôt",
    dash_greeting: (email) => `${email}`,
    dash_sub_founding: "Membre fondateur · vous faites partie des 100 premiers.",
    dash_sub_pending: "Bienvenue. Réservez votre place pour débloquer le 1 % à vie.",
    dash_status_founding: "Membre fondateur",
    dash_status_pending: "Pas encore de place",
    dash_status_no_payment: "Aucun paiement",
    dash_balance: "Solde",
    dash_commission: "Taux de commission",
    dash_spot: "Numéro de place",
    dash_mad: "MAD",
    dash_forever: "verrouillé à vie",
    dash_claim_cta: "Réserver ma place →",
    dash_tiles_title: "À venir",
    dash_tile_wa_title: "Connecter WhatsApp",
    dash_tile_wa_body: "Scannez un QR depuis votre WhatsApp Business. Une fois connecté, Snailon voit chaque nouvelle conversation en temps réel.",
    dash_tile_orders_title: "Commandes",
    dash_tile_orders_body: "Toutes les commandes de toutes les sources, en un fil — Youcan, Shopify, Instagram, manuel. Confirmées, en attente, signalées.",
    dash_tile_risk_title: "Risque inter-boutiques",
    dash_tile_risk_body: "Un signal partagé : quels numéros ont refusé des commandes chez d'autres marchands Snailon. Téléphones hachés, jamais bruts.",
    dash_tile_team_title: "Équipe",
    dash_tile_team_body: "Invitez votre équipe de confirmations. Accès par rôle, activité partagée, aucun partage de mot de passe.",
    dash_tile_settings_title: "Paramètres",
    dash_tile_settings_body: "Votre solde, factures, préférences de langue et exports — tout au même endroit.",
    dash_tile_reports_title: "Rapports",
    dash_tile_reports_body: "Bilans hebdomadaires : taux de refus par région, vitesse de confirmation, principales raisons de remboursement.",
  },

  ar: {
    dir: "rtl",
    lang: "ar",

    nav_how: "كيف يعمل",
    nav_offer: "العرض",
    nav_faq: "أسئلة",
    nav_signin: "تسجيل الدخول",
    nav_cta: "انضم كمؤسس",

    hero_eyebrow_place: "المغرب",
    hero_eyebrow_year: "العدد ٠١ · ٢٠٢٦",
    hero_h1: "طلبياتك بالدفع عند الاستلام،<br/><em>مؤكدة</em> قبل الشحن.",
    hero_lede:
      "سنيلون وكيل ذكاء اصطناعي على رقم واتساب الأعمال الخاص بك. يتصل بكل عميل، يتحقق من الطلبية، يلتقط موقع GPS، ويرصد الرفض قبل أن يكلفك.",
    hero_cta_primary: "احجز مكاناً مؤسساً",
    hero_cta_secondary: "كيف يعمل",
    hero_meta: [
      "رقم واتساب الخاص بك",
      "عربية · فرنسية · دارجة",
      "بدون اشتراك",
    ],

    counter_label: "الأماكن المؤسسة المتبقية",
    counter_stamp: "محدود · أول ١٠٠",
    counter_of: "من ١٠٠",
    counter_sub: "عند الامتلاء، يحتفظ المؤسسون بأسعارهم. البقية يدفعون السعر العادي.",
    counter_rate_text: "عمولة — مثبتة للأبد",

    how_eyebrow: "كيف يعمل",
    how_title: "ثلاث خطوات. الباقي من عمل سنيلون.",
    how_note:
      "مصمم للعمل بصمت خلف رقم واتساب الذي يثق به عملاؤك أصلاً.",
    steps: [
      {
        n: "٠١",
        title: "اربط واتسابك",
        body: "امسح رمز QR من واتساب الأعمال الخاص بك — نفس الرقم الذي يعرفه عملاؤك. سنيلون لا يمر عبر رقمنا أبداً.",
      },
      {
        n: "٠٢",
        title: "الطلبيات تصل",
        body: "من يوكان، شوبيفاي، رسائل إنستغرام، أو إدخال يدوي. سنيلون يرى كل طلبية لحظة ظهورها.",
      },
      {
        n: "٠٣",
        title: "الوكيل يؤكد",
        body: "يراسل العميل بلغته، يجمع موقع GPS، يجري فحص مخاطرة بين المتاجر، ويرفع إليك ما يستحق الانتباه.",
      },
    ],

    compare_eyebrow: "العرض",
    compare_title: "ما يضمنه <em>المؤسسون</em> اليوم.",
    compare_note:
      "أول ١٠٠ متجر يحتفظون بهذا السعر مدى الحياة. بعدها تعود الأسعار إلى العادية ولا ترجع.",
    col_founding: "مؤسس",
    col_standard: "عادي",
    rows: [
      ["العمولة لكل طلبية مؤكدة", "١٪", "٢٪"],
      ["متاح لـ", "أول ١٠٠", "الجميع"],
      ["السعر مثبت", "للأبد", "قد يتغير"],
      ["الحد الأدنى للشحن", "١٠٠ درهم", "١٠٠ درهم"],
    ],

    faq_eyebrow: "أسئلة",
    faq_title: "النسخة القصيرة.",
    faq_note: "كل ما يسأله المؤسسون قبل التسجيل.",
    faq_items: [
      {
        q: "هل أحتاج رقم واتساب جديد؟",
        a: "لا. سنيلون يتصل برقم واتساب الأعمال الحالي. عملاؤك يرون العلامة التي يعرفونها — لا شيء يمر عبرنا.",
      },
      {
        q: "ما اللغات التي يتحدثها الذكاء الاصطناعي؟",
        a: "الدارجة المغربية، العربية الفصحى، الفرنسية والإنجليزية. الوكيل يكتشف لغة العميل من أول رد ويواصل بها.",
      },
      {
        q: "كيف يعمل رصيد ١٠٠ درهم؟",
        a: "تشحن ١٠٠ درهم (≈ ١٠ دولار) عند الانضمام. لكل طلبية مؤكدة نخصم عمولتك — ١٪ للمؤسسين. تدفع مقابل عمل منجز، لا اشتراك.",
      },
      {
        q: "ماذا يحدث بعد امتلاء ١٠٠ مكان؟",
        a: "سعر المؤسسين يُغلق للأبد. المتاجر الجديدة تدفع ٢٪ لكل طلبية مؤكدة. المؤسسون يحتفظون بـ ١٪ — بلا شروط يمكن خسارتها.",
      },
      {
        q: "متى يُطلق المنتج؟",
        a: "سنيلون في نسخة تجريبية خاصة مع أول المتاجر. المؤسسون يحصلون على الميزات تدريجياً: الواتساب أولاً، ثم الطلبيات، ثم تقييم المخاطر بين المتاجر.",
      },
      {
        q: "ماذا لو أردت استرداد المال؟",
        a: "رصيد ١٠٠ درهم يبقى لك. إن غيّرت رأيك قبل استخدامه، نُعيده كاملاً. راسلنا من نفس البريد الذي سجلت به.",
      },
    ],

    final_title: (n) => `${n} مكاناً متبقياً.`,
    final_sub:
      "حين يُحجز المكان المئة، يُغلق سعر المؤسسين. من بالداخل يحتفظون بـ ١٪ للأبد.",
    final_btn: "احجز مكاني المؤسس",

    footer_text:
      "سنيلون في نسخة تجريبية خاصة. رصيدك محجوز بالكامل ويُطبق على الطلبيات المؤكدة. بدون اشتراكات.",
    footer_year: "سنيلون · ٢٠٢٦ · طنجة",

    auth_signin_title: "تسجيل الدخول",
    auth_signin_sub: "أدخل بريدك — نُرسل رمزاً من ٦ أرقام.",
    auth_signin_side_h2: "واتسابك.<br/><em>عملاؤك.</em><br/>ذكاؤنا الاصطناعي.",
    auth_signin_side_p:
      "الرقم الذي يثق به عملاؤك، يرد عليه وكيل لا ينام.",
    auth_email_label: "البريد الإلكتروني",
    auth_email_placeholder: "you@merchant.ma",
    auth_btn_send: "أرسل الرمز →",
    auth_btn_sending: "إرسال…",
    auth_btn_verify: "تحقق وتابع →",
    auth_btn_verifying: "تحقق…",
    auth_code_label: "الرمز (٦ أرقام)",
    auth_code_sent: (email) => `أرسلنا رمزاً إلى ${email}.`,
    auth_resend: "استخدم بريداً آخر",
    auth_err_generic: "حدث خطأ. حاول مجدداً.",
    auth_err_invalid_code: "الرمز غير صحيح. تحقق وأعد المحاولة.",
    auth_back: "← العودة إلى الرئيسية",

    thanks_stamp: "تم استلام الدفع · عضو مؤسس",
    thanks_h1: "أهلاً <em>بين المؤسسين الـ ١٠٠</em>.",
    thanks_p_found: (spot) =>
      `أنت العضو المؤسس رقم ${spot}. رصيدك محجوز وسعر ١٪ مثبت لك للأبد.`,
    thanks_p_pending:
      "دفعتك قيد المعالجة. عادة أقل من دقيقة — سيُحجز مكانك لحظة تأكيد Whop.",
    thanks_row_order: "الطلب",
    thanks_row_amount: "الرصيد",
    thanks_row_spot: "المكان",
    thanks_row_rate: "نسبة العمولة",
    thanks_btn_account: "أنشئ حسابي",
    thanks_btn_home: "إلى الرئيسية",

    dash_nav_overview: "نظرة عامة",
    dash_nav_orders: "الطلبيات",
    dash_nav_whatsapp: "واتساب",
    dash_nav_risk: "المخاطر",
    dash_nav_team: "الفريق",
    dash_nav_settings: "الإعدادات",
    dash_nav_signout: "تسجيل الخروج",
    dash_soon: "قريباً",
    dash_greeting: (email) => `${email}`,
    dash_sub_founding: "عضو مؤسس · أنت من أول ١٠٠.",
    dash_sub_pending: "أهلاً. احجز مكانك لتفتح ١٪ للأبد.",
    dash_status_founding: "عضو مؤسس",
    dash_status_pending: "لا يوجد مكان بعد",
    dash_status_no_payment: "لا دفع مُسجل",
    dash_balance: "الرصيد",
    dash_commission: "نسبة العمولة",
    dash_spot: "رقم المكان",
    dash_mad: "درهم",
    dash_forever: "مثبت للأبد",
    dash_claim_cta: "احجز مكانك →",
    dash_tiles_title: "قادم",
    dash_tile_wa_title: "اربط واتساب",
    dash_tile_wa_body: "امسح رمز QR من واتساب الأعمال. بعد الربط يرى سنيلون كل محادثة جديدة مباشرة.",
    dash_tile_orders_title: "الطلبيات",
    dash_tile_orders_body: "كل طلبية من كل مصدر في مكان واحد — يوكان، شوبيفاي، إنستغرام، يدوي. مؤكدة، معلقة، ومُعلّمة.",
    dash_tile_risk_title: "مخاطر بين المتاجر",
    dash_tile_risk_body: "إشارة مشتركة: أي أرقام رفضت طلبيات عند متاجر سنيلون أخرى. أرقام مُشفرة، ليست خاماً.",
    dash_tile_team_title: "الفريق",
    dash_tile_team_body: "ادعُ فريق التأكيدات. صلاحيات حسب الدور، نشاط مشترك، بدون مشاركة كلمات المرور.",
    dash_tile_settings_title: "الإعدادات",
    dash_tile_settings_body: "رصيدك، الفواتير، تفضيلات اللغة والتصدير — كلها في مكان واحد.",
    dash_tile_reports_title: "التقارير",
    dash_tile_reports_body: "ملخصات أسبوعية: نسبة الرفض حسب المنطقة، سرعة التأكيد، أهم أسباب الاسترداد.",
  },
};
