/**
 * Created by kangaja on 10.6.2016.
 */
function Game() {
    this._display = null;
    this._currentScreen = null;
    this.init = function() {
        this._display = new ROT.Display({width: this._screenWidth, height: this._screenHeight + 1});
        var self = this;
        var bindEventToScreen = function(event) {
            window.addEventListener(event, function(e) {
                // When an event is received, send it to the
                // screen if there is one
                if (self._currentScreen !== null) {
                    // Send the event type and data to the screen
                    self._currentScreen.handleInput(event, e);

                }
            });
        };
        bindEventToScreen('keydown');
        bindEventToScreen('keypress');
    };
    this.getDisplay = function() {
        return this._display;
    };
    this.getScreenWidth = function() {
        return this._screenWidth;
    };
    this.getScreenHeight = function() {
        return this._screenHeight;
    };
};

window.onload = function() {
    Game.init();
    document.body.appendChild(Game.getDisplay().getContainer());
    Game.switchScreen(Game.Screen.startScreen);
};
