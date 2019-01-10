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
        var count = [];
        var categoryHTML = "";

        for(var i = 0; i < data.length; i++){
            catAll[i] = data[i].hiringOrganization.department.name;
        }
        const category = [...new Set(catAll)];
        for(var i = 0; i < category.length; i++){
            count[i] = 0;
            for(var j = 0; j < catAll.length; j++){
                if(catAll[j] === category[i]){
                    count[i]++;
                }
            }
        }

        console.log(count);
        for(var i = 0; i < category.length; i++){
            id[i] = category[i].replace(/\s+/g, '')
            categoryHTML += '<div id="'+id[i].substring(0,2)+'" class="w-75 shadow px-6 py-5 mb-4 bg-white rounded text-middle"><h4 class="ribbon">'+category[i]+'</h4><p class="number-of-jobs float-right mt-3">'+count[i]+' position(s)</p><div class="accordion" id="accordionExample">';
        }
        
        console.log(id);
        for(var i = 0; i < data.length; i++){
            var title = data[i].title;
            var location = data[i].jobLocation.address.addressLocality+', '+data[i].jobLocation.address.addressRegion +', '+ data[i].jobLocation.address.addressCountry;
            var departmentID = "#" + data[i].hiringOrganization.department.name.substring(0,2);
            var description = data[i].description;
            if(i === 0){
                var jobHTML = '<div class="card mb-3 left-text"><div class="card-header bg-white d-flex flex-row justify-content-between" id="heading'+i+'" data-toggle="collapse" data-target="#collapse'+i+'" aria-expanded="false" aria-controls="collapse'+i+'"><div><h5 class="mb-0 text-blue">'+title+'</h5><p class="text-muted">'+location+'</p></div><div class="align-self-center text-blue"><i class="fas fa-chevron-down"></i><i class="fas fa-chevron-up"></i></div></div><div id="collapse'+i+'" class="collapse show" aria-labelledby="heading'+i+'" data-parent="#accordionExample"><div class="card-body text-muted">'+description+'<button class="btn btn-outline-primary mt-4">Apply Now</button></div></div></div>';
            }else {
                var jobHTML = '<div class="card mb-3 left-text"><div class="card-header bg-white d-flex flex-row justify-content-between" id="heading'+i+'" data-toggle="collapse" data-target="#collapse'+i+'" aria-expanded="false" aria-controls="collapse'+i+'"><div><h5 class="mb-0 text-blue">'+title+'</h5><p class="text-muted">'+location+'</p></div><div class="align-self-center text-blue"><i class="fas fa-chevron-down"></i><i class="fas fa-chevron-up"></i></div></div><div id="collapse'+i+'" class="collapse" aria-labelledby="heading'+i+'" data-parent="#accordionExample"><div class="card-body text-muted">'+description+'<button class="btn btn-outline-primary mt-4">Apply Now</button></div></div></div>';
            }
            $(departmentID).append(jobHTML);
        }

        for(var i = 0; i < category.length; i++){
            var departmentID = "#" + data[i].hiringOrganization.department.name.substring(0,2);
            $(departmentID).append('</div></div>');
        }
    }
    
});