 module.exports = function(Show, LinkManager,
                           Backbone, Marionette, $, _) {
     Show.Controller = {
         showLink: function(id) {
             console.log('start of show link');
             /*var loadingView = LinkManager.Common.Views.Loading({
                 title: "loading link",
                 message: "please wait"
             });
             console.log('start of show link before show');
             LinkManager.mainRegion.show(loadingView);*/

             console.log('in show link');

             var fetchingLink = LinkManager.request("link:entity", id);
             $.when(fetchingLink).done(function(link) {
                 var linkView;
                 if(link !== undefined) {
                     linkView = new Show.Link({
                         model: link
                     });
                     linkView.on("link:edit", function(link) {
                         LinkManager.trigger("link:edit", link.get("id"));
                     });
                 } else {
                     linkView = Show.MissingLink();
                 }

                 LinkManager.mainRegion.show(linkView);
             });
         }
     };
 };