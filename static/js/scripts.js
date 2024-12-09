$(document).ready(function () {
    // Make buttons draggable and resizable
    $(".draggable").draggable({ containment: "#container" });
    $(".resizable").resizable();

    // Change button color on click
    $(".draggable").on("click", function () {
        const newColor = prompt("Enter a new color (e.g., red, #123456):");
        if (newColor) {
            $(this).css("background-color", newColor);
        }
    });

    // Save state to server
    $("#save-state-button").click(function () {
        const state = {};
        $(".draggable").each(function () {
            const id = $(this).attr("id");
            state[id] = {
                position: $(this).position(),
                width: $(this).width(),
                height: $(this).height(),
                color: $(this).css("background-color"),
            };
        });

        $.ajax({
            url: "/save-state",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(state),
            success: function (response) {
                alert(response.message);
            },
        });
    });

    // Load state from server
    $("#load-state-button").click(function () {
        $.ajax({
            url: "/load-state",
            method: "GET",
            success: function (state) {
                $(".draggable").each(function () {
                    const id = $(this).attr("id");
                    if (state[id]) {
                        $(this).css({
                            top: state[id].position.top,
                            left: state[id].position.left,
                            width: state[id].width,
                            height: state[id].height,
                            backgroundColor: state[id].color,
                        });
                    }
                });
            },
            error: function () {
                alert("Failed to load state!");
            },
        });
    });
});
