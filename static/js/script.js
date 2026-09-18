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
        document.getElementById(
            "flowerContainer"
        );


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

        "🌷",

        "✿",

        "❀",

        "❁"

    ];


    flower.innerHTML =
        flowers[
            Math.floor(
                Math.random() *
                flowers.length
            )
        ];


    flower.style.left =
        Math.random() * 100 + "%";


    flower.style.fontSize =
        (
            12 +
            Math.random() * 18
        ) + "px";


    flower.style.animationDuration =
        (
            7 +
            Math.random() * 7
        ) + "s";


    flower.style.animationDelay =
        (
            Math.random() * 2
        ) + "s";


    container.appendChild(
        flower
    );


    setTimeout(
        function () {

            flower.remove();

        },
        16000
    );

}



// ============================================================
// CONTINUOUS FLOWERS
// ============================================================

setInterval(
    createFlower,
    450
);



// Initial flowers

for (
    let i = 0;
    i < 20;
    i++
) {

    setTimeout(
        createFlower,
        i * 120
    );

}



// ============================================================
// MUSIC
// ============================================================

function startMusic() {

    if (!weddingMusic) {
        return;
    }


    weddingMusic.volume =
        0.45;


    weddingMusic
        .play()
        .then(
            function () {

                musicPlaying =
                    true;


                if (musicButton) {

                    musicButton.innerHTML =
                        "❚❚";

                }

            }
        )
        .catch(
            function () {

                console.log(
                    "Browser blocked autoplay."
                );

            }
        );

}



// ============================================================
// TOGGLE MUSIC
// ============================================================

function toggleMusic() {

    if (!weddingMusic) {
        return;
    }


    if (musicPlaying) {

        weddingMusic.pause();

        musicPlaying =
            false;


        musicButton.innerHTML =
            "♪";

    }

    else {

        weddingMusic
            .play()
            .then(
                function () {

                    musicPlaying =
                        true;


                    musicButton.innerHTML =
                        "❚❚";

                }
            );

    }

}



// ============================================================
// OPEN INVITATION
// ============================================================

function openInvitation() {


    // This is a direct user interaction,
    // so browser allows music much more reliably.

    startMusic();


    // Prevent repeated clicks

    const sealButton =
        document.getElementById(
            "sealButton"
        );


    if (sealButton) {

        sealButton.disabled =
            true;

    }


    // Opening animation

    openingScreen.classList.add(
        "opened"
    );


    setTimeout(
        function () {


            mainInvitation.classList.remove(
                "hidden"
            );


            mainInvitation.classList.add(
                "visible"
            );


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });


            setTimeout(
                function () {

                    openingScreen.style.display =
                        "none";

                },
                1000
            );


        },
        700
    );

}



// ============================================================
// TRY AUTOPLAY
// ============================================================

window.addEventListener(
    "load",
    function () {

        startMusic();

    }
);



// ============================================================
// FIRST USER INTERACTION
// ============================================================

document.addEventListener(
    "click",
    function () {

        if (!musicPlaying) {

            startMusic();

        }

    },
    {
        once: true
    }
);



// ============================================================
// COUNTDOWN
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
        container.querySelector(
            ".days"
        );


    const hoursElement =
        container.querySelector(
            ".hours"
        );


    const minutesElement =
        container.querySelector(
            ".minutes"
        );


    const secondsElement =
        container.querySelector(
            ".seconds"
        );


    function update() {


        const now =
            new Date().getTime();


        const difference =
            targetDate - now;


        if (
            difference <= 0
        ) {


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
// START COUNTDOWNS
// ============================================================

startCountdown(
    "receptionCountdown"
);


startCountdown(
    "muhurthamCountdown"
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
        async function (event) {


            event.preventDefault();


            const name =
                document.getElementById(
                    "guestName"
                ).value.trim();


            const phone =
                document.getElementById(
                    "guestPhone"
                ).value.trim();


            const receptionInput =
                document.querySelector(
                    'input[name="reception"]:checked'
                );


            const muhurthamInput =
                document.querySelector(
                    'input[name="muhurtham"]:checked'
                );


            const guests =
                document.getElementById(
                    "guestCount"
                ).value;


            const dietary =
                document.getElementById(
                    "dietary"
                ).value;


            const reason =
                document.getElementById(
                    "reason"
                ).value;


            const message =
                document.getElementById(
                    "guestMessage"
                ).value.trim();


            const submitButton =
                document.getElementById(
                    "submitButton"
                );


            const rsvpMessage =
                document.getElementById(
                    "rsvpMessage"
                );



            // =================================================
            // VALIDATION
            // =================================================

            if (!name) {

                rsvpMessage.innerText =
                    "Please enter your name.";

                return;

            }


            if (!receptionInput) {

                rsvpMessage.innerText =
                    "Please select your Reception attendance.";

                return;

            }


            if (!muhurthamInput) {

                rsvpMessage.innerText =
                    "Please select your Muhurtham attendance.";

                return;

            }



            // =================================================
            // DATA
            // =================================================

            const data = {

                name: name,

                phone: phone,

                reception:
                    receptionInput.value,

                muhurtham:
                    muhurthamInput.value,

                guests: guests,

                dietary: dietary,

                reason: reason,

                message: message

            };



            // =================================================
            // DISABLE BUTTON
            // =================================================

            submitButton.disabled =
                true;


            submitButton.innerText =
                "SENDING...";


            rsvpMessage.innerText =
                "";



            // =================================================
            // SEND TO FLASK
            // =================================================

            try {


                const response =
                    await fetch(
                        "/rsvp",
                        {

                            method:
                                "POST",

                            headers:
                                {
                                    "Content-Type":
                                        "application/json"
                                },

                            body:
                                JSON.stringify(
                                    data
                                )

                        }
                    );


                const result =
                    await response.json();



                if (
                    result.success
                ) {


                    rsvpMessage.innerText =
                        result.message;


                    rsvpMessage.style.color =
                        "#6b4038";


                    // Reset form

                    rsvpForm.reset();


                }

                else {


                    rsvpMessage.innerText =
                        result.message ||
                        "Unable to save your response.";


                    rsvpMessage.style.color =
                        "#9b3d35";

                }


            }

            catch (error) {


                console.error(
                    "RSVP ERROR:",
                    error
                );


                rsvpMessage.innerText =
                    "Unable to connect to the server. Please try again.";


                rsvpMessage.style.color =
                    "#9b3d35";

            }



            // =================================================
            // ENABLE BUTTON
            // =================================================

            submitButton.disabled =
                false;


            submitButton.innerText =
                "SEND MY RESPONSE";

        }
    );

}