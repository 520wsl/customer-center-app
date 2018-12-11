import startLoading from './startLoading.vue';
import Vue from 'vue';

startLoading.newInstance = properties => {
    const _props = properties || {};

    const Instance = new Vue({
        data: _props,
        render (h) {
            return h(startLoading);
        }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const start_loading = Instance.$children[0];

    return {
        update (options) {

        },
        component: start_loading,
        destroy () {
            document.body.removeChild(document.getElementsByClassName('start-loading')[0]);
        }
    };
};

export default startLoading;
