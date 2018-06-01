var screen = "enter";
var current_playlist = 0;
var positions = [[0, "1 Player"], [0, "2 Players"]];

$(function() {
    $(document).on("keydown", function(key) {
        key_press(key);
    });
    flash($("#start > span"), 750);
    flash($("#info span"), 1000);
    navigate(positions[current_playlist][0], current_playlist);
});

function key_press(key) {
    var pressed_key = key.originalEvent.key;
    var visibility;
    
    if(pressed_key == "Enter") {
        if(screen == "enter") {
            $("#startup").addClass("hidden");
            $("#main").removeClass("hidden");
            screen = "main";
            beep("beep");
        }
    }

    else if(screen == "main") {
        
        if(pressed_key == "ArrowRight") {
            $("#left_arrow").css("visibility", "visible");
            if(positions[current_playlist][0] + 2 < slide_list[current_playlist].length) {
                positions[current_playlist][0]++;
                navigate(positions[current_playlist][0], current_playlist);
                visibility = (positions[current_playlist][0] + 2 == slide_list[current_playlist].length) ? "hidden" : "visible";
                $("#right_arrow").css("visibility", visibility);
                beep("menu_nav");
            }
        }

        else if(pressed_key == "ArrowLeft") {
            $("#right_arrow").css("visibility", "visible");
            if(positions[current_playlist][0] - 1 >= -1) {
                positions[current_playlist][0]--;
                navigate(positions[current_playlist][0], current_playlist);
                visibility = (positions[current_playlist][0] == -1) ? "hidden" : "visible";
                $("#left_arrow").css("visibility", visibility);
                beep("menu_nav");
            }
        }

        else if(pressed_key == "ArrowUp") {
            current_playlist = (current_playlist == 0) ? slide_list.length - 1 : current_playlist - 1;
            navigate(positions[current_playlist][0], current_playlist);
            switch_playlist();
            beep("menu_nav");
        }

        else if(pressed_key == "ArrowDown") {
            current_playlist = (current_playlist == slide_list.length - 1) ? 0 : current_playlist + 1;
            navigate(positions[current_playlist][0], current_playlist);
            switch_playlist();
            beep("menu_nav");
        }

        else if(pressed_key == "d" || pressed_key == "D") {
            var download_game = slide_list[current_playlist][positions[current_playlist][0]+1].game;

            if(download_game === null) {
                alert("Unfortunately, downloading games is not yet implemented.")
            }
            else {
                window.open(download_game, "_blank");
            }
        }

        else if(pressed_key == "i" || pressed_key == "I") {
            $("#main").addClass("hidden");
            $("#info").removeClass("hidden");
            screen = "info";
            beep("beep");
        }
    }

    else if(screen == "info") {
        if(pressed_key == "Escape") {
            $("#main").removeClass("hidden");
            $("#info").addClass("hidden");
            screen = "main";
            beep("back");
        }
    }
}

function flash(element, interval) {
    setInterval(function() {
        $(element).toggleClass("flash");
    }, interval);
}

function beep(sound) {
    setTimeout(function() {
        $("#" + sound)[0].play();
    }, 40)
}

function navigate(first, playlist) {
    $(".slide_name, #ic_desc").empty();
    var i_error;
    var title;
    var image;
    var visibility;
    for (var i = 0; i < 3; i++) {

        try {
            title = slide_list[playlist][first+i].title;
            image = slide_list[playlist][first+i].img;
        }
        catch(err) {
            title = "";
            image = "";
        }
        finally {
            $(".slide").eq(i).find(".slide_name").append(title);
            $(".slide").eq(i).find(".slide_img").attr("src", image);
            visibility = (!title && !image) ? "hidden" : "visible";
            $(".slide").eq(i).css("visibility", visibility);            
        }    
    }
    $("#ic_desc, #info_title").empty();
    $("#ic_desc").append(slide_list[playlist][first+1].description);
    $("#info_title").append(slide_list[playlist][first+1].title);
    $("#ic_img >img").attr("src", slide_list[playlist][first+1].img);
}

function switch_playlist() {
    if(positions[current_playlist][0] + 1 == slide_list[current_playlist].length) {
        $("#right_arrow").css("visibility", 0);
    }
    else {
        $("#right_arrow").css("visibility", 1);
    }
    if(positions[current_playlist][0] == 0) {
        $("#left_arrow").css("visibility", 0);
    }
    else {
        $("#left_arrow").css("visibility", 1);
    }

    $("#slider_name").empty();
    $("#slider_name").append(positions[current_playlist][1]);
}