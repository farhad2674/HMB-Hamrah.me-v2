# تحلیل GEO و آمادگی جست‌وجوی هوش مصنوعی Hamrah.me

تاریخ آخرین بازبینی: ۵ آبان ۱۴۰۵ / 27 October 2026  
دامنه: `https://hamrah.me`  
مبنای بررسی: کدبیس محلی، build عمومی Next.js و جست‌وجوی وب. دامنه زنده با ابزار دریافت محتوا باز نشد؛ بنابراین وضعیت واقعی CDN، Search Console و ایندکس تولید اندازه‌گیری نشده است.

> GEO در این گزارش همان اصول SEO، کیفیت محتوا و دسترسی فنی برای سطوح پاسخ‌محور است. طبق راهنمای رسمی گوگل، فایل یا markup اختصاصی برای حضور در AI Overviews و AI Mode لازم نیست.

## 1. امتیاز آمادگی GEO: 78/100

این امتیاز یک ارزیابی داخلی است و داده رتبه‌بندی گوگل یا تضمین citation نیست.

| بخش | امتیاز | جمع‌بندی |
|---|---:|---|
| قابلیت استناد passageها | 21/25 | پاسخ مستقل در خانه و دوره، پاسخ‌های کوتاه و منابع اولیه اضافه شد |
| خوانایی ساختاری | 18/20 | H1 یکتا، H2/H3 پرسشی، فهرست و FAQ خوانا |
| محتوای چندرسانه‌ای | 12/15 | SVG اختصاصی، دموی ژورنال و تعامل آموزشی؛ ویدئوی واقعی هنوز وجود ندارد |
| اعتبار و سیگنال برند | 9/20 | سیاست تحریریه و منابع اضافه شد؛ هویت مدرس/بازبین و حضور بیرونی تأییدشده هنوز نداریم |
| دسترسی فنی | 18/20 | HTML سمت سرور، canonical، schema، sitemap و crawler access؛ انتشار نهایی به env وابسته است |

بزرگ‌ترین محدودیت، اعتبار بیرونی و رفع ابهام موجودیت برند است؛ نه کمبود تکرار کلمه کلیدی یا فایل AI-specific.

## 2. وضعیت پلتفرم‌ها

هیچ ابزار اندازه‌گیری citation مانند DataForSEO یا SE Ranking در این اجرا استفاده نشد؛ بنابراین برای پلتفرم‌ها امتیاز عددی گزارش نمی‌شود.

| پلتفرم | آمادگی کیفی | دلیل |
|---|---|---|
| Google AI Overviews | مناسب مشروط | صفحات عمومی با `HMB_PUBLIC_SITE=1` قابل ایندکس، دارای HTML کامل، canonical و محتوای منبع‌دار هستند |
| Google AI Mode | متوسط رو به مناسب | passageهای مستقل و entity clarity بهتر شد؛ اعتبار بیرونی و محتوای دست‌اول هنوز ضعیف است |
| ChatGPT Search | مناسب مشروط | `OAI-SearchBot` در حالت عمومی با گروه صریح مجاز است؛ live deployment تأیید نشد |
| Perplexity | مناسب مشروط | `PerplexityBot` در گروه جست‌وجو مجاز است و محتوای اصلی بدون JavaScript قابل خواندن است |
| Claude Search | مناسب مشروط | `Claude-SearchBot` در گروه جست‌وجو مجاز است؛ حضور برند در منابع بیرونی تأیید نشد |

## 3. وضعیت دسترسی crawlerهای AI

`src/app/robots.ts` دو حالت دارد:

- پیش‌نمایش یا build بدون `HMB_PUBLIC_SITE=1`: همه crawlerها با `Disallow: /` مسدود می‌شوند.
- build عمومی با `HMB_PUBLIC_SITE=1`: گروه‌های صریح عامل جست‌وجو و واکشی کاربر، همراه با قانون عمومی، صفحات عمومی را مجاز و مسیرهای خصوصی را مسدود می‌کنند.

| User-agent | قابلیت | وضعیت build عمومی |
|---|---|---|
| Googlebot | Google Search، AI Overviews و AI Mode | مجاز برای صفحات عمومی |
| Google-Extended | آموزش/grounding Gemini و Vertex؛ نه رتبه Google Search | مجاز؛ تصمیم licensing هنوز عمومی است |
| Google-CloudVertexBot | crawl درخواستی Vertex Agent | مجاز برای صفحات عمومی |
| OAI-SearchBot | قابلیت citation در ChatGPT Search | مجاز برای صفحات عمومی |
| GPTBot | آموزش مدل OpenAI؛ نه ChatGPT Search | مجاز؛ مستقل از OAI-SearchBot |
| ChatGPT-User | مرور درخواستی کاربر | قانون عمومی مانع صفحات عمومی نیست |
| Claude-SearchBot | قابلیت citation در جست‌وجوی Claude | مجاز برای صفحات عمومی |
| ClaudeBot | آموزش مدل Anthropic؛ نه Claude Search | مجاز؛ مستقل از Claude-SearchBot |
| Claude-User | مرور درخواستی کاربر | مجاز برای صفحات عمومی |
| PerplexityBot | جست‌وجوی Perplexity | مجاز برای صفحات عمومی |
| Perplexity-User | fetch درخواستی کاربر | قانون عمومی مانع صفحات عمومی نیست |
| Applebot | Siri، Spotlight و Safari Search | مجاز برای صفحات عمومی |
| Applebot-Extended | opt-out آموزش Apple Intelligence؛ crawler مستقل نیست | مجاز؛ تصمیم licensing هنوز عمومی است |
| CCBot | داده Common Crawl / آموزش | مجاز؛ تصمیم licensing هنوز عمومی است |
| Bytespider | crawler ByteDance | مجاز؛ تصمیم licensing هنوز عمومی است |
| cohere-ai | crawler Cohere | مجاز؛ تصمیم licensing هنوز عمومی است |

