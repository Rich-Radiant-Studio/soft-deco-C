// 第三方i18n插件 - 用户端版本
import { ref } from 'vue'

export interface I18nPlugin {
  currentLocale: string
  availableLocales: string[]
  switchLocale: (locale: string) => Promise<void>
  t: (key: string, params?: Record<string, any>) => string
  install: (app: any) => void
}

// 语言配置
const languages = {
  zh: {
    name: '中文',
    flag: '🇨🇳',
    translations: {
      // 导航
      'nav.home': '首页',
      'nav.shop': '商城',
      'nav.singleProductMall': '单品商城',
      'nav.designers': '设计师',
      'nav.designer': '设计师',
      'nav.community': '社区',
      'nav.communityCenter': '社区中心',
      'nav.about': '关于我们',
      'nav.cart': 'Cart',
      'nav.order': 'Order',
      'nav.demand': 'Demand',
      'nav.orders': '我的订单',
      'nav.request': '提交需求',
      'nav.login': '登录',
      'nav.register': '注册',
      'nav.profile': '个人中心',
      'nav.favorites': '我的收藏',
      'nav.logout': '退出登录',
      'nav.guest': '游客',
      'nav.upgradeAccount': '成为正式用户',
      'nav.searchPlaceholder': 'Input search text',

      // 游客相关
      'guest.welcome': '欢迎访问！',
      'guest.autoLoginMessage': '我们已为您自动创建游客账号',
      'guest.username': '用户名',
      'guest.accountId': '账号ID',
      'guest.noticeTitle': '游客账号说明',
      'guest.notice1': '游客账号有效期为7天',
      'guest.notice2': '可以浏览商品、添加购物车，但无法下单',
      'guest.notice3': '升级为正式用户后可享受完整功能',
      'guest.upgradeNow': '立即升级',
      'guest.continueAsGuest': '继续浏览',

      // 面包屑
      'breadcrumb.cases': '案例展示',

      // 关于我们下拉菜单
      'about.platformName': '平台名称',
      'about.platformDesc': '打造您的梦想家园',
      'about.company': 'XXX设计',
      'about.description': '致力于创造美好居住体验，提供一站式家居设计解决方案',
      'about.quickLinks': '快速链接',
      'about.sitemap': '网站地图',
      'about.terms': '服务条款',
      'about.privacy': '隐私政策',
      'about.partners': '合作品牌',
      'about.support': '服务支持',
      'about.help': '帮助中心',
      'about.faq': '常见问题',
      'about.feedback': '意见反馈',
      'about.contact': '联系我们',
      'about.address': '美国硅谷文本文本文本文本文本文本文本',
      'about.phone': '400-888-8888',
      'about.email': 'dream home@mail.com',
      'about.emailCopied': '邮箱已复制到剪贴板！',

      // 首页
      'home.brand': '🏠 Home Decor',
      'home.search': '搜索设计...',
      'home.filter.style': '风格',
      'home.filter.color': '颜色与色调',
      'home.filter.material': '材质',
      'home.filter.tier': '档次',
      'home.filter.featured': '特色',
      'home.style.modern': '现代简约',
      'home.style.scandinavian': '北欧风格',
      'home.style.chinese': '中式风格',
      'home.style.american': '美式风格',
      'home.style.japanese': '日式风格',
      'home.style.luxury': '轻奢风格',
      'home.style.industrial': '工业风格',
      'home.style.mediterranean': '地中海风格',
      'home.material.wood': '木质',
      'home.material.metal': '金属',
      'home.material.fabric': '布艺',
      'home.material.leather': '皮质',
      'home.material.glass': '玻璃',
      'home.material.stone': '石材',
      'home.tier.basic': '基础',
      'home.tier.standard': '标准',
      'home.tier.premium': '高端',
      'home.tier.luxury': '奢华',
      'home.featured.hot': '热门推荐',
      'home.featured.new': '新品上架',
      'home.featured.choice': '设计师推荐',
      'home.featured.rated': '好评如潮',
      'home.cases.title': '软装案例',
      'home.cases.all': '全部设计',
      'home.cases.recommended': '推荐',
      'home.cases.popular': '最受欢迎',
      'home.cases.bestsellers': '热销',
      'home.cases.sale': '特价',
      'home.addCart': '加入购物车',
      'home.buyNow': '立即购买',
      'home.event.title': '特价优惠活动',
      'home.event.desc': '限时优惠，全场最高8折',
      'home.cases.featured': '特色案例',
      'home.cases.modern': '现代软装 · 三居室',
      'home.cases.style.modern': '现代风格',
      'home.cases.area': '1,290 平方英尺',
      'home.cases.type.whole': '全屋',
      'home.cases.desc': '高端软装设计，专业品质保证。',
      'home.cases.price': '$2999',
      'home.event.hot': '热门商品：家具、灯具、窗帘、布艺沙发 - 全品类享受8折优惠，可叠加！',
      'home.event.period': '活动时间：',
      'home.event.periodDesc': '即日起至2024年12月31日，享受8折优惠！',
      'home.event.howto': '使用方法：',
      'home.event.howtoDesc': '满减$20优惠券，无门槛，可叠加！代码：SALE20',

      // 房间类型
      'room.all': '全部',
      'room.kitchen': '厨房',
      'room.bathroom': '卫生间',
      'room.living': '客厅',
      'room.bedroom': '卧室',
      'room.dining': '餐厅',
      'room.entryway': '玄关',
      'room.whole': '全屋',

      // 颜色
      'color.white': '白色',
      'color.black': '黑色',
      'color.gray': '灰色',
      'color.beige': '米色',
      'color.red': '红色',
      'color.orange': '橙色',
      'color.yellow': '黄色',
      'color.blue': '蓝色',
      'color.purple': '紫色',
      'color.custom': '自定义颜色',
      'color.picker.title': '自定义颜色选择器',
      'color.picker.selected': '已选择',
      'color.picker.cancel': '取消',
      'color.picker.add': '添加到筛选',

      // 页面标题
      'page.shop': '单品商城',
      'page.designers': '设计师',
      'page.community': '社区',
      'page.cart': '购物车',
      'page.profile': '个人中心',
      'page.caseDetail': '案例详情',
      'page.caseId': '案例ID',
      'page.developing': '页面开发中...',

      // 按钮和操作
      'action.like': '点赞',
      'action.favorite': '收藏',
      'action.share': '分享',
      'action.view': '查看',
      'designer.name': '设计师名称',
      'common.error': '出错了',
      'common.retry': '重试',
      'common.confirm': '确认',
      'common.cancel': '取消',
      'common.save': '保存',
      'common.delete': '删除',
      'common.edit': '编辑',
      'common.view': '查看',
      'common.share': '分享',
      'common.like': '点赞',
      'common.favorite': '收藏',
      'common.copyright': '© 2025 Home Decor Platform. All Rights Reserved. Contact Us: 1-800-XXX-XXXX',
      'common.loading': '加载中...',
      'common.logoutConfirm': '确定要退出登录吗？',

      // 注册相关
      'register.createAccount': '创建您的账户',
      'register.joinPlatform': '加入我们的平台，成为用户、设计师、供应商、施工方或项目经理',
      'register.email': '邮箱',
      'register.password': '密码',
      'register.confirmPassword': '确认密码',
      'register.emailCode': '邮箱验证码',
      'register.phone': '手机号码',
      'register.sendCode': '发送验证码',
      'register.codeSent': '验证码已发送',
      'register.agreePrefix': '我同意',
      'register.serviceTerms': '服务条款',
      'register.privacyPolicy': '隐私政策',
      'register.termsContent': '这里是服务条款的详细内容...',
      'register.privacyContent': '这里是隐私政策的详细内容...',
      'register.hasAccount': '已有账户？',
      'register.toLogin': '立即登录',
      'register.success': '注册成功',
      'register.failed': '注册失败',

      // 角色
      'roles.user': '用户',
      'roles.userDesc': '浏览商品下单',
      'roles.designer': '设计师',
      'roles.designerDesc': '上传和销售您的设计',
      'roles.supplier': '供应商',
      'roles.supplierDesc': '在我们的市场上提供产品',

      // 设计师专属
      'register.designerNature': '设计师性质',
      'register.individual': '个人',
      'register.studio': '工作室',
      'register.company': '公司',
      'register.designerName': '设计师/公司名称',
      'register.specializedRoomTypes': '擅长房间类型',
      'register.specializedRoomTypesDesc': '选择您擅长的房间类型（可多选）',
      'register.livingRoom': '客厅',
      'register.bedroom': '卧室',
      'register.kitchen': '厨房',
      'register.bathroom': '卫生间',
      'register.diningRoom': '餐厅',
      'register.study': '书房',
      'register.balcony': '阳台',
      'register.entrance': '玄关',
      'register.kidsRoom': '儿童房',
      'register.storage': '储物间',

      // 验证
      'validation.emailRequired': '请输入邮箱',
      'validation.passwordNotMatch': '两次输入的密码不一致',
      'validation.agreementRequired': '请同意服务条款和隐私政策'
    }
  },
  en: {
    name: 'English',
    flag: '🇺🇸',
    translations: {
      // Navigation
      'nav.home': 'Home',
      'nav.shop': 'Shop',
      'nav.singleProductMall': 'Single Product Mall',
      'nav.designers': 'Designers',
      'nav.designer': 'Designer',
      'nav.community': 'Community',
      'nav.communityCenter': 'Community Center',
      'nav.about': 'About Us',
      'nav.cart': 'Cart',
      'nav.order': 'Order',
      'nav.demand': 'Demand',
      'nav.orders': 'My Orders',
      'nav.request': 'Submit Request',
      'nav.login': 'Login',
      'nav.register': 'Register',
      'nav.profile': 'Profile',
      'nav.favorites': 'My Favorites',
      'nav.logout': 'Logout',
      'nav.guest': 'Guest',
      'nav.upgradeAccount': 'Become a Full Member',
      'nav.searchPlaceholder': 'Input search text',

      // Guest related
      'guest.welcome': 'Welcome!',
      'guest.autoLoginMessage': 'We have automatically created a guest account for you',
      'guest.username': 'Username',
      'guest.accountId': 'Account ID',
      'guest.noticeTitle': 'Guest Account Notice',
      'guest.notice1': 'Guest account is valid for 7 days',
      'guest.notice2': 'You can browse products and add to cart, but cannot place orders',
      'guest.notice3': 'Upgrade to a full account to enjoy all features',
      'guest.upgradeNow': 'Upgrade Now',
      'guest.continueAsGuest': 'Continue Browsing',

      // Breadcrumb
      'breadcrumb.cases': 'Cases',

      // About Us dropdown
      'about.platformName': 'Platform Name',
      'about.platformDesc': 'Build Your Dream Home',
      'about.company': 'XXX Design',
      'about.description': 'Committed to creating beautiful living experiences and providing one-stop home design solutions',
      'about.quickLinks': 'Quick Links',
      'about.sitemap': 'Site Map',
      'about.terms': 'Terms of Service',
      'about.privacy': 'Privacy Policy',
      'about.partners': 'Partner Brands',
      'about.support': 'Service Support',
      'about.help': 'Help Center',
      'about.faq': 'FAQ',
      'about.feedback': 'Feedback',
      'about.contact': 'Contact Us',
      'about.address': 'Silicon Valley, USA text text text text text text text',
      'about.phone': '400-888-8888',
      'about.email': 'dream home@mail.com',
      'about.emailCopied': 'Email copied to clipboard!',

      // Home
      'home.brand': '🏠 Home Decor',
      'home.search': 'Search designs...',
      'home.filter.style': 'Style',
      'home.filter.color': 'Color & Tone',
      'home.filter.material': 'Material',
      'home.filter.tier': 'Tier',
      'home.filter.featured': 'Featured',
      'home.style.modern': 'Modern Minimalist',
      'home.style.scandinavian': 'Scandinavian',
      'home.style.chinese': 'Chinese Style',
      'home.style.american': 'American Style',
      'home.style.japanese': 'Japanese Style',
      'home.style.luxury': 'Light Luxury',
      'home.style.industrial': 'Industrial',
      'home.style.mediterranean': 'Mediterranean',
      'home.material.wood': 'Wood',
      'home.material.metal': 'Metal',
      'home.material.fabric': 'Fabric',
      'home.material.leather': 'Leather',
      'home.material.glass': 'Glass',
      'home.material.stone': 'Stone',
      'home.tier.basic': 'Basic',
      'home.tier.standard': 'Standard',
      'home.tier.premium': 'Premium',
      'home.tier.luxury': 'Luxury',
      'home.featured.hot': 'Hot Picks',
      'home.featured.new': 'New Arrivals',
      'home.featured.choice': "Designer's Choice",
      'home.featured.rated': 'Top Rated',
      'home.cases.title': 'Soft Furnishing Cases',
      'home.cases.all': 'All Designs',
      'home.cases.recommended': 'Recommended',
      'home.cases.popular': 'Most Popular',
      'home.cases.bestsellers': 'Best Sellers',
      'home.cases.sale': 'On Sale',
      'home.addCart': 'Add to Cart',
      'home.buyNow': 'Buy Now',
      'home.event.title': 'Special Discount Event',
      'home.event.desc': 'Limited time offer, up to 20% off sitewide',
      'home.cases.featured': 'Featured Cases',
      'home.cases.modern': 'Modern Soft Furnishing · 3-Bedroom Apartment',
      'home.cases.style.modern': 'Modern Style',
      'home.cases.area': '1,290 sq ft',
      'home.cases.type.whole': 'Whole House',
      'home.cases.desc': 'Premium soft furnishing design with professional quality assurance.',
      'home.cases.price': '$2999',
      'home.event.hot': 'Hot items: Furniture, lighting, curtains, fabric sofas - all categories enjoy 20% off, stackable!',
      'home.event.period': 'Event Period:',
      'home.event.periodDesc': 'Now through December 31, 2024, enjoy 20% off!',
      'home.event.howto': 'How to Redeem:',
      'home.event.howtoDesc': 'Get $20 off coupon with no minimum purchase, stackable! Code: SALE20',

      // Room types
      'room.all': 'All',
      'room.kitchen': 'Kitchen',
      'room.bathroom': 'Bathroom',
      'room.living': 'Living Room',
      'room.bedroom': 'Bedroom',
      'room.dining': 'Dining Room',
      'room.entryway': 'Entryway',
      'room.whole': 'Whole House',

      // Colors
      'color.white': 'White',
      'color.black': 'Black',
      'color.gray': 'Gray',
      'color.beige': 'Beige',
      'color.red': 'Red',
      'color.orange': 'Orange',
      'color.yellow': 'Yellow',
      'color.blue': 'Blue',
      'color.purple': 'Purple',
      'color.custom': 'Custom Color',
      'color.picker.title': 'Custom Color Picker',
      'color.picker.selected': 'Selected',
      'color.picker.cancel': 'Cancel',
      'color.picker.add': 'Add to Filter',

      // Page titles
      'page.shop': 'Shop',
      'page.designers': 'Designers',
      'page.community': 'Community',
      'page.cart': 'Shopping Cart',
      'page.profile': 'Profile',
      'page.caseDetail': 'Case Detail',
      'page.caseId': 'Case ID',
      'page.developing': 'Page under development...',

      // Buttons and actions
      'action.like': 'Like',
      'action.favorite': 'Favorite',
      'action.share': 'Share',
      'action.view': 'View',
      'designer.name': 'Designer Name',
      'common.error': 'Error occurred',
      'common.retry': 'Retry',
      'common.confirm': 'Confirm',
      'common.cancel': 'Cancel',
      'common.save': 'Save',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.view': 'View',
      'common.share': 'Share',
      'common.like': 'Like',
      'common.favorite': 'Favorite',
      'common.copyright': '© 2025 Home Decor Platform. All Rights Reserved. Contact Us: 1-800-XXX-XXXX',
      'common.loading': 'Loading...',
      'common.logoutConfirm': 'Are you sure you want to logout?',

      // Register
      'register.createAccount': 'Create your account',
      'register.joinPlatform': 'Join our platform as a Customer, Designer, Supplier, Contractor or PM',
      'register.email': 'Email',
      'register.password': 'Password',
      'register.confirmPassword': 'Confirm password',
      'register.emailCode': 'Email verification code',
      'register.phone': 'Phone number',
      'register.sendCode': 'Send verification code',
      'register.codeSent': 'Verification code sent',
      'register.agreePrefix': 'I agree to the',
      'register.serviceTerms': 'Terms of Service',
      'register.privacyPolicy': 'Privacy Policy',
      'register.termsContent': 'Terms of Service content...',
      'register.privacyContent': 'Privacy Policy content...',
      'register.hasAccount': 'Already have an account?',
      'register.toLogin': 'Sign in',
      'register.success': 'Registration successful',
      'register.failed': 'Registration failed',

      // Roles
      'roles.user': 'Customer',
      'roles.userDesc': 'Browse products and order',
      'roles.designer': 'Designer',
      'roles.designerDesc': 'Upload and sell your designs',
      'roles.supplier': 'Supplier',
      'roles.supplierDesc': 'Offer products on our marketplace',

      // Designer specific
      'register.designerNature': 'Designer Nature',
      'register.individual': 'Individual',
      'register.studio': 'Studio',
      'register.company': 'Company',
      'register.designerName': 'Designer/Company Name',
      'register.specializedRoomTypes': 'Specialized Room Types',
      'register.specializedRoomTypesDesc': 'Select the room types you specialize in (multiple selections allowed)',
      'register.livingRoom': 'Living Room',
      'register.bedroom': 'Bedroom',
      'register.kitchen': 'Kitchen',
      'register.bathroom': 'Bathroom',
      'register.diningRoom': 'Dining Room',
      'register.study': 'Study',
      'register.balcony': 'Balcony',
      'register.entrance': 'Entrance',
      'register.kidsRoom': 'Kids Room',
      'register.storage': 'Storage',

      // Validation
      'validation.emailRequired': 'Please enter email',
      'validation.passwordNotMatch': 'Passwords do not match',
      'validation.agreementRequired': 'Please agree to the Terms of Service and Privacy Policy'
    }
  },
  es: {
    name: 'Español',
    flag: '🇪🇸',
    translations: {
      // Navegación
      'nav.home': 'Inicio',
      'nav.shop': 'Tienda',
      'nav.singleProductMall': 'Centro Comercial de Producto Único',
      'nav.designers': 'Diseñadores',
      'nav.designer': 'Diseñador',
      'nav.community': 'Comunidad',
      'nav.communityCenter': 'Centro Comunitario',
      'nav.about': 'Acerca de',
      'nav.cart': 'Carrito',
      'nav.order': 'Pedido',
      'nav.demand': 'Demanda',
      'nav.orders': 'Mis Pedidos',
      'nav.request': 'Enviar Solicitud',
      'nav.login': 'Iniciar Sesión',
      'nav.register': 'Registrarse',
      'nav.profile': 'Perfil',
      'nav.favorites': 'Mis Favoritos',
      'nav.logout': 'Cerrar Sesión',
      'nav.guest': 'Invitado',
      'nav.upgradeAccount': 'Convertirse en Miembro Completo',
      'nav.searchPlaceholder': 'Ingrese texto de búsqueda',

      // Relacionado con invitados
      'guest.welcome': '¡Bienvenido!',
      'guest.autoLoginMessage': 'Hemos creado automáticamente una cuenta de invitado para ti',
      'guest.username': 'Nombre de usuario',
      'guest.accountId': 'ID de cuenta',
      'guest.noticeTitle': 'Aviso de Cuenta de Invitado',
      'guest.notice1': 'La cuenta de invitado es válida por 7 días',
      'guest.notice2': 'Puedes navegar productos y agregar al carrito, pero no puedes realizar pedidos',
      'guest.notice3': 'Actualiza a una cuenta completa para disfrutar de todas las funciones',
      'guest.upgradeNow': 'Actualizar Ahora',
      'guest.continueAsGuest': 'Continuar Navegando',

      // Breadcrumb
      'breadcrumb.cases': 'Casos',

      // Menú Acerca de
      'about.platformName': 'Nombre de la Plataforma',
      'about.platformDesc': 'Construye Tu Hogar Soñado',
      'about.company': 'XXX Diseño',
      'about.description': 'Comprometidos a crear experiencias de vida hermosas y brindar soluciones integrales de diseño del hogar',
      'about.quickLinks': 'Enlaces Rápidos',
      'about.sitemap': 'Mapa del Sitio',
      'about.terms': 'Términos de Servicio',
      'about.privacy': 'Política de Privacidad',
      'about.partners': 'Marcas Asociadas',
      'about.support': 'Soporte de Servicio',
      'about.help': 'Centro de Ayuda',
      'about.faq': 'Preguntas Frecuentes',
      'about.feedback': 'Comentarios',
      'about.contact': 'Contáctanos',
      'about.address': 'Silicon Valley, EE.UU. texto texto texto texto texto texto texto',
      'about.phone': '400-888-8888',
      'about.email': 'dream home@mail.com',
      'about.emailCopied': '¡Correo copiado al portapapeles!',

      // Inicio
      'home.brand': '🏠 Home Decor',
      'home.search': 'Buscar diseños...',
      'home.filter.style': 'Estilo',
      'home.filter.color': 'Color y Tono',
      'home.filter.material': 'Material',
      'home.filter.tier': 'Nivel',
      'home.filter.featured': 'Destacado',
      'home.style.modern': 'Minimalista Moderno',
      'home.style.scandinavian': 'Escandinavo',
      'home.style.chinese': 'Estilo Chino',
      'home.style.american': 'Estilo Americano',
      'home.style.japanese': 'Estilo Japonés',
      'home.style.luxury': 'Lujo Ligero',
      'home.style.industrial': 'Industrial',
      'home.style.mediterranean': 'Mediterráneo',
      'home.material.wood': 'Madera',
      'home.material.metal': 'Metal',
      'home.material.fabric': 'Tela',
      'home.material.leather': 'Cuero',
      'home.material.glass': 'Vidrio',
      'home.material.stone': 'Piedra',
      'home.tier.basic': 'Básico',
      'home.tier.standard': 'Estándar',
      'home.tier.premium': 'Premium',
      'home.tier.luxury': 'Lujo',
      'home.featured.hot': 'Populares',
      'home.featured.new': 'Nuevos',
      'home.featured.choice': 'Elección del Diseñador',
      'home.featured.rated': 'Mejor Valorados',
      'home.cases.title': 'Casos de Decoración',
      'home.cases.all': 'Todos los Diseños',
      'home.cases.recommended': 'Recomendados',
      'home.cases.popular': 'Más Populares',
      'home.cases.bestsellers': 'Más Vendidos',
      'home.cases.sale': 'En Oferta',
      'home.addCart': 'Añadir al Carrito',
      'home.buyNow': 'Comprar Ahora',
      'home.event.title': 'Evento de Descuento Especial',
      'home.event.desc': 'Oferta por tiempo limitado, hasta 20% de descuento',
      'home.cases.featured': 'Casos Destacados',
      'home.cases.modern': 'Decoración Moderna · Apartamento de 3 Habitaciones',
      'home.cases.style.modern': 'Estilo Moderno',
      'home.cases.area': '1,290 pies cuadrados',
      'home.cases.type.whole': 'Casa Completa',
      'home.cases.desc': 'Diseño de decoración premium con garantía de calidad profesional.',
      'home.cases.price': '$2999',
      'home.event.hot': 'Artículos populares: Muebles, iluminación, cortinas, sofás de tela - ¡todas las categorías disfrutan 20% de descuento, acumulable!',
      'home.event.period': 'Período del Evento:',
      'home.event.periodDesc': '¡Desde ahora hasta el 31 de diciembre de 2024, disfruta 20% de descuento!',
      'home.event.howto': 'Cómo Canjear:',
      'home.event.howtoDesc': '¡Obtén cupón de $20 de descuento sin compra mínima, acumulable! Código: SALE20',

      // Tipos de habitación
      'room.all': 'Todos',
      'room.kitchen': 'Cocina',
      'room.bathroom': 'Baño',
      'room.living': 'Sala de Estar',
      'room.bedroom': 'Dormitorio',
      'room.dining': 'Comedor',
      'room.entryway': 'Entrada',
      'room.whole': 'Casa Completa',

      // Colores
      'color.white': 'Blanco',
      'color.black': 'Negro',
      'color.gray': 'Gris',
      'color.beige': 'Beige',
      'color.red': 'Rojo',
      'color.orange': 'Naranja',
      'color.yellow': 'Amarillo',
      'color.blue': 'Azul',
      'color.purple': 'Púrpura',
      'color.custom': 'Color Personalizado',
      'color.picker.title': 'Selector de Color Personalizado',
      'color.picker.selected': 'Seleccionado',
      'color.picker.cancel': 'Cancelar',
      'color.picker.add': 'Añadir al Filtro',

      // Títulos de página
      'page.shop': 'Tienda',
      'page.designers': 'Diseñadores',
      'page.community': 'Comunidad',
      'page.cart': 'Carrito',
      'page.profile': 'Perfil',
      'page.caseDetail': 'Detalle del Caso',
      'page.caseId': 'ID del Caso',
      'page.developing': 'Página en desarrollo...',

      // Botones y acciones
      'action.like': 'Me Gusta',
      'action.favorite': 'Favorito',
      'action.share': 'Compartir',
      'action.view': 'Ver',
      'designer.name': 'Nombre del Diseñador',
      'common.error': 'Error',
      'common.retry': 'Reintentar',
      'common.confirm': 'Confirmar',
      'common.cancel': 'Cancelar',
      'common.save': 'Guardar',
      'common.delete': 'Eliminar',
      'common.edit': 'Editar',
      'common.view': 'Ver',
      'common.share': 'Compartir',
      'common.like': 'Me Gusta',
      'common.favorite': 'Favorito',
      'common.copyright': '© 2025 Home Decor Platform. Todos los Derechos Reservados. Contáctanos: 1-800-XXX-XXXX',
      'common.loading': 'Cargando...',
      'common.logoutConfirm': '¿Estás seguro de que quieres cerrar sesión?',

      // Registro
      'register.createAccount': 'Crea tu cuenta',
      'register.joinPlatform': 'Únete a nuestra plataforma como Cliente, Diseñador, Proveedor, Contratista o PM',
      'register.email': 'Correo electrónico',
      'register.password': 'Contraseña',
      'register.confirmPassword': 'Confirmar contraseña',
      'register.emailCode': 'Código de verificación de correo',
      'register.phone': 'Número de teléfono',
      'register.sendCode': 'Enviar código de verificación',
      'register.codeSent': 'Código de verificación enviado',
      'register.agreePrefix': 'Acepto los',
      'register.serviceTerms': 'Términos de Servicio',
      'register.privacyPolicy': 'Política de Privacidad',
      'register.termsContent': 'Contenido de Términos de Servicio...',
      'register.privacyContent': 'Contenido de Política de Privacidad...',
      'register.hasAccount': '¿Ya tienes una cuenta?',
      'register.toLogin': 'Iniciar sesión',
      'register.success': 'Registro exitoso',
      'register.failed': 'Registro fallido',

      // Roles
      'roles.user': 'Cliente',
      'roles.userDesc': 'Navega productos y ordena',
      'roles.designer': 'Diseñador',
      'roles.designerDesc': 'Sube y vende tus diseños',
      'roles.supplier': 'Proveedor',
      'roles.supplierDesc': 'Ofrece productos en nuestro mercado',

      // Diseñador específico
      'register.designerNature': 'Naturaleza del Diseñador',
      'register.individual': 'Individual',
      'register.studio': 'Estudio',
      'register.company': 'Empresa',
      'register.designerName': 'Nombre del Diseñador/Empresa',
      'register.specializedRoomTypes': 'Tipos de Habitación Especializados',
      'register.specializedRoomTypesDesc': 'Selecciona los tipos de habitación en los que te especializas (se permiten múltiples selecciones)',
      'register.livingRoom': 'Sala de Estar',
      'register.bedroom': 'Dormitorio',
      'register.kitchen': 'Cocina',
      'register.bathroom': 'Baño',
      'register.diningRoom': 'Comedor',
      'register.study': 'Estudio',
      'register.balcony': 'Balcón',
      'register.entrance': 'Entrada',
      'register.kidsRoom': 'Habitación Infantil',
      'register.storage': 'Almacén',

      // Validación
      'validation.emailRequired': 'Por favor ingresa el correo electrónico',
      'validation.passwordNotMatch': 'Las contraseñas no coinciden',
      'validation.agreementRequired': 'Por favor acepta los Términos de Servicio y la Política de Privacidad'
    }
  }
}

