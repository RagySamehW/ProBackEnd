$(document).ready(function () {
    $("#un").on('keyup', function (e) {
        e.preventDefault();
        var data = $('#un').val();
        $.ajax({
            const :checkUN = (req, res) => {
                var query = { UserName: req.body.UserName };
                Employees.find(query)
                    .then(result => {
                        if (result.length > 0) {
                            res.send('taken');
                        }
                        else {
                            res.send('available');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
              },
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