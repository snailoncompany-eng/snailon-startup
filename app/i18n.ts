export type Lang = "en" | "fr" | "ar";

export type Step = { n: string; title: string; body: string };
export type Row = [string, string, string];

export type Translations = {
  dir: "ltr" | "rtl";
  lang: Lang;

  // Nav
  nav_how: string;
  nav_signin: string;
  nav_cta: string;

  // Hero
  hero_h1: string;
  hero_lede: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;

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

  // Final statement
  final_tagline: string;
  final_h2: string;
  final_btn: string;
  final_contact_support: string;
  final_contact_location: string;
  final_contact_year: string;

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
  auth_btn_google: string;
  auth_code_label: string;
  auth_code_sent: (email: string) => string;
  auth_resend: string;
  auth_divider: string;
  auth_err_generic: string;
  auth_err_invalid_code: string;
  auth_back: string;

  // Dashboard
  dash_nav_overview: string;
  dash_nav_balance: string;
  dash_nav_orders: string;
  dash_nav_whatsapp: string;
  dash_nav_risk: string;
  dash_nav_team: string;
  dash_nav_settings: string;
  dash_nav_signout: string;
  dash_nav_support: string;
  dash_soon: string;
  dash_greeting: (email: string) => string;
  dash_sub_founding: string;
  dash_sub_pending: string;
  dash_status_founding: string;
  dash_status_pending: string;
  dash_balance: string;
  dash_commission: string;
  dash_spot: string;
  dash_mad: string;
  dash_forever: string;
  dash_claim_cta: string;
  dash_claim_note: string;
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

  // Balance / checkout page
  bal_crumb_back: string;
  bal_h1: string;
  bal_price_label: string;
  bal_spec_commission: string;
  bal_spec_balance: string;
  bal_spec_spot: string;
  bal_spec_lock: string;
  bal_spec_available: string;
  bal_spec_forever: string;
  bal_spec_first_100: string;
  bal_trust_1k: string;
  bal_trust_1v: string;
  bal_trust_2k: string;
  bal_trust_2v: string;
  bal_trust_3k: string;
  bal_trust_3v: string;
  bal_email_lock: string;
  bal_btn_pay: string;
  bal_btn_paying: string;
  bal_micro: string;
  bal_success_h: string;
  bal_success_p: (spot: number) => string;
  bal_success_cta: string;
};

