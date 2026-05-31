import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    products: 'المنتجات',
    about: 'من نحن',
    contact: 'اتصل بنا',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    profile: 'حسابي',
    favorites: 'المفضلة',
    admin: 'الإدارة',
    cart: 'السلة',

    // Hero
    heroTitle: 'VENESIA Medical Laser Company',
    heroSubtitle: 'نوفر أحدث الأجهزة والمعدات الطبية بأعلى معايير الجودة لخدمة القطاع الصحي',
    heroBtn1: 'تصفح المنتجات',
    heroBtn2: 'اعرف المزيد',

    // Services
    servicesTitle: 'خدماتنا',
    service1Title: 'أجهزة الليزر',
    service1Desc: 'أحدث أجهزة الليزر الطبية لعلاجات تجميل البشرة وإزالة الشعر والوشم',
    service2Title: 'نحت الجسم',
    service2Desc: 'أجهزة نحت وتشكيل الجسم المتطورة للحصول على نتائج مذهلة وآمنة',
    service3Title: 'العناية بالبشرة',
    service3Desc: 'تشكيلة واسعة من أجهزة ومستحضرات العناية بالبشرة للمراكز الطبية',
    service4Title: 'تجهيزات المراكز',
    service4Desc: 'نوفر كل ما يحتاجه المركز الطبي من أجهزة ومستلزمات بمعايير عالمية',

    // Stats
    statsTitle: 'أرقامنا تتحدث',
    stat1: 'عميل راضٍ',
    stat2: 'منتج طبي',
    stat3: 'سنة خبرة',
    stat4: 'دولة نخدمها',

    // Featured Products
    featuredTitle: 'منتجات مميزة',
    viewAll: 'عرض الكل',
    noProducts: 'لا توجد منتجات متاحة حالياً',

    // Why Us
    whyUsTitle: 'لماذا تختارنا؟',
    why1Title: 'جودة معتمدة',
    why1Desc: 'جميع منتجاتنا حاصلة على شهادات ISO والاعتمادات الدولية',
    why2Title: 'شراكات عالمية',
    why2Desc: 'نتعاون مع أبرز الشركات المصنعة للأجهزة الطبية في العالم',
    why3Title: 'توصيل سريع',
    why3Desc: 'نضمن توصيل المنتجات في الوقت المناسب لضمان استمرارية الرعاية',
    why4Title: 'دعم متواصل',
    why4Desc: 'فريق دعم فني متاح على مدار الساعة طوال أيام الأسبوع',

    // CTA
    ctaTitle: 'هل أنت مستعد للارتقاء بمستوى خدماتك الطبية؟',
    ctaDesc: 'تواصل معنا اليوم للحصول على استشارة مجانية واكتشف كيف يمكننا مساعدتك',
    ctaBtn: 'تواصل معنا',

    // About
    aboutTitle: 'من نحن',
    aboutMission: 'مهمتنا',
    aboutMissionText1: 'شركة VENESIA Medical Laser Company هي شركة رائدة في مجال أجهزة الليزر الطبي ونحت الجسم والعناية بالبشرة وتجهيزات المراكز الطبية في فلسطين والمنطقة.',
    aboutMissionText2: 'نلتزم بتوفير أحدث التقنيات الطبية بأعلى معايير الجودة لدعم القطاع الصحي وتمكين الكوادر الطبية من تقديم أفضل رعاية ممكنة.',
    ourValues: 'قيمنا',
    value1: 'الجودة',
    value1Desc: 'نلتزم بأعلى معايير الجودة في جميع منتجاتنا',
    value2: 'الموثوقية',
    value2Desc: 'شريك موثوق للمستشفيات والعيادات والمراكز الطبية',
    value3: 'الابتكار',
    value3Desc: 'نواكب أحدث التطورات في تكنولوجيا الأجهزة الطبية',
    value4: 'الشفافية',
    value4Desc: 'نتعامل بصدق وشفافية مع جميع عملائنا وشركائنا',
    ourTeam: 'فريق العمل',
    teamDesc: 'يضم فريقنا نخبة من المتخصصين في مجال الأجهزة الطبية وتكنولوجيا الصحة',

    // Contact
    contactTitle: 'اتصل بنا',
    contactSubtitle: 'نحن هنا للإجابة على جميع استفساراتكم',
    getInTouch: 'تواصل معنا',
    contactDesc: 'سواء كان لديك استفسار عن منتجاتنا أو تحتاج إلى دعم فني أو تريد الاستفسار عن عروضنا، فريقنا جاهز دائماً لمساعدتك.',
    ourLocation: 'موقعنا',
    locationValue: 'رام الله - شارع الإرسال',
    phoneNumber: 'رقم الهاتف',
    emailAddress: 'البريد الإلكتروني',
    emailValue: 'info@venesia-medical.com',
    businessHours: 'ساعات العمل',
    hours1: 'الأحد - الخميس: 8:00 ص - 5:00 م',
    hours2: 'الجمعة: 8:00 ص - 12:00 م',
    hours3: 'السبت: مغلق',
    sendMessage: 'أرسل رسالة',
    yourName: 'اسمك',
    yourEmail: 'بريدك الإلكتروني',
    subject: 'الموضوع',
    yourMessage: 'رسالتك',
    send: 'إرسال',
    thankYou: 'شكراً لك!',
    messageSent: 'تم إرسال رسالتك بنجاح. سنتواصل معك في أقرب وقت ممكن.',
    sendAnother: 'إرسال رسالة أخرى',
    nameRequired: 'الاسم مطلوب',
    emailRequired: 'البريد الإلكتروني مطلوب',
    emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
    subjectRequired: 'الموضوع مطلوب',
    messageRequired: 'الرسالة مطلوبة',

    // Footer
    footerAbout: 'VENESIA Medical Laser Company - شريكك الموثوق في أجهزة الليزر الطبي ونحت الجسم والعناية بالبشرة وتجهيزات المراكز الطبية',
    quickLinks: 'روابط سريعة',
    ourProducts: 'منتجاتنا',
    prod1: 'أجهزة الليزر',
    prod2: 'نحت الجسم',
    prod3: 'العناية بالبشرة',
    prod4: 'تجهيزات المراكز',
    contactUs: 'تواصل معنا',
    allRights: 'جميع الحقوق محفوظة',

    // 404
    notFound: '404 - الصفحة غير موجودة',
    notFoundDesc: 'الصفحة التي تبحث عنها غير موجودة.',
  },
  en: {
    // Navigation
    home: 'Home',
    products: 'Products',
    about: 'About Us',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    profile: 'My Profile',
    favorites: 'Favorites',
    admin: 'Admin',
    cart: 'Cart',

    // Hero
    heroTitle: 'Venesia Medical Devices',
    heroSubtitle: 'We provide the latest medical devices and equipment with the highest quality standards to serve the healthcare sector',
    heroBtn1: 'Browse Products',
    heroBtn2: 'Learn More',

    // Services
    servicesTitle: 'Our Services',
    service1Title: 'Laser Devices',
    service1Desc: 'Latest medical laser devices for skin treatments, hair removal, and tattoo removal',
    service2Title: 'Body Sculpting',
    service2Desc: 'Advanced body sculpting and shaping devices for amazing and safe results',
    service3Title: 'Skin Care',
    service3Desc: 'Wide range of skin care devices and preparations for medical centers',
    service4Title: 'Center Supplies',
    service4Desc: 'We provide everything a medical center needs in devices and supplies to global standards',

    // Stats
    statsTitle: 'Our Numbers Speak',
    stat1: 'Satisfied Clients',
    stat2: 'Medical Products',
    stat3: 'Years of Experience',
    stat4: 'Countries Served',

    // Featured Products
    featuredTitle: 'Featured Products',
    viewAll: 'View All',
    noProducts: 'No products available at the moment',

    // Why Us
    whyUsTitle: 'Why Choose Us?',
    why1Title: 'Certified Quality',
    why1Desc: 'All our products hold ISO certificates and international accreditations',
    why2Title: 'Global Partnerships',
    why2Desc: 'We partner with the world\'s leading medical device manufacturers',
    why3Title: 'Fast Delivery',
    why3Desc: 'We ensure timely product delivery to guarantee continuity of care',
    why4Title: 'Continuous Support',
    why4Desc: 'Technical support team available 24/7 throughout the week',

    // CTA
    ctaTitle: 'Ready to elevate your medical services?',
    ctaDesc: 'Contact us today for a free consultation and discover how we can help you',
    ctaBtn: 'Contact Us',

    // About
    aboutTitle: 'About Us',
    aboutMission: 'Our Mission',
    aboutMissionText1: 'VENESIA Medical Laser Company is a leading company specializing in medical laser devices, body sculpting, skin care, and medical center supplies in Palestine and the region.',
    aboutMissionText2: 'We are committed to providing the latest medical technologies with the highest quality standards to support the healthcare sector and empower medical professionals to deliver the best possible care.',
    ourValues: 'Our Values',
    value1: 'Quality',
    value1Desc: 'We are committed to the highest quality standards in all our products',
    value2: 'Reliability',
    value2Desc: 'A trusted partner for hospitals, clinics, and medical centers',
    value3: 'Innovation',
    value3Desc: 'We keep up with the latest developments in medical device technology',
    value4: 'Transparency',
    value4Desc: 'We deal honestly and transparently with all our clients and partners',
    ourTeam: 'Our Team',
    teamDesc: 'Our team includes specialists in medical devices and health technology',

    // Contact
    contactTitle: 'Contact Us',
    contactSubtitle: 'We are here to answer all your inquiries',
    getInTouch: 'Get In Touch',
    contactDesc: 'Whether you have a product inquiry, need technical support, or want to learn about our offers, our team is always ready to help you.',
    ourLocation: 'Our Location',
    locationValue: 'Ramallah - Al-Irsal Street',
    phoneNumber: 'Phone Number',
    emailAddress: 'Email Address',
    emailValue: 'info@venesia-medical.com',
    businessHours: 'Business Hours',
    hours1: 'Sunday - Thursday: 8:00 AM - 5:00 PM',
    hours2: 'Friday: 8:00 AM - 12:00 PM',
    hours3: 'Saturday: Closed',
    sendMessage: 'Send a Message',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    subject: 'Subject',
    yourMessage: 'Your Message',
    send: 'Send',
    thankYou: 'Thank You!',
    messageSent: 'Your message has been sent successfully. We will get back to you as soon as possible.',
    sendAnother: 'Send Another Message',
    nameRequired: 'Name is required',
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    subjectRequired: 'Subject is required',
    messageRequired: 'Message is required',

    // Footer
    footerAbout: 'VENESIA Medical Laser Company - Your trusted partner in medical laser devices, body sculpting, skin care, and medical center supplies',
    quickLinks: 'Quick Links',
    ourProducts: 'Our Products',
    prod1: 'Laser Devices',
    prod2: 'Body Sculpting',
    prod3: 'Skin Care',
    prod4: 'Center Supplies',
    contactUs: 'Contact Us',
    allRights: 'All Rights Reserved',

    // 404
    notFound: '404 - Page Not Found',
    notFoundDesc: 'The page you are looking for does not exist.',
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('ar');

  const toggleLang = () => setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  const t = (key) => translations[lang][key] || key;
  const isRTL = lang === 'ar';

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
