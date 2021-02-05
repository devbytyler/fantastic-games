var app = new Vue({
    el: '#app',
    data: {
        games: [
            {
                name: 'Super Brick', 
                desc: 'A fantastic brick-breaking adventure.',
                img: 'images/brick.jpg', 
                link: 'Nathan-Game/superBrick.html', 
                creator:'Nathan',
            },
            {
                name: 'Goalie Wars', 
                desc: "A super addicting pong adventure. Don't worry if you can't beat it. I can't either.", 
                img: 'images/pong.jpg', 
                link: 'Jacob-Game/Jacob-Soccer/game.html',
                creator:'Jacob',
            },
            {
                name: 'Escape Room', 
                desc: 'A fantastic online escape room.',
                img: 'images/escapeRoom.jpeg', 
                link: 'escapeRoom/main-page.html', 
                creator: 'Nathan & Jacob',
            },
            {
                name: 'Coin Collector',
                desc: 'A fantastic coin collecting adventure!',
                img: 'images/coinCollector.png',
                link: 'Nathan-Game/coinCollector/coinCollector.html',
                creator: 'Nathan, Jacob, and Tyler',

            },
            {
                name: 'Snake Game',
                desc: 'An fantastic snake game!',
                img: 'images/snake.png',
                link: 'Nathan-Game/snakeGame/snakeGame.html',
                creator: 'Nathan',
            },
            {
                name: 'Bounce',
                desc: 'A fantastic bouncing adventure',
                img: 'images/Bounce.png',
                link: 'Jacob-Game/Jacob-Bounce/bounceGame/bounce.html',
                creator: 'Jacob',
            },
            {
                name: 'Star Catcher',
                desc: 'A fantastic star collecting game!',
                img: 'images/starCatcher.png',
                link: 'Nathan-Game/starCatcher/starCatcher.html',
                creator: 'Nathan',
            },
            {
                name: 'Space Shooter',
                desc: 'A fantastic space adventure!',
                img: 'images/spaceShooter.png',
                link: 'Nathan-Game/spaceShooter/spaceShooter.html',
                creator: 'Nathan',

            },
            {
                name: '2 Player Snake',
                desc: 'A fantastic 2-Player snake game!',
                img: 'images/2playerSnake.png',
                link: 'Nathan-Game/2PlayerSnake/2PlayerSnake.html',
                creator: 'Nathan',

            },
            {
                name: 'Coming Soon...', 
                desc: 'Wait for it!', 
                img: 'https://picsum.photos/200/100', 
                link: '#', 
                creator: 'Tyler',
            },
        ]
    }
})
