/**
 * Created by kangaja on 9.6.2016.
 */

var Game = {
    _display: null,
    _currentScreen: null,
    _screenWidth: 80,
    _screenHeight: 24,
    init: function() {

        this._display = new ROT.Display({width: this._screenWidth, height: this._screenHeight + 1});
        var game = this; // So that we don't lose this
        var bindEventToScreen = function(event) {
            window.addEventListener(event, function(e) {
                if (game._currentScreen !== null) {
                    game._currentScreen.handleInput(event, e);
                }
            });
        };
        bindEventToScreen('keydown');
        bindEventToScreen('keypress');
    },
    getDisplay: function() {
        return this._display;
    },
    getScreenWidth: function() {
        return this._screenWidth;
    },
    getScreenHeight: function() {
        return this._screenHeight;
    },
    refresh: function() {
        this._display.clear();
        this._currentScreen.render(this._display);
    },
    switchScreen: function(screen) {
        // If we had a screen before, notify it that we exited
        if (this._currentScreen !== null) {
            this._currentScreen.exit();
        }

        this.getDisplay().clear();
        this._currentScreen = screen;
        if (!this._currentScreen !== null) {
            this._currentScreen.enter();
            this.refresh();
        }
    }
};

window.onload = function() {
    if(!ROT.isSupported()) {
        alert("The rot.js library is not supported by your browser.");
    }
    else {
        Game.init();
        document.appendChild(Game.getDisplay().getContainer());
        Game.swithScreen(Game.Screen.startScreen);
    }
}
