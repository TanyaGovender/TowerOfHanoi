document.getElementById('start').addEventListener('click', startGame);

function startGame() {
  const numDisks = parseInt(document.getElementById('disks').value);
  const towers = [[], [], []];

  const startBtn = document.getElementById('start');
  const input = document.getElementById('disks');

  startBtn.disabled = true;
  input.disabled = true;

  for (let i = numDisks; i >= 1; i--) {
    towers[0].push(i);
  }

  resetTowers();
  showTowers(towers, numDisks);

  const moves = [];
  solveGame(numDisks, 0, 2, 1, moves);
  animateMoves(moves, towers, numDisks, startBtn, input);

}

function resetTowers() {
  document.querySelectorAll('.tower').forEach(tower => {
    tower.innerHTML = '<div class="pole"></div>';
  });
}

function showTowers(towers, numDisks) {
  const maxWidth = 225;
  const minWidth = 60;
  const dHeight = 35;
  
  const dColours = ['#FF68A8', '#64CFF7', '#F7E752', '#CA7CD8', '#50BCB9', '#81C953', '#ED7D51', '#A063C8', '#D84F74', '#44A9CC'];

  towers.forEach((tower, index) => {
    const towerElement = document.getElementById(`tower${index + 1}`);
    tower.forEach(disk => {
      const dElement = document.createElement('div');
      dElement.classList.add('disk');
    
      const dWidth = minWidth + (maxWidth - minWidth) * (disk - 1) / (numDisks - 1);
      dElement.style.width = `${dWidth}px`;

      dElement.style.backgroundColor = dColours[disk - 1];
      dElement.style.height = `${dHeight}px`; 

      towerElement.appendChild(dElement);
    });
  });
}

function solveGame(numDisks, from, to, aux, moves) {
  if (numDisks === 1) {
    moves.push([from, to]);
  } else {
    solveGame(numDisks - 1, from, aux, to, moves);
    moves.push([from, to]);
    solveGame(numDisks - 1, aux, to, from, moves);
  }
}

function animateMoves(moves, towers, numDisks, startBtn, input) {
  if (moves.length === 0) {
    startBtn.disabled = false;
    input.disabled = false;
    return;
  }

  const [from, to] = moves.shift();
  const fromTower = towers[from];
  const toTower = towers[to];
  const disk = fromTower.pop();
  toTower.push(disk);

  const speedValue = parseInt(document.getElementById('speed').value);
  const minSpeed = 50; // minimum delay in ms
  const maxSpeed = 2000; // maximum delay in ms
  const speed = maxSpeed - ((speedValue / 2000) * (maxSpeed - minSpeed)); // Reverse logic


  setTimeout(() => {
    resetTowers();
    showTowers(towers, numDisks);
    animateMoves(moves, towers, numDisks, startBtn, input);
  }, speed);
}
