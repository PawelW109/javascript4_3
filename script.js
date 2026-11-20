(function() {

    // Ex1

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

  // Ex2

  const ex2joke = document.getElementById('ex2j')
  const ex2response = document.getElementById('ex2r')
  const ex2category = document.getElementById('ex2cat')
  const ex2button = document.getElementById('ex2b')
  const ex2info = document.getElementById('ex2i')

  ex2button.addEventListener("click", async function() {
    const cat = ex2category.value;
    const j = ex2joke.value;
    const r = ex2response.value;
    const info = ex2info;

    if(j == "" || r == ""){
      info.innerHTML = "Dodaj tekst żartu i odpowiedzi";
      return;
    }

    const response = await await fetch(
      `http://localhost:3000/jokebook/joke/${cat}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          joke: j,
          response: r
        })
      }
    )
    if(response.ok){
      info.innerHTML = "Żart dodano pomyślnie";
    }
    else{
      info.innerHTML = "Wystąpił błąd";
    }

  });

  // Ex3
  
  const ex3button = document.getElementById('ex3b')
  const ex3info = document.getElementById('ex3i')

  ex3button.addEventListener("click", async function() {
    const response = await fetch(
      `http://localhost:3000/jokebook/stats`
    )
    const result = await response.json();
    let text = "<table><tr><th>Kategoria</th><th>Liczba żartów</th></tr>";
    for (const cat in result) {
      text += `<tr><td>${cat}</td><td>${result[cat]}</td></tr>`;
    }
    text += "</table>";
    ex3info.innerHTML = text;
  });

})();
