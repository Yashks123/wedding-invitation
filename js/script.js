// ============================================================
// WEDDING INVITATION JAVASCRIPT
// ============================================================



// ============================================================
// ELEMENTS
// ============================================================

const openingScreen =
    document.getElementById("openingScreen");

const mainInvitation =
    document.getElementById("mainInvitation");

const weddingMusic =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");



let musicPlaying = false;



// ============================================================
// FALLING FLOWERS
// ============================================================

function createFlower() {

    const container =
        document.getElementById("flowerContainer");


    if (!container) {
        return;
    }


    const flower =
        document.createElement("div");


    flower.className =
        "falling-flower";


    const flowers = [
        "🌸",
        "🌺",
        "🌼",
        "✿",
        "❀",
        "❁"
    ];


    flower.innerHTML =
        flowers[
            Math.floor(
                Math.random() * flowers.length
            )
        ];


    flower.style.left =
        Math.random() * 100 + "%";


    flower.style.fontSize =
        (12 + Math.random() * 18) + "px";


    flower.style.animationDuration =
        (7 + Math.random() * 7) + "s";


    flower.style.animationDelay =
        Math.random() * 2 + "s";


    container.appendChild(flower);


    setTimeout(
        () => {

            flower.remove();

        },
        15000
    );
}



// Create flowers continuously

setInterval(
    createFlower,
    450
);


// Initial flowers

for (
    let i = 0;
    i < 15;
    i++
) {

    setTimeout(
        createFlower,
        i * 150
    );

}



// ============================================================
// MUSIC
// ============================================================

function startMusic() {

    if (!weddingMusic) {
        return;
    }


    weddingMusic.volume = 0.45;


    weddingMusic
        .play()
        .then(() => {

            musicPlaying = true;

            if (musicButton) {

                musicButton.innerHTML =
                    "❚❚";

            }

        })
        .catch(() => {

            console.log(
                "Autoplay blocked by browser."
            );

        });

}



function toggleMusic() {

    if (!weddingMusic) {
        return;
    }


    if (musicPlaying) {

        weddingMusic.pause();

        musicPlaying = false;

        musicButton.innerHTML = "♪";

    }

    else {

        weddingMusic
            .play()
            .then(() => {

                musicPlaying = true;

                musicButton.innerHTML =
                    "❚❚";

            })
            .catch(
                error => {

                    console.log(
                        error
                    );

                }
            );

    }

}



// ============================================================
// OPEN INVITATION
// ============================================================

function openInvitation() {


    // Start music because this is a
    // direct user interaction.

    startMusic();


    // Add opening animation

    openingScreen.classList.add(
        "opened"
    );


    // Show main invitation

    setTimeout(
        () => {

            mainInvitation.classList.remove(
                "hidden"
            );

            mainInvitation.classList.add(
                "visible"
            );


            // Remove opening screen
            // after animation

            setTimeout(
                () => {

                    openingScreen.style.display =
                        "none";

                },
                1000
            );


            // Scroll to beginning

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        },
        700
    );

}



// ============================================================
// AUTOPLAY ATTEMPT
// ============================================================

window.addEventListener(
    "load",
    () => {

        startMusic();

    }
);



// ============================================================
// START MUSIC ON FIRST INTERACTION
// ============================================================

document.addEventListener(
    "click",
    () => {

        if (!musicPlaying) {
            startMusic();
        }

    },
    {
        once: true
    }
);



// ============================================================
// COUNTDOWN FUNCTION
// ============================================================

