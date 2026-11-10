const rspca = "https://www.rspca.org.uk/en/adviceandwelfare/pets/cats";
const anatomy =
  "https://www.merckvetmanual.com/cat-owners/introduction-to-cats/physical-description-of-cats";
const bodyLanguage = "https://www.cats.org.uk/help-and-advice/cat-behaviour/cat-body-language";
export const catFacts = [
  {
    text: "Cats have scent glands between their paw pads. A scratch can leave a message as well as a mark.",
    url: "https://www.cats.org.uk/help-and-advice/cat-behaviour/scratching",
    source: "Cats Protection",
  },
  {
    text: "A cheek rub can be a friendly greeting. Your cat is sharing a little familiar scent.",
    url: bodyLanguage,
    source: "Cats Protection",
  },
  {
    text: "Relaxed whiskers sit closer to the face. Even tiny details can tell you how a cat feels.",
    url: bodyLanguage,
    source: "Cats Protection",
  },
  {
    text: "Cats use their whole body to communicate, not just their faces. Watch the ears, tail and posture together.",
    url: bodyLanguage,
    source: "Cats Protection",
  },
  {
    text: "Kneading is sometimes called making biscuits. It is that familiar alternating push of the front paws.",
    url: "https://www.scottishspca.org/advice/cats/why-do-cats-make-biscuits/",
    source: "Scottish SPCA",
  },
  {
    text: "Kittens and senior cats often sleep more than adult cats. Different ages, different nap schedules.",
    url: "https://www.cats.org.uk/help-and-advice/cat-behaviour/cats-and-sleep",
    source: "Cats Protection",
  },
  {
    text: "A sleeping cat may twitch their paws or mouth. Little movements can happen during deep sleep.",
    url: "https://www.cats.org.uk/help-and-advice/cat-behaviour/cats-and-sleep",
    source: "Cats Protection",
  },
  {
    text: "Cats have REM sleep, like humans. Scientists think that cats are likely to dream, too.",
    url: "https://www.cats.org.uk/cats-blog/do-cats-dream",
    source: "Cats Protection",
  },
  {
    text: "A soft, relaxed posture is a useful sign of comfort. Read it together with the ears and eyes.",
    url: bodyLanguage,
    source: "Cats Protection",
  },
  {
    text: "Cats leave scent messages when they scratch. The marks and scent work together as a feline noticeboard.",
    url: "https://www.cats.org.uk/help-and-advice/cat-behaviour/scratching",
    source: "Cats Protection",
  },
  {
    text: "Cats nap for around 12–18 hours a day. Your focus buddy takes rest very seriously.",
    url: "https://science.rspca.org.uk/en/web/rspca/adviceandwelfare/pets/cats",
    source: "RSPCA",
  },
  {
    text: "Every cat has a unique nose print. A tiny signature, right above the whiskers.",
    url: "https://catprotection.org.au/fun-cat-facts/",
    source: "Cat Protection Society",
  },
  {
    text: "Cats use meows, trills, chirrups and purrs to communicate. Quite the little vocabulary.",
    url: "https://science.rspca.org.uk/en/web/rspca/adviceandwelfare/pets/cats",
    source: "RSPCA",
  },
  {
    text: "Whiskers are wonderfully sensitive: they help cats notice tiny changes around them.",
    url: "https://www.cats.org.uk/media/9905/039_fivefacts_com_6117-thecat_autumn_21.pdf",
    source: "Cats Protection",
  },
  {
    text: "A relaxed cat may purr while enjoying your company. A cozy little soundtrack.",
    url: "https://www.cats.org.uk/cats-blog/why-does-my-cat-purr",
    source: "Cats Protection",
  },
  {
    text: "Cats hear high-pitched sounds that human ears cannot pick up.",
    url: rspca,
    source: "RSPCA",
  },
  {
    text: "A cat's sense of smell is stronger than ours. So many tiny scent stories.",
    url: rspca,
    source: "RSPCA",
  },
  {
    text: "Cats see better than people in dim light. Twilight suits your little friend.",
    url: rspca,
    source: "RSPCA",
  },
  {
    text: "Quick reflexes and powerful muscles help cats leap, climb and stalk.",
    url: rspca,
    source: "RSPCA",
  },
  {
    text: "Cats usually hunt alone, even when they enjoy having companions at home.",
    url: rspca,
    source: "RSPCA",
  },
  {
    text: "Play gives cats both movement practice and a little brain workout.",
    url: rspca,
    source: "RSPCA",
  },
  {
    text: "Thick paw pads help cats grip the surfaces beneath their feet.",
    url: anatomy,
    source: "Merck Veterinary Manual",
  },
  {
    text: "Cats can retract their claws, keeping them tucked away between adventures.",
    url: anatomy,
    source: "Merck Veterinary Manual",
  },
  {
    text: "Scratching helps cats remove old outer layers from their claws.",
    url: anatomy,
    source: "Merck Veterinary Manual",
  },
  {
    text: "A cat's fur helps regulate body temperature as well as protecting the skin.",
    url: anatomy,
    source: "Merck Veterinary Manual",
  },
  {
    text: "Cat coats come in different lengths, from short and sleek to long and fluffy.",
    url: anatomy,
    source: "Merck Veterinary Manual",
  },
  {
    text: "Kittens have 26 baby teeth. Tiny teeth for a tiny cat.",
    url: anatomy,
    source: "Merck Veterinary Manual",
  },
  {
    text: "Adult cats normally have 30 teeth, replacing their kitten teeth as they grow.",
    url: anatomy,
    source: "Merck Veterinary Manual",
  },
  {
    text: "Tiny spines called papillae give a cat's tongue its rough texture.",
    url: anatomy,
    source: "Merck Veterinary Manual",
  },
  {
    text: "An upright tail can be a sign of a happy cat. A little flag of friendliness.",
    url: bodyLanguage,
    source: "Cats Protection",
  },
  {
    text: "Slow blinking can signal that a cat feels relaxed around you.",
    url: bodyLanguage,
    source: "Cats Protection",
  },
  {
    text: "A curious cat may point its ears and whiskers forward to investigate.",
    url: bodyLanguage,
    source: "Cats Protection",
  },
  {
    text: "A relaxed cat may rest with its eyes half closed and its ears softly forward.",
    url: bodyLanguage,
    source: "Cats Protection",
  },
  {
    text: "Rolling onto the back can be a sign that a cat feels happy and comfortable.",
    url: bodyLanguage,
    source: "Cats Protection",
  },
  {
    text: "A cat's posture, ears and tail all help tell the story of how it feels.",
    url: bodyLanguage,
    source: "Cats Protection",
  },
];
export function factForDay(day: string, offset = 0) {
  let hash = 0;
  for (const character of day) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return catFacts[((hash % catFacts.length) + (offset % catFacts.length)) % catFacts.length]!;
}
