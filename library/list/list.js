jQuery(document).ready(function($) {
    //var i=0;
    var form=$('#order-form');

        form.submit(function(e){     
             //i=i+1; alert(i);  
            e.preventDefault();
            $.ajax({
                url:form.attr('action'),
                data:form.serialize(),
                type: form.attr('method'),
                dataType: "json",
                beforeSend: function () {                    
                    $('.list ul').addClass('hlaf-opacity');
                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                },
                success: function (res) {
                    $('.list ul').removeClass('hlaf-opacity');
                    $('.list  ul').html(res.list);
                    
                }
            });
            //return false; 
        });
        form.submit();
        $('select[name="orderby"]').change(function(){form.submit();});
});