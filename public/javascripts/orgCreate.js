var MIN_NAME_LENGTH = 3;

function resetStatus(status) {
    return status.removeClass('fa-spinner fa-spin')
        .removeClass('fa-check-circle')
        .removeClass('fa-times-circle');
}

$(function() {
    var events = 0;

    $('.input-name').on('input', function() {
        var val = $(this).val();
        var status = $('.status-org-name');
        var continueBtn = $('.continue-btn').prop('disabled', true);
        if (val.length < MIN_NAME_LENGTH)
            status.hide();
        else {
            resetStatus(status).addClass('fa-spinner fa-spin');
            status.show();
            var event = ++events;
            $.ajax({
                url: '/' + val,
                statusCode: {
                    404: function() {
                        if (event === events) {
                            resetStatus(status).addClass('fa-check-circle');
                            continueBtn.prop('disabled', false);
                        }
                    },
                    200: function() {
                        if (event === events)
                            resetStatus(status).addClass('fa-times-circle');
                    }
                }
            });
        }
    });
});
