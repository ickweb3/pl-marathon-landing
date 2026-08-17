/**
 * FAQ copy.
 *
 * The questions are verbatim from Figma node 1:496 and answer 1 is verbatim
 * from the frame — it is the only answer the design draws. The frame leaves the
 * other eight rows collapsed and empty.
 *
 * **Answers 2, 5, 6 and 7 are the client's own words, supplied 2026-08-17.**
 * They are set verbatim and replace the drafts that stood here. Question 7 was
 * re-worded by the client too — «Як проходитиме робота в парах?» became «Чи
 * обов'язково проходити марафон у парі?» — so that one row no longer matches
 * the frame's question text. The client's wording wins.
 *
 * Where the client's answer differs from the draft it replaced, take the
 * client's reading as the current one: answer 6 now says most tasks are not
 * published rather than naming six of seven, and answer 7 leads with "no, it is
 * not compulsory" rather than describing the matching flow.
 *
 * The four still awaiting a client read are drafts written from the project's
 * own documents, never invented. Each carries the source it rests on:
 *
 *   3     Mentor block of this landing + Marathon brief: the marathon is about
 *         what to show, and Victoria adds shooting advice.
 *   4     Marathon brief, task 4 — the only device any task names is a phone.
 *   8     Pershi-Ledi/Content/Welcome-Video-Script.md — "Підступу немає.
 *         Проєкт підтримують європейські фонди".
 *   9     Pershi-Ledi/CLAUDE.md (1 LADIES = 1 UAH) + PL-Marathon
 *         Open-Questions #18/#28 (50 LADIES against a verified ID).
 *
 * One thing deliberately NOT claimed, because no document supports it: any
 * eligibility rule.
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
      "Так. Ми будемо рухатися поступово – від знайомства із собою до практики перед камерою. Тут не потрібно виглядати «ідеально». Головне – дозволити собі спробувати й зробити свій крок у проявлення.",
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
      "Так. Марафон можна повністю проходити з телефона: спілкування відбуватиметься в Telegram-чаті, а завдання відкриватимуться та здаватимуться через бот.",
  },
  {
    question: "Чи потрібно щось публікувати?",
    answer:
      "Більшість завдань не потрібно публікувати. Ти виконуватимеш їх у боті самостійно або разом із партнеркою. Фінальним кроком стане публічний прояв в Instagram – фото, відео або Reels, до якого ти поступово підготуєшся протягом марафону.",
  },
  {
    question: "Чи обов'язково проходити марафон у парі?",
    answer:
      "Ні. Ти сама обираєш, як проходити марафон – самостійно чи з партнеркою. Якщо захочеш проходити в парі, бот допоможе знайти партнерку. Якщо комфортніше самостійно – для парних практик буде індивідуальний варіант завдання.",
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
