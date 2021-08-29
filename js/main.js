const mq = window.matchMedia("(min-width: 768px)");

function initAppScreen() {
  // selectors
  const screens = gsap.utils.toArray(".app__screen");
  const phone = document.querySelector(".app__frame");
  const height = 100 * screens.length;
  const screenDex = gsap.utils.toArray(".screen");
  const appIcons = gsap.utils.toArray("svg circle");
  // only trigger on desktop
  if (mq.matches) {
    // clean reload
    gsap.set("#app", { autoAlpha: 1, y: 300 });
    // pre set active icon of first screen
    gsap.set(".app-icon-1 circle", { fill: "#ff4367" });

    // click to screen
    const appLinks = gsap.utils.toArray(".app__screen--icons svg");
    appLinks.forEach((link, i) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (i === 0) {
          gsap.to(window, { duration: 1, scrollTo: i + innerWidth });
        }
        if (i === 1) {
          gsap.to(window, { duration: 1, scrollTo: i + innerWidth + 1050 });
        }
        if (i === 2) {
          gsap.to(window, {
            duration: 1,
            scrollTo: i * innerWidth + appLinks.length + 350,
          });
        }
        if (i === 3) {
          gsap.to(window, {
            duration: 1,
            scrollTo: i * innerWidth + appLinks.length - 160,
          });
        }
      });
    });

    // pin all sections
    const pinner = gsap.timeline({
      scrollTrigger: {
        trigger: "#app .app__wrapper",
        start: "top top+=110",
        end: "+=" + height + "%",
        scrub: true,
        pin: "#app .app__wrapper",
        invalidateOnRefresh: true,
        // id: "app-pin",
        // markers: true,
      },
    });

    // main timeline
    const tl = gsap.timeline({
      // durration depend on the index how many screens
      duration: screens.length,
      scrollTrigger: {
        trigger: "#app",
        start: "top center",
        end: "+=" + height + "%",
        scrub: 1,
        // invalidateOnRefresh: true,
        // id: "screens",
        // markers: true,
      },
    });

    // animation event
    screens.forEach(function (elem, i) {
      // set active icon
      tl.to(appIcons[i], { fill: "#fb7aac", duration: 0.05 }, i);
      // animation down scroll exclulde first screen
      if (i !== 0) {
        // set active z-index
        tl.set(screenDex[i], { zIndex: 7 }, i);
        // set screen slide effect
        tl.from(elem.querySelector(".app__screen--wrap"), { y: -535 }, i);
        // set text slide effect
        tl.from(
          elem.querySelector(".app__screen--wrap-desc"),
          { ease: "power2.in" },
          i
        );
      }
      // animation up scroll
      if (i != screens.length - 1) {
        // z-index
        tl.set(screenDex[i], { zIndex: 5 }, i + 0.75);
        // icon
        tl.to(appIcons[i], { fill: "#142027", duration: 0.05 }, i + 0.75);
        // screen
        // tl.to(elem.querySelector(".app__screen--wrap"), {}, i + 0.75);
        // text
        tl.to(
          elem.querySelector(".app__screen--wrap-desc"),
          { autoAlpha: 0, translateY: 150 },
          i + 0.75
        );
      }
    });
  }
}

// ================================
// INIT FUNCTIONS =================
// ================================
function init() {
  initAppScreen();
}

// ================================
// WINDOW LOAD ====================
// ================================
window.addEventListener("load", function () {
  init();
});