export const T: Record<Lang, Translations> = {
  en: {
    dir: "ltr",
    lang: "en",

    nav_how: "How it works",
    nav_signin: "Sign in",
    nav_cta: "Get started",

    hero_h1: "Your COD orders,<br/><em>confirmed</em> before they ship.",
    hero_lede:
      "Snailon is an AI agent on your own WhatsApp Business number. It calls every customer, verifies the order, captures a GPS pin, and flags the refusals before they cost you.",
    hero_cta_primary: "Get started",
    hero_cta_secondary: "How it works",

    counter_label: "Founding spots remaining",
    counter_stamp: "Limited · First 100",
    counter_of: "of 100",
    counter_sub:
      "Once filled, founders keep their rate. Everyone else pays standard.",
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

    final_tagline: "Snailon · Commerce infrastructure",
    final_h2:
      "Built for the merchants who move the <em>real world</em>.",
    final_btn: "Create your account",
    final_contact_support: "support@snailon.com",
    final_contact_location: "Tanger · Morocco",
    final_contact_year: "© 2026 Snailon",

    auth_signin_title: "Create your account",
    auth_signin_sub: "No payment yet. You'll see your dashboard first.",
    auth_signin_side_h2:
      "Your WhatsApp.<br/><em>Your customers.</em><br/>Our AI.",
    auth_signin_side_p:
      "The number your customers already trust, answered by an agent that never sleeps.",
    auth_email_label: "Email",
    auth_email_placeholder: "you@merchant.ma",
    auth_btn_send: "Continue with email →",
    auth_btn_sending: "Sending…",
    auth_btn_verify: "Verify & continue →",
    auth_btn_verifying: "Verifying…",
    auth_btn_google: "Continue with Google",
    auth_code_label: "Six-digit code",
    auth_code_sent: (email) => `We sent a code to ${email}.`,
    auth_resend: "Use a different email",
    auth_divider: "or",
    auth_err_generic: "Something went wrong. Try again.",
    auth_err_invalid_code: "That code didn't work. Double-check and try again.",
    auth_back: "← Back to home",

    dash_nav_overview: "Overview",
    dash_nav_balance: "Balance",
    dash_nav_orders: "Orders",
    dash_nav_whatsapp: "WhatsApp",
    dash_nav_risk: "Risk",
    dash_nav_team: "Team",
    dash_nav_settings: "Settings",
    dash_nav_signout: "Sign out",
    dash_nav_support: "support@snailon.com",
    dash_soon: "Soon",
    dash_greeting: (email) => `${email}`,
    dash_sub_founding: "Founding member · you're one of the first 100.",
    dash_sub_pending: "Welcome. One step left to unlock your 1% rate forever.",
    dash_status_founding: "Founding member",
    dash_status_pending: "No founding spot yet",
    dash_balance: "Balance",
    dash_commission: "Commission rate",
    dash_spot: "Spot number",
    dash_mad: "MAD",
    dash_forever: "locked forever",
    dash_claim_cta: "Go to Balance →",
    dash_claim_note:
      "Top up 100 MAD. For each confirmed order we deduct your 1% commission — no subscription, no surprise.",
    dash_tiles_title: "Coming next",
    dash_tile_wa_title: "Connect WhatsApp",
    dash_tile_wa_body:
      "Scan a QR from your WhatsApp Business. Once connected, Snailon sees every new conversation in real time.",
    dash_tile_orders_title: "Orders",
    dash_tile_orders_body:
      "Every order from every source, in one feed — Youcan, Shopify, Instagram, manual. Confirmed, pending, and flagged.",
    dash_tile_risk_title: "Cross-store risk",
    dash_tile_risk_body:
      "A shared signal: which numbers have refused orders from other Snailon merchants. Hashed phones, never raw.",
    dash_tile_team_title: "Team",
    dash_tile_team_body:
      "Invite your confirmations team. Role-based access, shared activity, no password sharing.",
    dash_tile_settings_title: "Settings",
    dash_tile_settings_body:
      "Your top-up balance, invoices, language preferences, and data exports — all in one place.",
    dash_tile_reports_title: "Reports",
    dash_tile_reports_body:
      "Weekly digests: refusal rate by region, confirmation speed, top refund reasons.",

    bal_crumb_back: "← Back to dashboard",
    bal_h1:
      "Claim your <em>founding</em> spot.",
    bal_price_label: "one-time",
    bal_spec_commission: "Commission rate",
    bal_spec_balance: "Starting balance",
    bal_spec_spot: "Founding spot",
    bal_spec_lock: "Rate locked",
    bal_spec_available: "Availability",
    bal_spec_forever: "Forever",
    bal_spec_first_100: "First 100 merchants",
    bal_trust_1k: "Secure checkout",
    bal_trust_1v: "Processed by Whop · SSL end-to-end · No card on our servers.",
    bal_trust_2k: "Not a subscription",
    bal_trust_2v: "100 MAD sits as balance. Used only when Snailon confirms an order.",
    bal_trust_3k: "Refundable",
    bal_trust_3v: "Change your mind before using it? Email support@snailon.com.",
    bal_email_lock: "Billed to",
    bal_btn_pay: "Continue to secure payment →",
    bal_btn_paying: "Opening checkout…",
    bal_micro:
      "You'll return here automatically. Questions? support@snailon.com",
    bal_success_h: "You're in.",
    bal_success_p: (spot) =>
      `Welcome to the founding 100. You're spot #${spot}, locked at 1% forever.`,
    bal_success_cta: "Back to overview →",
  },

  fr: {
    dir: "ltr",
    lang: "fr",

    nav_how: "Comment ça marche",
    nav_signin: "Connexion",
    nav_cta: "Commencer",

    hero_h1: "Vos commandes COD,<br/><em>confirmées</em> avant l'expédition.",
    hero_lede:
      "Snailon est un agent IA sur votre propre numéro WhatsApp Business. Il appelle chaque client, vérifie la commande, capte un pin GPS et repère les refus avant qu'ils vous coûtent.",
    hero_cta_primary: "Commencer",
    hero_cta_secondary: "Comment ça marche",

    counter_label: "Places fondatrices restantes",
    counter_stamp: "Limité · Les 100 premiers",
    counter_of: "sur 100",
    counter_sub:
      "Une fois complet, les fondateurs gardent leur taux. Les autres passent au standard.",
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

    final_tagline: "Snailon · Infrastructure commerce",
    final_h2:
      "Conçu pour les marchands qui font bouger <em>le vrai monde</em>.",
    final_btn: "Créer mon compte",
    final_contact_support: "support@snailon.com",
    final_contact_location: "Tanger · Maroc",
    final_contact_year: "© 2026 Snailon",

    auth_signin_title: "Créez votre compte",
    auth_signin_sub:
      "Pas de paiement pour l'instant. Vous verrez votre tableau de bord d'abord.",
    auth_signin_side_h2: "Votre WhatsApp.<br/><em>Vos clients.</em><br/>Notre IA.",
    auth_signin_side_p:
      "Le numéro que vos clients connaissent déjà, répondu par un agent qui ne dort jamais.",
    auth_email_label: "Email",
    auth_email_placeholder: "vous@marchand.ma",
    auth_btn_send: "Continuer avec l'email →",
    auth_btn_sending: "Envoi…",
    auth_btn_verify: "Vérifier et continuer →",
    auth_btn_verifying: "Vérification…",
    auth_btn_google: "Continuer avec Google",
    auth_code_label: "Code à six chiffres",
    auth_code_sent: (email) => `Nous avons envoyé un code à ${email}.`,
    auth_resend: "Utiliser un autre email",
    auth_divider: "ou",
    auth_err_generic: "Une erreur s'est produite. Réessayez.",
    auth_err_invalid_code: "Code invalide. Vérifiez et réessayez.",
    auth_back: "← Retour à l'accueil",

    dash_nav_overview: "Aperçu",
    dash_nav_balance: "Solde",
    dash_nav_orders: "Commandes",
    dash_nav_whatsapp: "WhatsApp",
    dash_nav_risk: "Risque",
    dash_nav_team: "Équipe",
    dash_nav_settings: "Paramètres",
    dash_nav_signout: "Déconnexion",
    dash_nav_support: "support@snailon.com",
    dash_soon: "Bientôt",
    dash_greeting: (email) => `${email}`,
    dash_sub_founding: "Membre fondateur · vous faites partie des 100 premiers.",
    dash_sub_pending:
      "Bienvenue. Une étape pour débloquer votre taux de 1% à vie.",
    dash_status_founding: "Membre fondateur",
    dash_status_pending: "Pas encore de place",
    dash_balance: "Solde",
    dash_commission: "Taux de commission",
    dash_spot: "Numéro de place",
    dash_mad: "MAD",
    dash_forever: "verrouillé à vie",
    dash_claim_cta: "Aller au Solde →",
    dash_claim_note:
      "Rechargez 100 MAD. Pour chaque commande confirmée nous prélevons votre commission de 1 % — sans abonnement, sans surprise.",
    dash_tiles_title: "À venir",
    dash_tile_wa_title: "Connecter WhatsApp",
    dash_tile_wa_body:
      "Scannez un QR depuis votre WhatsApp Business. Une fois connecté, Snailon voit chaque nouvelle conversation en temps réel.",
    dash_tile_orders_title: "Commandes",
    dash_tile_orders_body:
      "Toutes les commandes de toutes les sources, en un fil — Youcan, Shopify, Instagram, manuel. Confirmées, en attente, signalées.",
    dash_tile_risk_title: "Risque inter-boutiques",
    dash_tile_risk_body:
      "Un signal partagé : quels numéros ont refusé des commandes chez d'autres marchands Snailon. Téléphones hachés, jamais bruts.",
    dash_tile_team_title: "Équipe",
    dash_tile_team_body:
      "Invitez votre équipe de confirmations. Accès par rôle, activité partagée, aucun partage de mot de passe.",
    dash_tile_settings_title: "Paramètres",
    dash_tile_settings_body:
      "Votre solde, factures, préférences de langue et exports — tout au même endroit.",
    dash_tile_reports_title: "Rapports",
    dash_tile_reports_body:
      "Bilans hebdomadaires : taux de refus par région, vitesse de confirmation, principales raisons de remboursement.",

    bal_crumb_back: "← Retour au tableau de bord",
    bal_h1: "Réservez votre place de <em>fondateur</em>.",
    bal_price_label: "paiement unique",
    bal_spec_commission: "Taux de commission",
    bal_spec_balance: "Solde de départ",
    bal_spec_spot: "Place de fondateur",
    bal_spec_lock: "Taux verrouillé",
    bal_spec_available: "Disponibilité",
    bal_spec_forever: "Pour toujours",
    bal_spec_first_100: "100 premiers marchands",
    bal_trust_1k: "Paiement sécurisé",
    bal_trust_1v:
      "Traité par Whop · SSL de bout en bout · Aucune carte sur nos serveurs.",
    bal_trust_2k: "Pas un abonnement",
    bal_trust_2v:
      "100 MAD en solde. Utilisé uniquement quand Snailon confirme une commande.",
    bal_trust_3k: "Remboursable",
    bal_trust_3v:
      "Vous changez d'avis avant utilisation ? Écrivez à support@snailon.com.",
    bal_email_lock: "Facturé à",
    bal_btn_pay: "Paiement sécurisé →",
    bal_btn_paying: "Ouverture du paiement…",
    bal_micro:
      "Vous reviendrez ici automatiquement. Des questions ? support@snailon.com",
    bal_success_h: "Vous êtes dedans.",
    bal_success_p: (spot) =>
      `Bienvenue parmi les 100 fondateurs. Vous êtes la place n°${spot}, verrouillée à 1 % pour toujours.`,
    bal_success_cta: "Retour à l'aperçu →",
  },

  ar: {
    dir: "rtl",
    lang: "ar",

    nav_how: "كيف يعمل",
    nav_signin: "تسجيل الدخول",
    nav_cta: "ابدأ",

    hero_h1: "طلبياتك بالدفع عند الاستلام،<br/><em>مؤكدة</em> قبل الشحن.",
    hero_lede:
      "سنيلون وكيل ذكاء اصطناعي على رقم واتساب الأعمال الخاص بك. يتصل بكل عميل، يتحقق من الطلبية، يلتقط موقع GPS، ويرصد الرفض قبل أن يكلفك.",
    hero_cta_primary: "ابدأ",
    hero_cta_secondary: "كيف يعمل",

    counter_label: "الأماكن المؤسسة المتبقية",
    counter_stamp: "محدود · أول ١٠٠",
    counter_of: "من ١٠٠",
    counter_sub:
      "عند الامتلاء، يحتفظ المؤسسون بأسعارهم. البقية يدفعون السعر العادي.",
    counter_rate_text: "عمولة — مثبتة للأبد",

    how_eyebrow: "كيف يعمل",
    how_title: "ثلاث خطوات. الباقي من عمل سنيلون.",
    how_note: "مصمم للعمل بصمت خلف رقم واتساب الذي يثق به عملاؤك أصلاً.",
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

    final_tagline: "سنيلون · بنية تحتية للتجارة",
    final_h2:
      "مصنوع للتجار الذين يحركون <em>العالم الحقيقي</em>.",
    final_btn: "أنشئ حسابك",
    final_contact_support: "support@snailon.com",
    final_contact_location: "طنجة · المغرب",
    final_contact_year: "© ٢٠٢٦ سنيلون",

    auth_signin_title: "أنشئ حسابك",
    auth_signin_sub: "لا دفع الآن. سترى لوحتك أولاً.",
    auth_signin_side_h2: "واتسابك.<br/><em>عملاؤك.</em><br/>ذكاؤنا الاصطناعي.",
    auth_signin_side_p: "الرقم الذي يثق به عملاؤك، يرد عليه وكيل لا ينام.",
    auth_email_label: "البريد الإلكتروني",
    auth_email_placeholder: "you@merchant.ma",
    auth_btn_send: "متابعة بالبريد →",
    auth_btn_sending: "إرسال…",
    auth_btn_verify: "تحقق وتابع →",
    auth_btn_verifying: "تحقق…",
    auth_btn_google: "المتابعة عبر جوجل",
    auth_code_label: "الرمز (٦ أرقام)",
    auth_code_sent: (email) => `أرسلنا رمزاً إلى ${email}.`,
    auth_resend: "استخدم بريداً آخر",
    auth_divider: "أو",
    auth_err_generic: "حدث خطأ. حاول مجدداً.",
    auth_err_invalid_code: "الرمز غير صحيح. تحقق وأعد المحاولة.",
    auth_back: "← العودة إلى الرئيسية",

    dash_nav_overview: "نظرة عامة",
    dash_nav_balance: "الرصيد",
    dash_nav_orders: "الطلبيات",
    dash_nav_whatsapp: "واتساب",
    dash_nav_risk: "المخاطر",
    dash_nav_team: "الفريق",
    dash_nav_settings: "الإعدادات",
    dash_nav_signout: "تسجيل الخروج",
    dash_nav_support: "support@snailon.com",
    dash_soon: "قريباً",
    dash_greeting: (email) => `${email}`,
    dash_sub_founding: "عضو مؤسس · أنت من أول ١٠٠.",
    dash_sub_pending: "أهلاً. خطوة واحدة لتفتح سعر ١٪ للأبد.",
    dash_status_founding: "عضو مؤسس",
    dash_status_pending: "لا يوجد مكان بعد",
    dash_balance: "الرصيد",
    dash_commission: "نسبة العمولة",
    dash_spot: "رقم المكان",
    dash_mad: "درهم",
    dash_forever: "مثبت للأبد",
    dash_claim_cta: "إلى الرصيد →",
    dash_claim_note:
      "اشحن ١٠٠ درهم. لكل طلبية مؤكدة نخصم عمولة ١٪ — بدون اشتراك، بدون مفاجآت.",
    dash_tiles_title: "قادم",
    dash_tile_wa_title: "اربط واتساب",
    dash_tile_wa_body:
      "امسح رمز QR من واتساب الأعمال. بعد الربط يرى سنيلون كل محادثة جديدة مباشرة.",
    dash_tile_orders_title: "الطلبيات",
    dash_tile_orders_body:
      "كل طلبية من كل مصدر في مكان واحد — يوكان، شوبيفاي، إنستغرام، يدوي. مؤكدة، معلقة، ومُعلّمة.",
    dash_tile_risk_title: "مخاطر بين المتاجر",
    dash_tile_risk_body:
      "إشارة مشتركة: أي أرقام رفضت طلبيات عند متاجر سنيلون أخرى. أرقام مُشفرة، ليست خاماً.",
    dash_tile_team_title: "الفريق",
    dash_tile_team_body:
      "ادعُ فريق التأكيدات. صلاحيات حسب الدور، نشاط مشترك، بدون مشاركة كلمات المرور.",
    dash_tile_settings_title: "الإعدادات",
    dash_tile_settings_body:
      "رصيدك، الفواتير، تفضيلات اللغة والتصدير — كلها في مكان واحد.",
    dash_tile_reports_title: "التقارير",
    dash_tile_reports_body:
      "ملخصات أسبوعية: نسبة الرفض حسب المنطقة، سرعة التأكيد، أهم أسباب الاسترداد.",

    bal_crumb_back: "← إلى لوحة التحكم",
    bal_h1: "احجز مكانك <em>المؤسس</em>.",
    bal_price_label: "دفعة واحدة",
    bal_spec_commission: "نسبة العمولة",
    bal_spec_balance: "رصيد البداية",
    bal_spec_spot: "مكان مؤسس",
    bal_spec_lock: "السعر مثبت",
    bal_spec_available: "التوفر",
    bal_spec_forever: "للأبد",
    bal_spec_first_100: "أول ١٠٠ تاجر",
    bal_trust_1k: "دفع آمن",
    bal_trust_1v: "عبر Whop · SSL كامل · لا بطاقة على خوادمنا.",
    bal_trust_2k: "ليس اشتراكاً",
    bal_trust_2v: "١٠٠ درهم كرصيد. تُستخدم فقط عند تأكيد طلبية.",
    bal_trust_3k: "قابل للاسترداد",
    bal_trust_3v: "غيّرت رأيك قبل الاستخدام؟ راسلنا على support@snailon.com.",
    bal_email_lock: "الفاتورة باسم",
    bal_btn_pay: "دفع آمن →",
    bal_btn_paying: "فتح الدفع…",
    bal_micro: "ستعود هنا تلقائياً. أسئلة؟ support@snailon.com",
    bal_success_h: "أنت داخل.",
    bal_success_p: (spot) =>
      `مرحباً في المؤسسين الـ ١٠٠. مكانك رقم ${spot}، مثبت على ١٪ للأبد.`,
    bal_success_cta: "إلى النظرة العامة →",
  },
};
