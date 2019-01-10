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
});

function createJobs(json){

    let categories = [];
    let departmentsObj = {};
    let categoryHTML = '';

    // Get Categories
    for(var i = 0; i < json.length; i++){
        let department = json[i].hiringOrganization.department.name;
        
        // Category not exists 
        // Create category and add the html
        if(categories.indexOf(department) === -1){
            categories.push(department);
            departmentsObj[department] = [json[i]];
        } 
        // Category exists
        // Push the json object to the associated category
        else {
            departmentsObj[department].push(json[i]);
        }
    }

    console.log(departmentsObj);

    // APpend the html by category and the job positings
    categories.forEach(category => {
        let categoryID = category.substring(0,2);
        let departmentArr = departmentsObj[category];
        categoryHTML += '<div id="'+ categoryID+'" class="w-75 shadow px-6 py-5 mb-4 bg-white rounded text-middle"><h4 class="ribbon">'+category+'</h4><p class="number-of-jobs float-right mt-3">'+ departmentArr.length +' position(s)</p>';
        categoryHTML += '<div class="accordion" id="accordion'+ categoryID +'">';

        departmentArr.forEach((job, i) => {
            let location =  job.jobLocation.address.addressLocality+', '+ job.jobLocation.address.addressRegion +', '+ job.jobLocation.address.addressCountry;
            categoryHTML += '<div class="card mb-3 left-text"><div onclick="scrolling('+ categoryID + i +')" class="card-header bg-white d-flex flex-row justify-content-between" id="' + categoryID + i+'" data-toggle="collapse"data-target="#collapse'+ categoryID + i+'" aria-expanded="false" aria-controls="collapse'+ categoryID + i+'"><div><h5 class="mb-0 text-blue">'+ job.title +'</h5><p class="text-muted">'+ location +'</p></div><div class="align-self-center text-blue"><i class="fas fa-chevron-down"></i><i class="fas fa-chevron-up"></i></div></div><div id="collapse'+ categoryID + i+'" class="collapse" aria-labelledby="'+categoryID + i + '" data-parent="#accordion'+ categoryID +'"><div class="card-body text-muted">'+job.description+'<button class="btn btn-outline-primary mt-4">Apply Now</button></div></div></div>';
        });
        categoryHTML += '</div></div>';
    });


    console.log(departmentsObj);
    $("#categories").append(categoryHTML);
}

function scrolling(idObject){
    console.log("ID: ",idObject);
    var id = $(idObject).attr("id");
    var x = $("#" + id).offset();
    
    if($("#" + id).attr("aria-expanded") === "false"){
        var offsetValue = x.top - 68;
        console.log("Offset: ", offsetValue);
        $('html, body').animate({
            scrollTop: offsetValue
        }, 750)
    }
    
}