مسیرهای `/admin`، `/api`، `/member`، `/coach`، `/login`، `/apply/received` و `/checkout` برای همه crawlerها مسدودند. کنترل دسترسی برنامه مستقل از robots باقی مانده است.

## 4. وضعیت llms.txt و RSL

- `public/llms.txt` اضافه شد و صفحات اصلی، سیاست‌ها و واقعیت‌های قابل تأیید را معرفی می‌کند.
- این فایل در امتیاز citation محاسبه نشده است. گوگل صراحتاً اعلام کرده `llms.txt` را برای Search و قابلیت‌های مولد آن استفاده نمی‌کند.
- `llms-full.txt` ساخته نشد؛ برای این سایت خدماتی ارزش روشن و تأییدشده‌ای ندارد.
- RSL 1.0 پیاده‌سازی نشد، چون سیاست licensing محتوای برند هنوز از سوی مالک مشخص نشده است. ابتدا باید تصمیم گرفته شود کدام crawlerهای training مجاز باشند.

منبع: [راهنمای رسمی بهینه‌سازی AI گوگل](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## 5. تحلیل سیگنال برند

جست‌وجوی عمومی برای `hamrah.me` و ترکیب آن با Forex/HMB انجام شد:

- Wikipedia: حضور تأییدشده پیدا نشد.
- Reddit: حضور یا بحث تأییدشده پیدا نشد.
- YouTube: کانال یا mention تأییدشده پیدا نشد.
- LinkedIn: صفحه برند یا شخص مرتبط و تأییدشده پیدا نشد.
- چند فهرست شخص ثالث هنوز دامنه را با موضوع قدیمی «مشاوره مالیاتی و تأمین اجتماعی» توصیف می‌کنند. این نتایج منبع معتبر برند نیستند، اما نشانه‌ای از ابهام entity و سابقه ایندکس‌شده دامنه‌اند.

اقدام لازم: پس از انتشار، مالکیت Search Console و Bing Webmaster Tools تأیید شود، sitemap ارسال شود، URLهای قدیمی شناسایی و به نزدیک‌ترین مقصد مرتبط 301 شوند یا 410 بگیرند، و پروفایل‌های رسمی هم‌نام با لینک مستقیم به دامنه ساخته شوند. mention مصنوعی یا خریداری‌شده توصیه نمی‌شود.

## 6. قابلیت استناد در سطح passage

بلوک‌های مستقل ایجادشده:

1. خانه: «دوره آموزش فارکس همراه چیست؟» — تعریف، مخاطب، اجزای مسیر و مرز خدمات در یک passage مستقل.
2. صفحه دوره: «در دوره جامع فارکس چه چیزی یاد می‌گیرید؟» — پاسخ مستقیم به محتوای دوره و محدودیت نتیجه.
3. صفحه ریسک: سؤال‌های مستقل درباره تضمین سود، نمونه‌ها، حدود خدمت و زمان مناسب معامله نکردن.
4. مقاله‌ها: بخش «منابع و دامنه استناد» با citation به CFTC و Investor.gov.
5. سیاست تحریریه: پاسخ روشن به Who / How / Why و افشای استفاده از ابزار هوش مصنوعی.

بازه 130 تا 170 کلمه فقط یک heuristic خوانایی است و الزام گوگل نیست. متن‌ها برای کاربر نوشته شده‌اند و صرفاً برای «chunking» مصنوعی خرد نشده‌اند.

## 7. بررسی Server-Side Rendering

- Next.js محتوای صفحه خانه، دوره، مقاله و سیاست تحریریه را در HTML اولیه رندر می‌کند.
- در build عمومی محلی، پاسخ‌های GEO، منابع مقاله و JSON-LD بدون اجرای JavaScript در HTML دیده شدند.
- تعامل‌های PathPicker و ژورنال client-side هستند، اما محتوای اصلی و CTAها به آن‌ها وابسته نیستند.
- build عمومی فقط وقتی قابل ایندکس است که `HMB_PUBLIC_SITE=1` هنگام build تنظیم شود. تست build عمومی `noindex` نداشت و sitemap شامل `/editorial-policy` بود.

## 8. پنج تغییر با بیشترین اثر بعدی

1. **هویت تأییدشده مدرس و بازبین:** نام، تجربه مرتبط، حدود تخصص، عکس واقعی و صفحه bio؛ سپس `Person` schema و author/reviewer واقعی.
2. **رفع ابهام دامنه قدیمی:** audit URLهای تاریخی، redirect/410، درخواست re-crawl و به‌روزرسانی پروفایل‌ها و citationهای قدیمی.
3. **محتوای دست‌اول:** مطالعه موردی آموزشی ناشناس، الگوهای تجمیعی ژورنال با روش‌شناسی روشن، یا گزارش survey بدون ادعای عملکرد مالی.
4. **حضور برند اصیل:** YouTube و LinkedIn رسمی با محتوای آموزشی واقعی و لینک متقابل؛ مشارکت طبیعی در جامعه، نه mention-farming.
5. **چرخه بازبینی:** مالک محتوا، تاریخ مرور و معیار اصلاح برای هر مقاله؛ صفحات YMYL دست‌کم در بازه مشخص و پس از تغییر مقررات بازبینی شوند.

## 9. توصیه‌های Schema

پیاده‌شده:

- `EducationalOrganization` و `WebSite`
- `BreadcrumbList`
- `Course` بدون Offer یا rating ساختگی
- `Article` با `datePublished`، `dateModified`، `citation`، `about` و publisher
- `Service` برای کوچینگ
- `WebPage` برای سیاست تحریریه

توصیه بعدی:

- `Person` فقط پس از تأیید هویت مدرس و صفحه bio اضافه شود.
- `Event` فقط وقتی تاریخ، مکان/قالب، برگزارکننده و وضعیت واقعی وجود دارد ساخته شود.
- `Offer` فقط با قیمت، ارز، availability و شرایط واقعی منتشر شود.
- از FAQ schema صرفاً برای وعده rich result استفاده نشود؛ FAQ قابل خواندن برای کاربر کافی است.

## 10. پیشنهادهای بازنویسی محتوایی

| صفحه | تغییر پیشنهادی | دلیل |
|---|---|---|
| درباره همراه | پس از تأیید، نام مسئول علمی و سابقه قابل اثبات را بالای صفحه اضافه کنید | رفع ناشناس‌بودن در موضوع مالی/YMYL |
| دوره foundations | یک نمونه کامل از «درس ← تمرین ← خروجی ژورنال» با روش تولید اضافه شود | محتوای دست‌اول و قابل استناد |
| ژورنال | تعریف روشن «ژورنال معاملاتی چیست؟» و یک جدول برنامه در برابر اجرا اضافه شود | پاسخ به sub-query و بهبود extraction |
| کوچینگ | یک نمونه بازخورد ناشناس با توضیح اینکه ساختگی یا واقعی است اضافه شود | شفافیت و نشان دادن حدود خدمت |
| مقاله‌ها | برای هر مطلب نویسنده/بازبین واقعی، تاریخ انتشار و تاریخ بازبینی ثبت شود | Who و freshness قابل اعتماد |
| درباره/سیاست تحریریه | توضیح entity فعلی برند پس از تأیید تاریخچه دامنه | کاهش تعارض با نتایج قدیمی مالیاتی |

## تغییرات اجراشده در این مرحله

- پاسخ مستقل GEO در خانه و دوره
- صفحه `/editorial-policy`
- منابع اولیه و citation در مقاله‌ها و صفحه ریسک
- `public/llms.txt` اختیاری
- تاریخ بازبینی و افشای روش تولید محتوا
- افزودن سیاست تحریریه به sitemap و footer
- حفظ SSR، پالت رنگی، دسترس‌پذیری و عدم انتشار ادعاهای تجاری تأییدنشده
- بازنویسی title، H1، meta و CTAهای صفحات اصلی براساس نیت فارسی
- افزودن جدول مقایسه مسیرها، ناوبری پرش و نمونه درس به صفحه تصمیم دوره
- SSR کامل فرم درخواست، مرور پیش از ارسال و نام ماشینی کنترل‌ها
- موشن یک‌باره بلوک‌ها و micro-interactionهای تب، FAQ، کارت و شخصیت با پشتیبانی reduced motion

## اعتبارسنجی

- TypeScript: موفق
- Next.js production build با `HMB_PUBLIC_SITE=1`: موفق
- تست‌های backend: 11 از 11 موفق
- تست‌های مرورگر، RTL، responsive، فرم، نقش‌ها و CMS: 12 از 12 موفق
- HTML خام: پاسخ‌های GEO، منابع و schema بدون JavaScript قابل مشاهده‌اند

### منابع روش‌شناسی

- [Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google helpful content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [OpenAI crawler documentation](https://platform.openai.com/docs/bots)
- [Google crawler documentation](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers)
- [Anthropic crawler support](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Applebot-Extended](https://support.apple.com/en-us/119829)
