angular.module('plantMasters').value('Toastr', toastr);

angular.module('plantMasters').factory('Notifier', function(Toastr){
  return {
    notify: function(msg) {
      Toastr.success(msg);
      console.log(msg);
    },
    error: function(msg) {
      Toastr.error(msg);
    }
  };
});
