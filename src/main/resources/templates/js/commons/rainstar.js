const s = window.screen;
const w = (_rain_star.width = s.width);
const h = (_rain_star.height = s.height);
const ctx = _rain_star.getContext("2d");
const p = Array(Math.floor(w / 10) + 1).fill(0);
const random = (items) => items[Math.floor(Math.random() * items.length)];
const hex = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
setInterval(() => {
    ctx.fillstyle = ""
});