/*
import { DotLottie } from '/resources/_asset/kr/js/dotlottie/web/index.js';
DotLottie.setWasmUrl(
    '/resources/_asset/kr/js/dotlottie/web/dotlottie-player.wasm'
  );
  */
"use strict";
/*
window.requestAnimFrame = (function(callback){return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {window.setTimeout(callback , 1000/60);};})();
window.cancelAnimFrame = (function(){return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function(id) {window.clearTimeout(id);};})();
*/
const include = {
  headerContainer: null,
  footerContainer: null,

  init() {
    this.headerContainer = document.getElementById("dHead");
    this.footerContainer = document.getElementById("dFoot");

    if (this.headerContainer && this.headerContainer.children.length === 0) {
      this.header();
    }
    if (this.footerContainer && this.footerContainer.children.length === 0) {
      this.footer();
    }
  },

  header() {
    const html =
      '<div class="header-outer">  <div class="header-inner"><h1 class="logo"><a href="../main/index.html" class="btn-logo">Simpac</a></h1><nav class="gnb-wrap">  <div class="gnb-logo"></div>  <div class="gnb-outer"><div class="gnb-inner">  <ul class="gnb-list"><!--// gnb-cell 클래스에 active클래스 추가 시 1뎁스 활성화// snb-cell 클래스에 active클래스 추가 시 2뎁스 활성화--><li class="gnb-cell">  <a href="../business/index.html" class="btn-gnb-nav">사업분야</a></li><li class="gnb-cell">  <a href="../about/simpac-group.html" class="btn-gnb-nav">그룹소개</a>  <div class="snb"><ul class="snb-list">  <li class="snb-cell"><a href="../about/simpac-group.html" class="btn-snb-nav">소개</a>  </li>  <li class="snb-cell"><a href="../about/greeting.html" class="btn-snb-nav">인사말</a>  </li>  <li class="snb-cell"><a href="../about/history.html" class="btn-snb-nav">연혁</a>  </li>  <li class="snb-cell"><a href="../about/brand.html" class="btn-snb-nav">브랜드</a>  </li>  <li class="snb-cell"><a href="../about/ci.html" class="btn-snb-nav">CI</a></li></ul>  </div></li><li class="gnb-cell">  <a href="../story/news-list.html" class="btn-gnb-nav">스토리</a>  <div class="snb"><ul class="snb-list">  <li class="snb-cell"><a href="../story/news-list.html" class="btn-snb-nav">뉴스</a>  </li>  <li class="snb-cell"><a href="../story/notice-list.html" class="btn-snb-nav">공지사항</a>  </li>  <li class="snb-cell"><a href="../story/simpacdaum.html" class="btn-snb-nav">심팩다움</a>  </li>  <li class="snb-cell"><a href="../story/social.html" class="btn-snb-nav">소셜채널</a>  </li></ul>  </div></li><li class="gnb-cell">  <a href="../ir/stock.html" class="btn-gnb-nav">투자정보</a>  <div class="snb"><ul class="snb-list">  <li class="snb-cell"><a href="../ir/stock.html" class="btn-snb-nav">주가정보</a></li>  <li class="snb-cell"><a href="../ir/disclosure.html" class="btn-snb-nav">공시정보</a>  </li>  <li class="snb-cell"><a href="../ir/financials.html" class="btn-snb-nav">재무정보</a>  </li>  <li class="snb-cell"><a href="../ir/archive.html" class="btn-snb-nav">IR자료실</a>  </li></ul>  </div></li><li class="gnb-cell">  <a href="../esg/overview.html" class="btn-gnb-nav">ESG</a>  <div class="snb"><ul class="snb-list">  <li class="snb-cell"><a href="../esg/overview.html" class="btn-snb-nav">개요</a></li>  <li class="snb-cell"><a href="../esg/environment.html" class="btn-snb-nav">환경</a>  </li>  <li class="snb-cell"><a href="../esg/social.html" class="btn-snb-nav">사회</a></li>  <li class="snb-cell"><a href="../esg/governance.html" class="btn-snb-nav">지배구조</a>  </li></ul>  </div></li><li class="gnb-cell">  <a href="https://simpac.ninehire.site/" target="_blank" class="btn-gnb-nav recruit">인재채용<span class="icons"></span>  </a></li>  </ul></div><div class="header-language">  <button type="button" class="language-selected"></button>  <div class="language-list"><div class="language-data">  <!-- active클래스 추가 시 활성화 -->  <a href="#" class="active"><em>KOR</em></a>  <a href="#"><em>ENG</em></a></div>  </div></div>  </div></nav><div class="dimd"></div><button type="button" class="btn-menu-toggle">  <span class="btn-color"><span class="open active" data-src="../../images/lottie/MO_Menu_open.json"></span><span class="close" data-src="../../images/lottie/MO_Menu_close.json"></span>  </span>  <span class="btn-white"><span class="open active" data-src="../../images/lottie/MO_Menu_open-w.json"></span><span class="close" data-src="../../images/lottie/MO_Menu_close-w.json"></span>  </span></button>  </div></div>';
    this.headerContainer.innerHTML = html;
  },

  footer() {
    const html =
      '<div class="footer-wrap">  <div class="footer-outer"><div class="footer-inner">  <div class="footer-visual"><picture>  <source srcset="../../images/common/footer-visual-mo.jpg" media="(max-width: 768px)" />  <source srcset="../../images/common/footer-visual-tab.jpg" media="(max-width: 1024px)" />  <img src="../../images/common/footer-visual-pc.jpg" alt="" /></picture>  </div>  <div class="footer-data"><div class="footer-box">  <div class="footer-row"><div class="footer-sns">  <div class="sns-list"><a href="https://www.youtube.com/user/SIMPACPRESS/videos" target="_blank" class="">  YOUTUBE</a><a href="https://www.facebook.com/simpacamerica" target="_blank" class="">FACEBOOK</a><a href="https://www.linkedin.com/company/simpac-usa/" target="_blank" class="">  LINKEDIN</a>  </div>  <div class="info"><address class="">서울특별시 영등포구 국제금융로 52</address><div class="copy">©2025 SIMPAC Group Portal All Rights Reserved.</div>  </div></div><div class="footer-headline">  <div class="desc"><div class="pc-data">  <div class="effect-sentence"><span class="sentence">  <span class="value">We Believe That Human Create</span></span><span class="sentence">  <span class="value">The Future.</span></span>  </div></div><div class="tab-data">  <div class="effect-sentence"><span class="sentence">  <span class="value">We Believe That Human</span></span><span class="sentence">  <span class="value">Create The Future.</span></span>  </div></div><div class="mo-data">  <div class="effect-sentence"><span class="sentence">  <span class="value">We Believe That</span></span><span class="sentence">  <span class="value">Human Create The</span></span><span class="sentence">  <span class="value">Future.</span></span>  </div></div>  </div>  <a href="https://maps.app.goo.gl/DoE1QJCXFoWgjAet7" target="_blank" class="btn-contact btn-split"><span class="split-hover">찾아오시는 길</span><span class="icon icon-outlink"></span>  </a></div>  </div>  <div class="footer-row"><div class="footer-logo"></div><div class="footer-info">  <div class="info"><address class="">서울특별시 영등포구 국제금융로 52</address><div class="copy">©2025 SIMPAC Group Portal All Rights Reserved.</div>  </div>  <div class="family"><div class="dropdown-wrap footer-family">  <button type="button" class="btn-dropdown-nav"><span class="value">계열사 바로가기</span><span class="arrow"></span>  </button>  <div class="dropdown-data"><div class="dropdown-list">  <div class="dropdown-cell"><a  href="https://simpacholdings.com/"  class="btn-dropdown-item"  target="_blank">  SIMPAC Holdings</a>  </div>  <div class="dropdown-cell"><a  href="http://www.simpacindustries.co.kr/"  class="btn-dropdown-item"  target="_blank">  SIMPAC Industries</a>  </div>  <div class="dropdown-cell"><a  href="https://simpac-america.com/"  class="btn-dropdown-item"  target="_blank">  SIMPAC America</a>  </div>  <div class="dropdown-cell"><a  href="https://www.ristecbiz.com/"  class="btn-dropdown-item"  target="_blank">  SIMPAC Holdings RISTecBiz</a>  </div>  <div class="dropdown-cell"><a  href="http://simpackda.com/index.php"  class="btn-dropdown-item"  target="_blank">  SIMPAC KDA</a>  </div></div>  </div></div>  </div></div>  </div></div>  </div></div>  </div></div>';
    this.footerContainer.innerHTML = html;
  },
};

const common = {
  stage: {
    width: 0,
    height: 0,
    top: 0,
    ptop: 0,
    pw: 0,
  },
  elements: {},

  device: "",
  touchDevice: false,
  mobileMenu: {},

  scrollTimer: null,

  footerFamilyTimer: null,

  init() {
    gsap.registerPlugin(ScrollTrigger);
    include.init();

    this.elements.wrap = document.querySelector("#wrap");
    this.elements.header = document.querySelector("#dHead");
    this.elements.container = document.querySelector("#dBody");
    if (this.elements.header) this.elements.gnb = this.elements.header.querySelector(".gnb-wrap");

    //터치 여부
    this.onDeviceCheck();

    //gnb 셋팅
    if (this.elements.gnb) {
      this.elements.gnb.querySelectorAll(".gnb-cell").forEach((el, idx) => {
        const snbEl = el.querySelector(".snb");
        const btnGnbNav = el.querySelector(".btn-gnb-nav");
        if (snbEl) {
          btnGnbNav.setAttribute("data-link", btnGnbNav.getAttribute("href"));
        } else {
          btnGnbNav.setAttribute("data-link", "none");
          el.classList.add("single");
        }
      });
    }

    document.body.addEventListener("click", (e) => {
      if (this.elements.header) {
        // 모바일 햄버거 메뉴 클릭 시
        if (e.target.closest(".btn-menu-toggle")) {
          //console.log('menu click');
          this.mobileMenuToggle();
        }

        // GNB 글로벌 메뉴 버튼 클릭 시
        if (e.target.closest(".language-selected")) {
          const btn = e.target.closest(".language-selected");
          const btnParent = e.target.closest(".header-language");
          if (btnParent) btnParent.classList.toggle("active");
        }

        // GNB 글로벌 메뉴 외 클릭 시
        const gnbLanguageMenu = document.querySelector(".header-language");
        if (gnbLanguageMenu) {
          if (gnbLanguageMenu.classList.contains("active") && !e.target.closest(".header-language")) {
            gnbLanguageMenu.classList.remove("active");
          }
        }

        // GNB 1뎁스 메뉴 클릭 시
        if (e.target.closest(".btn-gnb-nav")) {
          const btnGnbMenu = e.target.closest(".btn-gnb-nav");
          const btnGnbMenuCell = btnGnbMenu.parentNode;
          const btnGnbIndex = Array.from(btnGnbMenuCell.parentNode.children).indexOf(btnGnbMenuCell);
          if (btnGnbMenu.getAttribute("data-link") != "none") {
            this.elements.header.classList.add("enter");
            this.gnbEnterSort(btnGnbIndex);
          }
        }

        if (window.innerWidth >= 1025 && this.elements.header.classList.contains("enter")) {
          if (!e.target.closest(".gnb-cell")) {
            //gnbLanguageMenu.classList.remove("active");
            //console.log('1뎁스 메뉴 외 클릭');
            this.gnbClose();
          }
        }
      }
    });

    document.body.addEventListener(
      "mouseenter",
      (e) => {
        if (e.target.classList.contains("gnb-cell")) {
          const target = e.target;
          if (e.type === "mouseenter" && window.innerWidth >= 1025 && !this.touchDevice) {
            // 마우스 진입 시 처리
            //.console.log("gnb list enter");
            this.onGnbEnter(target);
          }
        }
      },
      true
    );

    document.body.addEventListener(
      "mouseleave",
      (e) => {
        if (e.target.classList.contains("gnb-list")) {
          const target = e.target;
          if (e.type === "mouseleave" && window.innerWidth >= 1025 && !this.touchDevice) {
            // 마우스 진입 시 처리
            //console.log("gnb list leave");
            this.onGnbLeave();
          }
        }
      },
      true
    );

    if (this.elements.gnb) gnb.init();
    effectSentence.init();
    countDown.init();
    splitButton.init();
    textEffect.init();
    tab.init();
    business.init();
    brand.init();
    history.init();
    main.init();
    footer.init();
    this.ready();
    
    this.mobileMenu.container = this.elements.header?.querySelector(".btn-menu-toggle");

    if (this.mobileMenu.container) {
      this.mobileMenu.active = false;

      this.mobileMenu.openEl = this.mobileMenu.container.querySelector(".btn-color .open");
      this.mobileMenu.openTotalDuration = 0;

      this.mobileMenu.openLottie = document.createElement("dotlottie-player");
      this.mobileMenu.openLottie.id = "menuToggleOpen";
      this.mobileMenu.openLottie.src = this.mobileMenu.openEl.getAttribute("data-src");
      this.mobileMenu.openLottie.background = "transparent";
      this.mobileMenu.openLottie.style.width = "100%";
      this.mobileMenu.openLottie.style.height = "auto";
      this.mobileMenu.openLottie.addEventListener("ready", (player) => {
        //console.log(this);
        const totalFrames = this.mobileMenu.openLottie.getLottie().totalFrames; // 전체 프레임 수
        const frameRate = this.mobileMenu.openLottie.getLottie().frameRate; // FPS (초당 프레임 수)
        const totalDuration = (totalFrames / frameRate) * 1000;

        this.mobileMenu.openTotalDuration = totalDuration;

        //console.log("총 프레임:", totalFrames);
        //console.log("FPS:", frameRate);
        //console.log("총 재생시간(ms):", totalDuration);
      });
      this.mobileMenu.openEl.appendChild(this.mobileMenu.openLottie);

      this.mobileMenu.closeEl = this.mobileMenu.container.querySelector(".btn-color .close");
      this.mobileMenu.closeTotalDuration = 0;

      this.mobileMenu.closeLottie = document.createElement("dotlottie-player");
      this.mobileMenu.closeLottie.id = "menuToggleClose";
      this.mobileMenu.closeLottie.src = this.mobileMenu.closeEl.getAttribute("data-src");
      this.mobileMenu.closeLottie.background = "transparent";
      this.mobileMenu.closeLottie.style.width = "100%";
      this.mobileMenu.closeLottie.style.height = "auto";
      this.mobileMenu.closeLottie.addEventListener("ready", (player) => {
        //console.log(this);
        const totalFrames = this.mobileMenu.closeLottie.getLottie().totalFrames; // 전체 프레임 수
        const frameRate = this.mobileMenu.closeLottie.getLottie().frameRate; // FPS (초당 프레임 수)
        const totalDuration = (totalFrames / frameRate) * 1000;

        this.mobileMenu.closeTotalDuration = totalDuration;

        //console.log("총 프레임:", totalFrames);
        //console.log("FPS:", frameRate);
        //console.log("총 재생시간(ms):", totalDuration);
      });
      this.mobileMenu.closeEl.appendChild(this.mobileMenu.closeLottie);

      this.mobileMenu.openElWhite = this.mobileMenu.container.querySelector(".btn-white .open");
      this.mobileMenu.openLottieWhite = document.createElement("dotlottie-player");
      this.mobileMenu.openLottieWhite.id = "menuToggleOpenWhite";
      this.mobileMenu.openLottieWhite.src = this.mobileMenu.openElWhite.getAttribute("data-src");
      this.mobileMenu.openLottieWhite.background = "transparent";
      this.mobileMenu.openLottieWhite.style.width = "100%";
      this.mobileMenu.openLottieWhite.style.height = "auto";

      this.mobileMenu.openLottieWhite.addEventListener("ready", (player) => {});
      this.mobileMenu.openElWhite.appendChild(this.mobileMenu.openLottieWhite);

      this.mobileMenu.closeElWhite = this.mobileMenu.container.querySelector(".btn-white .close");
      this.mobileMenu.closeLottieWhite = document.createElement("dotlottie-player");
      this.mobileMenu.closeLottieWhite.id = "menuToggleCloseWhite";
      this.mobileMenu.closeLottieWhite.src = this.mobileMenu.closeElWhite.getAttribute("data-src");
      this.mobileMenu.closeLottieWhite.background = "transparent";
      this.mobileMenu.closeLottieWhite.style.width = "100%";
      this.mobileMenu.closeLottieWhite.style.height = "auto";
      this.mobileMenu.closeElWhite.appendChild(this.mobileMenu.closeLottieWhite);
    }

    window.addEventListener("load", common.load.bind(this));
    window.addEventListener("resize", common.resize.bind(this));
    window.addEventListener("scroll", common.scroll.bind(this));
  },

  ready() {
    this.resize();
    this.scroll();

    setTimeout(() => {
      document.querySelector("#wrap").classList.add("ready");
    }, 100);
  },

  load() {
    //console.log('window load');
    //this.resize();
    setTimeout(() => {
      const pageTitleGroupEl = document.querySelector(".page-title-group");
      if (pageTitleGroupEl && pageTitleGroupEl.classList.contains("visual-type")) {
        pageTitleGroupEl.querySelectorAll(".effect-sentence").forEach((el) => el.classList.add("active"));
      }
    }, 100);
  },

  resize() {
    this.onDeviceCheck();
    this.stage.pw = this.firstActive ? -1 : this.stage.width;
    this.stage.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.stage.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.stage.top = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

    if (this.stage.width > 1024) {
      this.device = "pc";
    } else if (this.stage.width >= 1024 && this.stage.width <= 769) {
      this.device = "tablet";
    } else if (this.stage.width <= 768) {
      this.device = "mobile";
    }

    this.footerSort();
    if (this.elements.gnb) this.gnbSet();
  },

  footerSort() {
    const footerEl = document.querySelector(".footer-family");
    if (!footerEl) return false;

    if (footerEl.classList.contains("active")) {
      footerEl.querySelector(".dropdown-data").style.height =
        footerEl.querySelector(".dropdown-list").getBoundingClientRect().height + "px";
    }
  },

  scroll() {
    this.stage.top = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

    if (this.elements.header) {
      if (this.elements.wrap && !this.elements.header.classList.contains("actived")) {
        const posY = 1;

        this.elements.wrap.classList.toggle("scroll", this.stage.top >= posY);

        if (this.stage.top <= posY) {
          this.elements.wrap.classList.remove("up", "down");
        } else {
          if (this.elements.wrap.classList.contains("scroll") || this.elements.wrap.classList.contains("down")) {
            if (this.stage.ptop > this.stage.top) {
              this.elements.wrap.classList.remove("down");
              this.elements.wrap.classList.add("up");
            }
          }

          if (this.elements.wrap.classList.contains("scroll") || this.elements.wrap.classList.contains("up")) {
            if (this.stage.ptop < this.stage.top) {
              this.elements.wrap.classList.remove("up");
              this.elements.wrap.classList.add("down");
            }
          }
        }

        this.stage.ptop = this.stage.top;
      }
    }
  },

  onDeviceCheck() {
    this.touchDevice = $WINDOW.isTouchDevice();
    document.documentElement.classList.toggle("isTouchDevice", $WINDOW.isTouchDevice());
  },

  onGnbEnter(obj) {
    if (this.elements.header) {
      if (obj && !obj.classList.contains("single")) {
        this.elements.header.classList.add("enter");
        this.gnbEnterSort(Array.from(obj.parentNode.children).indexOf(obj));
      } else {
        this.gnbClose();
        this.elements.header.classList.remove("active");
      }
    }
  },

  onGnbLeave(obj) {
    if (this.elements.header) {
      this.gnbClose();
      if (gnb.second >= 0) {
        this.elements.header.classList.add("active");
        this.gnbEnterSort(gnb.first);
      } else {
        this.elements.header.classList.remove("active");
      }
    }
  },

  gnbClose() {
    this.elements.header.classList.remove("enter");
    this.gnbEnterSort(-1);
  },

  gnbEnterSort(_index) {
    console.log('gnb sort index :: ' + _index)
    this.elements.gnb.querySelectorAll(".gnb-cell").forEach((el, idx) => {
      if (window.innerWidth >= 1025) {
        el.classList.toggle("hover", idx === _index);
      } else {
        if (idx === _index) {
          if (el.classList.contains("hover")) {
            if(this.elements.header.classList.contains("open")) el.classList.remove("hover");            
          } else {
            el.classList.add("hover");
          }
        } else {
          el.classList.remove("hover");
        }
      }
    });
  },

  gnbSet() {
    const listEl = this.elements.gnb.querySelector(".gnb-list");
    if (!listEl) return false;

    listEl.querySelectorAll(".gnb-cell").forEach((el, idx) => {
      const btnGnbNav = el.querySelector(".btn-gnb-nav");
      const dataLink = btnGnbNav.getAttribute("data-link");

      if (window.innerWidth >= 1025) {
        if (dataLink != "none") {
          if (this.touchDevice) {
            btnGnbNav.setAttribute("href", "javascript:;");
          } else {
            btnGnbNav.setAttribute("href", dataLink);
          }
        }
      } else {
        if (el.classList.contains("hover")) el.classList.remove("hover");
        if (dataLink != "none") btnGnbNav.setAttribute("href", "javascript:;");
      }
    });

    if (this.elements.header.classList.contains("open")) {
      this.mobileMenu.openLottie.seek(0);
      this.mobileMenu.openLottieWhite.seek(0);
      this.mobileMenu.openEl.classList.add("active");
      this.mobileMenu.closeEl.classList.remove("active");
      this.mobileMenu.openElWhite.classList.add("active");
      this.mobileMenu.closeElWhite.classList.remove("active");
      this.mobileMenu.active = false;
      document.documentElement.classList.remove("fix");
    }
    this.elements.header.classList.remove("open", "close");

    if (gnb.second >= 0) {
      this.elements.header.classList.add("active");
      this.gnbEnterSort(gnb.first);
    }
  },

  mobileMenuToggle() {
    if (!this.mobileMenu.active) {
      if (this.elements.header) {
        if (!this.elements.header.classList.contains("open")) {
          this.elements.header.querySelector(".gnb-inner").scrollTo(0, 0);
          this.gnbEnterSort(gnb.first);
          if (this.mobileMenu.openLottie) {
            this.mobileMenu.active = true;
            this.mobileMenu.openLottie.stop();
            this.mobileMenu.openLottie.play();
            this.mobileMenu.openLottieWhite.stop();
            this.mobileMenu.openLottieWhite.play();
            setTimeout(() => {
              this.mobileMenu.openLottie.seek(0);
              this.mobileMenu.openLottieWhite.seek(0);
              this.mobileMenu.openEl.classList.remove("active");
              this.mobileMenu.closeEl.classList.add("active");
              this.mobileMenu.openElWhite.classList.remove("active");
              this.mobileMenu.closeElWhite.classList.add("active");
              this.mobileMenu.active = false;
            }, this.mobileMenu.openTotalDuration);
          }
          this.elements.header.classList.remove("close");
        } else {
          //console.log('메뉴 닫기')
          if (this.mobileMenu.closeLottie) {
            this.mobileMenu.closeLottie.stop();
            this.mobileMenu.closeLottie.play();
            this.mobileMenu.closeLottieWhite.stop();
            this.mobileMenu.closeLottieWhite.play();
            this.mobileMenu.active = true;
            setTimeout(() => {
              this.mobileMenu.closeLottie.seek(0);
              this.mobileMenu.closeLottieWhite.seek(0);
              this.mobileMenu.closeEl.classList.remove("active");
              this.mobileMenu.openEl.classList.add("active");
              this.mobileMenu.closeElWhite.classList.remove("active");
              this.mobileMenu.openElWhite.classList.add("active");
              this.mobileMenu.active = false;
              this.elements.header.classList.remove("close");
              this.gnbEnterSort(-1);
            }, this.mobileMenu.closeTotalDuration);
          }
          this.elements.header.classList.add("close");
        }
        this.elements.header.classList.toggle("open");
      }
      document.documentElement.classList.toggle("fix");
    }
  },

  pageMove(y) {
    window.scrollTo({ top: y, behavior: "smooth" });
  },
};

