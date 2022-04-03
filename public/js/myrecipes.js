addEventListeners();

function addEventListeners() {
  document.querySelectorAll('.btnDelete').forEach(btn => {
    btn.addEventListener('click', (event) => {
      deleteRecipe(event);
    })
  })
}

//Doesn't redirect. why? i DONT KNOW
function deleteRecipe(event) {
  if (!confirm("Are you sure you want to delete this recipe?")) return;
  let btnId = event.target.id;
  let url = `http://127.0.0.1:3000/deleterecipe/${btnId}`
  fetch(url,
    {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
}