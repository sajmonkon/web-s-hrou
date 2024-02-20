// Canvas initialization
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player variables
let player = {
    x: 50,
    y: canvas.height / 2,
    width: 50,
    height: 30,
    speed: 5
};

// Obstacle variables
let obstacles = [];
const obstacleWidth = 30;
const obstacleHeight = 50;
const obstacleSpeed = 9;
const obstacleGap = 200;
let obstacleTimer = 0;

// Game state
let isGameOver = false;
let score = 0;

// Event listener for keyboard input
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && player.y > 0) {
        player.y -= player.speed;
    } else if (event.key === 'ArrowDown' && player.y < canvas.height - player.height) {
        player.y += player.speed;
    }
});

// Function to update game state
function update() {
    if (!isGameOver) {
        // Move obstacles
        obstacles.forEach(obstacle => {
            obstacle.x -= obstacleSpeed;
            if (obstacle.x + obstacleWidth < 0) {
                score++;
                obstacles.shift();
            }
            // Check collision
            if (player.x < obstacle.x + obstacleWidth && 
                player.x + player.width > obstacle.x && 
                player.y < obstacle.y + obstacleHeight &&
                player.y + player.height > obstacle.y) {
                isGameOver = true;
                alert('Game Over! Your score: ' + score);
            }
        });

        // Generate new obstacles
        obstacleTimer++;
        if (obstacleTimer % obstacleGap === 0) {
            let obstacleY = Math.floor(Math.random() * (canvas.height - obstacleHeight));
            obstacles.push({x: canvas.width, y: obstacleY});
        }
    }
}

// Function to draw game elements
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw player
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw obstacles
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
    });

    // Display score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

// Main game loop
function gameLoop() {
    update();
    draw();
    if (!isGameOver) {
        requestAnimationFrame(gameLoop);
    }
}

// Start the game loop
gameLoop();