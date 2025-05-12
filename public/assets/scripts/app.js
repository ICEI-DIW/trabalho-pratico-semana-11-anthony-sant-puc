const dados = [
  {
    "id": 1,
    "titulo": "Ensopado de Carne",
    "descricao": "O ensopado de carne é preparado com uma combinação de carne bovina e legumes, cozidos lentamente para intensificar o sabor. O caldo de carne proporciona um toque rico e saboroso, enquanto as ervas frescas como tomilho e salsa adicionam frescor ao prato.",
    "categoria": "Carnes",
    "data": "02/03/25",
    "ingredientes": [
      "1 kg de carne bovina (corte de sua preferência, como acém ou músculo)",
      "2 litros de caldo de carne",
      "2 cebolas grandes picadas",
      "4 dentes de alho picados",
      "3 cenouras cortadas em rodelas",
      "2 nabos cortados em cubos",
      "1 talo de aipo picado",
      "2 colheres de sopa de azeite de oliva",
      "1 colher de chá de pimenta preta moída",
      "1 colher de chá de cominho em pó",
      "2 folhas de louro",
      "Sal a gosto",
      "Ervas frescas (como tomilho e salsa) para temperar"
    ],
      "imagem": "./file.jpg"
    },
    {
      "id": 2,
      "titulo": "Sopa de Legumes e Cevada",
      "descricao": "Esta sopa é uma refeição completa e nutritiva, perfeita para os dias mais frios. A combinação de legumes frescos e cevada cria um prato saudável e aconchegante, ideal para aquecer e satisfazer.",
      "categoria": "Sopas",
      "data": "05/03/25",
      "ingredientes": [
        "1 xícara de cevada",
        "2 cenouras cortadas em rodelas",
        "2 batatas médias cortadas em cubos",
        "1 abobrinha cortada em cubos",
        "1 cebola grande picada",
        "3 dentes de alho picados",
        "1 talo de aipo picado",
        "3 tomates sem sementes picados",
        "2 litros de caldo de legumes",
        "Sal e pimenta a gosto",
        "Ervas frescas (como tomilho e salsinha) para temperar"
      ],
      "imagem": "./mandioca.jpg"
    },
    {
      "id": 3,
      "titulo": "Macarrão à Moda Medieval",
      "descricao": "Inspirado nas tradições medievais, este prato combina massa fresca com ingredientes robustos como carne, queijo e ervas aromáticas. Uma refeição farta e rica em sabores, perfeita para quem busca algo mais rústico e substancial.",
      "categoria": "Massas",
      "data": "01/03/2025",
      "ingredientes": [
        "500g de macarrão (preferencialmente fettuccine ou talharim)",
        "300g de carne bovina ou porco picada em pedaços pequenos",
        "2 colheres de sopa de manteiga",
        "2 colheres de sopa de azeite de oliva",
        "1 cebola grande picada",
        "3 dentes de alho picados",
        "1 taça de vinho tinto seco",
        "1 xícara de caldo de carne",
        "Ervas frescas (como alecrim, sálvia e tomilho)",
        "Queijo parmesão ralado para polvilhar",
        "Sal e pimenta a gosto"
      ],
      "imagem": "./lasanha.jpg"
    },
    {
      "id": 4,
      "titulo": "Tarte de Amêndoas e Mel",
      "descricao": "Uma tarte clássica que combina a doçura natural do mel com a crocância das amêndoas. Perfeita para uma sobremesa refinada, trazendo sabores intensos e uma textura única.",
      "categoria": "Doces",
      "data": "07/03/25",
      "ingredientes": [
        "200g de farinha de trigo",
        "100g de manteiga gelada em cubos",
        "2 colheres de sopa de açúcar",
        "1 ovo",
        "200g de amêndoas laminadas",
        "150g de mel",
        "100g de açúcar mascavo",
        "100g de creme de leite",
        "1 colher de chá de essência de baunilha",
        "1 pitada de sal"
      ],
        "imagem": "./cenoura.jpg"
      },
    
  ]
  card.innerHTML = `
  <div class="card h-100">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.substring(0, 100)}...</p>
      <button class="btn btn-danger mt-auto" onclick='abrirModal(${JSON.stringify(meal)})'>Ver Receita</button>
    </div>
  </div>
`;
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel-dinamico");

  fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef")
    .then(response => response.json())
    .then(data => {
      const meals = data.meals.slice(0, 4);

      meals.forEach((meal, index) => {
        const isActive = index === 0 ? "active" : "";
        const itemHTML = `
          <div class="carousel-item ${isActive}">
            <img src="${meal.strMealThumb}" class="d-block w-100 rounded" alt="${meal.strMeal}">
            <div class="carousel-caption d-none d-md-block">
              <h5>${meal.strMeal}</h5>
              <button class="btn btn-danger" onclick="mostrarReceita('${meal.idMeal}')">Ver Receita</button>
            </div>
          </div>
        `;
        carousel.insertAdjacentHTML('beforeend', itemHTML);
      });
    })
    .catch(error => console.error("Erro ao carregar receitas:", error));
});

function mostrarReceita(idMeal) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      document.getElementById("modalTitulo").textContent = meal.strMeal;
      document.getElementById("modalImagem").src = meal.strMealThumb;
      document.getElementById("modalInstrucoes").textContent = meal.strInstructions;

      const modal = new bootstrap.Modal(document.getElementById("modalReceita"));
      modal.show();
    })
    .catch(error => console.error("Erro ao buscar detalhes:", error));
}