import './common';
import jquery from 'jquery';

const $: JQueryStatic = jquery;
const _blinkIntervalMS = 1000;

function blink(e: JQuery<HTMLElement>) {
    setInterval(() => {
        e.css('opacity', e.css('opacity') == '1' ? 0 : 1);
    }, parseFloat(window.getComputedStyle(e[0]).transitionDuration) * 1000);
}

$('.blink').each((i, e) => blink($(e)));