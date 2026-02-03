// Game configuration
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game state
let gameState = {
    score: 0,
    level: 1,
    gameOver: false,
    won: false
};

// Player object
const player = {
    x: 100,
    y: 500,
    width: 30,
    height: 30,
    velocityX: 0,
    velocityY: 0,
    speed: 5,
    jumpPower: 12,
    gravity: 0.6,
    gravityDirection: 1, // 1 for down, -1 for up
    onGround: false,
    color: '#4CAF50'
};

// Input handling
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    keys[e.code] = true;
    
    // Gravity flip on space
    if (e.code === 'Space') {
        e.preventDefault();
        flipGravity();
    }
    
    // Restart on R
    if (e.key.toLowerCase() === 'r') {
        restartLevel();
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
    keys[e.code] = false;
});

// Platforms
let platforms = [];
let stars = [];

function createLevel(levelNum) {
    platforms = [];
    stars = [];
    
    // Ground and ceiling
    platforms.push({ x: 0, y: 570, width: 800, height: 30, color: '#2196F3' });
    platforms.push({ x: 0, y: 0, width: 800, height: 30, color: '#2196F3' });
    
    if (levelNum === 1) {
        // Level 1 - Simple introduction
        platforms.push({ x: 200, y: 450, width: 150, height: 20, color: '#2196F3' });
        platforms.push({ x: 450, y: 350, width: 150, height: 20, color: '#2196F3' });
        platforms.push({ x: 200, y: 150, width: 150, height: 20, color: '#2196F3' });
        
        stars.push({ x: 280, y: 400, collected: false });
        stars.push({ x: 530, y: 300, collected: false });
        stars.push({ x: 280, y: 200, collected: false });
        
    } else if (levelNum === 2) {
        // Level 2 - More challenging
        platforms.push({ x: 150, y: 500, width: 100, height: 20, color: '#2196F3' });
        platforms.push({ x: 350, y: 450, width: 100, height: 20, color: '#2196F3' });
        platforms.push({ x: 550, y: 400, width: 100, height: 20, color: '#2196F3' });
        platforms.push({ x: 650, y: 200, width: 100, height: 20, color: '#2196F3' });
        platforms.push({ x: 450, y: 100, width: 100, height: 20, color: '#2196F3' });
        platforms.push({ x: 250, y: 150, width: 100, height: 20, color: '#2196F3' });
        
        stars.push({ x: 200, y: 450, collected: false });
        stars.push({ x: 400, y: 400, collected: false });
        stars.push({ x: 600, y: 350, collected: false });
        stars.push({ x: 700, y: 150, collected: false });
        stars.push({ x: 300, y: 100, collected: false });
        
    } else if (levelNum === 3) {
        // Level 3 - Expert level
        platforms.push({ x: 100, y: 500, width: 80, height: 20, color: '#2196F3' });
        platforms.push({ x: 250, y: 450, width: 80, height: 20, color: '#2196F3' });
        platforms.push({ x: 400, y: 400, width: 80, height: 20, color: '#2196F3' });
        platforms.push({ x: 550, y: 350, width: 80, height: 20, color: '#2196F3' });
        platforms.push({ x: 700, y: 300, width: 80, height: 20, color: '#2196F3' });
        platforms.push({ x: 600, y: 150, width: 80, height: 20, color: '#2196F3' });
        platforms.push({ x: 400, y: 100, width: 80, height: 20, color: '#2196F3' });
        platforms.push({ x: 200, y: 150, width: 80, height: 20, color: '#2196F3' });
        
        stars.push({ x: 140, y: 450, collected: false });
        stars.push({ x: 290, y: 400, collected: false });
        stars.push({ x: 440, y: 350, collected: false });
        stars.push({ x: 590, y: 300, collected: false });
        stars.push({ x: 640, y: 100, collected: false });
        stars.push({ x: 240, y: 100, collected: false });
    }
}

function flipGravity() {
    player.gravityDirection *= -1;
    player.velocityY = 0;
    updateStatusMessage('Gravity Flipped!');
}

function restartLevel() {
    player.x = 100;
    player.y = 500;
    player.velocityX = 0;
    player.velocityY = 0;
    player.gravityDirection = 1;
    gameState.gameOver = false;
    gameState.won = false;
    createLevel(gameState.level);
    updateStatusMessage('Level Restarted');
}

