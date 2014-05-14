(function ($) {
    $.fn.yiimmodal = function (options) {

        var settings = $.extend(options || [], $(this).data());

        if (settings.widgetid) {
            var onSuccess = settings.onSuccess;
            settings['onSuccess'] = function (data, textStatus, jqXHR) {
                if (onSuccess) {
                    onSuccess.call(this, data, textStatus, jqXHR);
                }

                try {
                    $.fn.yiiGridView.update(settings.widgetid);
                } catch ($e) {
                }

                try {
                    $.fn.yiiListView.update(settings.widgetid);
                } catch ($e) {
                }
            };
        }

        return $(this).mmodal(settings);
    };
})(jQuery);
