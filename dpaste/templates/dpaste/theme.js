jQuery(function($) {


    $('.autofocus textarea:first').focus();
    $('.superenter textarea').on('keydown', function(e){
        var metaKey;
        if (navigator.appVersion.indexOf("Win")!=-1) {
            metaKey = e.ctrlKey;
        } else {
            metaKey = event.metaKey;
        }
        if (e.keyCode == 13 && metaKey) {
            $(this).closest('form').submit();
            return false;
        }
    });

    $('.snippet-reply-hidden').click(function(e) {
        $(this).removeClass('snippet-reply-hidden');
    });

    /* ------------------------------------------------------------------------
       Diff Ajax Call
    ------------------------------------------------------------------------ */
    var diffReq;

    $('.snippet-diff-trigger').click(function(e) {
        e.preventDefault();
        $('#snippet-diff').slideDown('fast');
        $('#snippet-diff form').submit();
    });


    $('#diffform').submit(function() {
        var a = $('input[name="a"]:checked').val(),
            b = $('input[name="b"]:checked').val();

        window.location.hash = 'D' + a + ',' + b;

        // Cancel previous request if it is still pending
        if (diffReq) {
            diffReq.abort();
        }

        diffReq = $.get("{% url "snippet_diff" %}", {
            a: a,
            b: b
        }).done(function(data) {
            $('#diff').html(data).slideDown('fast');
        }).complete(function() {
            diffReq = null;
        });

        return false;
    });

    var curLine = document.location.hash,
        hashlist;

    if (curLine.substring(0, 2) === '#D') {
        hashlist = curLine.substring(2).split(',');
        if (hashlist.length === 2) {
            console.log(hashlist);
            $('#diffform input[name="a"][value="' + hashlist[0] + '"]').prop('checked', true);
            $('#diffform input[name="b"][value="' + hashlist[1] + '"]').prop('checked', true);
            $('#snippet-diff').slideDown('fast');
            $('#snippet-diff form').submit();
        }
    }

    /* ------------------------------------------------------------------------
       Line Highlighting
    ------------------------------------------------------------------------ */
    if (curLine.substring(0, 2) === '#L') {
        hashlist = curLine.substring(2).split(',');
        if (hashlist.length > 0 && hashlist[0] !== '') {
            $.each(hashlist, function(index, elem){
                $('.code li#' + elem).addClass('marked');
            });
        }
    }

    $('.code li').click(function(e) {
        var line = $(this),
            hash = 'L';

        line.toggleClass('marked');

        $('.code li.marked').each(function (index, elem) {
            if (hash !== 'L') hash += ',';
            hash += $(elem).attr('id');
        });

        window.location.hash = hash;
    });

    /* ------------------------------------------------------------------------
       Wordwrap
    ------------------------------------------------------------------------ */
    $('#toggleWordwrap').click(function(e){
        e.preventDefault();
        $('.code').toggleClass('wordwrap');
    });
});
