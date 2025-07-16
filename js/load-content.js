// Load homepage content
fetch('/data/home.yml')
  .then(response => response.text())
  .then(text => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/yaml');
    const data = jsyaml.load(text);
    
    document.getElementById('school-name').textContent = data.title;
    document.getElementById('hero-image').src = data.hero_image;
    document.getElementById('welcome-text').textContent = data.welcome_text;
  });

// Load news
fetch('/data/news.json')
  .then(response => response.json())
  .then(news => {
    const container = document.getElementById('news-container');
    news.forEach(item => {
      container.innerHTML += `
        <article>
          <h3>${item.title}</h3>
          <small>${new Date(item.date).toLocaleDateString()}</small>
          <div>${marked.parse(item.content)}</div>
        </article>
      `;
    });
  });

// Load gallery
fetch('/data/gallery.json')
  .then(response => response.json())
  .then(gallery => {
    const container = document.getElementById('gallery-container');
    gallery.forEach(event => {
      container.innerHTML += `
        <div class="event">
          <h3>${event.event_name}</h3>
          ${event.photos.map(photo => `
            <figure>
              <img src="${photo.image}" alt="${photo.caption}">
              <figcaption>${photo.caption}</figcaption>
            </figure>
          `).join('')}
        </div>
      `;
    });
  });