function startCountdown(
    elementId
) {


    const container =
        document.getElementById(
            elementId
        );


    if (!container) {
        return;
    }


    const targetDate =
        new Date(
            container.dataset.date
        ).getTime();


    const daysElement =
        container.querySelector(".days");


    const hoursElement =
        container.querySelector(".hours");


    const minutesElement =
        container.querySelector(".minutes");


    const secondsElement =
        container.querySelector(".seconds");



    function update() {


        const now =
            new Date().getTime();


        const difference =
            targetDate - now;


        if (difference <= 0) {

            daysElement.innerText =
                "00";

            hoursElement.innerText =
                "00";

            minutesElement.innerText =
                "00";

            secondsElement.innerText =
                "00";

            return;

        }


        const days =
            Math.floor(
                difference /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );


        const hours =
            Math.floor(
                (
                    difference /
                    (
                        1000 *
                        60 *
                        60
                    )
                ) % 24
            );


        const minutes =
            Math.floor(
                (
                    difference /
                    (
                        1000 *
                        60
                    )
                ) % 60
            );


        const seconds =
            Math.floor(
                (
                    difference /
                    1000
                ) % 60
            );



        daysElement.innerText =
            String(days)
                .padStart(2, "0");


        hoursElement.innerText =
            String(hours)
                .padStart(2, "0");


        minutesElement.innerText =
            String(minutes)
                .padStart(2, "0");


        secondsElement.innerText =
            String(seconds)
                .padStart(2, "0");

    }


    update();


    setInterval(
        update,
        1000
    );

}



// ============================================================
// START BOTH COUNTDOWNS
// ============================================================

startCountdown(
    "receptionCountdown"
);


startCountdown(
    "muhurthamCountdown"
);



// ============================================================
// RSVP ATTENDANCE
// ============================================================

const attendanceInputs =
    document.querySelectorAll(
        'input[name="attendance"]'
    );


const reasonGroup =
    document.getElementById(
        "reasonGroup"
    );


const guestCountGroup =
    document.getElementById(
        "guestCountGroup"
    );


attendanceInputs.forEach(
    input => {

        input.addEventListener(
            "change",
            function () {


                if (
                    this.value === "no"
                ) {

                    reasonGroup.classList.remove(
                        "hidden"
                    );

                    guestCountGroup.classList.add(
                        "hidden"
                    );

                }

                else {

                    reasonGroup.classList.add(
                        "hidden"
                    );

                    guestCountGroup.classList.remove(
                        "hidden"
                    );

                }

            }
        );

    }
);



// ============================================================
// RSVP FORM
// ============================================================

const rsvpForm =
    document.getElementById(
        "rsvpForm"
    );


if (rsvpForm) {


    rsvpForm.addEventListener(
        "submit",
        async function(event) {


            event.preventDefault();


            const submitButton =
                document.getElementById(
                    "submitButton"
                );


            const message =
                document.getElementById(
                    "rsvpMessage"
                );


            const selectedAttendance =
                document.querySelector(
                    'input[name="attendance"]:checked'
                );


            if (!selectedAttendance) {

                message.innerText =
                    "Please select whether you will be joining us.";

                return;

            }


            const data = {


                name:
                    document.getElementById(
                        "guestName"
                    ).value,


                phone:
                    document.getElementById(
                        "guestPhone"
                    ).value,


                attendance:
                    selectedAttendance.value,


                guests:
                    document.getElementById(
                        "guestCount"
                    ).value,


                reason:
                    document.getElementById(
                        "reason"
                    ).value,


                message:
                    document.getElementById(
                        "guestMessage"
                    ).value

            };


            submitButton.disabled =
                true;


            submitButton.innerText =
                "SENDING...";


            message.innerText =
                "";


            try {


                const response =
                    await fetch(
                        "/rsvp",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(data)

                        }
                    );


                const result =
                    await response.json();


                if (result.success) {


                    message.innerText =
                        "❤️ Thank you for your response! " +
                        "We are so happy to hear from you.";


                    rsvpForm.reset();


                    reasonGroup.classList.add(
                        "hidden"
                    );


                }

                else {

                    message.innerText =
                        result.message ||
                        "Unable to submit your response.";

                }


            }

            catch (error) {


                console.error(
                    error
                );


                message.innerText =
                    "Something went wrong. Please try again.";

            }


            submitButton.disabled =
                false;


            submitButton.innerText =
                "SEND MY RESPONSE";

        }
    );

}