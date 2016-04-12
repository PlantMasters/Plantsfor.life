angular.module('plantMasters').value('Toastr', toastr);

angular.module('plantMasters').factory('Notifier', function(mvToastr){
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
