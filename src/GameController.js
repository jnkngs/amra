/**
 * Created by kangaja on 19.9.2016.
 */
var GameController = function(systemmanager) {
    this._systemanager = systemmanager;
    this.canInput = false;

    this._getValue = function (key) {
        switch (key) {
            case 'up':
                return 38;
            case 'down':
                return 40;
            case 'left':
                return 37;
            case 'right':
                return 39;

            case 'a':
                return 65;
        }
    };

    this.parseInput = function (event) {
        if (engine.keyboard.canInput === true) {
            switch (event.keyCode) {
                case this._getValue('up'):
                    //engine.player.move('up');
                    break;

                case this._getValue('down'):
                    //engine.player.move('down');
                    break;

                case this._getValue('left'):
                    //engine.player.move('left');
                    break;

                case this._getValue('right'):
                    //engine.player.move('right');
                    break;

                case this._getValue('a'):
                    //engine.player.activate();
                    break;
            }
        }
    }
};