function nextLevel() {
    gameState.level++;
    if (gameState.level > 3) {
        gameState.won = true;
        updateStatusMessage('Congratulations! You won!');
        gameState.level = 3; // Keep at max level
    } else {
        createLevel(gameState.level);
        player.x = 100;
        player.y = 500;
        player.velocityX = 0;
        player.velocityY = 0;
        player.gravityDirection = 1;
        updateStatusMessage(`Level ${gameState.level}!`);
    }
    document.getElementById('level').textContent = gameState.level;
}

function updateStatusMessage(message) {
    document.getElementById('status-message').textContent = message;
}

// Game loop
function update() {
    if (gameState.gameOver || gameState.won) {
        return;
    }
    
    // Horizontal movement
    if (keys['ArrowLeft'] || keys['a']) {
        player.velocityX = -player.speed;
    } else if (keys['ArrowRight'] || keys['d']) {
        player.velocityX = player.speed;
    } else {
        player.velocityX = 0;
    }
    
    // Apply gravity
    player.velocityY += player.gravity * player.gravityDirection;
    
    // Update position
    player.x += player.velocityX;
    player.y += player.velocityY;
    
    // Check for ground collision
    player.onGround = false;
    
    for (let platform of platforms) {
        if (checkCollision(player, platform)) {
            if (player.gravityDirection === 1) {
                // Normal gravity - land on top
                if (player.velocityY > 0) {
                    player.y = platform.y - player.height;
                    player.velocityY = 0;
                    player.onGround = true;
                }
            } else {
                // Inverted gravity - land on bottom
                if (player.velocityY < 0) {
                    player.y = platform.y + platform.height;
                    player.velocityY = 0;
                    player.onGround = true;
                }
            }
        }
    }
    
    // Jump
    if ((keys['ArrowUp'] || keys['w']) && player.onGround) {
        player.velocityY = -player.jumpPower * player.gravityDirection;
    }
    
    // Check boundaries (game over if fall off screen)
    if (player.y > canvas.height || player.y < -player.height) {
        gameState.gameOver = true;
        updateStatusMessage('Game Over! Press R to restart');
    }
    
    // Wrap around horizontally
    if (player.x < 0) {
        player.x = canvas.width;
    } else if (player.x > canvas.width) {
        player.x = 0;
    }
    
    // Collect stars
    for (let star of stars) {
        if (!star.collected) {
            const dx = player.x + player.width / 2 - star.x;
            const dy = player.y + player.height / 2 - star.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 25) {
                star.collected = true;
                gameState.score += 10;
                document.getElementById('score').textContent = gameState.score;
            }
        }
    }
    
    // Check if all stars collected
    if (stars.every(star => star.collected) && !gameState.won) {
        nextLevel();
    }
}

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#0f0f1e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw platforms
    for (let platform of platforms) {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        
        // Add some visual detail
        ctx.strokeStyle = '#64B5F6';
        ctx.lineWidth = 2;
        ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
    }
    
    // Draw stars
    for (let star of stars) {
        if (!star.collected) {
            drawStar(star.x, star.y, 15, 5, 0.5);
        }
    }
    
    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Add player direction indicator
    ctx.fillStyle = player.gravityDirection === 1 ? '#FFF' : '#F00';
    const indicatorY = player.gravityDirection === 1 ? player.y : player.y + player.height;
    ctx.fillRect(player.x + 5, indicatorY - 2, player.width - 10, 4);
    
    // Draw game over or win message
    if (gameState.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#FF5252';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
        
        ctx.font = '24px Arial';
        ctx.fillStyle = '#FFF';
        ctx.fillText('Press R to Restart', canvas.width / 2, canvas.height / 2 + 50);
    }
    
    if (gameState.won) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#4CAF50';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('YOU WIN!', canvas.width / 2, canvas.height / 2);
        
        ctx.font = '24px Arial';
        ctx.fillStyle = '#FFF';
        ctx.fillText(`Final Score: ${gameState.score}`, canvas.width / 2, canvas.height / 2 + 50);
    }
}

function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;
    
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;
        
        x = cx + Math.cos(rot) * outerRadius * innerRadius;
        y = cy + Math.sin(rot) * outerRadius * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = '#FFD700';
    ctx.fill();
    ctx.strokeStyle = '#FFA500';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Initialize game
createLevel(1);
updateStatusMessage('Collect all stars to advance!');
document.getElementById('score').textContent = gameState.score;
document.getElementById('level').textContent = gameState.level;
gameLoop();