const textEffect = {
  container: null,

  init() {
    this.container = document.querySelector("#dBody");

    if (this.container) return;

    this.buildIntersectionObserver();
  },

  buildIntersectionObserver() {
    const effectItems = this.container.querySelectorAll(".effect-sentence");

    if (effectItems.length == 0) return;

    const intersectionObserver = () => {
      const effectObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target;
            const bounding = entry.boundingClientRect;

            if (entry.isIntersecting) {
              // 아래에서 올라올 때만 active 추가
              if (bounding.top > 0) {
                el.classList.add("active");
              }
            } else {
              // 아래로 사라질 때만 active 제거
              if (bounding.top > 0) {
                el.classList.remove("active");
              }
            }
          });
        },
        {
          root: null,
          threshold: 0,
          rootMargin: "0px 0px 1px 0px",
        }
      );

      effectItems.forEach((el) => {
        if(!el.classList.contains('none')){
          const elTop = el.getBoundingClientRect().top + window.scrollY;
          const scrollY = window.scrollY;
          const windowH = window.innerHeight;

          if (scrollY + windowH > elTop) {
            el.classList.add("active");
          }

          effectObserver.observe(el);
        }
      });
    };

    intersectionObserver();
  },
};

const menus = [
  {
    label: "business",
  },
  {
    label: "about",
    children: [
      { label: "simpac-group" },
      { label: "greeting" },
      { label: "history" },
      { label: "brand" },
      { label: "ci" },
    ],
  },
  {
    label: "story",
    children: [{ label: "news" }, { label: "notice" }, { label: "simpacdaum" }, { label: "social-channel" }],
  },
  {
    label: "ir",
    children: [{ label: "stock" }, { label: "disclosure" }, { label: "financials" }, { label: "archive" }],
  },
  {
    label: "esg",
    children: [{ label: "esg-overview" }, { label: "environment" }, { label: "social" }, { label: "governance" }],
  },
];

const gnb = {
  first: -1,
  second: -1,
  conatiner: null,
  gnbList: null,

  init() {
    this.header = document.querySelector("#dHead");
    this.container = document.querySelector("#dBody");

    if (!this.container) return;

    this.gnbList = document.querySelector(".gnb-list");

    this.indexSet();

    if (this.second >= 0) {
      this.header.classList.add("active");
      common.gnbEnterSort(this.first);
    }
  },

  indexSet() {
    const classList = Array.from(this.container.classList);
    let firstIndex = -1;
    let secondIndex = -1;
    let cloneSnb;

    // 1Depth 탐색
    menus.forEach((menu, i) => {
      if (classList.includes(menu.label)) {
        firstIndex = i;

        // 2Depth 탐색 (있을 때만)
        if (menu.children) {
          menu.children.forEach((child, j) => {
            if (classList.includes(child.label)) {
              secondIndex = j;
            }
          });
        }
      }
    });

    this.first = firstIndex;
    this.second = secondIndex;

    console.log("one depth ::", this.first, "two depth ::", this.second);

    if (this.gnbList && this.first >= 0) {
      this.gnbList.querySelectorAll(".gnb-cell").forEach((el, idx) => {
        if (this.first === idx) {
          el.classList.add("active");

          const snbList = el.querySelector(".snb");
          if (snbList) {
            if (this.second >= 0) {
              el.querySelectorAll(".snb-cell").forEach((el, idx) => {
                //console.log(idx);
                el.classList.toggle("active", this.second === idx);
              });
              cloneSnb = snbList.outerHTML;
            }
          }
        } else {
          el.classList.remove("active");
        }
      });
    }

    if (this.header && cloneSnb) {
      const headerTab = document.createElement("div");
      const headerTabOuter = document.createElement("div");
      const headerTabInner = document.createElement("div");
      headerTab.classList.add("header-tab");
      headerTabOuter.classList.add("header-tab-outer");
      headerTabInner.classList.add("header-tab-inner");
      headerTabOuter.append(headerTabInner);
      headerTab.append(headerTabOuter);
      headerTabInner.innerHTML = cloneSnb;
      this.header.append(headerTab);
      document.querySelector("#wrap").classList.add("is-page-tab");
    }
  },
};

const footer = {
  active: false,
  container: null,
  tweeners: {},
  scenes: {},
  lottieLogo: null,

  init() {
    this.container = document.querySelector(".footer-wrap");

    if (!this.container) return;

    console.log("footer init");
    this.active = true;

    this.lottieLogo = document.querySelector("#footerLogo");

    this.lottieLogo = document.createElement("dotlottie-player");
    this.lottieLogo.id = "footerLogo";
    this.lottieLogo.src = "/resources/_asset/kr/images/lottie/footer-logo.json";
    this.lottieLogo.background = "transparent";
    this.lottieLogo.style.width = "100%";
    this.lottieLogo.style.height = "auto";

    this.lottieLogo.addEventListener("ready", () => {
      //console.log(this);
      this.lottieLogo.stop();
      this.lottieLogo.play();
    });

    this.container.querySelector(".footer-logo").appendChild(this.lottieLogo);

    this.descEl = this.container.querySelectorAll(".footer-headline .effect-sentence");

    document.body.addEventListener("click", (e) => {
      // 드롭다운 메뉴 버튼 클릭 시
      if (e.target.closest(".footer-family .btn-dropdown-nav")) {
        const footerFamilyEl = e.target.closest(".footer-family");
        const isActive = footerFamilyEl.classList.contains("active");

        const innerHeight = isActive
          ? 0
          : footerFamilyEl.querySelector(".dropdown-list").getBoundingClientRect().height;
        const outerEl = footerFamilyEl.querySelector(".dropdown-data");

        outerEl.style.height = innerHeight + "px";

        if (footerFamilyEl) footerFamilyEl.classList.toggle("active");

        clearTimeout(this.footerFamilyTimer);
        this.footerFamilyTimer = setTimeout(() => {}, 410);
      }

      // 푸터 외 영역 클릭 시
      const footerDropMenu = document.querySelector(".footer-family");
      if (footerDropMenu) {
        if (footerDropMenu.classList.contains("active") && !e.target.closest(".footer-family")) {
          footerDropMenu.querySelector(".dropdown-data").style.height = "0px";
          footerDropMenu.classList.remove("active");
        }
      }
    });

    this.scene();
  },
  sceneReset() {
    //ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    if (this.tweeners) {
      Object.keys(this.tweeners).forEach((key) => {
        const st = this.tweeners[key];
        //console.log(st);

        if (!st) return;
        if (typeof st.kill === "function") st.kill(true);

        if (st.scrollTrigger && typeof st.scrollTrigger.kill === "function") {
          st.scrollTrigger.kill(true);
        }

        delete this.tweeners[key];
      });
    }
  },

  scene() {
    this.tweeners.logo = ScrollTrigger.create({
      trigger: this.container,
      start: () => window.innerHeight * 0.15 + " 100%",
      end: () => "+=" + 1,
      scrub: false,
      markers: false,
      onEnter: () => {
        //console.log('on enter');
        this.lottieLogo.stop();
        this.lottieLogo.play();
      },
      onLeaveBack: () => {
        //console.log('on leave Back');
        this.lottieLogo.stop();
      },
    });

    let descTrigger = 0;

    if (window.innerWidth > 880) {
      descTrigger = 350;
    } else {
      descTrigger = 410;
    }

    this.tweeners.desc1 = ScrollTrigger.create({
      trigger: this.container,
      start: () => 0 + " 100%",
      end: () => "+=" + 1,
      scrub: false,
      markers: false,
      onEnter: () => {
        //console.log('on enter');        
        this.lottieLogo.seek(0);
        this.lottieLogo.stop();
        this.descEl.forEach((el) => el.classList.remove("active"));
      },
      onLeaveBack: () => {
        //console.log('on leave Back');
        this.lottieLogo.seek(0);
        this.lottieLogo.stop();
        this.descEl.forEach((el) => el.classList.remove("active"));
      },
    });

    this.tweeners.desc2 = ScrollTrigger.create({
      trigger: this.container,
      start: () => descTrigger + " 100%",
      end: () => "+=" + 1,
      scrub: false,
      markers: false,
      onEnter: () => {
        //console.log('on enter');
        this.descEl.forEach((el) => el.classList.add("active"));
      },
      onLeaveBack: () => {
        //console.log('on leave Back');
        this.descEl.forEach((el) => el.classList.remove("active"));
      },
    });
  },

  reset() {
    if (this.active) {
      console.log("footer reset");
      this.sceneReset();
      this.scene();
    }
  },
};

const tab = {
  container: null,

  init() {
    this.container = document.querySelectorAll(".page-tab-group");

    if (!this.container) return;

    document.body.addEventListener("click", (e) => {
      if (e.target.closest(".btn-tab-nav")) {
        //console.log('menu click');
        const btns = e.target.closest(".btn-tab-nav");
        const index = Array.from(btns.parentElement.children).indexOf(btns);
        this.sort(index);
      }
    });

    this.sort(0);
  },

  sort(_index) {
    this.container.forEach((el, idx) => {
      const navEl = el.querySelector(".page-tab-nav");
      const panelEl = el.querySelector(".page-tab-data");

      if (navEl) {
        navEl.querySelectorAll(".btn-tab-nav").forEach((el, idx) => el.classList.toggle("active", idx === _index));
      }

      if (panelEl) {
        panelEl.querySelectorAll(".tab-panel").forEach((el, idx) => {
          el.classList.toggle("active", idx === _index);
          if (idx === _index) {
            const iframe = el?.querySelector("iframe");
            if (iframe?.iFrameResizer) {
              requestAnimationFrame(() => {
                setTimeout(() => iframe.iFrameResizer.resize(), 50);
              });
            }
          }
        });
      }
    });
  },
};

