$(".external").on("click", function(e){
    var originalHref = $(this).attr("href");
    $(this).attr("href", "redirect?u=" + escape(originalHref));
});