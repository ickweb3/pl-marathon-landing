/**
 * FAQ copy.
 *
 * The nine questions are verbatim from Figma node 1:496. Answer 1 is verbatim
 * from the frame too — it is the only one the design draws.
 *
 * Answers 2 to 9 are written from the project's own documents, not invented.
 * Each carries the source it rests on:
 *
 *   2, 6  Sources/Marathon-Brief-2026-08-13.md (task 4 «не переснімати та не
 *         намагатися виглядати ідеально», task 7 public Instagram post) and
 *         modules/review/CONTRACT.md (a participant never reads another
 *         woman's submission).
 *   3     Mentor block of this landing + Marathon brief: the marathon is about
 *         what to show, and Victoria adds shooting advice.
 *   4     Marathon brief, task 4 — the only device any task names is a phone.
 *   5     CLAUDE.md + Research/Scope-Round-2-2026-08-13.md — "The Mini App is
 *         the surface", every submission happens there, testable on a phone.
 *   7     Marathon brief (pair or solo at the start, bot matches, solo variant)
 *         + Open-Questions #3, #4, #50 (never blocked when a partner goes
 *         quiet).
 *   8     Pershi-Ledi/Content/Welcome-Video-Script.md — "Підступу немає.
 *         Проєкт підтримують європейські фонди".
 *   9     Pershi-Ledi/CLAUDE.md (1 LADIES = 1 UAH) + PL-Marathon
 *         Open-Questions #18/#28 (50 LADIES against a verified ID).
 *
 * Two things deliberately NOT claimed, because no document supports them:
 * an alternative to the public post in task 7, and any eligibility rule.
 */

export type FaqItem = { question: string; answer: string };

export const FAQ: FaqItem[] = [
  {
    question: "Я не веду блог. Мені підійде марафон?",
    answer:
      "Так. Марафон не вимагає досвіду у створенні контенту – почнемо з розуміння себе і своїх сильних сторін.",
  },
  {
    question: "Я дуже соромлюся камери. Чи зможу виконувати завдання?",
    answer:
      "Так. Завдання складені так, щоб не треба було виглядати «ідеально» — перезнімати кадр десятки разів не потрібно. Твою роботу бачить лише менторка, інші учасниці — ні.",
  },
  {
    question: "Чи будемо вчитися фотографуватися?",
    answer:
      "Марафон не про техніку зйомки, а про те, що саме ти хочеш показати. Ти спробуєш себе перед камерою і отримаєш поради щодо зйомки від Вікторії — фотографки з понад 7 роками практики.",
  },
  {
    question: "Чи потрібне професійне обладнання?",
    answer:
      "Ні. Усе, що потрібно — телефон. Завдання розраховані саме на нього.",
  },
  {
    question: "Чи можна проходити марафон із телефону?",
    answer:
      "Так. Марафон живе в Telegram: завдання, здача робіт, прогрес і рейтинг — усе в застосунку всередині бота. Комп'ютер не потрібен.",
  },
  {
    question: "Чи потрібно щось публікувати?",
    answer:
      "Шість із семи завдань ти надсилаєш лише в бот — їх бачить тільки менторка. Фінальне, сьоме, — це публічний прояв в Instagram: фото, відео або Reels. До нього ти йдеш поступово всі сім днів.",
  },
  {
    question: "Як проходитиме робота в парах?",
    answer:
      "На старті ти обираєш: іти в парі чи самостійно. Якщо обереш пару — бот сам підбере тобі партнерку. Парних завдань два, і для тих, хто йде сам, є індивідуальний варіант. Якщо партнерка зникне, ти не застрягнеш: здаєш свою роботу і отримуєш свою оцінку.",
  },
  {
    question: "Це справді безкоштовно?",
    answer:
      "Так, і підступу немає. Платформу «Перші Леді» будують на підтримці європейських фондів та міжнародних жіночих ініціатив, які інвестують у розвиток українських жінок. Саме тому марафон і курси на платформі безкоштовні.",
  },
  {
    question: "Що таке LADIES?",
    answer:
      "Це внутрішня валюта платформи «Перші Леді»: 1 LADIES = 1 гривня. Кожна, хто виконає хоча б одне завдання марафону, отримає 50 LADIES. Нарахування йде на верифікований профіль на платформі.",
  },
];
