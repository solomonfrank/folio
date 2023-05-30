import each from "lodash/each";

type splitTypeProps = {
  element: HTMLElement;
  expression?: string;
  append?: true;
};

export function split({
  element,
  expression = " ",
  append = true,
}: splitTypeProps) {
  const words = splitText(element.innerHTML.toString().trim(), expression);

  let innerHTML = "";

  each(words, (line) => {
    if (line.indexOf("<br>") > -1) {
      const lines = line.split("<br>");

      each(lines, (line, index) => {
        innerHTML += index > 0 ? "<br>" + parseLine(line) : parseLine(line);
      });
    } else {
      innerHTML += parseLine(line);
    }
  });

  element.innerHTML = innerHTML;

  const spans = element.querySelectorAll("span");

  if (append) {
    each(spans, (span) => {
      const isSingleLetter = span.textContent?.length === 1;
      const isNotEmpty = span?.innerHTML?.trim() !== "";
      const isNotAndCharacter = span.textContent !== "&";
      const isNotDashCharacter = span.textContent !== "-";

      if (
        isSingleLetter &&
        isNotEmpty &&
        isNotAndCharacter &&
        isNotDashCharacter
      ) {
        span.innerHTML = `${span.textContent}&nbsp;`;
      }
    });
  }

  return spans;
}

export function splitText(text: string, expression: string) {
  const splits = text.split("<br>");

  let words: string[] = [];

  each(splits, (item, index) => {
    if (index > 0) {
      words.push("<br>");
    }

    words = words.concat(item.split(expression));

    let isLink = false;
    let link = "";

    const innerHTML: string[] = [];

    each(words, (word) => {
      if (!isLink && (word.includes("<a") || word.includes("<strong"))) {
        link = "";

        isLink = true;
      }

      if (isLink) {
        link += ` ${word}`;
      }

      if (isLink && (word.includes("/a>") || word.includes("/strong>"))) {
        innerHTML.push(link);

        link = "";
      }

      if (!isLink && link === "") {
        innerHTML.push(word);
      }

      if (isLink && (word.includes("/a>") || word.includes("/strong>"))) {
        isLink = false;
      }
    });

    words = innerHTML;
  });

  return words;
}

function parseLine(line: string) {
  line = line.trim();

  if (line === "" || line === " ") {
    return line;
  } else {
    return line === "<br>"
      ? "<br>"
      : `<span>${line}</span>` + (line.length > 1 ? " " : "");
  }
}

export function calculate(spans: HTMLElement[]) {
  const lines: HTMLElement[][] = [];
  let words: HTMLElement[] = [];

  const sp = spans[0] as HTMLElement;

  let position = sp.offsetTop;

  each(spans, (span: HTMLElement, index) => {
    if (span?.offsetTop === position) {
      words.push(span);
    }

    if (span.offsetTop !== position) {
      lines.push(words);

      words = [];
      words.push(span);

      position = span.offsetTop;
    }

    if (index + 1 === spans.length) {
      lines.push(words);
    }
  });

  return lines;
}

// export function replaceAtIndex(string, index, newValue) {
//   if (index > string.length - 1) {
//     return string;
//   } else {
//     return string.substring(0, index) + newValue + string.substring(index + 1);
//   }
// }
