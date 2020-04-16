import puppeteer from 'puppeteer';

const referenceCode = "F4Ad";
const referenceLink = `https://uk.robinhood.com/${referenceCode}`;

function delay(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}

const start_time = Date.now();

const email = (i: number) => `costacoffeemakeawish+${start_time}-${i}@gmail.com`;

const sandwich_size = 5;
const how_much_bacon = 50;
const starting_bacon = 1;
const max_bacon = starting_bacon + how_much_bacon;

const bring_home_the_bacon = async (current_bacon: number) => {
  const browser = await puppeteer.launch({ headless: true });

  try {
    const page = await browser.newPage();
    await page.goto(referenceLink);

    await delay(2000);
    await page.type(`[type="email"]`, email(current_bacon));

    await delay(500);
    await page.click(`[type="submit"]`);

    await delay(2000);

  } finally {
    await browser.close();
  }
};

const create_sandwich = (initial_bacon: number): Promise<void>[] => {
  const pieces = Array.from(Array(sandwich_size));
  return pieces.map((pieces, index) => bring_home_the_bacon(initial_bacon + index));
};

(async () => {
  let current_bacon = starting_bacon;

  while (current_bacon < max_bacon + sandwich_size) {
    const sandwich = create_sandwich(current_bacon);

    current_bacon += sandwich_size;

    await Promise.all(sandwich);
  }
})();
