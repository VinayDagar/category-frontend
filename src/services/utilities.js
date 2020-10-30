import { message } from 'antd';

message.config({
    top: 24,
    duration: 4,
    maxCount: 1,
});

const service = {
    showSuccessMessage(msg, duration = 3) {
        if (!message) return;
        message.success(msg, duration);
    },
    showWarningMessage(msg, duration = 3) {
        if (!message) return;
        message.warn(msg, duration);
    },
    showErrorMessage(msg, duration = 3) {
        if (!message) return;
        message.error(msg, duration);
    },
    showInfoMessage(msg, duration = 3) {
        if (!message) return;
        message.info(msg, duration);
    },
}


window.$utility = service;

export default service;
