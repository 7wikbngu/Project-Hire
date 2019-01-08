$(function() {
    $.ajax({
        url: "https://hire.withgoogle.com/v2/api/t/openlogixcom/public/jobs", 
        dataType: "json", 
        success: function(result){
            console.log(result);
            createJobs(result);
        },
        error: function(err){
            console.log("Error:",err);
        }
    });

    function createJobs(data){
        var catAll = [];
        var id = [];

        for(var i = 0; i < data.length; i++){
            catAll[i] = data[i].hiringOrganization.department.name;
        }
        const category = [...new Set(catAll)];

        for(var i = 0; i < category.length; i++){
            id[i] = category[i].replace(/\s+/g, '')
            var categoryHTML = '<div id="'+id[i].substring(0,2)+'" class="w-75 shadow px-6 py-5 mb-4 bg-white rounded"><h4 class="ribbon">'+category[i]+'</h1><div class="accordion" id="accordionExample"></div></div>';
            $('#category').append(categoryHTML);
        }
        console.log(id);
        for(var i = 0; i < data.length; i++){
            var title = data[i].title;
            var location = data[i].jobLocation.address.addressLocality+', '+data[i].jobLocation.address.addressRegion +', '+ data[i].jobLocation.address.addressCountry;
            var department = "#" + data[i].hiringOrganization.department.name.substring(0,2);

            var jobHTML = '<div class="card mb-3 shadow"><div class="card-header bg-white" id="heading'+i+'" data-toggle="collapse" data-target="#collapse'+i+'" aria-expanded="false" aria-controls="collapse'+i+'"><h5 class="mb-0 text-blue">'+title+'</h5><p class="text-muted">'+location+'</p></div><div id="collapse'+i+'" class="collapse" aria-labelledby="heading'+i+'" data-parent="#accordionExample"><div class="card-body">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt</div></div></div>';
            $(department).append(jobHTML);
        }
    }

});