$(document).ready(function () {


    $('#selectTile').change(function (e) {
        fileName = e.target.files[0].name;
        tileSrc = "assets/images/" + fileName;
        $("#blacklistgrid .tile-row .image-wrapper img").attr("src", tileSrc);

    });
    $('#getDimmensions').click(function () {
        count=0;
        wWidth = $("#wWidth").val();
        tWidth = $("#tWidth").val();
        wHeight = $("#wHeight").val();
        tHeight = $("#tHeight").val();
        //fileName =   $('#selectTile').val();
        if($('#selectTile').val() == "") {
            if(!$('#selectTile').parent().children("span").hasClass("error-message")) {
            $('#selectTile').parent().append("<span class='error-message'>Enter File name</span>"); 
            }
            count++;
        } else {
            $("#selectTile").parent().children("span").remove();
        }
        if (wWidth == "") {
            if(!$('#wWidth').parent().children("span").hasClass("error-message")) {
            $("#wWidth").parent().append("<span class='error-message'>Enter Wall Width</span>"); }
            count++;
        }
        else {
            $("#wWidth").parent().children("span").remove();
        } 
        if (tWidth == "") {
            if(!$('#tWidth').parent().children("span").hasClass("error-message"))
            $("#tWidth").parent().append("<span class='error-message'>Enter tile Width</span>");
            count++;
        } else {
            $("#tWidth").parent().children("span").remove();
        }
        if (wHeight == "") {
            if(!$('#wHeight').parent().children("span").hasClass("error-message"))
            $("#wHeight").parent().append("<span class='error-message'>Enter Wall height</span>");
            count++;
        } else {
            $("#wHeight").parent().children("span").remove();
        }
        if (tHeight == "") {
            if(!$('#tHeight').parent().children("span").hasClass("error-message"))
            $("#tHeight").parent().append("<span class='error-message'>Enter tile height</span>");
            count++;
        }  else {
            $("#tHeight").parent().children("span").remove();
        }

        
        if(count != 0) {
            console.log("pass");
        }
        else {
            //tileName= $("#selectTile").val();
            //getColumns = Math.ceil(wWidth / tWidth);
            getColumns = wWidth / tWidth;
            //console.log(getColumns);
            $("#columnTiles").text(getColumns);

            //getRow = Math.ceil(wHeight / tHeight)
            getRow = wHeight / tHeight;
            //console.log(getRow);
            $("#rowTiles").text(getRow);

            tileSrc = "assets/images/" + fileName;
            for (var i = 1; i <= getColumns; i++) {
                makeColumns(tileSrc);
            }
            for (var i = 1; i <= getRow; i++) {
                makeRow();
            }

            $(".wall-dim").css("max-width", wWidth * 10);
            $(".wall-dim").css("height", wHeight * 10);
            $(".image-wrapper").css("width", tWidth * 10);
            $(".image-wrapper").css("height", tHeight * 10);

            $("#blacklistgrid .tile-row").each(function () {
                $(this).append('<div class="image-wrapper" ><img class="image-dim" src="' + tileSrc + '" alt="1">        <div class="image-caption"><input type="file" name="selectTile" class="dim-input selectThisTile"></div></div>');
            });

            $(".wall-dim").css("max-width", wWidth * 10);
            $(".wall-dim").css("height", wHeight * 10);
            $(".image-wrapper").css("width", tWidth * 10);
            $(".image-wrapper").css("height", tHeight * 10);

            $('.image-wrapper').click(function () {
                console.log($(this).children("img").attr("src"));

            });

            $('.selectThisTile').change(function (e) {
                fileName = e.target.files[0].name;
                console.log(fileName);
                tileSrc = "assets/images/" + fileName;
                console.log($(this).siblings("img").attr("src"));
                $(this).parent(".image-caption").siblings(".image-dim").attr("src", tileSrc)

            });

            $('.image-wrapper').draggable({
                cancel: "a.ui-icon", // clicking an icon won't initiate dragging
                //revert: "invalid", // when not dropped, the item will revert back to its initial position
                revert: true, // bounce back when dropped
                helper: "clone", // create "copy" with original properties, but not a true clone
                cursor: "move"
                , revertDuration: 0 // immediate snap
            });


            $('.image-wrapper').droppable({
                accept: ".image-wrapper",
                activeClass: "ui-state-highlight",
                drop: function (event, ui) {
                    // clone item to retain in original "list"
                    var $item = ui.draggable.clone();

                    $(this).addClass('has-drop').html($item);

                }
            });
            count=0;
        }
    });




});

function makeColumns(filePath) {
    $("#blacklistgrid .tile-row").each(function () {
        $(this).append('<div class="image-wrapper" ><img class="image-dim" src="' + filePath + '" alt="1"><div class="image-caption"><input type="file" name="selectTile" class="dim-input selectThisTile"></div></div>');
    });
}

function makeRow() {
    var count = 1, first_row = $('#row');
    while (count-- > 0) first_row.clone().appendTo('#blacklistgrid');
}
