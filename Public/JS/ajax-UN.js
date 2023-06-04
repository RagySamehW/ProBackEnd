$(document).ready(function () {
    $("#un").on('keyup', function (e) {
        e.preventDefault();
        var data = $('#un').val();
        $.ajax({
          
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ UserName: data }),
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