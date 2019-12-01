function checkData(text_field, min, max) {
    //let min = -5;
    //let max = 3;

    let value = $(text_field).val().replace(',', '.');
    if (!$.isNumeric(value) && value != "-" && value != "") {
        $(text_field).val("");
        //$("#"+ id +"_wrongAlert").stop(true, true).fadeIn( 200 ).delay( 1000 ).fadeOut( 200 );
    }
    if ((min > value) || (value > max)) {
        $(text_field).val("");
        //$("#"+ id +"_wrongAlert").stop(true, true).fadeIn( 200 ).delay( 1000 ).fadeOut( 200 );
    }
}

function histBtnPressed() {
    $(".arrow-icon").toggleClass("open");
    if($("#histWrap").hasClass("active")) {
        hideTable();
    } else {
        showTable();
    }
}

function showTable() {
    
    // let rows = getHistory();
    //
    // if(rows.length == 0) {
    //     $('#histMessage').stop(true,true).fadeIn( 300 ).delay( 1000 ).fadeOut( 300 );
    //     return;
    // }
    $(".extendBtn").toggleClass("active");
    //$("#historyTableBody").html(rows.join(""));
    $("#histWrap").toggleClass("active");
    $('#historyRect').toggleClass('active');
}

function hideTable() {
    $(".extendBtn").toggleClass('active');
    $("#histWrap").toggleClass("active");
    $('#historyRect').toggleClass('active');
    $('#dot').stop(true,true).fadeOut();
    $('#arrow').stop(true,true).fadeOut();
}

function equal(obj, newObj) {
    return (obj.x === newObj.x) && (obj.y === newObj.y) && (obj.r === newObj.r) && (obj.result === newObj.result);
}

function save(x, y, r, result) {
    let obj = {
        x: x,
        y: y,
        r: r,
        result: result
    };
    let allData = [];
    if (localStorage.userData) {
        previousObjs = localStorage.getItem('userData');
        allData.push(previousObjs);
        if (allData.length == 0 || !equal(JSON.parse(localStorage.getItem('lastObj')), obj)) {
            localStorage.setItem('lastObj', JSON.stringify(obj));
            allData.push(JSON.stringify(obj));
            localStorage.setItem('userData', allData);
        }
    } else {
        allData.push(obj);
        localStorage.setItem('lastObj', JSON.stringify(obj));
        localStorage.setItem('userData', JSON.stringify(obj));
    }
}

function getHistory() {
    let rxp = /{([^}]+)}/g,
        curMatch;
    let rows = [], j = -1;
    if ($('#history').text()) {
        userAttempts = $('#history').text();
        while (curMatch = rxp.exec(userAttempts)) {
                        obj = JSON.parse("{" + curMatch[1] + "}");
                        let x = obj.x.toString().replace(".", ",").length > 15 ?
                            (obj.x.toString().replace(".", ",").substring(0, 15) + "…") :
                            obj.x.toString().replace(".", ",");
                        let y = obj.y.toString().replace(".", ",").length > 15 ?
                            (obj.y.toString().replace(".", ",").substring(0, 15) + "…") :
                            obj.y.toString().replace(".", ",");
                        let r = obj.r.toString().replace(".", ",").length > 15 ?
                            (obj.r.toString().replace(".", ",").substring(0, 15) + "…") :
                            obj.r.toString().replace(".", ",");
                        rows[++j] = '<tr height="30px"><td width="130px" >';
                        rows[++j] = '<span title=\"' + obj.x.toString() + '\"' + '>' + x + '</span>';
                        rows[++j] = '</td><td width="130px" >';
                        rows[++j] = '<span title=\"' + obj.y.toString() + '\"' + '>' + y + '</span>';
                        rows[++j] = '</td><td width="130px" >';
                        rows[++j] = '<span title=\"' + obj.r.toString() + '\"' + '>' + r + '</span>';
                        rows[++j] = '</td><td width="130px" >';
                        rows[++j] = obj.result === "true" ? '<span style="color:#008000;text-align:center;">Попадание</span>' : '<span style="color:#B22222;text-align:center;">Промах</span>';
                        rows[++j] = '</td></tr>';
        }
    }
    return rows;
}

