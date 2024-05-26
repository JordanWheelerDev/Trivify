document.addEventListener('DOMContentLoaded', () => {
    const hockeyTriviaBtn = document.getElementById('hockeyTriviaBtn');
    const baseballTriviaBtn = document.getElementById('baseballTriviaBtn');
    const soccerTriviaBtn = document.getElementById('soccerTriviaBtn');
    const footballTriviaBtn = document.getElementById('footballTriviaBtn');
    const basketballTriviaBtn = document.getElementById('basketballTriviaBtn');
    const golfTriviaBtn = document.getElementById('golfTriviaBtn');

    hockeyTriviaBtn.addEventListener('click', () => {
        window.location.href = 'trivia/hockey.html';
    });

    baseballTriviaBtn.addEventListener('click', () => {
        window.location.href = 'trivia/baseball.html';
    });

    soccerTriviaBtn.addEventListener('click', () => {
        window.location.href = 'trivia/soccer.html';
    });

    footballTriviaBtn.addEventListener('click', () => {
        window.location.href = 'trivia/football.html';
    });

    basketballTriviaBtn.addEventListener('click', () => {
        window.location.href = 'trivia/basketball.html';
    });

    golfTriviaBtn.addEventListener('click', () => {
        window.location.href = 'trivia/golf.html';
    });

});