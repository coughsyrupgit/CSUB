define([
    'jquery',
    'core.data',
    'core.interface'
    ], function ($, data, interface) {
        var core = {

            init: function() {
                console.log('core init started');
                data.init();
                interface.init();
            }
        }

        return core;
});