const countDown = {
  stage: {
    width: 0,
    height: 0,
    top: 0,
    ptop: 0,
    pw: -1,
  },
  items: null,
  observer: null,
  scenes: {},
  tweeners: {},

  init() {
    const CountUpCtor = window.CountUp || (window.countUp && window.countUp.CountUp);
    if (!CountUpCtor) {
      console.error("CountUp ctor not found");
      return;
    }

    this.items = document.querySelectorAll(".count-value");

    if (!this.items || this.items.length == 0) return;

    this.itemsGroup = document.querySelectorAll(".count-group");

    const toNumber = (v) => parseFloat(String(v).replace(/,/g, "")) || 0;
    const ensureInstance = (el) => {
      if (el._cu) return el._cu;
      const target = toNumber(el.dataset.target || el.textContent);
      const decimals =
        el.dataset.decimals != null ? parseInt(el.dataset.decimals, 10) || 0 : Math.round(target) !== target ? 1 : 0;

      const opts = {
        duration: Number(el.dataset.duration || 2),
        separator: el.dataset.separator || ",",
        decimal: el.dataset.decimal || ".",
        decimalPlaces: decimals,
        useGrouping: el.dataset.grouping !== "false",
        useEasing: el.dataset.easing !== "false",
        startVal: Number(el.dataset.startval || 0),
        //useEasing: false,
      };

      el._targetVal = target;
      el._cu = new CountUpCtor(el, target, opts);
      return el._cu;
    };

    const startCount = (el) => {
      const cu = ensureInstance(el);
      if (cu.error) {
        console.error(cu.error);
        return;
      }
      cu.reset(); // 항상 0(혹은 startVal)에서 다시
      cu.start();
    };

    const resetCount = (el) => {
      if (!el._cu) return;
      el._cu.reset(); // 영역 벗어날 때 리셋
    };

    const intersectionObserver = () => {
      const effectObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target;
            const bounding = entry.boundingClientRect;

            if (entry.isIntersecting) {
              // 아래에서 올라올 때만 시작
              if (bounding.top > 0) startCount(el);
            } else {
              // 아래로 사라질 때만 리셋
              if (bounding.top > 0) resetCount(el);
            }
          });
        },
        {
          root: null,
          threshold: 0,
          rootMargin: "0px 0px 1px 0px",
        }
      );

      this.items.forEach((el) => {
        // 초기 화면 진입된 상태면 바로 한 번 실행
        const elTop = el.getBoundingClientRect().top + window.scrollY;
        const scrollY = window.scrollY;
        const windowH = window.innerHeight;

        if (!el.classList.contains("auto")) {
          if (scrollY + windowH > elTop) {
            startCount(el);
          }
          effectObserver.observe(el);
        }
      });
    };

    intersectionObserver();

    this.resize();
    this.scroll();

    window.addEventListener("resize", this.resizeHand.bind(this));
    window.addEventListener("scroll", this.scroll.bind(this));
  },

  toNumber(v) {
    return parseFloat(String(v).replace(/,/g, "")) || 0;
  },
  ensureInstance(el) {
    const CountUpCtor =
      (window.CountUp && (window.CountUp.CountUp || window.CountUp)) || (window.countUp && window.countUp.CountUp); // 혹시 소문자로 올라온 경우 대비

    if (!CountUpCtor) {
      console.error("CountUp ctor not found", window.CountUp);
      return null;
    }
    if (el._cu) return el._cu;
    const target = this.toNumber(el.dataset.target || el.textContent);
    const decimals =
      el.dataset.decimals != null ? parseInt(el.dataset.decimals, 10) || 0 : Math.round(target) !== target ? 1 : 0;

    const opts = {
      duration: Number(el.dataset.duration || 2),
      separator: el.dataset.separator || ",",
      decimal: el.dataset.decimal || ".",
      decimalPlaces: decimals,
      useGrouping: el.dataset.grouping !== "false",
      useEasing: el.dataset.easing !== "false",
      startVal: Number(el.dataset.startval || 0),
    };

    el._targetVal = target;
    el._cu = new CountUpCtor(el, target, opts);
    return el._cu;
  },

  startCount(el) {
    const cu = this.ensureInstance(el);
    if (cu.error) {
      console.error(cu.error);
      return;
    }
    cu.reset(); // 항상 0(혹은 startVal)에서 다시
    cu.start();
  },
  resetCount(el) {
    if (!el._cu) return;
    el._cu.reset(); // 영역 벗어날 때 리셋
  },
  sceneReset() {
    //console.log("--- history scene reset ---");
    //ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    if (this.tweeners) {
      Object.keys(this.tweeners).forEach((key) => {
        const st = this.tweeners[key];
        //console.log(st);

        if (!st) return;
        if (typeof st.kill === "function") st.kill(true);

        if (st.scrollTrigger && typeof st.scrollTrigger.kill === "function") {
          st.scrollTrigger.kill(true);
        }

        delete this.tweeners[key];
      });
    }
  },

  scene() {
    console.log("--- countdown scene set --- ");
    const _this = this;

    this.itemsGroup.forEach((el, idx) => {
      this.tweeners["group-" + idx] = ScrollTrigger.create({
        trigger: el,
        start: () => "0% 100%",
        end: () => "+=" + 1,
        scrub: false,
        markers: false,
        onEnter: () => {
          //console.log('on enter');
          el.querySelectorAll(".count-value").forEach((el) => {
            if (!el.classList.contains("active")) {
              this.resetCount(el);
              this.startCount(el);
            }
            el.classList.add("active");
          });
        },
        onLeaveBack: () => {
          //console.log('on leave Back');
        },
      });
    });
  },

  resize() {
    this.stage.pw = this.stage.width;
    this.stage.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.stage.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    if (this.stage.pw != this.stage.width) {
      this.sceneReset();
      this.scene();
    }
  },

  resizeHand() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => this.resize(), 200);
  },

  scroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
  },
};

const effectSentence = {
  items: null,
  resizeTimer: null,

  init() {
    this.items = document.querySelectorAll(".effect-sentence");

    if (!this.items) return;

    const resizeHand = () => {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => this.resize(), 150);
    };

    this.resize();
    document.fonts?.ready?.then(() => this.resize());

    window.addEventListener("resize", resizeHand);
  },
  resize() {
    this.items.forEach((el) => {
      if (el.classList.contains("auto")) {
        const text = el.dataset.origin || el.textContent.trim();
        if (!el.dataset.origin) el.dataset.origin = text;
        el.textContent = text;

        // effect-sentence의 실제 태그 타입 추출 (div / span 등)
        const tagName = el.tagName.toLowerCase();

        const range = document.createRange();
        const lines = [];
        let start = 0;
        let lastTop = null;

        for (let i = 1; i <= text.length; i++) {
          range.setStart(el.firstChild, i - 1);
          range.setEnd(el.firstChild, i);
          const rects = range.getClientRects();
          if (!rects.length) continue;
          const top = Math.round(rects[0].top);

          if (lastTop === null) {
            lastTop = top;
          } else if (top !== lastTop) {
            lines.push([start, i - 1]);
            start = i - 1;
            lastTop = top;
          }
        }
        lines.push([start, text.length]);

        const frag = document.createDocumentFragment();

        lines.forEach(([s, e]) => {
          const sentence = document.createElement(tagName);
          sentence.className = "sentence";

          const value = document.createElement(tagName);
          value.className = "value";
          value.textContent = text.slice(s, e);

          sentence.appendChild(value);
          frag.appendChild(sentence);
        });

        el.innerHTML = "";
        el.appendChild(frag);
      }
      el.classList.add("ready");
    });

    //console.log("resize");
  },
};

const brand = {
  stage: {
    width: 0,
    height: 0,
    top: 0,
    ptop: 0,
    pw: -1,
  },
  container: null,
  elements: {},
  videos: {},
  scenes: {},
  tweeners: {},
  resizeTimer: null,
  introDelay: 0,
  mouseX: 0,
  mouseY: 0,
  lastHover: null,

  init() {
    const _this = this;
    this.container = document.querySelector(".brand-wrap");

    if (!this.container) return;
    const headerEl = document.querySelector("#dHead");

    
    document.documentElement.classList.add('black');

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", "#131415");
    }

    if (headerEl) {
      headerEl.classList.add("black");
    }

    document.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    this.elements.introduce = this.container.querySelector(".brand-introduce");
    this.elements.slogan = this.container.querySelector(".brand-slogan");
    this.elements.special = this.container.querySelector(".brand-special");
    this.elements.headline = this.container.querySelector(".brand-headline");

    document.querySelector("#dFoot").classList.add("hide");

    this.videos.introducePc = createVideoPlayer({
      el: this.elements.introduce.querySelector(".pc-video-block .video-wrap"),
      autoPlay: false,
      loop: false,
      progress: false,
      eagerInit: true,
      preload: "metadata",
      onInit() {
        //console.log('onInit', this);
        //console.log("introduce pc ready");
        //console.log('pc total duration :: ' + _this.videos.introducePc.getDuration());
        if (window.innerWidth > 768) _this.introDelay = Math.floor(_this.videos.introducePc.getDuration()) * 1000;

        _this.introStart();
      },
      onPlay() {
        //console.log('Playing', this.idx);
      },
      onEnd() {
        //console.log("Video Ended");
        //this.introEnd( 'intro' );
        console.log("introduce pc end");
        //if(window.innerWidth > 768) _this.introEnd();
      },
    });
    this.videos.introduceMo = createVideoPlayer({
      el: this.elements.introduce.querySelector(".mo-video-block .video-wrap"),
      autoPlay: false,
      loop: false,
      progress: false,
      eagerInit: true,
      preload: "metadata",
      onInit() {
        //console.log('onInit', this);
        //console.log("introduce mo ready");
        //console.log('mo total duration :: ' + _this.videos.introduceMo.getDuration());
        if (window.innerWidth <= 768) _this.introDelay = Math.floor(_this.videos.introduceMo.getDuration()) * 1000;
        //if(window.innerWidth <= 768) this.introStart();
      },
      onPlay() {
        //console.log('Playing', this.idx);
      },
      onEnd() {
        //console.log("Video Ended");
        //this.introEnd( 'intro' );
        console.log("introduce mo end");
        //if(window.innerWidth <= 768) _this.introEnd();
      },
    });

    this.videos.headlinePc = createVideoPlayer({
      el: this.elements.headline.querySelector(".pc-video-block .video-wrap"),
      autoPlay: false,
      loop: false,
      progress: false,
      eagerInit: true,
      preload: "metadata",
      onInit() {
        //console.log('onInit', this);
        console.log("headline pc ready");
        //console.log('pc total duration :: ' + _this.videos.introducePc.getDuration());
      },
      onPlay() {
        //console.log('Playing', this.idx);
      },
      onEnd() {},
    });
    this.videos.headlineMo = createVideoPlayer({
      el: this.elements.headline.querySelector(".mo-video-block .video-wrap"),
      autoPlay: false,
      loop: false,
      progress: false,
      eagerInit: true,
      preload: "metadata",
      onInit() {
        //console.log('onInit', this);
        console.log("headline mo ready");
      },
      onPlay() {
        //console.log('Playing', this.idx);
      },
      onEnd() {},
    });

    this.worksCircles = [
      { sel: ".circle-1", minDur: 4, maxDur: 10, delay: 0.0, initSign: { x: +1, y: +1 } }, // ↗
      { sel: ".circle-2", minDur: 4, maxDur: 10, delay: 0.0, initSign: { x: -1, y: +1 } }, // ↖
      //{ sel: ".circle-3", minDur: 4, maxDur: 10, delay: 0.0, initSign: { x: +1, y: -1 } }, // ↘
      //{ sel: ".circle-4", minDur: 4, maxDur: 10, delay: 0.0, initSign: { x: +1, y: -1 } }, // ↘
    ];

    window.addEventListener("resize", this.resizeHandler.bind(this));
    window.addEventListener("scroll", this.scroll.bind(this));
  },

  scroll() {
    if (!this.mouseX && !this.mouseY) return; // 아직 마우스 안 움직였으면 패스

    const el = document.elementFromPoint(this.mouseX, this.mouseY);
    if (!el) return;

    const obj = el.closest(".item-visual .obj");

    if (this.lastHover && this.lastHover !== obj) {
        this.lastHover.classList.remove("is-hover");
    }

    if (obj) {
      obj.classList.add("is-hover");
      this.lastHover = obj;
    } else {
        this.lastHover = null;
    }
  },

  resizeHandler() {
    this.resize();
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      //this.resize();
    }, 150);
  },

  resize() {
    this.stage.pw = this.stage.width;
    this.stage.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.stage.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    if (this.stage.pw != this.stage.width) {
      console.log("brand resize");
      this.sceneReset();
      this.scene();
    }
  },

  sceneReset() {
    console.log("--- brand scene reset ---");
    //ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    if (this.tweeners) {
      Object.keys(this.tweeners).forEach((key) => {
        const st = this.tweeners[key];
        //console.log(st);

        if (!st) return;
        if (typeof st.kill === "function") st.kill(true);

        if (st.scrollTrigger && typeof st.scrollTrigger.kill === "function") {
          st.scrollTrigger.kill(true);
        }

        delete this.tweeners[key];
      });
    }
  },

  scene() {
    console.log("--- brand scene set --- ");
    const _this = this;

    const stageH = this.elements.introduce.querySelector(".sticky").getBoundingClientRect().height;

    //console.log('stage height :: ' + stageH)

    this.tweeners.introduce1 = gsap.timeline({
      scrollTrigger: {
        trigger: this.elements.slogan,
        start: "0% 100%",
        end: () => "+=" + stageH * 0.7,
        scrub: true,
        markers: false,
      },
    });

    this.tweeners.introduce1.fromTo(
      this.elements.introduce.querySelector(".sticky"),
      {
        //y : '0%',
        opacity: 1,
      },
      {
        //y : '-5%',
        opacity: 0,
        ease: "none",
      },
      0
    );

    this.tweeners.slogan1 = ScrollTrigger.create({
      trigger: this.elements.slogan.querySelector(".brand-slogan-1 .scene-1 .txt"),
      start: () => 0 + " 100%",
      end: () => "+=" + 1,
      scrub: false,
      markers: false,
      onEnter: () => {
        //console.log('on enter');
        this.elements.slogan.querySelector(".brand-slogan-1 .scene-1").classList.add("active");
        this.elements.slogan.querySelector(".brand-slogan-1 .scene-2").classList.remove("active");
        this.elements.slogan
          .querySelectorAll(".brand-slogan-1 .scene-1 .txt .effect-sentence")
          .forEach((el) => el.classList.add("active"));

        this.worksCircles.forEach((conf, i) => {
          const container = this.elements.slogan.querySelector(".brand-slogan-background .circles");
          const el = container.querySelector(conf.sel);
          if (!el) return;

          const initial = getInitialOffset(conf.initSign);

          const state = {
            prev: { rx: initial.rx, ry: initial.ry },
            next: null,
          };
          gsap.killTweensOf(el);
          gsap.set(el, { x: 0, y: 0 });
          gsap.to(el, {
            duration: durRand(3, 6),
            delay: 0,
            scaleY: rand(0.8, 1),
            ease: "sine.inOut",
            xPercent: initial.x,
            //y: initial.y,
            onComplete: () => {
              state.next = getOppositeOffset(state.prev.rx, state.prev.ry, el.getAttribute("data-type"));
              loopOpposite(el, conf.minDur, conf.maxDur, state);
            },
          });
        });
      },
      onLeaveBack: () => {
        //console.log('on leave Back');
        this.elements.slogan
          .querySelectorAll(".brand-slogan-1 .scene-1 .txt .effect-sentence")
          .forEach((el) => el.classList.remove("active"));

        /*
        this.worksCircles.forEach((conf, i) => {
          const container = this.elements.slogan.querySelector(".brand-slogan-background .circles");
          const el = container.querySelector(conf.sel);
          if (!el) return;
          gsap.killTweensOf(el);
          gsap.set(el, { x: 0, y: 0, clearProps: "x,y" });
          if (gsap.core && gsap.core.getCache) {
            gsap.core.getCache(el).uncache = 1;
          }
        });
        */
      },
    });

    this.tweeners.slogan2 = ScrollTrigger.create({
      trigger: this.elements.slogan,
      start: () => stageH * 2 + " 100%",
      end: () => "+=" + 1,
      scrub: false,
      markers: false,
      onEnter: () => {
        //console.log('on enter');
        this.elements.slogan.querySelector(".brand-slogan-1 .scene-1").classList.remove("active");
        this.elements.slogan.querySelector(".brand-slogan-1 .scene-2").classList.add("active");
        this.elements.slogan
          .querySelectorAll(".brand-slogan-1 .scene-1 .txt .effect-sentence")
          .forEach((el) => el.classList.remove("active"));
        this.elements.slogan
          .querySelectorAll(".brand-slogan-1 .scene-2 .txt .effect-sentence")
          .forEach((el) => el.classList.add("active"));
      },
      onLeaveBack: () => {
        //console.log('on leave Back');
        this.elements.slogan.querySelector(".brand-slogan-1 .scene-1").classList.add("active");
        this.elements.slogan.querySelector(".brand-slogan-1 .scene-2").classList.remove("active");
        this.elements.slogan
          .querySelectorAll(".brand-slogan-1 .scene-1 .txt .effect-sentence")
          .forEach((el) => el.classList.add("active"));
        this.elements.slogan
          .querySelectorAll(".brand-slogan-1 .scene-2 .txt .effect-sentence")
          .forEach((el) => el.classList.remove("active"));
      },
    });

    this.tweeners.slogan3 = ScrollTrigger.create({
      trigger: this.elements.slogan,
      start: () => stageH * 1 + " 100%",
      end: () => "+=" + stageH * 1.5,
      scrub: false,
      markers: false,
      onEnter: () => {
        //console.log('on enter');
        this.elements.slogan.querySelector(".brand-slogan-background .circles").classList.add("show");
        this.elements.slogan.querySelector(".brand-slogan-background").classList.add("show");
      },
      onEnterBack: () => {
        this.elements.slogan.querySelector(".brand-slogan-background .circles").classList.add("show");
        this.elements.slogan.querySelector(".brand-slogan-background").classList.add("show");
      },
      onLeave: () => {
        //console.log('on enter');
        this.elements.slogan.querySelector(".brand-slogan-background .circles").classList.remove("show");
        this.elements.slogan.querySelector(".brand-slogan-background").classList.remove("show");
      },
      onLeaveBack: () => {
        //console.log('on leave Back');
        this.elements.slogan.querySelector(".brand-slogan-background .circles").classList.remove("show");
        this.elements.slogan.querySelector(".brand-slogan-background").classList.remove("show");
      },
    });

    this.tweeners.slogan4 = ScrollTrigger.create({
      trigger: this.elements.slogan.querySelector(".brand-slogan-2"),
      start: () => 0 + " 100%",
      end: () => "+=" + 1,
      scrub: false,
      markers: false,
      onEnter: () => {
        //console.log('on enter');
        this.elements.slogan
          .querySelectorAll(".brand-slogan-2 .list-cell")
          .forEach((el, idx) => el.classList.toggle("active", idx === 0));
        this.elements.slogan
          .querySelectorAll(".brand-slogan-2 .swiper-pagination-bullet")
          .forEach((el, idx) => el.classList.toggle("active", idx === 0));
      },
      onLeaveBack: () => {
        //console.log('on leave Back');
        this.elements.slogan
          .querySelectorAll(".brand-slogan-2 .list-cell")
          .forEach((el, idx) => el.classList.toggle("active", idx === 0));
        this.elements.slogan
          .querySelectorAll(".brand-slogan-2 .swiper-pagination-bullet")
          .forEach((el, idx) => el.classList.toggle("active", idx === 0));
      },
    });

    this.tweeners.slogan5 = ScrollTrigger.create({
      trigger: this.elements.slogan.querySelector(".brand-slogan-2"),
      start: () => stageH * 1.5 + " 100%",
      end: () => "+=" + 1,
      scrub: false,
      markers: false,
      onEnter: () => {
        //console.log('on enter');
        this.elements.slogan
          .querySelectorAll(".brand-slogan-2 .list-cell")
          .forEach((el, idx) => el.classList.toggle("active", idx === 1));
        this.elements.slogan
          .querySelectorAll(".brand-slogan-2 .swiper-pagination-bullet")
          .forEach((el, idx) => el.classList.toggle("active", idx === 1));
      },
      onLeaveBack: () => {
        //console.log('on leave Back');
        this.elements.slogan
          .querySelectorAll(".brand-slogan-2 .list-cell")
          .forEach((el, idx) => el.classList.toggle("active", idx === 0));
        this.elements.slogan
          .querySelectorAll(".brand-slogan-2 .swiper-pagination-bullet")
          .forEach((el, idx) => el.classList.toggle("active", idx === 0));
      },
    });

    this.tweeners.slogan6 = gsap.timeline({
      scrollTrigger: {
        trigger: this.elements.slogan.querySelector(".brand-slogan-2"),
        start: "0% 100%",
        end: () => "+=" + stageH * 1,
        scrub: true,
        markers: false,
      },
    });

    this.tweeners.slogan6.fromTo(
      this.elements.slogan.querySelector(".brand-slogan-2 .background"),
      {
        y: "10%",
      },
      {
        y: "0%",
        ease: "none",
      },
      0
    );

    this.tweeners.slogan6.fromTo(
      this.elements.slogan.querySelector(".brand-slogan-2 .data"),
      {
        y: "15%",
      },
      {
        y: "0%",
        ease: "none",
      },
      0
    );

    this.tweeners.special1 = gsap.timeline({
      scrollTrigger: {
        trigger: this.elements.special,
        start: "0% 100%",
        end: () => "+=" + stageH * 0.7,
        scrub: true,
        markers: false,
        onEnter: () => {
          //console.log('on enter');
          this.elements.slogan.querySelector(".brand-slogan-2 .dissolve").classList.add("active");
        },
        onLeaveBack: () => {
          //console.log('on leave Back');
          this.elements.slogan.querySelector(".brand-slogan-2 .dissolve").classList.remove("active");
        },
      },
    });

    this.tweeners.special1.fromTo(
      this.elements.slogan.querySelector(".brand-slogan-2 .dissolve"),
      {
        //y : '0%',
        opacity: 0,
      },
      {
        //y : '-5%',
        opacity: 1,
        ease: "none",
      },
      0
    );

    this.tweeners.headline1 = ScrollTrigger.create({
      trigger: this.elements.headline,
      start: () => 0 + " 100%",
      end: () => "+=" + 1,
      scrub: false,
      markers: false,
      onEnter: () => {
        //console.log('on enter');
      },
      onLeaveBack: () => {
        //console.log('on leave Back');
        this.videos.headlinePc.seekTo(0);
        this.videos.headlineMo.seekTo(0);
        this.videos.headlinePc.stop();
        this.videos.headlineMo.stop();
      },
    });

    this.tweeners.headline2 = ScrollTrigger.create({
      trigger: this.elements.headline,
      start: () => 0 + " 0%",
      end: () => "+=" + 1,
      scrub: false,
      markers: false,
      onEnter: () => {
        //console.log('on enter');
        this.videos.headlinePc.seekTo(0);
        this.videos.headlinePc.play();
        this.videos.headlineMo.seekTo(0);
        this.videos.headlineMo.play();
      },
      onLeaveBack: () => {
        //console.log('on leave Back');
        //this.videos.headlinePc.seekTo(0);
        //this.videos.headlineMo.seekTo(0);
      },
    });

    this.elements.special.querySelectorAll(".list-items").forEach((el, idx) => {
      el.querySelector(".item-info").removeAttribute("style");
    });

    this.elements.special.querySelectorAll(".list-items").forEach((el, idx) => {
      const dataEl = el.querySelector('.item-data');
      const infoEl = el.querySelector(".item-info");
      this.tweeners[`headline3-${idx}`] = gsap.timeline({
        scrollTrigger: {
          trigger: dataEl,
          start: () => 0 + " 100%",
          end: () => "+=" + stageH * 1,
          scrub: true,
          markers: false,
        },
      });

      this.tweeners[`headline3-${idx}`].fromTo(
        infoEl,
        {
          y: "25%",
        },
        {
          y: "0%",
          ease: "none",
        },
        0
      );
    });
  },
  introStart() {
    console.log("intro start");

    footer.sceneReset();

    setTimeout(() => {
      this.videos.introducePc.seekTo(0);
      this.videos.introducePc.play();
      this.videos.introduceMo.seekTo(0);
      this.videos.introduceMo.play();
    }, 100);

    setTimeout(() => {
      this.elements.introduce.querySelectorAll(".effect-sentence").forEach((el) => el.classList.add("active"));
    }, 500);

    if (this.introDelay == 0) this.introDelay = 5000;

    setTimeout(() => {
      this.introEnd();
    }, this.introDelay + 100);

    setTimeout(() => {
      if (!this.container.classList.contains("ready")) this.introEnd();
    }, this.introDelay * 2);

    //console.log("intro delay :: " + this.introDelay);
  },

  introEnd() {
    console.log("intro end");
    this.container.classList.add("ready");

    document.querySelector("#dFoot").classList.remove("hide");
    setTimeout(() => {
      this.resize();
    }, 100);

    setTimeout(() => {      
      if (footer) footer.reset();
    }, 200);
  },
};

