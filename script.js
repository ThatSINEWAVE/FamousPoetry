document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  const intro = document.getElementById('intro');
  const poemContainer = document.getElementById('poem-container');
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const poem = document.getElementById('poem');
  const anotherPoemButton = document.getElementById('another-poem-button');

  startButton.addEventListener('click', async () => {
    intro.classList.add('hidden');
    poemContainer.classList.remove('hidden');
    await loadPoem();
  });

  anotherPoemButton.addEventListener('click', async () => {
    await fadeOutPoem();
    await loadPoem();
  });

  async function loadPoem() {
    const response = await fetch('https://poetrydb.org/random');
    const data = await response.json();
    const poemData = data[0];

    title.textContent = poemData.title;
    author.textContent = `- ${poemData.author}`;
    poem.innerHTML = '';

    for (const line of poemData.lines) {
      const lineElement = document.createElement('p');
      lineElement.textContent = line;
      poem.appendChild(lineElement);
    }

    await fadeInPoem();
  }

  function fadeOutPoem() {
    return new Promise((resolve) => {
      poemContainer.classList.add('hidden');
      setTimeout(() => {
        poemContainer.classList.remove('hidden');
        resolve();
      }, 1000);
    });
  }

  function fadeInPoem() {
    return new Promise((resolve) => {
      poemContainer.classList.add('expanded');
      setTimeout(() => {
        anotherPoemButton.classList.remove('hidden');
        resolve();
      }, 1000);
    });
  }
});
