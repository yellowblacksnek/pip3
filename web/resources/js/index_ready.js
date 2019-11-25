$(document).ready(function () {
    repositionLegend();
    $('#imageSvg').click(imageClicked);
    drawDots(0);
    $('[name="r"]').each(function (a) {
        $(this)[0].oninvalid = function (e) {
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
                e.target.setCustomValidity('Нужен радиус!');
            }
        };
    });
    fixButtons();
});