const history = {
  stage: {
    width: 0,
    height: 0,
    top: 0,
    ptop: 0,
    pw: -1,
  },
  container: null,
  elements: {},
  scenes: {},
  tweeners: {},
  cur: 0,
  len: -1,
  sectionPosition: [],
  navTimer: null,
  resizeTimer: null,

  init() {
    const _this = this;
    this.container = document.querySelector(".history-wrap");

    if (!this.container) return;

    this.elements.items = this.container.querySelectorAll(".history-items");
    this.len = this.elements.items.length;
    this.elements.nav = this.container.querySelector(".history-nav");
    this.elements.navData = this.elements.nav.querySelector(".nav-data");
    this.elements.navItems = this.elements.nav.querySelectorAll(".btn-nav");
    this.elements.navItems.forEach((el) => {
      el.addEventListener("click", this.onNavMenuClick.bind(this));
    });

    this.elements.nav.querySelector(".btn-toggle").addEventListener("click", this.onToggleMenuClick.bind(this));

    this.sectionPositonSort();

    imagesLoaded(document.body, { background: true }, () => {
      this.ready();
    });

    this.resize();
    this.scroll();

    window.addEventListener("load", this.load.bind(this));
    window.addEventListener("resize", this.resizeHand.bind(this));
    window.addEventListener("scroll", this.scroll.bind(this));
  },

  onToggleMenuClick() {
    //this.elements.nav.classList.toggle('active')
    this.navToggle();
  },

  navToggle() {
    if (this.elements.nav.classList.contains("active")) {
      this.elements.nav.classList.remove("active");
      this.scroll();
      clearTimeout(this.navTimer);
      this.navTimer = setTimeout(() => {}, 400);
    } else {
      this.elements.nav.classList.add("active");
      this.elements.navData.style.removeProperty("--index");
    }
  },

  onNavMenuClick(e) {
    if (e.currentTarget.tagName.toLowerCase() === "button") {
      this.sectionPositonSort();

      const btns = e.currentTarget;
      const index = Array.from(btns.parentNode.parentNode.children).indexOf(btns.parentNode);
      //const activeIndex = Math.abs(index - ( this.len -1 ));
      //const activeItems = this.elements.items[index];
      //const posY = window.pageYOffset + activeItems.getBoundingClientRect().top;
      let posY = this.sectionPosition[index].y + 0;
      //console.log(index + ' : ' + activeIndex);
      if (index == 0) {
        const itemVisualEl = this.elements.items[0].querySelector(".item-visual");
        posY =
          window.pageYOffset +
          (this.elements.items[0].getBoundingClientRect().top + itemVisualEl.getBoundingClientRect().height * 2);

        console.log(posY);
      }
      common.pageMove(posY);
      this.elements.nav.classList.remove("active");
    }
  },

  sectionPositonSort() {
    if (this.elements.items.length > 0) {
      this.elements.items.forEach((el, idx) => {
        this.sectionPosition[idx] = {
          y: window.pageYOffset + el.getBoundingClientRect().top,
          height: el.getBoundingClientRect().height,
        };
      });
    }
  },

  sceneReset() {
    console.log("--- history scene reset ---");
    //ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    if (this.tweeners) {
      Object.keys(this.tweeners).forEach((key) => {
        const st = this.tweeners[key];
        //console.log(st);

        if (!st) return;
        if (typeof st.kill === "function") st.kill(true);

        if (st.scrollTrigger && typeof st.scrollTrigger.kill === "function") {
          st.scrollTrigger.kill(true);
        }

        delete this.tweeners[key];
      });
    }
  },

  scene() {
    console.log("--- history scene set --- ");
    const _this = this;

    const stageW = window.innerWidth;
    const stageH = this.container.querySelector(".history-sticky").getBoundingClientRect().height;

    console.log("stage height :: " + stageH);

    this.elements.items.forEach((el, idx) => {
      el.querySelectorAll(".visual")?.forEach((el) => el.removeAttribute("style"));
      el.querySelectorAll(".obj")?.forEach((el) => el.removeAttribute("style"));
      el.querySelectorAll(".dimd")?.forEach((el) => el.removeAttribute("style"));
      el.querySelector(".item-visual")?.classList.remove("top", "fix");
      el.querySelector(".item-copy")?.classList.remove("hide");
      el.querySelector(".front-info")?.classList.remove("active");
      el.querySelector(".end-info")?.classList.remove("active");
    });

    if (window.innerWidth > 768) {
      this.tweeners.history11 = ScrollTrigger.create({
        trigger: this.elements.items[0],
        start: () => stageH * 2.5 + " 100%",
        end: () => "+=" + 1,
        scrub: false,
        markers: false,
        onEnter: () => {
          //console.log('on enter');
          this.elements.items[0].querySelector(".item-copy").classList.add("hide");
        },
        onLeaveBack: () => {
          //console.log('on leave Back');
          this.elements.items[0].querySelector(".item-copy").classList.remove("hide");
        },
      });

      this.tweeners.history12 = ScrollTrigger.create({
        trigger: this.elements.items[0],
        start: () => stageH * 2.5 + " 100%",
        end: () => "+=" + stageH * 1,
        scrub: false,
        markers: false,
        onEnter: () => {
          //console.log('on enter');
          this.elements.items[0].querySelector(".front-info").classList.add("active");
          this.elements.nav.classList.add("show");
        },
        onEnterBack: () => {
          this.elements.items[0].querySelector(".front-info").classList.add("active");
        },
        onLeave: () => {
          this.elements.items[0].querySelector(".front-info").classList.remove("active");
        },
        onLeaveBack: () => {
          //console.log('on leave Back');
          this.elements.items[0].querySelector(".front-info").classList.remove("active");
          this.elements.nav.classList.remove("show");
        },
      });

      this.tweeners.history13 = gsap.timeline({
        scrollTrigger: {
          trigger: this.elements.items[0],
          start: () => stageH * 3.5 + " 100%",
          end: () => "+=" + stageH * 1,
          scrub: true,
          markers: false,
        },
      });

      let endY = 136;
      let endX = 32;
      let endWidth = "23.54%"; // 기본값 (1025 이상)
      let endHeight = "0%";

      if (window.innerWidth <= 768) {
        endY = 136;
        endX = 24;
        endWidth = "22.65%";
      } else {
        endY = 136;
        endWidth = "23.54%";
        if (window.innerWidth > 1920) {
          const sideGap = (window.innerWidth - 1920) / 2;
          endX = sideGap + 32; // 1920 기준 좌측 여백 + 콘텐츠 여백
        } else {
          endX = 32; // 일반적인 1920 이하
        }
      }

      const widthPx = stageW * (parseFloat(endWidth) / 100);
      const aspect = 2.248 / 4; // 세로/가로
      const heightPx = widthPx * aspect;
      const heightPercent = (heightPx / stageH) * 100;
      endHeight = `${heightPx}`;

      this.tweeners.history13.fromTo(
        this.elements.items[0].querySelector(".item-visual .visual"),
        {
          //y : '0%',
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        },
        {
          //y : '-5%',
          top: endY,
          left: endX,
          width: endWidth,
          height: endHeight,
          ease: "none",
        },
        0
      );
      this.tweeners.history13.fromTo(
        this.elements.items[0].querySelector(".item-visual .visual .obj"),
        {
          //y : '0%',
          clipPath: "inset(0 round 0rem)",
        },
        {
          //y : '-5%',
          clipPath: "inset(0 round 0.5rem)",
          ease: "none",
        },
        0
      );
      this.tweeners.history13.fromTo(
        this.elements.items[0].querySelector(".item-visual .visual .dimd"),
        {
          //y : '0%',
          opacity: 1,
        },
        {
          //y : '-5%',
          opacity: 0,
          ease: "none",
        },
        0
      );

      this.tweeners.history14 = ScrollTrigger.create({
        trigger: this.elements.items[0],
        start: () => stageH * 4.0 + " 100%",
        end: () => "+=" + 1,
        scrub: false,
        markers: false,
        onEnter: () => {
          //console.log('on enter');
          this.elements.items[0].querySelector(".end-info").classList.add("active");
        },
        onLeaveBack: () => {
          //console.log('on leave Back');
          this.elements.items[0].querySelector(".end-info").classList.remove("active");
        },
      });

      this.tweeners.history15 = ScrollTrigger.create({
        trigger: this.elements.items[0],
        start: () => stageH * 4.5 + " 100%",
        end: () => "+=" + 1,
        scrub: false,
        markers: false,
        onEnter: () => {
          //console.log('on enter');
          this.elements.items[0].querySelector(".item-visual").classList.add("fix");
        },
        onLeaveBack: () => {
          //console.log('on leave Back');
          this.elements.items[0].querySelector(".item-visual").classList.remove("fix");
        },
      });

      this.elements.items.forEach((el, idx) => {
        if (!el.classList.contains("history-1")) {
          this.tweeners[`history1-1-${idx}`] = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: () => stageH * 0.5 * -1 + " 100%",
              end: () => "+=" + stageH * 1.5,
              scrub: true,
              markers: false,
            },
          });

          this.tweeners[`history1-1-${idx}`].fromTo(
            el.querySelector(".item-visual .visual"),
            {
              scale: 0,
            },
            {
              scale: 1,
              ease: "none",
            },
            0
          );

          this.tweeners[`history1-2-${idx}`] = ScrollTrigger.create({
            trigger: el,
            start: () => stageH * 1 - 5 + " 100%",
            end: () => "+=" + stageH * 1,
            scrub: false,
            markers: false,
            onEnter: () => {
              //console.log('on enter');
              el.querySelector(".front-info").classList.add("active");
            },
            onEnterBack: () => {
              el.querySelector(".front-info").classList.add("active");
            },
            onLeave: () => {
              el.querySelector(".front-info").classList.remove("active");
            },
            onLeaveBack: () => {
              //console.log('on leave Back');
              el.querySelector(".front-info").classList.remove("active");
            },
          });

          this.tweeners[`history1-3-${idx}`] = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: () => stageH * 2 + " 100%",
              end: () => "+=" + stageH * 1,
              scrub: true,
              markers: false,
              onEnter: () => {
                //console.log('on enter');
                el.querySelector(".item-visual").classList.add("top");
              },
              onLeaveBack: () => {
                //console.log('on leave Back');
                el.querySelector(".item-visual").classList.remove("top");
              },
            },
          });
          this.tweeners[`history1-3-${idx}`].fromTo(
            el.querySelector(".item-visual .visual"),
            {
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            },
            {
              //y : '-5%',
              top: endY,
              left: endX,
              width: endWidth,
              height: endHeight,
              ease: "none",
              immediateRender: false,
            },
            0
          );
          this.tweeners[`history1-3-${idx}`].fromTo(
            el.querySelector(".item-visual .visual .obj"),
            {
              //y : '0%',
              clipPath: "inset(0 round 0rem)",
            },
            {
              //y : '-5%',
              clipPath: "inset(0 round 0.5rem)",
              ease: "none",
            },
            0
          );

          this.tweeners[`history1-3-${idx}`].fromTo(
            el.querySelector(".item-visual .visual .dimd"),
            {
              //y : '0%',
              opacity: 1,
            },
            {
              //y : '-5%',
              opacity: 0,
              ease: "none",
            },
            0
          );
          this.tweeners[`history1-4-${idx}`] = ScrollTrigger.create({
            trigger: el,
            start: () => stageH * 2.5 + " 100%",
            end: () => "+=" + 1,
            scrub: false,
            markers: false,
            onEnter: () => {
              //console.log('on enter');
              el.querySelector(".end-info").classList.add("active");
            },
            onEnterBack: () => {
              //console.log('on enter');
              el.querySelector(".item-visual").classList.remove("fix");
            },
            onLeaveBack: () => {
              //console.log('on leave Back');
              el.querySelector(".end-info").classList.remove("active");
            },
          });

          this.tweeners[`history1-5-${idx}`] = ScrollTrigger.create({
            trigger: el,
            start: () => stageH * 3.0 + " 100%",
            end: () => "+=" + 1,
            scrub: false,
            markers: false,
            onEnter: () => {
              //console.log('on enter');
              el.querySelector(".item-visual").classList.add("fix");
            },
            onLeaveBack: () => {
              //console.log('on leave Back');
              el.querySelector(".item-visual").classList.remove("fix");
            },
          });
        }
      });

      this.tweeners.history16 = ScrollTrigger.create({
        trigger: this.container,
        start: () => "bottom bottom",
        end: () => "+=" + 1,
        scrub: false,
        markers: false,
        onEnter: () => {
          //console.log('on enter');
          this.elements.nav.classList.add("hide-bottom");
        },
        onLeaveBack: () => {
          //console.log('on leave Back');
          this.elements.nav.classList.remove("hide-bottom");
        },
      });
    } else {
      this.tweeners.history11 = ScrollTrigger.create({
        trigger: this.elements.items[0],
        start: () => stageH * 2.5 + " 100%",
        end: () => "+=" + 1,
        scrub: false,
        markers: false,
        onEnter: () => {
          //console.log('on enter');
          this.elements.items[0].querySelector(".item-copy").classList.add("hide");
        },
        onLeaveBack: () => {
          //console.log('on leave Back');
          this.elements.items[0].querySelector(".item-copy").classList.remove("hide");
        },
      });

      this.tweeners.history12 = ScrollTrigger.create({
        trigger: this.elements.items[0],
        start: () => stageH * 2.5 + " 100%",
        end: () => "+=" + stageH * 1,
        scrub: false,
        markers: false,
        onEnter: () => {
          //console.log('on enter');
          this.elements.items[0].querySelector(".front-info").classList.add("active");
          this.elements.nav.classList.add("show");
        },
        onLeaveBack: () => {
          //console.log('on leave Back');
          this.elements.items[0].querySelector(".front-info").classList.remove("active");
          this.elements.nav.classList.remove("show");
        },
      });
      this.tweeners.history13 = ScrollTrigger.create({
        trigger: this.container,
        start: () => "bottom bottom",
        end: () => "+=" + 1,
        scrub: false,
        markers: false,
        onEnter: () => {
          //console.log('on enter');
          this.elements.nav.classList.add("hide-bottom");
        },
        onLeaveBack: () => {
          //console.log('on leave Back');
          this.elements.nav.classList.remove("hide-bottom");
        },
      });
    }
    
  },

  load() {
    this.sectionPositonSort();
  },

  ready() {
    setTimeout(() => {
      this.elements.items[0].querySelectorAll(".effect-sentence").forEach((el) => el.classList.add("active"));
    }, 500);
    if(footer) footer.reset();
  },

  resize() {
    this.stage.pw = this.stage.width;
    this.stage.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.stage.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    if (this.stage.pw != this.stage.width) {
      this.sectionPositonSort();
      this.sceneReset();
      this.scene();
    }
  },

  resizeHand() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => this.resize(), 200);
  },

  scroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    if (this.elements.items.length > 0) {
      let space = 0;
      this.elements.items.forEach((el, idx) => {
        const elementY = this.sectionPosition[idx].y;
        const elementH = this.sectionPosition[idx].height;
        const parents = Array.from(el.parentNode.children);
        const index = parents.indexOf(el);

        space = window.innerHeight * 0.2;

        const startY = parseInt(Math.ceil(elementY - space));
        const endY = parseInt(Math.ceil(elementY + elementH - space));

        if (scrollY >= startY && scrollY <= endY) {
          this.cur = index;
        }

        const activeIndex = Math.abs(this.cur - (this.len - 1));

        if (!this.elements.nav.classList.contains("active"))
          this.elements.navData.style.setProperty("--index", activeIndex);
        //value.style.setProperty("--delay", _delay + "s");
        //console.log('scroll item cur :: ' + this.cur);
      });
    }
  },
};