function clearHist() {
    localStorage.clear();
    hideTable();
}

function setTime() {
    $("#time").html(new Date().toLocaleTimeString());
}

function okPressed() {
    $('.mainTable').addClass("zoomOut");
}

function setDotCoordResponse() {
    let xField = document.getElementById("xField");
    let yField = document.getElementById("yField");
    let rField = document.getElementById("rField");

    if(!($("#xField").length && $("#yField").length && $("#rField").length)) return;
    let x = parseFloat($("#xField").attr("title").replace(",", "."));
    let y = parseFloat($("#yField").attr("title").replace(",", "."));
    let r = parseFloat($("#rField").attr("title").replace(",", "."));
    let result = $('#resultField').text() == "попадание";
    showDot(x, y, r, result);
}

function makeRowsClickable() {
    let table = document.getElementById("historyTable");
    for (let i = 0, row; row = table.rows[i]; i++) {
        row.setAttribute("onclick", "rowClicked(this);");
    }
}


function rowClicked(row) {
    let children = row.children;
    let x = parseFloat(children[0].firstChild.title.replace(',', '.'));
    let y = parseFloat(children[1].firstChild.title.replace(',', '.'));
    let r = parseFloat(children[2].firstChild.title.replace(',', '.'));
    let result = children[3].firstChild.innerHTML.toString() == "Попадание";
    showDot(x, y, r, result);
}

