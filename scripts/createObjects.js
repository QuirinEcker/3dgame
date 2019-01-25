window.addEventListener('load', () => {

  let coordinates = new Array();

  coordinates = [
    createCoordinates("100px", "50px"),
    createCoordinates("100px", "400px"),
    createCoordinates("100px", "800px"),
    createCoordinates("1700px", "50px"),
    createCoordinates("1700px", "400px"),
    createCoordinates("1700px", "800px")
  ];

  let e = new Array();
  let duplicate;
  let current;
  for (let i = 0; i < 3; i++) {
    duplicate = 0;
    current = Math.floor(Math.random() * 6)
    for (let y = 0; y < e.length; y++) {
      if (current == e[y]) {
        duplicate++;
        i--;
      }
    }
    if (duplicate == 0) {
      e.push(current);
    }
  }

  for (let i = 0; i < e.length; i++) {
    let game = document.getElementById('objects');
    let object = document.createElement('div');
    object.classList.add('object');
    object.style.left = coordinates[e[i]].left;
    object.style.top = coordinates[e[i]].bottom;

    game.appendChild(object);
  }
});

function createCoordinates(left, bottom) {
  return {
    left,
    bottom
  }
}
