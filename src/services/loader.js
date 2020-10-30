import 'nprogress/nprogress.css';
import NProgress from 'nprogress';

export const showLoader = () => {
    NProgress.start();
}

export const hideLoader = () => {
    NProgress.done();
}