// 创建i18n插件实例
export const createI18nPlugin = (): I18nPlugin => {
  // 使用 Vue 的响应式 ref
  const currentLocaleRef = ref(localStorage.getItem('user-web-locale') || 'zh')

  const plugin: I18nPlugin = {
    get currentLocale() {
      return currentLocaleRef.value
    },
    set currentLocale(value: string) {
      currentLocaleRef.value = value
    },
    availableLocales: Object.keys(languages),

    async switchLocale(locale: string) {
      if (languages[locale as keyof typeof languages]) {
        currentLocaleRef.value = locale
        localStorage.setItem('user-web-locale', locale)

        // 触发全局事件
        window.dispatchEvent(new CustomEvent('user-web-language-changed', {
          detail: { locale }
        }))

        console.log(`用户端语言切换到: ${locale}`)
      }
    },

    t(key: string, params?: Record<string, any>): string {
      // 访问 ref.value 以建立响应式依赖
      const locale = currentLocaleRef.value
      const lang = languages[locale as keyof typeof languages]
      if (!lang) return key

      let translation = lang.translations[key as keyof typeof lang.translations] || key

      // 简单的参数替换
      if (params) {
        Object.keys(params).forEach(param => {
          translation = translation.replace(`{${param}}`, params[param])
        })
      }

      return translation
    },

    install(app: any) {
      // 提供全局属性 - 使用箭头函数保持this绑定
      app.config.globalProperties.$t = (key: string, params?: Record<string, any>) => this.t(key, params)
      app.config.globalProperties.$locale = () => this.currentLocale

      // 提供注入
      app.provide('i18n', this)
    }
  }

  return plugin
}

// 默认配置
export const defaultI18nConfig = {
  defaultLocale: 'zh',
  fallbackLocale: 'en',
  availableLocales: ['zh', 'en', 'es']
}