const business = {
  container: null,
  elements: {},
  cur: 0,
  len: -1,
  resizeTimer: null,
  videos: [],
  videoStateIndex: 0,
  videosLen: -1,
  videoSwiper: null,
  swiper: null,
  swiperDuration: 1600,
  state: "",
  prevState : '',
  pageLoadState: { images: false, videos: false },
  pageLoadActive: false,
  pageActive: false,
  wheelAccum: 0,
  wheelLastT: 0,
  DELTA_THRESHOLD: 60,
  DECAY_MS: 150,
  paths: [    
    "/business/simpac",
    "/business/simpac-industries",
    "/business/simpac-kda",
    "/business/simpac-global",
    "/business/simpac-atelier",
  ],
  guideTimer : null,

  init() {
    const _this = this;
    this.container = document.querySelector(".business-wrap");

    if (!this.container) return;

    document.querySelector("#dFoot").classList.add("hide");

    this.setState('loading');

    imagesLoaded(document.body, { background: true }, () => {
      console.log("--- image loaded ---");
      this.pageLoadState.images = true;
      this.ready();
    });

    if ($WINDOW.getParameter("pageNum")) {
      const pageNumIndex = parseInt($WINDOW.getParameter("pageNum"));
      this.cur = pageNumIndex;
    }


    switch (location.pathname) {      
      case "/business/simpac":
        this.cur = 0;
        break;
      case "/business/simpac-industries":
        this.cur = 1;
        break;
      case "/business/simpac-kda":
        this.cur = 2;
        break;
      case "/business/simpac-global":
        this.cur = 3;
        break;
      case "/business/simpac-atelier":
        this.cur = 4;
        break;
      case "/business/index":
        this.cur = 0;
        break;
    }

    console.log('current path :: ' + location.pathname)
    console.log('current path cur :: ' + this.cur);
    
    this.elements.pop = document.querySelector(".business-pop");
    this.elements.popMenu = this.elements.pop.querySelector(".business-menu");
    this.elements.popMenuCells = this.elements.popMenu.querySelectorAll(".menu-cell");
    this.elements.popMenuItems = this.elements.popMenu.querySelectorAll(".btn-menu-nav");
    this.elements.detail = this.elements.pop.querySelector(".business-detail");
    this.elements.detailScroller = this.elements.detail.querySelector(".detail-scroller");
    this.elements.detailItems = this.elements.detail.querySelectorAll(".detail-items");

    this.elements.wrap = document.querySelector(".business-wrap");
    this.elements.view = this.elements.wrap.querySelector(".business-view");
    this.elements.viewCells = this.elements.view.querySelectorAll(".view-items");
    this.elements.data = this.elements.wrap.querySelector(".business-data");
    this.elements.dataCells = this.elements.data.querySelectorAll(".swiper-slide");
    this.elements.video = this.elements.wrap.querySelector(".business-video");
    this.elements.videoCells = this.elements.video.querySelectorAll(".swiper-slide");
    this.elements.viewVideos = this.elements.video.querySelectorAll(".video-wrap");
    this.videosLen = this.elements.viewVideos.length;

    this.elements.nav = document.querySelector(".business-nav");
    this.elements.btnMoreNav = this.elements.nav.querySelector(".btn-more-nav");
    this.elements.btnAllNav = this.elements.nav.querySelector(".btn-all-nav");
    this.elements.navThumbImgs = this.elements.btnMoreNav.querySelectorAll(".img");
    this.elements.navGuide = this.elements.nav.querySelector('.nav-scroller');

    this.elements.pop.querySelector(".btn-pop-close")?.addEventListener("click", this.popClose.bind(this));
    this.elements.popMenuItems.forEach((el) => el.addEventListener("click", this.onMenuClickHand.bind(this)));

    this.elements.videoCells.forEach((el) => {
      const videos = [];
      el.querySelectorAll(".video-wrap").forEach((el) => {
        const video = createVideoPlayer({
          el: el,
          autoPlay: false,
          loop: true,
          progress: false,
          eagerInit: true,
          preload: "metadata",
          onInit() {
            //console.log('onInit', this);
            _this.videoCheck();
          },
          onPlay() {},
          onEnd() {},
        });
        videos.push(video);
      });
      this.videos.push(videos);
    });

    this.elements.btnMoreNav?.addEventListener("click", this.onMoreClickHand.bind(this));
    this.elements.btnAllNav?.addEventListener("click", this.onAllClickHand.bind(this));

    const touchActive = common.touchDevice ? true : false;

    this.swiper = new Swiper(this.elements.data.querySelector(".swiper"), {
      loop: false,
      initialSlide: this.cur,
      slidesPerView: 1,
      simulateTouch: touchActive,
      watchSlidesProgress: true,
      speed: this.swiperDuration,
      resistanceRatio: 0,
      on: {
        init() {},
      },
    });

    this.videoSwiper = new Swiper(this.elements.video.querySelector(".swiper"), {
      loop: false,
      slidesPerView: 1,
      initialSlide: this.cur,
      simulateTouch: touchActive,
      watchSlidesProgress: true,
      speed: this.swiperDuration,
      resistanceRatio: 0,
    });

    this.elements.popMenu.addEventListener("click", (e) => {
      const menuList = this.elements.popMenu.querySelector(".menu-list");
      if (!menuList.contains(e.target)) {
        this.popClose();
      }
    });

    this.elements.detail.addEventListener("click", (e) => {
      const items = this.elements.detail.querySelectorAll(".detail-items .inner");
      let isInside = false;

      items.forEach((inner) => {
        if (inner.contains(e.target)) {
          isInside = true;
        }
      });

      if (!isInside) {
        this.popClose();
      }
    });

    this.swiper.controller.control = this.videoSwiper;
    this.videoSwiper.controller.control = this.swiper;

    this.elements.popMenuItems.forEach((item) => {
      // 1) 마우스 오버
      item.addEventListener("mouseenter", () => {
        item.classList.add("action");
      });

      // 2) 마우스 아웃
      item.addEventListener("mouseleave", () => {
        item.classList.remove("action");
      });

      // 3) 터치 시작
      item.addEventListener(
        "touchstart",
        (e) => {
          e.preventDefault();
          item.classList.add("action");
        },
        { passive: true }
      );

      // 4) 터치 이동 → 요소 밖으로 벗어나면 action 제거
      item.addEventListener(
        "touchmove",
        (e) => {
          const touch = e.touches[0];
          const rect = item.getBoundingClientRect();

          const inside =
            touch.clientX >= rect.left &&
            touch.clientX <= rect.right &&
            touch.clientY >= rect.top &&
            touch.clientY <= rect.bottom;

          if (!inside) {
            item.classList.remove("action");
          }
        },
        { passive: true }
      );

      // 5) 터치 끝 → 무조건 제거
      item.addEventListener("touchend", () => {
        item.classList.remove("action");
      });
    });

    this.swiper.on("progress", (swiper) => {
      const isDesktop = window.innerWidth > 480;
      let bgOffsetX = window.innerWidth > 1024 ? 100 : 0;
      const infoOffsetX = isDesktop ? swiper.width * 0.5 : 0;

      swiper.slides.forEach((slide, idx) => {
        const progress = slide.progress;
        //const visual = this.videoSwiper.slide.querySelector(".item-visual");
        const visual = this.videoSwiper.slides[idx].querySelector(".item-visual");
        const info = slide.querySelector(".item-data");

        if (visual) visual.style.transform = `translateX(${progress * -bgOffsetX}px)`;
        if (info) info.style.transform = `translateX(${progress * -infoOffsetX}px)`;
      });
    });

    this.swiper.on("setTransition", (swiper, speed) => {
      swiper.slides.forEach((slide) => {
        [".item-data"].forEach((selector) => {
          const el = slide.querySelector(selector);
          if (el) el.style.transition = `${speed}ms`;
        });
      });

      this.videoSwiper.slides.forEach((slide) => {
        [".item-visual"].forEach((selector) => {
          const el = slide.querySelector(selector);
          if (el) el.style.transition = `${speed}ms`;
        });
      });
    });

    this.swiper.on("slideChangeTransitionStart", (swiper, speed) => {
      //console.log("slide change transition Start");      
      /*
      setTimeout(()=>{
        this.guideReset();
      } , 100);
       */
      
    });

    this.swiper.on("slideChangeTransitionEnd", (swiper, speed) => {
      //console.log("slide change transition end");
      this.pageActive = false;
      /*
      this.guideOpen();
      */
      setTimeout(() => {
        this.videoActiveSort(this.cur);
      }, 100);
    });

    this.swiper.on("slideChange", (swiper, speed) => {
      console.log("slide change");
      this.cur = swiper.realIndex;
      this.detailSort(this.cur);
      this.menuSort(this.cur);
      this.pathSort(-1);
      setTimeout(() => {                
        this.viewActiveSort(this.cur);
      }, this.swiperDuration - 100);
      if (this.state != "pop") this.videoSort(this.cur);      
    });

    setTimeout(() => {
      this.pageLoadActive = true;
      this.ready();
    }, 3000);

    this.menuSort(this.cur);
    this.detailSort(this.cur);
    this.viewActiveSort(this.cur);

    this.elements.wrap?.addEventListener("wheel", this.onWheel.bind(this), { passive: false });
    window.addEventListener("load", this.load.bind(this));
    window.addEventListener("resize", this.resizeHand.bind(this));
  },

  setState(newState){
    this.prevState = this.state;
    this.state = newState;    
  },

  guideOpen(){
    this.elements.navGuide.classList.remove('close');    
    this.elements.navGuide.querySelector('.btn-split').classList.remove('hover');
    
    setTimeout(()=>{
      this.elements.navGuide.classList.add('open');
      this.elements.navGuide.querySelector('.btn-split').classList.add('hover');
    }, 50)
    clearTimeout(this.guideTimer);
    this.guideTimer = setTimeout(() => this.guideClose(), 3000);
  },

  guideClose(){
    this.elements.navGuide.classList.remove('open');
    this.elements.navGuide.classList.add('close');    
  },

  guideReset() {
    this.elements.navGuide.classList.remove('close' , 'open');    
    clearTimeout(this.guideTimer);
  },

  popOpen() {    
    this.setState('pop');
    this.videoActiveSort(-1);
    this.elements.detailScroller.scrollTo(0, 0);
    if (this.elements.pop) this.elements.pop.classList.add("active");
  },

  popClose() {   
    this.setState('ready');
    if (this.elements.pop) this.elements.pop.classList.remove("active");
    this.videoSort(this.cur);
    this.pathSort(-1);
  },

  viewTextSort(_index) {
    this.elements.viewCells.forEach((el, idx) => {
      el.querySelectorAll(".effect-sentence").forEach((sentence) => {
        if (idx === _index) {
          sentence.classList.add("active");
        }
      });
    });
  },

  viewActiveSort(_index) {
    this.elements.viewCells.forEach((el, idx) => {
      el.querySelectorAll(".effect-sentence").forEach((sentence) => {
        if (idx === _index) {
          sentence.classList.add("active");
        } else {
          sentence.classList.remove("active");
        }
      });
    });
  },

  videoSort(_index) {
    this.videos[_index].forEach((el) => {
      if (!el.isPlaying()) el.play();
    });
  },

  videoActiveSort(_index) {
    this.videos.forEach((el, idx) => {
      el.forEach((video) => {
        if (_index != idx) {
          video.stop();
        }
      });
    });
  },

  viewSort(_index) {
    if (this.swiper) {
      this.swiper.slideTo(_index, 0);
    }
  },

  viewPrev() {
    if (this.swiper) {
      this.swiper.slidePrev();
    }
  },

  viewNext() {
    console.log("view wheel next");
    if (this.swiper) {
      this.swiper.slideNext();
    }
  },

  onWheel(e) {
    if (this.pageActive) return;

    // 픽셀 단위로 정규화 (deltaMode 1=lines → 대충 16px 환산)
    const dy = (e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY) || 0;

    // 미세 움직임 누적/리셋
    const now = performance.now();
    if (now - this.wheelLastT > this.DECAY_MS) this.wheelAccum = 0;
    this.wheelLastT = now;
    this.wheelAccum += dy;

    // 임계값 미만이면 무시
    if (Math.abs(this.wheelAccum) < this.DELTA_THRESHOLD) {
      e.preventDefault();
      return;
    }

    e.preventDefault();

    //console.log(this.wheelAccum);

    // 방향 판정 후 실행
    this.wheelAccum > 0 ? this.viewNext() : this.viewPrev();

    const dir = this.wheelAccum > 0 ? "next" : "prev";

    if (this.swiper) {
      if (this.swiper.realIndex == 0) {
        if (dir != "prev") this.pageActive = false;
      } else if (this.swiper.realIndex == this.swiper.slides.length - 1) {
        if (dir != "next") this.pageActive = false;
      } else {
        this.pageActive = true;
      }
    }

    // 사용 후 누적치 초기화
    this.wheelAccum = 0;
  },

  onMenuClickHand(e) {
    if (e.currentTarget.tagName.toLowerCase() === "button") {
      const btns = e.currentTarget;
      const index = Array.from(btns.parentNode.parentNode.children).indexOf(btns.parentNode);
      this.cur = index;
      this.menuSort(this.cur);
      this.detailSort(this.cur);
      this.viewSort(this.cur);            
      this.popClose();
    }
  },

  onAllClickHand() {
    this.popOpen();
    this.pathSort(-2);
    this.menuActive();
  },

  onMoreClickHand() {
    this.popOpen();    
    this.pathSort(this.cur);
    console.log('more click cur :: ' + this.cur);
    this.detailActive();
  },

  menuActive() {
    this.elements.popMenu.classList.add("active");
    this.elements.detail.classList.remove("active");
  },

  detailActive() {
    this.elements.popMenu.classList.remove("active");
    this.elements.detail.classList.add("active");
  },

  detailSort(_index) {
    this.elements.detailItems.forEach((el, idx) => el.classList.toggle("active", idx === _index));
    this.elements.detailScroller.scrollTo(0, 0);
  },

  menuSort(_index) {
    this.elements.popMenuCells.forEach((el, idx) => el.classList.toggle("active", idx === _index));
    this.elements.navThumbImgs.forEach((el, idx) => el.classList.toggle("active", idx === _index));
  },

  videoCheck() {
    this.videoStateIndex++;
    console.log("videos load Index :: " + this.videoStateIndex);
    if (this.videoStateIndex == this.videosLen) this.pageLoadState.videos = true;
    if (!this.pageLoadState.videos) return false;

    console.log("--- videos all loaded ---");
    this.ready();
  },

  pathSort(_index){
	  let path = '';

	  if (_index === -2) {
		path = '/business/index';
	  } else if (_index === -1) {
		path = '/business/'
	  } else {
		path = this.paths[_index];
	  }

	  this.updatePath(path);
	},

	updatePath(path) {
	  // 잘못된 값 들어오면 아예 안 바꿈
	  if (!path) return;
	  const newPath = path;

	  console.log("new path :: " + newPath);

	  // 현재 path랑 같으면 굳이 또 안 바꿈
	  if (location.pathname === newPath) return;

	  try {
		window.history.replaceState(null, "", newPath);
	  } catch (e) {
		console.error("replaceState error", e);
	  }
	},

  load() {},

  ready() {
    console.log(this.pageLoadState);
    if (!Object.values(this.pageLoadState).every(Boolean)) return false;

    if (!this.pageLoadActive) return false;

    console.log("--- page ready ---");
    
    this.setState('ready');
    setTimeout(() => {
      this.elements.nav.classList.add("ready");
      this.elements.view.classList.add("ready");
      this.videoSort(this.cur);

      if (this.paths.some((p) => location.pathname.includes(p))) {
        this.popOpen();
        this.detailActive();
      } else if (location.pathname.includes("/business/index")) {
        this.popOpen();
        this.menuActive();
      }

      this.guideOpen();
    }, 100);
    pageLoader.hide();
  },

  resize() {},

  resizeHand() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => this.resize(), 200);
  },
};

