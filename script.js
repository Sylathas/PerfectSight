//import dependencies
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js'
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
import { getStorage, ref as storageRef } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

//Check if it's mobile
window.mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

//Set up global variables
let logoChange = false;
let gridView = false;
let releaseOpen = false;
let contactsOpen = false;
let readyToEnd = false;
let gridOpenMobile = true;

//Functions on logo icon click
$('.logo').on('click', () => {
    if (logoChange) { //Scroll to top of page if logo is clicked
        $.scrollTo(0);
    }
});

//Initialise website
function startWebsite() {
    $('#start').css({ 'display': 'none' });
    $('body').css({ 'height': 'auto' });
    if (!logoChange && !window.mobileCheck()) { //On desktop
        logoChange = true;
        $('#navbar').css({ 'display': 'flex' });
        $('.logo').attr('id', 'LogoDesktop');
        $('.Cover').addClass('coverLoaded');
        $('.Text').addClass('textLoaded');
    } else if (!logoChange && window.mobileCheck()) { //On Mobile
        logoChange = true;
        $('#navbar').css({ 'display': 'flex' });
        $('.logo, #blank').css({ 'display': 'none' });
        $('.logo').attr('id', 'LogoMobile');
        $('.Cover').addClass('coverLoaded');
        $('.Text').addClass('textLoaded');
    }
}

//Go to contacts page when clicking on contacts navbar text
$('#contactPage').on('click', () => {
    if (!contactsOpen) {
        contactsOpen = true;
        $('#contactPage').text('HOME');
        $('#contacts').css({ 'display': 'block' });
        setTimeout(() => {
            if (!window.mobileCheck()) {
                $('#contacts').css({ 'width': '90%' });
            } else {
                $('#contacts').css({ 'height': '93%' });
            }
        }, 100);
        setTimeout(() => { $('#contacts p, #contacts a').css({ 'opacity': '1' }); }, 500);
        $('body').css({ 'overflow-y': 'hidden' });
    } else {
        contactsOpen = false;
        $('#contactPage').text('CONTACTS');
        $('#contacts p, #contacts a').css({ 'opacity': '0' });
        if (!window.mobileCheck()) {
            $('#contacts').css({ 'width': '0' });
        } else {
            $('#contacts').css({ 'height': '0' });
        }
        setTimeout(() => { $('#contacts').css({ 'display': 'none' }); }, 800);
        $('body').css({ 'overflow-y': 'auto' });
    }
});

/*Change grid view when clicking on grid navbar text //OLD

$('#layout').on('click', () => {
    if (!gridView) {
        gridView = true;
        $('.Text').css({ 'display': 'none' });
        $('#layout').css({ 'flex-wrap:': 'nowrap' });
        $('#layout').text('LIST');
        if (!window.mobileCheck()) {
            $('.Cover').css({ 'width': '30vw', 'height': '30vw', 'margin-left': '0', 'border-width': '1px' });
            $('#grid').css({ 'width': '90%' });
        } else {
            $('.block').css({ 'transition': 'none' });
            $('.Cover').css({ 'width': '50vw', 'height': '50vw', });
            setTimeout(() => { $('.block').css({ 'transition': '.5s' }); }, 500);
        }
    } else {
        gridView = false;
        $('.Text').css({ 'display': 'block' });
        $('#layout').css({ 'flex-wrap:': 'wrap' });
        $('#layout').text('GRID');
        if (!window.mobileCheck()) {
            $('.Cover').css({ 'width': '80vh', 'height': '80vh', 'margin-left': '5vw', 'border-width': '0px' });
            $('#grid').css({ 'width': '100%' });
        } else {
            $('.Cover').css({ 'width': '100%', 'height': '100vw', 'margin-left': '0', 'border-width': '0px' });
        }
    }
});*/

//Change grid view when clicking on grid navbar text
$('#layout').on('click', () => {
    if (!gridView) {
        gridView = true;
        $('#open, #void').css('display', 'block');
        if (window.mobileCheck()) {
            $('#releaseGrid').css('display', 'block');
        } else {
            $('#releaseGrid').css('display', 'flex');
        }
        setTimeout(() => {
            $('#releaseGrid').css('left', '50vw');
            $('#open').css('right', '50vw');
        }, 100);
        $('.release').css('display', 'none');
        $('#layout').text('LIST');
    } else {
        gridView = false;
        $.scrollTo(0);
        $('.release').css('display', 'block');
        $('#open, #releaseGrid, #void').css('display', 'none');
        $('#layout').text('GRID');
    }
});

