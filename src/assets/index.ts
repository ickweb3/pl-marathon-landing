/**
 * Image registry — the house pattern from pl-fe-cabinet (`assets/index`).
 *
 * Every entry is an export of the Figma frame `Landing-courses-PL` node
 * `4882:772`. The name↔node mapping came from `get_design_context` per section,
 * so each file sits where the designer put it.
 */

const img = (name: string) => `/img/${name}`;

export const IMAGES = {
  // Header / hero — node 4882:773
  logo: img("logo.svg"),
  rings: img("rings.svg"),
  heroEllipse: img("hero-ellipse.svg"),
  heroPortrait: img("hero-portrait.webp"),
  likeBubbleSm: img("like-bubble-sm.svg"),
  likeBubbleLg: img("like-bubble-lg.svg"),
  heart: img("heart.svg"),
  btnCircleWhite: img("btn-circle-white.svg"),
  arrowRight: img("arrow-right.svg"),

  // Problems — node 4882:860
  problem1: img("problem-1.webp"),
  problem2: img("problem-2.webp"),
  problem3: img("problem-3.webp"),
  problem4: img("problem-4.webp"),
  problem5: img("problem-5.webp"),
  problem6: img("problem-6.webp"),

  // Inner critic — node 4882:835
  chatSend: img("chat-send.svg"),

  /**
   * Program tiles — node 4882:870.
   *
   * The frame crops these out of two sprite sheets, and its crop window is
   * shorter than the glyph: reproduced verbatim, the compass loses 7px off the
   * top and the bottom. Each glyph is now its own file, cut from the
   * full-resolution sheets and trimmed to its alpha bounds.
   */
  icon1: img("icon-1.webp"), // compass
  icon2: img("icon-2.webp"), // diamond
  icon3: img("icon-3.webp"), // key
  icon4: img("icon-4.webp"), // lightning

  // Mentor — node 4882:1024, phone node 19:1111
  /**
   * One fill serves both layouts: the phone frame places it with the same
   * transform as the desktop card, in a smaller box.
   */
  mentor: img("mentor.webp"),
  mentorRings: img("mentor-rings.svg"),
  mentorGlow: img("mentor-glow.svg"),
  iconInstagram: img("icon-instagram.svg"),

  // Prizes — node 4905:1436
  prize1: img("prize-1.webp"),
  prize2Back: img("prize-2-back.webp"),
  prize2Front: img("prize-2-front.webp"),
  ladiesCoin: img("ladies-coin.webp"),
  prizeRings: img("prize-rings.svg"),

  // Join steps — node 4882:1062
  step1: img("step-1.webp"),
  step2Macbook: img("step-2-macbook.webp"),
  step2Profile: img("step-2-profile.webp"),
  step3: img("step-3.webp"),
  joinEllipseA: img("join-ellipse-a.svg"),
  joinEllipseB: img("join-ellipse-b.svg"),
  joinVectorR: img("join-vector-r.svg"),
  joinVectorL: img("join-vector-l.svg"),
  cursor: img("cursor.svg"),
  cursorLg: img("cursor-lg.svg"),
  num01: img("num-01.svg"),
  num02: img("num-02.svg"),
  num03: img("num-03.svg"),
  btnCircleBlue: img("btn-circle-blue.svg"),
  arrowRightWhite: img("arrow-right-white.svg"),

  // FAQ — node 4882:1137
  faqArrowOpen: img("faq-arrow-open.svg"),
  faqArrowClosed: img("faq-arrow-closed.svg"),

  /**
   * Card rail — the phone frames 19:919 and 19:994 share one nav pair,
   * node 16:229. One glyph; the left button turns it 180°.
   */
  carouselArrow: img("carousel-arrow.svg"),

  // Closing CTA — node 4882:1148, phone node 19:1170
  finalPhoto: img("final-photo.webp"),
  /**
   * The desktop file is a render of the node already clipped to 1344 x 471, so
   * it cannot supply the phone's window. This one is cut from the raw fill to
   * the 390 x 563 the phone frame shows (image 193 sits in a 1334 x 1281 box at
   * left -639, top 205), at 2x.
   */
  finalPhotoMob: img("final-photo-mob.webp"),
  finalEllipse: img("final-ellipse.svg"),
  finalVector: img("final-vector.svg"),
  btnCircleFinal: img("btn-circle-final.svg"),
  arrowRightFinal: img("arrow-right-final.svg"),

  // Footer — node 4903:1202
  logoFooter: img("logo-footer.svg"),
  footerEllipseA: img("footer-ellipse-a.svg"),
  footerEllipseB: img("footer-ellipse-b.svg"),
  footerVectorR: img("footer-vector-r.svg"),
  footerVectorL: img("footer-vector-l.svg"),
  iconAppStore: img("icon-appstore.svg"),
  iconGooglePlay: img("icon-googleplay.svg"),
} as const;
