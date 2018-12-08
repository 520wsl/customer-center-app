import startLoading from "./startLoading.js"

let startLoadingInstance;
let timer;

function getloadingBarInstance () {
    startLoadingInstance = startLoadingInstance || startLoading.newInstance();
    return startLoadingInstance;
}

function update(options) {
    let instance  = getloadingBarInstance();
    
    instance.update(options);
}

function hide() {
    setTimeout(() => {
        update();
        setTimeout(() => {
            update();
        }, 200);
    }, 800);
}

function clearTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

export default {
    start () {
        if (timer) return;

        update();
    },
    update () {
        clearTimer();
        update();
    },
    finish () {
        clearTimer();
        update();
        hide();
    },
    error () {
        clearTimer();
        update();
        hide();
    },
    config (options) {
    },
    destroy () {
        setTimeout(() => {
            let instance = getloadingBarInstance();
            startLoadingInstance = null;
            instance.destroy();
        }, 400);
        clearTimer();
    }
};
