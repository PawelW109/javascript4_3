(function() {
  const cat = document.getElementById('cat')
  const catA = document.getElementById('catA')
  const joke = document.getElementById('joke')
  const jokeA = document.getElementById('jokeA')


  async function getCategories(){
    const response = await fetch(
      `http://localhost:3000/jokebook/categories`
    )
    const result = await response.json();
    return result;
  }

  cat.addEventListener("click", async function() {
    c = await getCategories();
    let categories = "";
    for (let i = 0; i < c.length; i++) {
      categories += `<li>${c[i]}</li>`;
    }
    catA.innerHTML = `<ul>${categories}</ul>`
  });

  joke.addEventListener("click", async function() {
    let categories = await getCategories();
    let category = categories[Math.floor(categories.length*Math.random())];
    const response = await fetch(
      `http://localhost:3000/jokebook/joke/${category}`
    )
    const result = await response.json();
    jokeA.innerHTML = `-${result.joke.joke} <br>-${result.joke.response}`;
  });

})();
