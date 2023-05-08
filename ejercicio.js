function cardCreator(data){
   return data.map(e => 
        `<div class="card d-flex flex-column align-items-center m-3 border border-secondary rounded-lg shadow-lg p-3 mb-5 bg-white rounded w-90">
            <img src=${e.avatar} class="col-12 col-sm-6 col-md-7 col-lg-4 img-thumbnail m-2"></img>
            <h3>${e.name}</h3>
            <h6>Country: ${e.country}</h6>
            <h6>Direction: ${e.direction}<h6/>
            ${e.status ? `<p class="alert alert-success">Status: Active </p>` : `<p class="alert alert-danger">Status: Inactive</p>`}
            <h5>Proyects: ${e.proyects}</h5>
            <button type="button" class="button-edit btn btn-outline-info btn-lg btn-block font-weight-bold">Edit</button>
        </div>`
    )
}


$(document).ready(function(){

    var urlAPI = "https://64505c21a32219691149385f.mockapi.io/user"

    $.get(urlAPI, function(data, status) {
        console.log("Datos del servidor > ", data)

        $('#card-container').append(
            cardCreator(data)            
        )
    })   

    
    $("#button-input").on('click', function(){

        event.preventDefault()

        var data = {}

        let name = $("#name").val();
        let country = $("#country").val();
        let direction = $("#direction").val();
        let status = $("input[type=radio][name=status]:checked").val();
        let proyects = $("#proyects").val();

        if (!name || !country || !direction || !status || !proyects) {
            alert("All fields are required")
        } else {
            data.name = name;
            data.country= country;
            data.direction= direction;
            data.status= JSON.parse(status)
            data.proyects=JSON.parse(proyects)
    
            $.ajax({
                type: 'POST',
                url: urlAPI,
                contentType: 'application/json',
                data: JSON.stringify(data)
            })
            .done(function(response){
                console.log('Respuesta del servidor SUCCES > ', response)
                let array = []
                array.push(response)
                $('.users').append(
                    cardCreator(array)            
                )
                alert("Successful user creation")
                $("#formulario")[0].reset()
            })
            .fail(function(error){
                console.log('Respuesta del servidor FAIL > ', error)
            })
        }              
    })

    $(".button-edit").on('click', function(){

        console.log()
        // $.ajax({
        //     type: 'PUT',
        //     url: urlAPI + '/' + 1,
        //     contentType: 'application/json',
        //     data: JSON.stringify(data)
        // })
        // .done(function(response){
        //     console.log('Respuesta del servidor SUCCES > ', response)
        // })
        // .fail(function(error){
        //     console.log('Respuesta del servidor FAIL > ', error)
        // })
    })

})