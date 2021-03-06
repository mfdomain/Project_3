$(document).ready(function() {
//$.................(function(){

        $('body').dblclick(function() {

            let searchArry = [];
            let topic;

            topic = $(".box").val();
            topic = topic.replace(/\s+/g,' ').trim(); //remove extra spaces, verify single space between tags
            let arry = topic.split(" "); // turn topic string into array
            let tagmode = " ";

            // create formatted string that will be query to Flickr.
            for (i = 0; i < arry.length; i++) {

                if (i < arry.length - 1) {
                    searchArry.push(arry[i] + ",");
                } else {
                searchArry.push(arry[i]);
                }
            }

            $("#myForm").hide(1000);


            let topicString = searchArry[0].toString();

            for (i = 1; i < searchArry.length; i++){
                topicString += (searchArry[i]);
            }


            // change tag mode based on radio button selected
            var radioValue = $("input[name='radioGrp']:checked").val();

            if(radioValue === "all"){
                tagmode = "all";
            } else {
                tagmode = "any";
            }






            var ajaxURL="http://api.flickr.com/services/feeds/photos_public.gne?tags="+topicString+"&tagmode="+tagmode+"&format=json&jsoncallback=?";

            //reset arrays for each query
            topicString = [];
            searchArry = [];

        $.getJSON(ajaxURL,function(data) {
            $('h3').text(data.title.toLowerCase()); // change title to lower case
            $.each(data.items,function(i,photo) {
                var photoHTML = '<span class="image">';
                photoHTML += '<a href="' + photo.link + '">';
                photoHTML += '<img src="' + photo.media.m.replace('_m','_s') + '"></a>';
                $('#gallery').append(photoHTML);
            }); // end each
        }); // end get JSON
    });
}); // end ready
