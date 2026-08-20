/**
 * Every link and date of the landing. A widget reads CONFIG; no URL is written
 * in a widget file.
 *
 * The label of every nav item, social and legal row is verbatim from the Figma
 * frame. Only the hrefs are ours, because the frame carries none.
 */

export const CONFIG = {
  /**
   * Every "Приєднатися / Почати безкоштовно" button.
   *
   * The `ref` is how the live PL course landings attribute a registration —
   * courses.pershiledy.com sends `?ref=10000344&course=<uuid>`. The marathon has
   * no course id, so only the ref travels.
   *
   * `community` is read by the platform's Registration page (PL-661): after a
   * successful signup it navigates to `/clubs/<uuid>` instead of the profile.
   * The uuid below is the marathon club «Перші Леді | Марафон "Проявись"»,
   * display_id 24 in the backoffice — the two ids are different keys for the
   * same row, and the backoffice URL shows the one the platform does NOT accept.
   * There is no whitelist: any community uuid works, and a wrong one lands the
   * user on an empty club page, so change this only against the real uuid.
   *
   * It does NOT join the club. The club page still asks for one click, and that
   * click opens the community's Telegram invite. Auto-join does not exist.
   *
   * `src` is a free-form attribution tag; the platform stores it on the user as
   * `source_ref` across all four signup flows (email, Google, Facebook,
   * Telegram). It is server-side attribution and does not replace the UTMs,
   * which feed GA4.
   *
   * The UTM set was supplied by the owner on 2026-08-17 and is verbatim. It is
   * what separates this landing's registrations from every other PL source in
   * the reports, so do not edit a parameter to "tidy" it — `utm_content` is the
   * campaign key (`marafon22082026`).
   *
   * Every button on the page reads this one value. If a second CTA ever needs
   * its own `utm_term`, add a second entry here rather than writing a URL into
   * a widget.
   */
  ctaUrl:
    "https://pershiledy.com/registration?ref=10000344&src=marathon_proyavys&community=9edba7c4-9143-4ee2-a426-e86f82344eff&utm_source=website&utm_medium=pershiledy&utm_campaign=pershiledy_reg&utm_content=marafon22082026&utm_term=text",
  /**
   * The header pill. On the live sister landing the same button scrolls to the
   * "how to join" block rather than leaving the site — checked 2026-08-14, it
   * lands on `#three-steps`. Ours does the same.
   */
  headerCtaAnchor: "#join",

  /** The platform itself, for anywhere that needs it. */
  platformUrl: "https://pershiledy.com/",

  /**
   * The one place the start date is written. Every visible date on the page
   * reads it: the hero badge, the «Стартуємо» heading, the third join step and
   * both closing-CTA paragraphs.
   *
   * Moved from «22 серпня» to «29 серпня» on 2026-08-17 at the client's
   * request. Two things do NOT follow it and must be changed on purpose:
   * `ctaUrl`'s `utm_content=marafon22082026`, which is an attribution key and
   * not a date, and `public/og.jpg`, which is a rendered picture of the hero
   * with the date inside it.
   */
  startDateLabel: "29 серпня",

  mentor: {
    name: "Вікторія Мирна",
    instagramUrl: "https://www.instagram.com/",
  },

  /**
   * The footer badges, node 4870:9086 / 4870:9091. Both links checked 200 on
   * 2026-08-17.
   *
   * The Apple link MUST carry a storefront code: `apps.apple.com/app/id...`
   * with none answers 404. `ua` is set because the audience is Ukrainian; the
   * app is in the Polish storefront too, so `pl` also works if it is ever
   * wanted.
   */
  stores: {
    appStore: "https://apps.apple.com/ua/app/id6774159825",
    googlePlay: "https://play.google.com/store/apps/details?id=com.pershiledy.app",
  },
} as const;

/** Header, node 4882:802. */
export const NAV_LINKS = [
  { label: "Для кого цей курс", href: "#problems" },
  { label: "Програма курсу", href: "#program" },
  { label: "Подарунки", href: "#prizes" },
  { label: "Менторки", href: "#mentor" },
  { label: "Як взяти участь", href: "#join" },
  { label: "Про нас", href: "#about" },
] as const;

/**
 * Footer — labels from Figma node 65:3758 / 65:3768 / 65:3776, hrefs scraped
 * from the live sister landing `courses.pershiledy.com/instruktor-z-roztyazhky`
 * on 2026-08-14. The copies in `pl-fe-cabinet` are stale: they still carry
 * `t.me/pershilady`, `instagram.com/pershi_ledy`, a `profile.php` Facebook URL
 * and `/privacy` instead of `/privacy-policy`.
 *
 * Two deliberate departures from the frame, both to avoid shipping a dead link:
 * the frame lists **Linkedin** and **X**, which have no live URL anywhere, so
 * the live set (**Threads**, **Telegram Chat**) takes their place; and the legal
 * row follows the live wording — **Публічна угода** and **Політика Cookie**
 * instead of «Умови користування» and «Юридична інформація», which resolve to
 * nothing.
 */
export const FOOTER_NAV = [
  { label: "Про нас", href: "#about" },
  { label: "Місія", href: "#program" },
  { label: "Екосистема", href: "https://pershiledy.com/#powerinoneplace" },
  { label: "Як це працює", href: "#join" },
  { label: "FAQ", href: "#faq" },
] as const;

export const FOOTER_SOCIALS = [
  { label: "Telegram", href: "https://t.me/pershiledy_support" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/pershiledy?igsh=ZDZxc254ejc3YWxl",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Pershi-Ledy/61579662041886/",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@pershiledy?igshid=NTc4MTIwNjQ2YQ%3D%3D",
  },
  { label: "Telegram Chat", href: "https://t.me/pershiledy_chat" },
] as const;

export const FOOTER_LEGAL = [
  {
    label: "Політика конфіденційності",
    href: "https://pershiledy.com/privacy-policy",
  },
  { label: "Публічна угода", href: "https://pershiledy.com/agreement" },
  { label: "Політика Cookie", href: "https://pershiledy.com/cookies" },
] as const;
