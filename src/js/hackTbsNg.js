// this is a hackety hack
// it has to do with the way ng rewrites the dom
// and it throws out the tbs inits
// so we make a docready function
// that loads everything

export default function hackTbsNg() {
    $(function () {
        setTimeout(function () {
            $('[data-toggle="tooltip"]').tooltip()
            $('#myCarousel').carousel();
        }, 2000);
    });
}


// but this shouldn't have to be here
// gnrrr