//Open Cover on click //OLD
function openRelease() {
    $('.Cover').on("click", function () {
        if (gridView && !releaseOpen) { //Open release
            releaseOpen = true;
            $('.Text').css({ 'display': 'none' });
            $(this).parent().find('.Text').css({ 'display': 'block' });
            if (!window.mobileCheck()) { //Desktop
                $('.Cover').css({ 'width': '30vw', 'height': '30vw', 'margin-left': '0' });
                $(this).parent().find('.Cover').css({ 'width': '80vh', 'height': '80vh', 'margin-left': '5vw', 'border-width': '0px' });
            } else { //Mobile
                $('.block').css({ 'transition': 'none' });
                $('.Cover').css({ 'width': '50vw', 'height': '50vw', 'margin-left': '0' });
                $(this).parent().find('.Cover').css({ 'width': '100%', 'height': '100vw', 'margin-left': '0' });
                setTimeout(() => { $('.block').css({ 'transition': '.5s' }); }, 500);
            }
            $.scrollTo($(this).parent());
        } else if (gridView && releaseOpen && $(this).parent().find('.Text').css('display') != 'block') { //Open other release while on one
            $('.Text').css({ 'display': 'none' });
            $(this).parent().find('.Text').css({ 'display': 'block' });
            if (!window.mobileCheck()) { //Desktop
                $('.Cover').css({ 'width': '30vw', 'height': '30vw', 'margin-left': '0' });
                $(this).parent().find('.Cover').css({ 'width': '80vh', 'height': '80vh', 'margin-left': '5vw', 'border-width': '0px' });
            } else { //Mobile
                $('.Cover').css({ 'width': '50vw', 'height': '50vw', 'margin-left': '0' });
                $(this).parent().find('.Cover').css({ 'width': '100%', 'height': '100vw', 'margin-left': '0' });
            }
            $.scrollTo($(this).parent());
        } else if (gridView && releaseOpen && $(this).parent().find('.Text').css('display') === 'block') { //Close release
            $('.block').css({ 'transition': 'none' });
            releaseOpen = false;
            $('.Text').css({ 'display': 'none' });
            if (!window.mobileCheck()) { //Desktop
                $('.Cover').css({ 'width': '30vw', 'height': '30vw', 'margin-left': '0', 'border-width': '1px' });
            } else { //Mobile
                $('.Cover').css({ 'width': '50vw', 'height': '50vw', 'margin-left': '0' });
            }
            $.scrollTo($(this).parent());
            setTimeout(() => { $('.block').css({ 'transition': '.5s' }); }, 500);
        }
    });
}

////Open Cover on click //NEW
function gridSelection() {
    $('.gridBlock').on("click", function () {
        if (window.mobileCheck()) {
            $('#releaseGrid').css({ 'left': '100vw' });
            $('#open').css({ 'right': '0' });
        }
        $('.release, #void').css('display', 'none');
        $("#" + $(this).attr('id').slice(0, -1)).css('display', 'block');
        $.scrollTo("#" + $(this).attr('id').slice(0, -1));
    });
}

$('#open').on("click", function () {
    if (gridOpenMobile) {
        $(this).css({ 'right': '0' });
        $('#releaseGrid').css({ 'left': '100vw' });
        gridOpenMobile = false;
    } else {
        $(this).css({ 'right': '50vw' });
        $('#releaseGrid').css({ 'left': '50vw' });
        gridOpenMobile = true;
    }
});

//Back-end stuff
const firebaseConfig = {
    apiKey: "AIzaSyDrPGPN4HziI-0MhSJ-y2khecmbdFu1NNg",
    authDomain: "perfect-sight.firebaseapp.com",
    databaseURL: "https://perfect-sight-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "perfect-sight",
    storageBucket: "perfect-sight.appspot.com",
    messagingSenderId: "122633512609",
    appId: "1:122633512609:web:ba72bd469e82c3b1acb2e0"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase();
const storage = getStorage();


const releasesRef = ref(db, '/releases/');
onValue(releasesRef, (snapshot) => {
    snapshot.forEach((child) => {
        var name = child.key;
        var cover = child.val().cover;
        var bandcamp = child.val().bandcamp;
        var crediti = child.val().crediti;
        var handles = child.val().handles;
        var desc = child.val().desc;
        var counter = child.val().counter;
        var releaseNum = String($("#grid").children().length + 1);

        var creditsHTML = "";
        for (var i = 0; i < crediti.length; i++) {
            creditsHTML += crediti[i] + "<br>";
            //console.log("Crediti: " + creditsHTML);
        }

        var handlesHTML = "";
        for (var i = 0; i < handles.length; i++) {
            handlesHTML += "<a href=\"https://www.instagram.com/" + handles[i] + "\" target=\"_blank\"><sup>" + String(i + 1) + "</sup>" + '@' + handles[i] + "</a> <br>";
            //console.log("Handles: " + handlesHTML);
        }

        let newDiv = "<div class=\"release\" id=\"" + releaseNum + "\"><div class=\"block Cover\" id=\"numero release\" onclick=\"myFunction()\">" +
            "</div><div class=\"block Text\"><a class='bandcampLink' href=" + bandcamp + " target=\"_blank\">" + name + "</a>" +
            "<p>" + creditsHTML + "<br>" + handlesHTML + "<br>PS" + counter +
            "</p><p>" +
            desc +
            "</p></div></div>"

        let newDivGrid = "<div class=\"gridBlock\" id=\"" + releaseNum + "g\"></div>"

        $("#grid").prepend(newDiv);
        $("#releaseGrid").prepend(newDivGrid);
        $("#grid").children().first().children().first().css('background-image', 'url("' + cover + '"');
        $("#releaseGrid").children().first().css('background-image', 'url("' + cover + '"');

    });
    readyToEnd = true;
    console.log(readyToEnd);
});

//start the website at the end of the video animation but after the loading
$('#loading').on('ended', function () {
    if (readyToEnd) {
        startWebsite();

        //Open and close releases on click on Cover
        gridSelection();
        readyToEnd = false;
    } else {
        $(this)[0].play();
    }
});
