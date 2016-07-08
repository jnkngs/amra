/**
 * Created by kangaja on 7.7.2016.
 */

var gameScreen = {
    enter: function() {
        console.log("Entered game screen.");
    },
    exit: function() { console.log("Exited game screen."); },
    render: function(display) {
        // Render our prompt to the screen
        for (var i = 0; i < 22; i++) {
            // Generate random background colors
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            var background = ROT.Color.toRGB([r, g, b]);
            display.drawText(2, i + 1, "%b{" + background + "}game should be here!");
        }
    },
    handleInput: function(inputType, inputData) {
        // Nothing to do here
    }
}
