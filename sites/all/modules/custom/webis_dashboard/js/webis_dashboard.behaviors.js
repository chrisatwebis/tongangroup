// webis_dashboard.behaviors.js

(function ($) {

  Drupal.behaviors.webisCheckAllDomains = {
    attach: function (context, settings) {
      change_state();
      $("#edit-domain-site").click(function() {
        change_state();
      });
    }
  };

  function change_state() {
    if($('#edit-domain-site').is(':checked')) {
      $("#edit-domains input[type='checkbox']").prop('checked', true);
    } else {
      $("#edit-domains input[type='checkbox']").prop('checked', false);
    };
  }

})(jQuery);