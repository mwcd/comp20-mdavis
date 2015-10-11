function init() {
    var img = new Image();
    var img2 = new Image();
    img.addEventListener("load", function() {
        game_canvas = document.getElementById("game_canvas");
        var ctx = game_canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        i = 0;
            ctx.drawImage(img2, 37, 119, 43, 30, 70, 60, 43, 30);
            ctx.drawImage(img2, 119, 118, 43, 30, 120, 40, 43, 30);
            i++;
    }, false);
    img.src = 'duckhunt-background.gif';
    img2.src = 'duckhunt_various_sheet.png';
}