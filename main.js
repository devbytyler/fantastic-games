var app = new Vue({
    el: '#app',
    data: {
        games: [
            {
                name: 'Super Brick', 
                desc: 'A classic brick-breaking adventure.', 
                img: 'images/brick.jpg', 
                link: 'Nathan-Game/superBrick.html', 
                creator:'Nathan',
            },
            {
                name: 'Goalie Wars', 
                desc: "A super addicting pong adventure. Don't worry if you can't beat it. I can't either.", 
                img: 'images/pong.jpg', 
                link: 'jacob/game.html', 
                creator:'Jacob',
            },
            {
                name: 'Escape Room', 
                desc: 'An amazing online escape room.', 
                img: 'images/escapeRoom.jpeg', 
                link: 'escapeRoom/main-page.html', 
                creator: 'Nathan & Jacob',
            },
            {
                name: 'Coin Collector',
                desc: 'An amazing coin collecting adventure!',
                img: 'images/coinCollector.png',
                link: 'Nathan-Game/platformGame/platformGame.html',
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