const main = {
  stage: {
    width: 0,
    height: 0,
    top: 0,
    ptop: 0,
    pw: -1,
  },
  container: null,
  elements: {},
  scenes: {},
  tweeners: {},
  resizeTimer: null,
  videos: {},
  videoStateIndex: 0,
  videosLen: -1,
  state: "loading",
  pageLoadState: { images: false, videos: false },
  pageLoadActive: false,
  swipers: {},
  stackPosY: 0,

  init() {
    const _this = this;
    this.container = document.querySelector(".main-wrap");

    if (!this.container) return;

    mainPop.init();

    document.querySelector("#dFoot")?.remove();

    imagesLoaded(document.body, { background: true }, () => {
      console.log("--- image loaded ---");
      this.pageLoadState.images = true;
      this.ready();
    });

    this.elements.videoItems = this.container.querySelectorAll(".video-wrap");
    this.videosLen = this.elements.videoItems.length;
    if (this.elements.videoItems.length == 0) this.pageLoadState.videos = true;

    this.elements.footer = this.container.querySelector(".footer-wrap");
    this.elements.headline = this.container.querySelector(".main-headline");
    this.elements.company = this.container.querySelector(".main-company");
    this.elements.business = this.container.querySelector(".main-business");
    this.elements.businessStack = this.elements.business.querySelector(".stack-list");
    this.elements.businessItems = this.elements.businessStack.querySelectorAll(".stack-items");
    this.elements.businessItemsOuter = this.elements.businessStack.querySelectorAll(".outer");
    this.elements.highlight = this.container.querySelector(".main-highlight");
    this.elements.story = this.container.querySelector(".main-story");
    this.elements.careers = this.container.querySelector(".main-careers");

    //video set
    this.videos.footerPc = createVideoPlayer({
      el: this.elements.footer.querySelector(".pc-video-block .video-wrap"),
      autoPlay: false,
      loop: true,
      progress: false,
      eagerInit: true,
      preload: "metadata",
      onInit() {
        //console.log('onInit', this);
        _this.videoCheck();
      },
    });
    this.videos.footerMo = createVideoPlayer({
      el: this.elements.footer.querySelector(".mo-video-block .video-wrap"),
      autoPlay: false,
      loop: true,
      progress: false,
      eagerInit: true,
      preload: "metadata",
      onInit() {
        //console.log('onInit', this);
        _this.videoCheck();
      },
    });

    this.videos.headlinePc = createVideoPlayer({
      el: this.elements.headline.querySelector(".pc-video-block .video-wrap"),
      autoPlay: false,
      loop: true,
      progress: false,
      eagerInit: true,
      preload: "metadata",
      onInit() {
        //console.log('onInit', this);
        _this.videoCheck();
      },
      onPlay() {},
      onFirstPlay() {
        //console.log('headline pc video play');
        if (window.innerWidth > 768) {
          setTimeout(() => {
            _this.elements.headline
              .querySelectorAll(".effect-sentence")
              .forEach((sentence) => sentence.classList.add("active"));
            _this.elements.headline.classList.add("ready");
          }, 4000);
        }
      },
    });
    this.videos.headlineMo = createVideoPlayer({
      el: this.elements.headline.querySelector(".mo-video-block .video-wrap"),
      autoPlay: false,
      loop: true,
      progress: false,
      eagerInit: true,
      preload: "metadata",
      onInit() {
        //console.log('onInit', this);
        _this.videoCheck();
      },
      onPlay() {},
      onFirstPlay() {
        //console.log('headline mobile video play');
        if (window.innerWidth <= 768) {
          setTimeout(() => {
            _this.elements.headline
              .querySelectorAll(".effect-sentence")
              .forEach((sentence) => sentence.classList.add("active"));
            _this.elements.headline.classList.add("ready");
          }, 4000);
        }
      },
    });

    this.videos.careersPc = createVideoPlayer({
      el: this.elements.careers.querySelector(".pc-video-block .video-wrap"),
      autoPlay: false,
      loop: true,
      progress: false,
      eagerInit: true,
      preload: "metadata",
      onInit() {
        //console.log('onInit', this);
        _this.videoCheck();
      },
    });
    this.videos.careersMo = createVideoPlayer({
      el: this.elements.careers.querySelector(".mo-video-block .video-wrap"),
      autoPlay: false,
      loop: true,
      progress: false,
      eagerInit: true,
      preload: "metadata",
      onInit() {
        //console.log('onInit', this);
        _this.videoCheck();
      },
    });

    this.swipers.company = new Swiper(this.elements.company.querySelector(".swiper"), {
      slidesPerView: 1,
      speed: 400,
      simulateTouch: true,
      observeParents: true,
      observeSlideChildren: true,
      navigation: {
        nextEl: this.elements.company.querySelector(".btn-ui-next"),
        prevEl: this.elements.company.querySelector(".btn-ui-prev"),
      },
      pagination: {
        el: this.elements.company.querySelector(".swiper-pagination"),
        clickable: true,
        bulletElement: "button",
      },
    });

    setTimeout(() => {
      this.pageLoadActive = true;
      this.ready();
    }, 3000);

    window.addEventListener("load", this.load.bind(this));
    window.addEventListener("resize", this.resizeHand.bind(this));
  },

  videoCheck() {
    this.videoStateIndex++;
    console.log("videos load Index :: " + this.videoStateIndex);
    if (this.videoStateIndex == this.videosLen) this.pageLoadState.videos = true;
    if (!this.pageLoadState.videos) return false;

    console.log("--- videos all loaded ---");
    this.ready();
  },

  load() {},

  ready() {
    console.log(this.pageLoadState);
    if (!Object.values(this.pageLoadState).every(Boolean)) return false;

    if (!this.pageLoadActive) return false;

    console.log("--- page ready ---");

    this.state = "ready";
    setTimeout(() => {
      this.container.classList.add("ready");
      this.videos.headlinePc.seekTo(0);
      this.videos.headlinePc.play(0);
      this.videos.headlineMo.seekTo(0);
      this.videos.headlineMo.play(0);
      this.resize();
      this.intersectionObserver();
      footer.reset();      
    }, 100);
    pageLoader.hide();
  },

  intersectionObserver() {
    const effectItems = this.container.querySelectorAll(".effect-sentence");

    const intersectionObserver = () => {
      const effectObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target;
            const bounding = entry.boundingClientRect;

            if (entry.isIntersecting) {
              // 아래에서 올라올 때만 active 추가
              if (bounding.top > 0) {
                el.classList.add("active");
              }
            } else {
              // 아래로 사라질 때만 active 제거
              if (bounding.top > 0) {
                el.classList.remove("active");
              }
            }
          });
        },
        {
          root: null,
          threshold: 0,
          rootMargin: "0px 0px 1px 0px",
        }
      );

      effectItems.forEach((el) => {
        if (el.classList.contains("sensor")) {
          const elTop = el.getBoundingClientRect().top + window.scrollY;
          const scrollY = window.scrollY;
          const windowH = window.innerHeight;

          if (scrollY + windowH > elTop) {
            el.classList.add("active");
          }

          effectObserver.observe(el);
        }
      });
    };

    intersectionObserver();
  },

  resize() {
    this.stage.pw = this.stage.width;
    this.stage.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.stage.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    if (this.stage.pw != this.stage.width) {
      console.log("main resize");

      if (this.stage.width > 1025) {
        this.stackPosY = 122;
      } else if (this.stage.width > 768) {
        this.stackPosY = 86;
      } else if (this.stage.width > 480) {
        this.stackPosY = 62;
      } else {
        this.stackPosY = 78;
      }

      const stackItems = this.elements.businessItemsOuter;
      const stackItemsHeights = Array.from(stackItems).map((el) => el.getBoundingClientRect().height); // 총 높이 배열 구분
      const stackTotalHeight = stackItemsHeights.reduce((a, b) => a + b, 0); // 총 높이 더하기
      const lastHeight = stackItems[stackItems.length - 1].getBoundingClientRect().height; // 마지막 높이 구하기
      const fixBottom = lastHeight - stackItems.length * (this.stackPosY * 0.5); // 마지막 여백 처리
      //console.log('total height :: ' + stackTotalHeight + '  last height :: ' + lastHeight);

      const rowTrackList = stackItemsHeights.map((h) => `${h}px`).join(" ");

      //this.elements.businessStack.style.setProperty("--stack-len", stackItems.length );
      // this.elements.businessStack.style.gridTemplateRows = rowTrackList;
      this.elements.businessStack.style.marginBottom = this.stackPosY * (stackItems.length - 2) * -1 + "px";

      let prevPaddingBottom = 0;

      this.elements.businessItems.forEach((el, idx) => {
        el.style.setProperty("--sticky-top", idx * this.stackPosY + "px");
        el.style.setProperty("--sticky-pos-y", this.stackPosY + "px");
        el.style.setProperty("--sticky-max-height", lastHeight + "px");

        if (idx < stackItems.length) {
          const totalLen = stackItems.length - 1;
          const reverseIndex = Math.abs(idx - totalLen);
          const paddingBottom = reverseIndex * this.stackPosY + 0;

          el.style.paddingBottom = paddingBottom + "px";
          el.style.marginTop = prevPaddingBottom * -1 + "px";
          prevPaddingBottom = paddingBottom - 0;
        }
      });

      //el.style.paddingBottom = lastHeight + 'px';

      this.sceneReset();
      this.scene();
    }
  },

  sceneReset() {
    console.log("--- main scene reset ---");
    //ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    if (this.tweeners) {
      Object.keys(this.tweeners).forEach((key) => {
        const st = this.tweeners[key];
        //console.log(st);

        if (!st) return;
        if (typeof st.kill === "function") st.kill(true);

        if (st.scrollTrigger && typeof st.scrollTrigger.kill === "function") {
          st.scrollTrigger.kill(true);
        }

        delete this.tweeners[key];
      });
    }
  },

  scene() {
    console.log("--- main scene set --- ");
    const _this = this;

    const stageH = this.container.querySelector(".sticky-contents").getBoundingClientRect().height;

    //console.log('stage height :: ' + stageH)
    this.tweeners.headline1 = ScrollTrigger.create({
      trigger: this.elements.headline,
      start: () => stageH * 1 + " 0%",
      end: () => "+=" + 1,
      scrub: true,
      markers: false,
      onEnter: () => {
        //console.log('on enter');
        this.videos.headlinePc.stop();
        this.videos.headlineMo.stop();
      },
      onLeaveBack: () => {
        //console.log('on leave Back');
        this.videos.headlinePc.play();
        this.videos.headlineMo.play();
      },
    });

    let itemHeight = 0;

    const stackItems = this.elements.businessItemsOuter;
    const stackItemsHeights = Array.from(stackItems).map((el) => el.getBoundingClientRect().height); // 총 높이 배열 구분
    const stackTotalHeight = stackItemsHeights.reduce((a, b) => a + b, 0); // 총 높이 더하기
    const lastHeight = stackItems[stackItems.length - 1].getBoundingClientRect().height; // 마지막 높이 구하기

    this.elements.businessItemsOuter.forEach((el, idx) => {
      const baseHeight = itemHeight; // ✅ 여기서 스냅샷
      const elHeight = el.getBoundingClientRect().height;
      const firstHeight = this.elements.businessItemsOuter[0].getBoundingClientRect().height;
      const endY = stackTotalHeight - firstHeight - lastHeight;
      const stackPosY = this.stackPosY;
      const index = idx;

      if (idx > 0 && idx < stackItems.length - 1) {
        this.tweeners["companyStack-" + idx] = gsap.timeline({
          scrollTrigger: {
            trigger: this.elements.businessStack,
            start: () => baseHeight - stackPosY * (idx - 0) + " 0%",
            end: () => "+=" + (elHeight - stackPosY),
            scrub: true,
            markers: false,
          },
        });

        this.elements.businessItemsOuter.forEach((el) => {
          this.tweeners["companyStack-" + idx].fromTo(
            el,
            {
              y: this.stackPosY * (index - 1) * -1,
            },
            {
              y: this.stackPosY * (index - 0) * -1,
              ease: "none",
              immediateRender: false,
            },
            0
          );
        });
      }

      itemHeight += elHeight; // 마지막에 누적
    });

    this.tweeners.highlight1 = gsap.timeline({
      scrollTrigger: {
        trigger: this.elements.highlight,
        start: "0% 100%",
        end: () => "+=" + stageH * 1,
        scrub: true,
        markers: false,
      },
    });

    this.tweeners.highlight1.fromTo(
      this.elements.highlight.querySelector(".obj"),
      {
        y: "40%",
      },
      {
        y: "0%",
        ease: "none",
      },
      0
    );

    this.tweeners.highlight1.fromTo(
      this.elements.highlight.querySelector(".item-info"),
      {
        y: "70%",
      },
      {
        y: "0%",
        ease: "none",
      },
      0
    );

    this.tweeners.careers1 = ScrollTrigger.create({
      trigger: this.elements.careers,
      start: () => 0 + " 100%",
      end: () => "+=" + 1,
      scrub: true,
      markers: false,
      onEnter: () => {
        //console.log('on enter');
        this.videos.careersPc.play();
        this.videos.careersMo.play();
      },
      onLeaveBack: () => {
        //console.log('on leave Back');
        this.videos.careersPc.stop();
        this.videos.careersMo.stop();
      },
    });

    this.tweeners.footer1 = ScrollTrigger.create({
      trigger: this.elements.footer,
      start: () => 0 + " 100%",
      end: () => "+=" + 1,
      scrub: true,
      markers: false,
      onEnter: () => {
        //console.log('on enter');
        this.videos.footerPc.play();
        this.videos.footerMo.play();
      },
      onLeaveBack: () => {
        //console.log('on leave Back');
        this.videos.footerPc.stop();
        this.videos.footerMo.stop();
      },
    });
  },

  resizeHand() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => this.resize(), 200);
  },
};

