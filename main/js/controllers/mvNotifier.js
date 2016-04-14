angular.module('plantMasters').value('mvToastr', toastr);

angular.module('plantMasters').factory('mvNotifier', function(mvToastr) {
    return {
        notify: function(msg) {
            mvToastr.success(msg);
            console.log(msg);
        },
        error: function(msg) {
            mvToastr.error(msg);
        }
    };
});
