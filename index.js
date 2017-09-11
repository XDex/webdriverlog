'use strict';

function plugin(wdInstance) {
    if (typeof wdInstance.addCommand !== 'function') {
        throw new Error('you can\'t use WebdriverLog with this version of WebdriverIO');
    }

    wdInstance.addCommand('getLogs', getLogs.bind(wdInstance));

    function getLogs() {
        return wdInstance.execute(() => {
            var NAMESPACE = '__webdriverlog';
            if (!window[NAMESPACE]) {
                return [];
            }
            return window[NAMESPACE].logs;
        }).then(result => result.value);
    }
}

module.exports.init = plugin;