const mainPop = {
  init() {
    this.container = document.querySelector(".main-pop-wrap");

    if (!this.container) return;

    function getKSTDateString() {
      const now = new Date();
      const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC+9
      const yyyy = kst.getUTCFullYear();
      const mm = String(kst.getUTCMonth() + 1).padStart(2, "0");
      const dd = String(kst.getUTCDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`; // KST 기준 YYYY-MM-DD
    }

    const items = [...this.container.querySelectorAll(".main-pop-items")];
    const todayKST = getKSTDateString(); // 초기 렌더용

    // 초기 표시: 오늘(KST) '닫기'했던 팝업은 비활성화
    items.forEach((item, i) => {
      const id = item.dataset.popId || (item.dataset.popId = `pop-${i}`);
      const key = `POP_${id}_${todayKST}`;
      if (localStorage.getItem(key) === "1") {
        item.classList.remove("actived");
      }
    });

    // 이벤트 위임
    this.container.addEventListener("click", (e) => {
      const item = e.target.closest(".main-pop-items");
      //console.log(item);
      if (!item) return;

      // 오늘 하루 열지 않기 (이 팝업만, KST 기준)
      if (e.target.closest(".btn-today-close")) {
        const id = item.dataset.popId;
        const key = `POP_${id}_${getKSTDateString()}`; // 클릭 시점 기준 KST 날짜 사용
        localStorage.setItem(key, "1");
        item.classList.remove("actived");
        mainPop.state();
        return;
      }
    });

    this.check();
    this.resize();

    window.addEventListener("resize", this.resize.bind(this));
  },

  state() {
    const itemsCount = this.container.querySelectorAll(".main-pop-items").length;
    const activedCount = this.container.querySelectorAll(".main-pop-items.actived").length;

    if (itemsCount > 0 && activedCount == 0) {
      this.container.classList.remove("actived");
    }
  },

  check() {
    const itemsCount = this.container.querySelectorAll(".main-pop-items").length;
    const activedCount = this.container.querySelectorAll(".main-pop-items.actived").length;

    console.log("main pop length  :: " + itemsCount);
    if (itemsCount > 0 && activedCount > 0) {
      // 처리
      this.container.classList.add("actived");
    }
  },


  resize() {    
    const items = this.container.querySelectorAll(".main-pop-items");
    if(items.length > 0 ){
      items.forEach((el,idx)=>{
        if(window.innerWidth <= 480) {          
          el.style.zIndex = items.length - idx;
        }else{
          el.removeAttribute('style');
        }
      })      
    }
  }
};

const $WINDOW = {
  // 브라우저 기본 스크롤바 크기
  getScrollBarWidth() {
    const inner = document.createElement("p");
    inner.style.width = "100%";
    inner.style.height = "200px";

    const outer = document.createElement("div");
    Object.assign(outer.style, {
      position: "absolute",
      top: "0px",
      left: "0px",
      visibility: "hidden",
      width: "200px",
      height: "150px",
      overflow: "hidden",
    });

    outer.appendChild(inner);
    document.body.appendChild(outer);

    const w1 = inner.offsetWidth;
    outer.style.overflow = "scroll";
    let w2 = inner.offsetWidth;
    if (w1 === w2) w2 = outer.clientWidth;

    document.body.removeChild(outer);

    return w1 - w2;
  },

  // 링크 파라메타 값 가져오기
  getParameter(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
  },

  // 해시태그 가져오기
  getHash() {
    return window.location.hash.slice(1); // '#' 제거
  },

  // 모바일 여부 체크
  isMobile() {
    return /iPhone|iPad|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson|LG|SAMSUNG|Samsung/i.test(
      navigator.userAgent
    );
  },

  // 아이패드 프로 여부 체크
  isIpadPro() {
    return (
      (/iPhone|iPod/.test(navigator.platform) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
      !window.MSStream
    );
  },

  // 터치 디바이스 체크
  isTouchDevice() {
    return (
      "ontouchstart" in window || // 대부분의 터치 디바이스
      navigator.maxTouchPoints > 0 || // 현대 브라우저 (iOS/Android/Windows)
      navigator.msMaxTouchPoints > 0 // 구형 IE/Edge 대응
    );
  },
};

const createVideoPlayer = (options) => {
  const {
    el,
    autoPlay = false,
    loop = false,
    idx = 0,
    onPlay,
    onPause,
    onEnd,
    onError,
    onInit,
    onLoadedData, // (유지하되 내부에서 metadata로 대체 호출)
    onFirstPlay,
    progress = false,
    progressEl = null,
    lazy = true, // ✅ 기본 지연
    eagerInit = false, // ✅ true면 즉시 src 붙여 로드(특수 케이스)
    preload = "none", // "none" | "metadata" | "auto"
  } = options;

  const $parentElement = el;
  const $video = $parentElement.querySelector("video");
  const $source = $video.querySelector("source");
  let $videoState = true;
  let firstPlay = false;
  let initialized = false; // ✅ src 주입 여부

  // 초기 속성
  try {
    $video.preload = preload;
  } catch (e) {}

  const attachSrc = () => {
    if (initialized) return;
    const ds = $source?.getAttribute("data-src");
    if (ds) {
      $source.setAttribute("src", ds);
      $video.load();
      initialized = true;
    }
  };

  const detachSrc = () => {
    if (!initialized) return;
    $video.pause();
    if ($source) $source.removeAttribute("src");
    $video.removeAttribute("src"); // safari 대비
    $video.load();
    initialized = false;
  };

  const player = {
    target: null,
    idx,

    play() {
      if (!$videoState) return;
      if (!initialized) attachSrc();
      $video.play();
    },

    stop() {
      if ($videoState) $video.pause();
    },

    reset() {
      if (!$videoState) return;
      if (!initialized) attachSrc();
      $video.currentTime = 0;
      $video.play();
    },

    seekTo(timeSec) {
      if (!$videoState) return;
      if (!initialized) attachSrc();
      $video.currentTime = timeSec;
    },

    // ★ 마지막 프레임 직전으로 이동
    seekToEnd() {
      if (!$videoState) return;
      if (!initialized) attachSrc();

      const go = () => {
        const v = $video;
        if (!isFinite(v.duration) && !v.seekable.length) return;
        const eps = 0.05;
        const end = v.seekable.length ? v.seekable.end(v.seekable.length - 1) : v.duration;
        const t = Math.max(0, end - eps);
        if ("fastSeek" in v) {
          try {
            v.fastSeek(t);
            return;
          } catch (_) {}
        }
        v.currentTime = t;
      };

      if ($video.readyState >= 1) go();
      else $video.addEventListener("loadedmetadata", go, { once: true });
    },

    getDuration() {
      if (!initialized) attachSrc();
      return isFinite($video.duration) ? $video.duration : 0;
    },

    volume(v) {
      if ($videoState) $video.volume = v;
    },

    muted(flag) {
      if ($videoState) $video.muted = flag;
    },

    controls(flag) {
      if ($videoState) $video.controls = flag;
    },

    initSrc() {
      attachSrc();
    },

    destroy() {
      $video.pause();

      $video.onplay = null;
      $video.onplaying = null;
      $video.onpause = null;
      $video.onended = null;
      $video.onloadedmetadata = null;
      $video.onerror = null;

      if (progress && progressEl && window.gsap) {
        gsap.killTweensOf(progressEl);
        gsap.set(progressEl, { width: 0 });
      }

      $parentElement.classList.remove("actived");
      $videoState = false;
      detachSrc();
    },
    isPlaying() {
      if (!$videoState) return false;
      return !$video.paused && !$video.ended && $video.readyState > 2;
    },
  };

  // 🎬 이벤트
  $video.onplay = () => {
    if (!$videoState) return;
    $parentElement.classList.add("actived");
    onPlay?.call(player);
    if (progress && progressEl && window.gsap && $video.duration) {
      // gsap.to(progressEl, { duration: $video.duration, width: '100%', ease: 'none' });
    }
    if (!firstPlay) {
      firstPlay = true;
      onFirstPlay?.call(player); // ✅ 최초 한 번만 실행
    }
  };

  $video.onplaying = () => {
    if (!$videoState) return;
    $parentElement.classList.add("actived");
  };

  $video.onpause = () => {
    if (!$videoState) return;
    onPause?.call(player);
    if (progress && progressEl && window.gsap) {
      // gsap.killTweensOf(progressEl);
    }
  };

  $video.onended = () => {
    if (!$videoState) return;
    if (loop) $video.play();
    onEnd?.call(player);
    if (progress && progressEl && window.gsap) {
      gsap.set(progressEl, { width: 0 });
    }
  };

  $video.onloadedmetadata = () => {
    onLoadedData?.call(player);
    onInit?.call(player);
  };

  $video.onerror = () => {
    onError?.(player);
    $videoState = false;
  };

  player.target = player;
  if (!lazy || eagerInit) attachSrc();
  if (autoPlay) player.play();

  return player;
};

const splitButton = {
  init() {
    document.querySelectorAll(".btn-split").forEach((el) => {
      const btns = el.querySelector(".split-hover");
      if (btns) {
        const text = btns.innerHTML;
        btns.innerHTML = "";
        const frontText = document.createElement("div");
        const backText = document.createElement("div");
        frontText.classList.add("split-text", "front");
        frontText.innerHTML = text;
        backText.classList.add("split-text", "back");
        backText.innerHTML = text;
        btns.append(frontText);
        btns.append(backText);
        splitTextElement(frontText);
        splitTextElement(backText);
      }
    });
  },
  splitTextElement(el) {},
};

const splitTextElement = (el) => {
  if (!el || el.dataset.splitDone) return;

  const frag = document.createDocumentFragment();
  let wordIndex = 0;
  let charSeq = 0; // 누적 글자 인덱스
  let letterStep = 0;

  if (el.closest(".main-intro")) {
    letterStep = 0.1;
  } else if (el.closest(".split-hover")) {
    letterStep = 0.015;
  } else {
    letterStep = 0.05;
  }
  const brGap = 0; // ★ 선택: 줄바꿈 뒤 여유 간격(글자 n개 분량) ex) 3

  const processText = (text) => {
    const tokens = (text || "").split(/(\s+)/); // 공백 보존

    tokens.forEach((tok, k) => {
      if (!tok) return;

      if (/^\s+$/.test(tok)) {
        const space = document.createElement("span");
        space.className = "space";
        space.setAttribute("aria-hidden", "true");
        space.textContent = tok;
        frag.appendChild(space);
        return;
      }

      const word = document.createElement("span");
      word.className = "word";
      word.dataset.wordIndex = String(wordIndex++);

      Array.from(tok).forEach((ch, j) => {
        const letter = document.createElement("span");
        letter.className = "letter";
        letter.dataset.letterIndex = String(j);

        const value = document.createElement("span");
        value.className = "value";
        value.textContent = ch;

        // ★ 글자별 누적 딜레이 (연속 유지)
        const _delay = charSeq++ * letterStep;
        value.style.setProperty("--delay", _delay + "s");

        letter.appendChild(value);
        word.appendChild(letter);
      });

      frag.appendChild(word);
    });
  };

  Array.from(el.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      processText(node.nodeValue || "");
    } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName.toUpperCase() === "BR") {
      frag.appendChild(node.cloneNode(false)); // <br> 보존
      // ★ 선택: 줄바꿈 후 쉬어가기 간격 주고 싶으면 누적 추가
      if (brGap > 0) charSeq += brGap;
    } else {
      processText(node.textContent || "");
    }
  });

  el.textContent = "";
  el.appendChild(frag);
  el.dataset.splitDone = "1";
};

const valueCopy = (_data) => {
  const textarea = document.createElement("textarea");
  textarea.value = _data;
  textarea.style.position = "fixed"; // iOS 대응
  textarea.style.opacity = 0;
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    document.execCommand("copy");
    console.log("복사 완료");
  } catch (err) {
    console.log("복사 실패");
  }

  document.body.removeChild(textarea);
};

const rand = (min, max) => Math.random() * (max - min) + min;
const durRand = (a, b) => rand(a, b);

// 비율(%)를 px로: 중앙 기준 오프셋. range: -50% ~ 50%
function ratioToPxX(r) {
  return window.innerWidth * r;
}

function ratioToPxY(r) {
  return window.innerHeight * r;
}

// 초기: (0.5~0.9) 범위를 부호(initSign)로 곱해 중앙 기준 오프셋 생성
function getInitialOffset(initSign) {
  const rx = rand(10, 20) * Math.sign(initSign.x || 1);
  //const ry = rand(0.4, 0.6) * Math.sign(initSign.y || 1);
  const ry = 0;
  return {
    x: rx,
    y: ry,
    rx,
    ry,
  };
}

// 반대 사분면으로: 직전 부호의 반대 부호로 (0.5~0.9) 범위
function getOppositeOffset(prevRx, prevRy, type) {
  let nextRx = 0;
  //console.log('offset type  :: ' + type)
  if (type == 0) {
    nextRx = prevRx >= 0 ? -rand(10, 20) : rand(10, 20);
  } else if (type == 1) {
    nextRx = prevRx >= 0 ? -rand(30, 40) : rand(30, 40);
  }
  //const nextRy = prevRy >= 0 ? -rand(0.4, 0.5) : rand(0.4, 0.5);
  const nextRy = 0;
  return {
    x: nextRx,
    y: nextRy,
    rx: nextRx,
    ry: nextRy,
  };
}

function loopOpposite(el, minDur, maxDur, state) {
  const { x, y, rx, ry } = state.next;

  gsap.to(el, {
    duration: durRand(3, 6),
    ease: "sine.inOut",
    scaleY: rand(0.9, 1),
    xPercent: x, // transform translateX(px)
    yPercent: y, // transform translateY(px)
    overwrite: "auto",
    immediateRender: false,
    onComplete: () => {
      state.prev = { rx, ry };
      state.next = getOppositeOffset(rx, ry, el.getAttribute("data-type"));
      loopOpposite(el, minDur, maxDur, state);
    },
  });
}

const pageLoader = {

    animationData : {"v":"5.12.2","fr":30,"ip":0,"op":90,"w":367,"h":80,"nm":"SIMPAC_ Loading_PC","ddd":0,"assets":[{"id":"comp_0","nm":"SIMPAC_ Loading","fr":30,"layers":[{"ddd":0,"ind":1,"ty":0,"nm":"Wordmark","parent":2,"refId":"comp_1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[1068.904,215.231,0],"ix":2,"l":2},"a":{"a":0,"k":[690,145,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"w":1380,"h":290,"ip":32,"op":182,"st":32,"bm":0},{"ddd":0,"ind":2,"ty":0,"nm":"Symbol","refId":"comp_2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":1,"k":[{"i":{"x":[0.885],"y":[0.262]},"o":{"x":[0.7],"y":[0]},"t":26,"s":[960]},{"i":{"x":[0.183],"y":[1]},"o":{"x":[0.09],"y":[0.952]},"t":40,"s":[603.055]},{"t":63,"s":[246.118]}],"ix":3},"y":{"a":0,"k":540.5,"ix":4}},"a":{"a":0,"k":[190,190,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"w":380,"h":380,"ip":0,"op":150,"st":0,"bm":0}]},{"id":"comp_1","nm":"Wordmark","fr":30,"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"c","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":690,"ix":3},"y":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":10,"s":[446]},{"t":30,"s":[145]}],"ix":4}},"a":{"a":0,"k":[685.5,141.5,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[30.989,0],[0,27.507],[-36.783,0],[0,-19.746],[0,0],[66.494,0],[0,-46.799],[-68.856,0],[0,41.926]],"o":[[0,19.324],[-37.119,0],[0,-27.342],[32.978,0],[0,0],[0,-40.983],[-69.022,0],[0,47.953],[62.824,0],[0,0]],"v":[[56.858,10.261],[2.061,43.152],[-56.351,-0.132],[1.528,-43.153],[56.298,-11.85],[107.182,-11.85],[3.141,-78.107],[-107.38,0.131],[2.871,78.107],[107.38,10.261]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.145098039216,0.352941176471,0.294117647059,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[1262.826,140.125],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":10,"op":160,"st":10,"ct":1,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"a","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":690,"ix":3},"y":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":8,"s":[446]},{"t":28,"s":[145]}],"ix":4}},"a":{"a":0,"k":[685.5,141.5,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[28.279,0],[0.234,11.423],[-39.574,4.214],[-8.846,3.159]],"o":[[0,25.967],[-23.213,0],[0,-10.974],[27.359,-2.84],[0,0]],"v":[[38.974,15.447],[-19.032,49.681],[-53.471,33.432],[-8.401,12.975],[38.974,5.091]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,10.192],[0,0],[65.032,0],[3.779,-38.445],[0,0],[0,0],[0,0],[-35.157,0],[-0.215,-8.901],[37.617,-3.405],[0,0],[0,-36.696],[-48.463,0],[-12.637,14.544],[-13.321,0],[0,0]],"o":[[0,0],[-10.845,0],[0,0],[0,-39.119],[-64.853,0],[0,0],[0,0],[0,0],[2.89,-14.029],[36.021,0],[0,10.11],[0,0],[-57.891,4.668],[0,28.722],[35.295,0],[1.73,14.569],[14.457,0],[0,0]],"v":[[104.728,40.936],[100.993,40.936],[88.766,29.479],[88.766,-26.266],[-1.58,-80.393],[-99.348,-26.268],[-99.514,-23.654],[-49.005,-23.654],[-48.748,-25.795],[-1.843,-48.518],[38.084,-31.367],[-1.635,-16.354],[-12.18,-15.391],[-104.728,35.849],[-28.436,80.393],[41.674,58.105],[67.789,76.982],[104.728,76.833]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.145098039216,0.352941176471,0.294117647059,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[1042.453,142.41],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":8,"op":158,"st":8,"ct":1,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"p","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":690,"ix":3},"y":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":6,"s":[446]},{"t":26,"s":[145]}],"ix":4}},"a":{"a":0,"k":[685.5,141.5,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[38.862,0],[0,22.035],[-40.174,0],[0,-30.615]],"o":[[-41.408,0],[0,-22.535],[38.862,0],[0,28.309]],"v":[[-0.264,15.079],[-60.21,-29.614],[-0.264,-74.037],[59.142,-29.614]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[61.486,0],[11.827,-11.785],[0,0],[0,0],[0,0],[-1.793,-1.227],[0,0],[0,0],[-39.212,0],[0,48.916]],"o":[[-39.212,0],[0,0],[0,0],[0,0],[1.792,1.226],[0,0],[0,0],[13.307,14.409],[60.554,0],[0,-47.131]],"v":[[20.351,-109.871],[-61.185,-85.014],[-61.185,-105.301],[-110.485,-105.301],[-110.485,106.993],[-106.278,109.871],[-60.646,92.125],[-60.646,26.038],[20.351,50.913],[110.485,-29.614]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.145098039216,0.352941176471,0.294117647059,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[814.621,171.889],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":6,"op":156,"st":6,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"m","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":690,"ix":3},"y":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":4,"s":[446]},{"t":24,"s":[145]}],"ix":4}},"a":{"a":0,"k":[685.5,141.5,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[48.491,-0.023],[19.274,-19.98],[29.822,-0.817],[12.937,-15.882],[0,0],[0,0],[0,0],[0,0],[0,0],[-34.114,0],[0,-27.237],[0,0],[0,0],[0,0],[-34.519,0],[0,-27.654],[0,0],[0,0],[0,0]],"o":[[-32.046,0.015],[-9.596,-20.445],[-28.772,0.788],[0,0],[0,0],[0,0],[0,0],[0,0],[0,-32.359],[22.181,0],[0,0],[0,0],[0,0],[0,-32.359],[24.026,0],[0,0],[0,0],[0,0],[0,-47.23]],"v":[[93.939,-77.698],[13.727,-45.329],[-45.946,-77.698],[-114.59,-48.537],[-114.59,-73.128],[-164.775,-73.128],[-164.775,78.516],[-114.59,78.516],[-114.59,12.144],[-62.406,-41.055],[-25.661,1.864],[-25.661,78.516],[24.524,78.516],[24.524,12.144],[78.675,-41.055],[114.584,2.029],[114.584,78.516],[164.775,78.516],[164.775,-4.551]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.145098039216,0.352941176471,0.294117647059,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[516.344,139.716],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":4,"op":154,"st":4,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"i","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":690,"ix":3},"y":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":2,"s":[446]},{"t":22,"s":[145]}],"ix":4}},"a":{"a":0,"k":[685.5,141.5,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-24.211,-22.996],[-24.211,19.366],[-18.837,22.996],[24.211,6.525],[24.211,-22.996]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.145098039216,0.352941176471,0.294117647059,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[300.605,31.325],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-24.202,75.822],[24.202,75.822],[24.202,-75.822],[-24.202,-75.822]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.145098039216,0.352941176471,0.294117647059,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[300.596,142.41],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 6","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":2,"op":152,"st":2,"ct":1,"bm":0},{"ddd":0,"ind":6,"ty":4,"nm":"S","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":690,"ix":3},"y":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[446]},{"t":20,"s":[145]}],"ix":4}},"a":{"a":0,"k":[685.5,141.5,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[59.553,7.288],[0,0],[0.221,10.871],[-42.745,0],[0,-27.471],[0,0],[0,0],[0,0],[79.681,0],[0,-42.751],[-56.714,-6.932],[0,0],[0,-11.889],[46.468,0],[0,24.706],[0,0],[0,0],[0,0],[-83.014,0],[0,44.481]],"o":[[0,0],[-30.47,-3.693],[0,-16.25],[32.979,0],[0,0],[0,0],[0,0],[0,-45.193],[-78.079,0],[0,37.404],[0,0],[35.199,4.276],[0,17.563],[-52.303,0],[0,0],[0,0],[0,0],[0,51.225],[81.195,0],[0,-37.04]],"v":[[45.101,-18.517],[-31.426,-27.025],[-68.006,-48.202],[-1.717,-73.402],[69.439,-40.165],[69.439,-36.647],[124.371,-36.647],[124.371,-40.165],[-1.006,-111.276],[-122.081,-44.981],[-42.241,15.871],[32.63,23.834],[74.503,46.68],[5.442,72.782],[-72.242,37.84],[-72.242,34.322],[-126.794,34.322],[-126.794,37.84],[0.878,111.276],[126.794,42.294]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.145098039216,0.352941176471,0.294117647059,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[127.044,111.526],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 7","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":150,"st":0,"ct":1,"bm":0}]},{"id":"comp_2","nm":"Symbol","fr":30,"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Bottom_03","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.103],"y":[0.856]},"o":{"x":[0.566],"y":[0]},"t":18,"s":[-83]},{"i":{"x":[0.599],"y":[1]},"o":{"x":[0.271],"y":[1.034]},"t":31,"s":[-4.564]},{"t":49,"s":[0]}],"ix":10},"p":{"a":0,"k":[190,190,0],"ix":2,"l":2},"a":{"a":1,"k":[{"i":{"x":0.103,"y":0.882},"o":{"x":0.566,"y":0},"t":18,"s":[202.5,226.5,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.599,"y":1},"o":{"x":0.271,"y":0.846},"t":31,"s":[140.129,187.754,0],"to":[0,0,0],"ti":[0,0,0]},{"t":49,"s":[136.5,185.5,0]}],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.103,0.103,0.667],"y":[0.856,0.856,1]},"o":{"x":[0.566,0.566,0.333],"y":[0,0,0]},"t":18,"s":[61,61,100]},{"i":{"x":[0.599,0.599,0.667],"y":[1,1,1]},"o":{"x":[0.271,0.271,0.333],"y":[1.034,1.034,0]},"t":31,"s":[97.856,97.856,100]},{"t":49,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-21.955,2.368],[-21.955,53.879],[-10.475,56.52],[21.955,-5.457],[21.955,-53.88],[10.475,-56.52]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.145098039216,0.352941176471,0.294117647059,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[183.719,313.988],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bottom_03","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":21,"op":168,"st":18,"ct":1,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Bottom_02","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.103],"y":[0.856]},"o":{"x":[0.566],"y":[0]},"t":17,"s":[-109]},{"i":{"x":[0.599],"y":[1]},"o":{"x":[0.271],"y":[1.034]},"t":30,"s":[-5.994]},{"t":48,"s":[0]}],"ix":10},"p":{"a":0,"k":[190,190,0],"ix":2,"l":2},"a":{"a":1,"k":[{"i":{"x":0.103,"y":0.861},"o":{"x":0.566,"y":0},"t":17,"s":[160.5,240.5,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.599,"y":1},"o":{"x":0.271,"y":0.995},"t":30,"s":[137.82,188.524,0],"to":[0,0,0],"ti":[0,0,0]},{"t":48,"s":[136.5,185.5,0]}],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.103,0.103,0.667],"y":[0.856,0.856,1]},"o":{"x":[0.566,0.566,0.333],"y":[0,0,0]},"t":17,"s":[61,61,100]},{"i":{"x":[0.599,0.599,0.667],"y":[1,1,1]},"o":{"x":[0.271,0.271,0.333],"y":[1.034,1.034,0]},"t":30,"s":[97.856,97.856,100]},{"t":48,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-34.624,1.984],[-34.47,44.804],[-24.774,49.246],[34.624,-2.959],[34.624,-44.807],[24.791,-49.246]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.145098039216,0.352941176471,0.294117647059,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[105.557,316.603],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bottom_02","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":20,"op":167,"st":17,"ct":1,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"Bottom_01","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.103],"y":[0.856]},"o":{"x":[0.566],"y":[0]},"t":16,"s":[-150]},{"i":{"x":[0.599],"y":[1]},"o":{"x":[0.271],"y":[1.034]},"t":29,"s":[-8.248]},{"t":47,"s":[0]}],"ix":10},"p":{"a":0,"k":[190,190,0],"ix":2,"l":2},"a":{"a":1,"k":[{"i":{"x":0.103,"y":0.857},"o":{"x":0.566,"y":0},"t":16,"s":[126.5,232.5,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.599,"y":1},"o":{"x":0.264,"y":1},"t":29,"s":[135.95,188.084,0],"to":[0,0,0],"ti":[0,0,0]},{"t":47,"s":[136.5,185.5,0]}],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.103,0.103,0.667],"y":[0.856,0.856,1]},"o":{"x":[0.566,0.566,0.333],"y":[0,0,0]},"t":16,"s":[61,61,100]},{"i":{"x":[0.599,0.599,0.667],"y":[1,1,1]},"o":{"x":[0.271,0.271,0.333],"y":[1.034,1.034,0]},"t":29,"s":[97.856,97.856,100]},{"t":47,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-38.239,-22.519],[-45.206,-16.762],[-45.206,22.52],[38.256,22.373],[45.206,16.599],[45.086,-22.519]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.145098039216,0.352941176471,0.294117647059,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[45.456,259.807],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bottom_01","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":19,"op":166,"st":16,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"Top_03","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.103],"y":[0.856]},"o":{"x":[0.566],"y":[0]},"t":18,"s":[-150]},{"i":{"x":[0.599],"y":[1]},"o":{"x":[0.271],"y":[1.034]},"t":31,"s":[-8.248]},{"t":49,"s":[0]}],"ix":10},"p":{"a":0,"k":[190,190,0],"ix":2,"l":2},"a":{"a":1,"k":[{"i":{"x":0.103,"y":0.856},"o":{"x":0.566,"y":0},"t":18,"s":[136.5,129.5,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.599,"y":1},"o":{"x":0.262,"y":1},"t":31,"s":[136.5,182.421,0],"to":[0,0,0],"ti":[0,0,0]},{"t":49,"s":[136.5,185.5,0]}],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.103,0.103,0.667],"y":[0.856,0.856,1.32]},"o":{"x":[0.566,0.566,0.333],"y":[0,0,0]},"t":18,"s":[61,61,100]},{"i":{"x":[0.599,0.599,0.667],"y":[1,1,1]},"o":{"x":[0.271,0.271,0.333],"y":[1.034,1.034,-0.443]},"t":31,"s":[97.856,97.856,100]},{"t":49,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-48.541,22.52],[-48.661,-16.598],[-41.711,-22.372],[48.661,-22.52],[48.661,16.762],[41.695,22.52]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.145098039216,0.352941176471,0.294117647059,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[223.825,105.247],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Top_03","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":21,"op":166,"st":-5,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"Top_02","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.103],"y":[0.856]},"o":{"x":[0.566],"y":[0]},"t":17,"s":[-109]},{"i":{"x":[0.599],"y":[1]},"o":{"x":[0.271],"y":[1.034]},"t":30,"s":[-5.994]},{"t":48,"s":[0]}],"ix":10},"p":{"a":0,"k":[190,190,0],"ix":2,"l":2},"a":{"a":1,"k":[{"i":{"x":0.103,"y":0.856},"o":{"x":0.566,"y":0},"t":17,"s":[107.5,125.5,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.599,"y":1},"o":{"x":0.262,"y":1},"t":30,"s":[134.905,182.201,0],"to":[0,0,0],"ti":[0,0,0]},{"t":48,"s":[136.5,185.5,0]}],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.103,0.103,0.667],"y":[0.856,0.856,1.32]},"o":{"x":[0.566,0.566,0.333],"y":[0,0,0]},"t":17,"s":[61,61,100]},{"i":{"x":[0.599,0.599,0.667],"y":[1,1,1]},"o":{"x":[0.271,0.271,0.333],"y":[1.034,1.034,-0.443]},"t":30,"s":[97.856,97.856,100]},{"t":48,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[34.391,-2.915],[34.238,-45.736],[24.541,-50.178],[-34.391,3.891],[-34.391,45.738],[-24.558,50.178]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.145098039216,0.352941176471,0.294117647059,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[162.628,50.427],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Top_02","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":20,"op":165,"st":-6,"ct":1,"bm":0},{"ddd":0,"ind":6,"ty":4,"nm":"Top_01","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.103],"y":[0.856]},"o":{"x":[0.566],"y":[0]},"t":16,"s":[-83]},{"i":{"x":[0.599],"y":[1]},"o":{"x":[0.271],"y":[1.034]},"t":29,"s":[-4.564]},{"t":47,"s":[0]}],"ix":10},"p":{"a":0,"k":[190,190,0],"ix":2,"l":2},"a":{"a":1,"k":[{"i":{"x":0.103,"y":0.856},"o":{"x":0.566,"y":0},"t":16,"s":[77.5,142.5,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.599,"y":1},"o":{"x":0.262,"y":1},"t":29,"s":[133.256,183.136,0],"to":[0,0,0],"ti":[0,0,0]},{"t":47,"s":[136.5,185.5,0]}],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.103,0.103,0.667],"y":[0.856,0.856,1.32]},"o":{"x":[0.566,0.566,0.333],"y":[0,0,0]},"t":16,"s":[61,61,100]},{"i":{"x":[0.599,0.599,0.667],"y":[1,1,1]},"o":{"x":[0.271,0.271,0.333],"y":[1.034,1.034,-0.443]},"t":29,"s":[97.856,97.856,100]},{"t":47,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[22.833,-5.316],[22.833,-51.967],[11.353,-54.606],[-21.955,5.764],[-22.833,51.967],[-11.354,54.606]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.145098039216,0.352941176471,0.294117647059,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[89.576,57.882],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Top_01","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":19,"op":164,"st":-7,"ct":1,"bm":0},{"ddd":0,"ind":7,"ty":4,"nm":"Center_02","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[190,190,0],"ix":2,"l":2},"a":{"a":0,"k":[136.5,185.5,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.593,0.957,0.667],"y":[1,1,1]},"o":{"x":[0.794,0.333,0.333],"y":[0,0,0]},"t":0,"s":[0,100,100]},{"t":13,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.518},"o":{"x":1,"y":0},"t":4,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-58.467,-69.408],[-58.577,-69.495],[-68.443,-65.157],[-68.443,-21.93],[-68.334,-22.006],[-58.467,-26.344]],"c":true}]},{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0.482},"t":20,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[62.702,17.954],[-58.577,-69.495],[-68.443,-65.157],[-68.443,-21.93],[52.835,65.356],[62.702,61.018]],"c":true}]},{"t":40,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[68.443,22.093],[-58.577,-69.495],[-68.443,-65.157],[-68.443,-21.93],[58.576,69.496],[68.443,65.158]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.145098039216,0.352941176471,0.294117647059,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[204.044,208.466],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Center_02","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":150,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":8,"ty":4,"nm":"Center_01","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[190,190,0],"ix":2,"l":2},"a":{"a":0,"k":[136.5,185.5,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.593,0.957,0.667],"y":[1,1,1]},"o":{"x":[0.794,0.333,0.333],"y":[0,0,0]},"t":0,"s":[0,100,100]},{"t":13,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.518},"o":{"x":1,"y":0},"t":4,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[58.62,69.344],[58.577,69.495],[68.443,65.158],[68.443,21.93],[68.486,21.942],[58.62,26.28]],"c":true}]},{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0.482},"t":20,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-62.695,-17.957],[58.577,69.495],[68.443,65.158],[68.443,21.93],[-52.828,-65.359],[-62.695,-61.021]],"c":true}]},{"t":40,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-68.443,-22.094],[58.577,69.495],[68.443,65.158],[68.443,21.93],[-58.576,-69.495],[-68.443,-65.158]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.145098039216,0.352941176471,0.294117647059,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[68.694,163.254],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Center_01","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":150,"st":0,"ct":1,"bm":0}]}],"layers":[{"ddd":0,"ind":1,"ty":0,"nm":"SIMPAC_ Loading","refId":"comp_0","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[183.5,40,0],"ix":2,"l":2},"a":{"a":0,"k":[960,540,0],"ix":1,"l":2},"s":{"a":0,"k":[21.563,21.563,100],"ix":6,"l":2}},"ao":0,"w":1920,"h":1080,"ip":0,"op":150,"st":0,"bm":0}],"markers":[],"props":{}},
    anim : null,

    init(){
        this.container = document.querySelector(".page-loading");
        this.player = document.querySelector("#page-loader");

        if(!this.container) return;

        //console.log(this.animationData);

        this.anim = lottie.loadAnimation({
            container : this.player,
            renderer : 'svg',
            loop : true,
            autoplay : false,
            animationData : this.animationData
        });

        this.show();
        
    },

    show(){
        this.container.classList.remove('hide');
        if(this.anim) this.anim.play();
    },

    hide(){
        this.container.classList.add('hide');
        if(this.anim) this.anim.stop();
    }
}

pageLoader.init();

const smoothScroller = {

  init(){

    if (typeof Lenis === 'undefined') return;


    const touchDevice = $WINDOW.isTouchDevice();

    const iframeItems = document.querySelectorAll('iframe');

    if(!touchDevice && iframeItems && iframeItems.length == 0) {
      const containerLenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        smoothTouch: false,
        allowNestedScroll:true,
      });
    
      containerLenis.on('scroll', () => {
        ScrollTrigger.update();
      });
    
      gsap.ticker.add((time) => {
        containerLenis.raf(time * 1000);
      });
    
      gsap.ticker.lagSmoothing(0);
    
      window._lenis = containerLenis; // 필요하면 쓰라고 남겨둠
    }

  }
}
smoothScroller.init();
document.addEventListener("DOMContentLoaded", () => common.init());
