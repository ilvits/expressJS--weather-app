if(!self.define){let s,e={};const i=(i,a)=>(i=new URL(i+".js",a).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(a,n)=>{const c=s||("document"in self?document.currentScript.src:"")||location.href;if(e[c])return;let r={};const o=s=>i(s,c),_={module:{uri:c},exports:r,require:o};e[c]=Promise.all(a.map((s=>_[s]||o(s)))).then((s=>(n(...s),r)))}}define(["./workbox-1997932c"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"css/splidejs/splide.min.css",revision:"f6a86e8018fc1f6ae254b339acbd1cdd"},{url:"css/style.css",revision:"9fef59a726caee1e2e68332ee53ccbf4"},{url:"img/assets/icons/10days.svg",revision:"eccef2926ad6601351e7426b3b05eab9"},{url:"img/assets/icons/arrow-narrow.svg",revision:"764056432a867fe368b4ed5f60806d9b"},{url:"img/assets/icons/arrow-right.svg",revision:"8cf3c74145e9e2bacc5dc92185193435"},{url:"img/assets/icons/bi_phone-fill.svg",revision:"4b2271220d9ceaee0d232b9dc8a8d3a0"},{url:"img/assets/icons/blank.png",revision:"65ba416dabc03b32323da62e336974e5"},{url:"img/assets/icons/calendar.svg",revision:"3ab9f8d3f9dbfd693818335441c97648"},{url:"img/assets/icons/check_circle.svg",revision:"327c60ef9d87e2b2dee324049346e504"},{url:"img/assets/icons/clear-day_sun.svg",revision:"f44c9db4e31fc709387547732e8e8cfe"},{url:"img/assets/icons/close.svg",revision:"f6d56c9fd9e8999794a2012dfa652da9"},{url:"img/assets/icons/cyan_cloud.svg",revision:"acd74cdde009ecf701891234247c5ad5"},{url:"img/assets/icons/dark_cloud.svg",revision:"0fa509b834ba717095acc9f5528d8694"},{url:"img/assets/icons/delete.svg",revision:"ec0368ee5eae4834ab703d3c90675fe9"},{url:"img/assets/icons/down.svg",revision:"69c36af3f33b2c4198ca47dbb8f56913"},{url:"img/assets/icons/dragicon.svg",revision:"4c6558c8d33fd4ef3d66aa4222efc8c5"},{url:"img/assets/icons/emptypic.svg",revision:"96810db7c632983a5764cd2f8b91613f"},{url:"img/assets/icons/face_sun.svg",revision:"c863a25b7f3fac8d5bde1c5ce97847d4"},{url:"img/assets/icons/Line 14.svg",revision:"740748932029115596cbb50071263d04"},{url:"img/assets/icons/loading_circle.svg",revision:"7594831850603b6734a263afd41f8c8d"},{url:"img/assets/icons/location-marker.svg",revision:"6f6bac6074f066299bc7f0c1d3374035"},{url:"img/assets/icons/map-pin.svg",revision:"238a669f6db01642ddb59dbd42083a53"},{url:"img/assets/icons/my-location.svg",revision:"3e576c043b8653578aa5caaa2537d65d"},{url:"img/assets/icons/phoneRotateDark.svg",revision:"711224b5a117eb746ed836da535a1e17"},{url:"img/assets/icons/phoneRotateLight.svg",revision:"1a6d14c3ac17b7d5d84fbf3aa4eff11a"},{url:"img/assets/icons/phoneStatusBar/_battery.svg",revision:"32d0c813e49dac374982ec315064d33d"},{url:"img/assets/icons/phoneStatusBar/reception.svg",revision:"7fe270554c9b6f9e3be19dd604b64d8c"},{url:"img/assets/icons/phoneStatusBar/wifi.svg",revision:"1b8d54cc9d46db93f3d97338928a8192"},{url:"img/assets/icons/rename.svg",revision:"a40ed5283a183b08ef9bb50ba9cdada1"},{url:"img/assets/icons/sunrise2.svg",revision:"afb20fc71e5ed87f6404af19f911a70c"},{url:"img/assets/icons/sunset2.svg",revision:"9b4f92451cace8e48c1be88509b82b48"},{url:"img/assets/icons/sunshine.svg",revision:"c97f0987e5fba049418a2c343f2371da"},{url:"img/assets/icons/trash.svg",revision:"4dfb550a09042013acdc975147e9d151"},{url:"img/assets/icons/ufo.svg",revision:"1f0ccd22ada93bfa5a642674d6783cb3"},{url:"img/assets/icons/uvIndexBar2.svg",revision:"4e5415d0986ca9e2b2570bbfb7fa213b"},{url:"img/assets/legendIcons.svg",revision:"5e5436d1159fa5e60716ed9e4d7ea00a"},{url:"img/assets/moonphaseIcons.svg",revision:"e4ab3dbacd9c903283c7bf72576810d4"},{url:"img/assets/navIcons.svg",revision:"4f2b78c51f4dd95c5f442177f7b09411"},{url:"img/assets/pwa/icons/icon-128x128.png",revision:"b32250bc57de9f80dcd8b3182ceef893"},{url:"img/assets/pwa/icons/icon-144x144.png",revision:"cf744f9f4ff996905e843b8d759a4845"},{url:"img/assets/pwa/icons/icon-152x152.png",revision:"ce34f0271325e252f7215434282af85a"},{url:"img/assets/pwa/icons/icon-192x192.png",revision:"15bd8068002426398cc396d92b124359"},{url:"img/assets/pwa/icons/icon-384x384.png",revision:"638f5dd374b9406395c1f95c97c07087"},{url:"img/assets/pwa/icons/icon-48x48.png",revision:"1df294ad8d497ae9d3d480eee414290b"},{url:"img/assets/pwa/icons/icon-512x512.png",revision:"2814ef5116307d34fc9798188a4b3d82"},{url:"img/assets/pwa/icons/icon-72x72.png",revision:"f5baf183d8d9f175c794520e71380b19"},{url:"img/assets/pwa/icons/icon-96x96.png",revision:"ae3904affc5021b189c2999617fe2053"},{url:"img/assets/pwa/splash_screens/10.2__iPad_landscape.png",revision:"88b0601c607aff9fc04ee94829c61230"},{url:"img/assets/pwa/splash_screens/10.2__iPad_portrait.png",revision:"600930eb2ec7aa2c3d6e5636a3ec1efe"},{url:"img/assets/pwa/splash_screens/10.5__iPad_Air_landscape.png",revision:"55e4617097e16dd96fa7af4311f21a4e"},{url:"img/assets/pwa/splash_screens/10.5__iPad_Air_portrait.png",revision:"7c22a949968a3324edb9b7a50111bdae"},{url:"img/assets/pwa/splash_screens/10.9__iPad_Air_landscape.png",revision:"aacd065dbfe9d6518ea37b10d1417f86"},{url:"img/assets/pwa/splash_screens/10.9__iPad_Air_portrait.png",revision:"e50e542a0154148738680a50f1439bcb"},{url:"img/assets/pwa/splash_screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png",revision:"ae6b078c328fc9fbb988b54c8578c870"},{url:"img/assets/pwa/splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png",revision:"d902165cdfc1b7f84964d986a255cebb"},{url:"img/assets/pwa/splash_screens/12.9__iPad_Pro_landscape.png",revision:"3507d149dbe67024e940108d93e2531e"},{url:"img/assets/pwa/splash_screens/12.9__iPad_Pro_portrait.png",revision:"a2dee26e52290819ffcb80ecaba7d0a0"},{url:"img/assets/pwa/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png",revision:"0b7f99928f8257a452fd515980063dac"},{url:"img/assets/pwa/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png",revision:"416d1634233c47be7837275f796dcd52"},{url:"img/assets/pwa/splash_screens/8.3__iPad_Mini_landscape.png",revision:"8dbe3f17f827a0cad5edd2bf895b0e75"},{url:"img/assets/pwa/splash_screens/8.3__iPad_Mini_portrait.png",revision:"03cbb79dd732d9e74ae5012f531df2ac"},{url:"img/assets/pwa/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png",revision:"a49f7c090b7e081551d4a21f6966a7c0"},{url:"img/assets/pwa/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png",revision:"43a5ead14a32ecc062924679663daa63"},{url:"img/assets/pwa/splash_screens/iPhone_11__iPhone_XR_landscape.png",revision:"ace7d8d91b804753ea050bb82e14c873"},{url:"img/assets/pwa/splash_screens/iPhone_11__iPhone_XR_portrait.png",revision:"db8ce2f0bb47d5a4ef303bc2fc31ce68"},{url:"img/assets/pwa/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png",revision:"18cb6947eb8c853f163ad4492442e3d9"},{url:"img/assets/pwa/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png",revision:"7487824cfe18241eb9c9acbc9dace632"},{url:"img/assets/pwa/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png",revision:"adb492ce826da4a32764188b3614c434"},{url:"img/assets/pwa/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png",revision:"4e88139ec62c216b265ba32d149f0511"},{url:"img/assets/pwa/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png",revision:"1605888debd6476d51750b8e4079b57b"},{url:"img/assets/pwa/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png",revision:"224b8b8585f5568d51b08fc400bb2c65"},{url:"img/assets/pwa/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png",revision:"fbdb3484e39c97d8809aab8940a16333"},{url:"img/assets/pwa/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png",revision:"15d9326b370b8f8d6824b357dd548aed"},{url:"img/assets/pwa/splash_screens/iPhone_14_Pro_landscape.png",revision:"151aa8ce15dc949daca8883c4e8a6e17"},{url:"img/assets/pwa/splash_screens/iPhone_14_Pro_Max_landscape.png",revision:"e81e5da8a759d7421cea8a6b2b0c8b7a"},{url:"img/assets/pwa/splash_screens/iPhone_14_Pro_Max_portrait.png",revision:"80cdbcedd147287f0bdb6017d5a93ede"},{url:"img/assets/pwa/splash_screens/iPhone_14_Pro_portrait.png",revision:"6591c2e9f12fd784384a94cba81caac3"},{url:"img/assets/pwa/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png",revision:"7596e14903a9d94b9daee11a064c8f21"},{url:"img/assets/pwa/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png",revision:"99a4624fe3513be3a5945193724da82f"},{url:"img/assets/pwa/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png",revision:"b5f4eabdc6f2e10588df0e01d61ccfe9"},{url:"img/assets/pwa/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png",revision:"583155323dd4cee6d365e7cc11d793f6"},{url:"img/assets/qr-code.svg",revision:"94374c31e06d2022e90544fd89718656"},{url:"img/assets/screentg.png",revision:"9dcea022101d2eaeeb2a49f14dea4f4e"},{url:"img/assets/toastIcons.svg",revision:"afd2bb9294dc58a280e012c254f40b84"},{url:"img/assets/uvIcons.svg",revision:"a14de8110946cee5446ada90741b1974"},{url:"img/assets/weatherIcons-small.svg",revision:"782f34745807a5dc0ced32741904f9bf"},{url:"img/assets/weatherIcons.svg",revision:"6ee11bd5eface413d523b2725cf32d28"},{url:"img/favicons/favicon-114.png",revision:"1861cb2d4c8a8fe6cad9834f2e6ab892"},{url:"img/favicons/favicon-120.png",revision:"90e1df8665ac32b78d9ef3628416e70d"},{url:"img/favicons/favicon-144.png",revision:"197729e04f40c8b3f1e734b8fa1365fb"},{url:"img/favicons/favicon-150.png",revision:"ebf54863a327632d1dcf217d6e5d77f3"},{url:"img/favicons/favicon-152.png",revision:"81cc06d5f1f01f420ba6edb98488d6bf"},{url:"img/favicons/favicon-16.png",revision:"040fda1d970cf4c8532731c7e9c5bfd7"},{url:"img/favicons/favicon-160.png",revision:"9897cb0f6d97273076bced544cf6ebe2"},{url:"img/favicons/favicon-180.png",revision:"9731b08e09f64083ab8b8672f0042342"},{url:"img/favicons/favicon-192.png",revision:"167351fc8b39459f9a163004b2a79beb"},{url:"img/favicons/favicon-310.png",revision:"64a92825e946b417e1963e5f2487fcd2"},{url:"img/favicons/favicon-32.png",revision:"29f154e473036213ec6c9677ac146bc2"},{url:"img/favicons/favicon-57.png",revision:"ab6301b8431959e762bd70a88dc775e8"},{url:"img/favicons/favicon-60.png",revision:"b4ac7653055668a698caf7baa21fefbd"},{url:"img/favicons/favicon-64.png",revision:"762a645054f1b6289b8e8f4fde774a5e"},{url:"img/favicons/favicon-70.png",revision:"c3ee74474eae4661609cda762999c787"},{url:"img/favicons/favicon-72.png",revision:"1144c3bc069fbc2a78acb246ea6f8b07"},{url:"img/favicons/favicon-76.png",revision:"483daae6a10f38d5a87e2995ae693ca7"},{url:"img/favicons/favicon-96.png",revision:"deeb5b0f55356bae475a44b3d00d355d"},{url:"img/favicons/favicon.ico",revision:"e6e04ccf6e51d523a17005436a4d7fda"},{url:"index.html",revision:"7ac37983f2cbb43c228fdd512eeb3dd6"},{url:"js/alpine/alpine.min.js",revision:"4b5643f7d8641662eb58a3eee6009752"},{url:"js/alpine/i18n.min.js",revision:"753be9a5d046ce8ad63c84ab1d36b5e8"},{url:"js/alpine/intersect.min.js",revision:"9df57d55bf6e10fa562158f2e2a0f349"},{url:"js/alpine/timeout.min.js",revision:"fa1e44c82d3d31dbe5e1d97290f98435"},{url:"js/api.js",revision:"6ca3ee7fdac3d47e7d9af0127fd2f05c"},{url:"js/axios/axios.min.js",revision:"279e7f8937e4a0e8f5239bbb1533e7ce"},{url:"js/i18n.js",revision:"b1d37a74f99e903090340f535f10b8e7"},{url:"js/init.js",revision:"24c610e300c4dd9212e1e52353c3ed13"},{url:"js/installPromo.js",revision:"467f65e2c801ce23aa8c22fae8453df7"},{url:"js/moment/locales/ru.min.js",revision:"370194943c0b3b27923efcbfdd364573"},{url:"js/moment/moment.min.js",revision:"6c0a2330b0d8d6ea185d4669a0eddeab"},{url:"js/script.js",revision:"f88e74a29d468bd652a478dee296eb5c"},{url:"js/slip/slip.min.js",revision:"d9e035f83055ce57c0894350e12ba0ba"},{url:"js/splide/splide.min.js",revision:"0758be5332e68750471d7862fe1a6942"},{url:"js/theme.js",revision:"66d991241f32d8a5b2e29a73a3120969"},{url:"offline.html",revision:"b52ce52579b2d883f12f5f373c68a9c3"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
