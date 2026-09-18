// ============================================================
// SMOOTH SCROLL
// ============================================================

function scrollToInvitation() {

    document
        .getElementById("invitation")
        .scrollIntoView({
            behavior: "smooth"
        });

}



// ============================================================
// MUSIC
// ============================================================

let musicPlaying = false;

function toggleMusic() {

    const music =
        document.getElementById("weddingMusic");

    const button =
        document.getElementById("musicButton");


    if (musicPlaying) {

        music.pause();

        button.innerHTML = "♪";

        musicPlaying = false;

    } else {

        music.play();

        button.innerHTML = "❚❚";

        musicPlaying = true;

    }

}



// ============================================================
// COUNTDOWN
// ============================================================

function updateCountdown() {

    const target =
        new Date(weddingDate).getTime();

    const now =
        new Date().getTime();

    const difference =
        target - now;


    if (difference <= 0) {

        document.getElementById("days").innerText = "00";

        document.getElementById("hours").innerText = "00";

        document.getElementById("minutes").innerText = "00";

        document.getElementById("seconds").innerText = "00";

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    document.getElementById("days").innerText =
        String(days).padStart(2, "0");


    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");

}


setInterval(updateCountdown, 1000);

updateCountdown();