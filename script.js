// sample bible data
const bible = {
  Genesis: {
    1: [
      "In the beginning God created the heaven and the earth.",
      "And the earth was without form, and void; and darkness was upon the face of the deep."
    ],
    2: [
      "Thus the heavens and the earth were finished, and all the host of them.",
      "And on the seventh day God ended his work which he had made."
    ]
  },
  John: {
    3: [
      "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      "For God sent not his Son into the world to condemn the world; but that the world through him might be saved."
    ]
  }
};

let currentVerse;
let selectedBook = null;
let selectedChapter = null;

// pick a random verse
function getRandomVerse() {
  const books = Object.keys(bible);
  const book = books[Math.floor(Math.random() * books.length)];
  const chapters = Object.keys(bible[book]);
  const chapter = chapters[Math.floor(Math.random() * chapters.length)];
  const verses = bible[book][chapter];
  const verseIndex = Math.floor(Math.random() * verses.length);
  return {
    text: verses[verseIndex],
    book,
    chapter,
    verse: verseIndex + 1,
    ref: `${book} ${chapter}:${verseIndex + 1}`
  };
}

function newRound() {
  currentVerse = getRandomVerse();
  selectedBook = null;
  selectedChapter = null;

  document.getElementById("verseText").innerText = `"${currentVerse.text}"`;
  document.getElementById("result").innerText = "";

  showBookOptions();
  document.getElementById("chapterSelect").innerHTML = "";
  document.getElementById("verseSelect").innerHTML = "";
}

function showBookOptions() {
  const container = document.getElementById("bookSelect");
  container.innerHTML = "<h3>Select Book</h3>";
  Object.keys(bible).forEach(book => {
    const btn = document.createElement("button");
    btn.innerText = book;
    btn.onclick = () => {
      selectedBook = book;
      showChapterOptions(book);
    };
    container.appendChild(btn);
  });
}

function showChapterOptions(book) {
  const container = document.getElementById("chapterSelect");
  container.innerHTML = "<h3>Select Chapter</h3>";
  Object.keys(bible[book]).forEach(chapter => {
    const btn = document.createElement("button");
    btn.innerText = chapter;
    btn.onclick = () => {
      selectedChapter = chapter;
      showVerseOptions(book, chapter);
    };
    container.appendChild(btn);
  });

  // back button
  const backBtn = document.createElement("button");
  backBtn.innerText = "⬅ Back to Books";
  backBtn.className = "back-btn";
  backBtn.onclick = () => {
    selectedBook = null;
    container.innerHTML = "";
    document.getElementById("verseSelect").innerHTML = "";
    showBookOptions();
  };
  container.appendChild(document.createElement("br"));
  container.appendChild(backBtn);
}

function showVerseOptions(book, chapter) {
  const container = document.getElementById("verseSelect");
  container.innerHTML = "<h3>Select Verse</h3>";
  bible[book][chapter].forEach((verseText, idx) => {
    const btn = document.createElement("button");
    btn.innerText = (idx + 1) + ". " + verseText.substring(0, 30) + "...";
    btn.onclick = () => checkAnswer(book, chapter, idx + 1);
    container.appendChild(btn);
  });

  // back button
  const backBtn = document.createElement("button");
  backBtn.innerText = "⬅ Back to Chapters";
  backBtn.className = "back-btn";
  backBtn.onclick = () => {
    selectedChapter = null;
    container.innerHTML = "";
    showChapterOptions(book);
  };
  container.appendChild(document.createElement("br"));
  container.appendChild(backBtn);
}

function checkAnswer(book, chapter, verse) {
  if (book === currentVerse.book && chapter == currentVerse.chapter && verse == currentVerse.verse) {
    document.getElementById("result").innerText = `✅ Correct! ${currentVerse.ref}`;
  } else {
    document.getElementById("result").innerText = `❌ Wrong! It was ${currentVerse.ref}`;
  }
}

newRound();
