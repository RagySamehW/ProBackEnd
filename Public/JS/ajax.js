$(document).ready(function () {
    $("#U").on('keyup', function (e) {
        e.preventDefault();
        var data = $('#U').val();
        $.ajax({
            url: '/user/checkU',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ Name: data }),
            success: function (response) {
                $('#result').html('UserName is ' + response);
                if (response == 'taken') {
                    $('#result').css("color", "red");
                }
                else {
                    $('#result').css("color", "green");
                }
            },
            error:function(err){
            
            }
        });
    });
});