function showDot(x, y, r, result) {
    let realX = 100 + 70 * (x/r);
    let realY = 100 - 70 * (y/r);
    if(realX < 0 || realY < 0 || realX > 200 || realY > 200) {
        $('#dot').stop(true,true).fadeOut();
        $('#arrow').stop(true,true).fadeOut()
            .attr("transform", getTransform(x, y, realX, realY))
            .stop(true,true).fadeIn();
    } else {
        $('#dot').stop(true,true).fadeOut()
            .attr("cx", realX).attr("cy", realY)
            .attr("fill", result ? "green" : "red")
            .stop(true, true).fadeIn();
        $('#arrow').stop(true,true).fadeOut();
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Line {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        if(x1 != x2) {
            this.k = (y2-y1)/(x2-x1);
        } else this.k = 0;
        if(x1 != x2) {
            this.b = (x2*y1 - x1*y2)/(x2 - x1);
        } else this.b = 0;
    }

    intersect(other) {
        if(other.x1==other.x2) {
            return(new Point(other.x1, this.k == 0 ? 100 : this.k*other.x1+this.b))
        } else if (other.y1==other.y2) {
            return(new Point(this.k == 0 ? 100 : (other.y1-this.b)/this.k, other.y1));
        } else return(new Point(0,0));
    }
}

class Transform {
    constructor(x, y, rot) {
        this.x = x;
        this.y = y;
        this.rot = rot;
    }

    setPoint(point) {
        this.x = point.x;
        this.y = point.y;
    }

    toString() {
        return "translate(" + this.x + ", " + this.y + ") rotate(" + this.rot + ")";
    }
}

function getTransform(x, y, realX, realY) {
    let result = new Transform(100, 100, 0);
    let line = new Line(100, 100, realX, realY);
    let angleLine = new Line(0, 0, x, y);
    let atan = Math.atan2(y, x);
    let degree = atan * 180/Math.PI;
    if(x == 100) degree = realY < 0 ? 90 : 270;
    result.rot = 180 - degree;
    if(degree >= 135 || degree <= -135) {
        result.setPoint(line.intersect(new Line(0,0,0,200))); //left
    }
    else if(degree >= 45 && degree <= 135) {
        result.setPoint(line.intersect(new Line(0,0,200,0))); //up
    }
    else if(degree <= 45 && degree >= -45) {
        result.setPoint(line.intersect(new Line(200,0,200,200))); //right
    }
    else if(degree >= -135 && degree <= -45) {
        result.setPoint(line.intersect(new Line(0,200,200,200))); //down
    }
    return result.toString();
}

function imageClicked(event) {
    let val = document.getElementById('form:r').getAttribute('value');
    if(!val) {
        document.getElementById('form:r').setCustomValidity('Нужен радиус!');
        document.getElementById('form:submitBtn').click();
        return;
    }

    let relativeX = event.pageX - $('#imageSvg').offset().left;
    let relativeY = event.pageY - $('#imageSvg').offset().top;

    relativeX *= 2/3;
    relativeY *= 2/3;

    //console.log(relativeX, relativeY);

    let width = $('#imageSvg').width() * 2/3;
    let height = $('#imageSvg').height() * 2/3;
    let r = parseFloat(val.replace(',','.'));
    let x = (relativeX - (width / 2)) / 70;
    let y = ((height / 2) - relativeY) / 70;
    //console.log(x,y);
    $(document.getElementById('form:x')).val("");
    $(document.getElementById('form:y')).val("");
    $(document.getElementById('form:x')).val((x * r).toFixed(4));
    $(document.getElementById('form:y')).val((y * r).toFixed(4));
    $("div[id*='xSlider']").slider("value", (x * r).toFixed(4));
    $("div[id*='xSlider']").val((x * r).toFixed(4));
    //console.log($("div[id*='xSlider']"));
    // setFieldValue("x", (x * r).toFixed(2));
    // setFieldValue("y", (y * r).toFixed(2));

    document.getElementById('form:submitBtn').click();

}

function setFieldValue(name, value) {
    let custom = name + "Custom";
    if($('#'+name).length) {
        document.getElementById(name).value = value;
        if($('#'+custom).length) {
            document.getElementById(name+"Custom").value = value;
            $('input[name=' + name + ']').prop('checked',false);
            $('#' + custom).prop('selected', true);
        }
    } else {
        document.getElementById(name + 'Custom').value = value;
        $('input[name=' + name + ']').prop('checked',false);
        $('#' + custom).prop('checked', true);
    }
}

function drawDots(radius) {
    // let rxp = /{([^}]+)}/g,
    //     curMatch;
    // let rows = [], j = -1;
    // if ($('#history').text()) {
    //     userAttempts = $('#history').text();
    //     let counter = 0;
    //     while (curMatch = rxp.exec(userAttempts)) {
    //         obj = JSON.parse("{" + curMatch[1] + "}");
    //         let x = parseFloat(obj.x.toString().replace(",", "."));
    //         let y = parseFloat(obj.y.toString().replace(",", "."));
    //         let r = parseFloat(obj.r.toString().replace(",", "."));
    //         let result = obj.result === 'true';
    //         let realX = 100 + 70 * (x/r);
    //         let realY = 100 - 70 * (y/r);
    //         let color;
    //         if (result) color = "green";
    //         else color = "red";
    //         let text = '<circle stroke="black" r="2" fill="' + color + '" id="dot'+ counter++ +'" cx="'+ realX+'" cy="'+ realY+'"></circle>';
    //         document.getElementById("imageSvg").innerHTML += text;
    //         $('#dot' + counter).fadeIn();
    //     }
    // }

    let table = $('#historyTable').get()[0];
    if(!table) return;
    for(let i = 1, row; row = table.rows[i]; ++i) {

        let x = parseFloat(row.cells[0].innerText);
        let y = parseFloat(row.cells[1].innerText);
        let r = parseFloat(row.cells[2].innerText);
        if(isNaN(x) || isNaN(y) || isNaN(r)) continue;
        if(radius != 0 && !isNaN(radius)) {
            r = radius;
        }
        let result = row.cells[3].innerText === "Попадание";
        let realX = 100 + 70 * (x/r);
        let realY = 100 - 70 * (y/r);
        let color;
        if (result) color = "green";
        else color = "red";

        let text = '<circle stroke="black" r="2" fill="' + color + '" id="dot'+ i +'" cx="'+ realX+'" cy="'+ realY+'"></circle>';
        document.getElementById("dotsGroup").innerHTML += text;
    }

}

function repositionLegend() {
    for(let i = 1; i < 5; ++i) {
        let x = document.getElementById("x"+i);
        //console.log(x);
        //console.log(document.getElementById("line_x"+i).getAttribute("x1"));
        //console.log(x.getBoundingClientRect().width);
        x.setAttribute("x", document.getElementById("line_x"+i).getAttribute("x1") - (x.getBoundingClientRect().width));
        let y = document.getElementById("y"+i);
        y.setAttribute("y", document.getElementById("line_y"+i).getAttribute("y1") - 0 + (y.getBoundingClientRect().height / 2));
    }
}

function onInputButtonCLick(button) {
    $('.inputButton').removeClass('selected');
    $(button).addClass('selected');
    let custom = $(button).attr('name').charAt(0) +'Custom';
    document.getElementById(custom).value = $(button).val();
}

function onCheckBoxClick(box) {
    if($(box).prop('checked')) {
        $('.inputCheckBox').prop('checked', false);
        $(box).prop('checked', true);
        $('.inputCheckBox').prop('required', false);

    } else {
        $('.inputCheckBox').prop('checked', false);
        $('.inputCheckBox').prop('required', true);
    }
}

function redrawGraph(radius) {
    //console.log(radius);
    let int_radius = parseInt(radius);
    let halved_radius = int_radius / 2;
    changeGraphLegend("1", -int_radius);
    changeGraphLegend("2", -halved_radius);
    changeGraphLegend("3", halved_radius);
    changeGraphLegend("4", int_radius);
}

function redrawDots() {
    let radius = document.getElementById('form:r').getAttribute('value');
    if(!radius || radius > 5 || radius <= 0) {
        return;
    }

    $('#dotsGroup').empty();
    drawDots(parseInt(radius));
}

function changeGraphLegend(id_number, value) {
    //console.log(document.getElementById("x"+id_number));
    document.getElementById("x"+id_number).innerHTML = value;
    document.getElementById("y"+id_number).innerHTML = value;
}

function onSend(data) {
    var status = data.status; // Can be "begin", "complete" or "success".

    if(status == "begin") {
        $(document.getElementById('form:loading')).stop(true, true).fadeIn(100);
        $('#matchMessage').stop(true, true).fadeOut( 0 );
    }
    if(status == "success") {
        $(document.getElementById('form:loading')).stop(true, true).fadeOut(100);
        redrawDots();
        $('#matchMessage').stop(true, true).fadeIn( 200 ).delay( 3000 ).fadeOut( 200 );
    }

    fixButtons();
}

function onError() {
    //console.log("error");
    let radius = document.getElementById('form:r').getAttribute('value');
    if(!radius) {
        $('.inputButton').addClass('error');
    }
    // let x = document.getElementById('form:x_text').getAttribute("value");
    // if(!x) {
    //     $(document.getElementById('form:x_text')).addClass('error');
    // }
}

function fixButtons() {
    //console.log("fixButtons");
    $('a.inputButton').each(function () {
        let link = $(this).get()[0];
        let value = link.innerHTML;
        link.setAttribute("href", "#");
        link.removeAttribute('onclick');
        $(this).click(function () {
            document.getElementById("form:r").setAttribute("value", value);
            $('.inputButton').removeClass('selected');
            $('.inputButton').removeClass('error');
            $(this).addClass('selected');
            event.preventDefault();
            redrawGraph(value);
            redrawDots()
        });
        let currentR = document.getElementById("form:r").getAttribute("value");
        if(currentR == value) {
            $(this).addClass('selected');
            redrawGraph(value);
            redrawDots()
        }
    });
}