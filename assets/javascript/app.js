$("searchBTN").on("click", function() {

    let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=SWZE2wWBiq0ZZtVMxcbw2cGz7QM5ihXd";

    let searchTerm = $('#searchText').value
    let recordsRetrieve = $('#retrieveText').value
    let startYear = $('#startYearText').value
    let endYear = $('#endyearText').value
    
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              for(let i = 0; i<recordsRetrieve; i++){
                let  = $(`<div> `)
                $("#article-result").append(response);

              }
        
              })
