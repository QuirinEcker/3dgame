let characterCoordinates = {
  x: 960,
  y: 540
}

window.addEventListener('keydown', (e) => {
  let characterObject = document.getElementById("character");

  if (e.key === 'd') {
    characterCoordinates.x = characterControl.x + 1;
  } else if (e.key === 'a') {
    characterCoordinates.x = characterControl.x - 1;
  }

  alert(characterCoordinates.x + characterControl.y);
});
