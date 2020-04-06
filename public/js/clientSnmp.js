//todo: check if user has entered enough information to click on submit

window.onload = function(){
    //console.log('loaded')

    document.getElementById("default").addEventListener("change", function(){
    if(this.checked){
        console.log('default checked');
        var a = document.getElementsByClassName("non-default");
        //console.log(a);
        for(i = 0; i<a.length; i++){
            a[i].checked = false;
        }
    }
    });

    document.querySelectorAll('.non-default').forEach(item => {
        item.addEventListener('change', event =>{
            document.getElementById('default').checked = false;
        })
    })

    document.getElementById('submitButton').addEventListener('click',function(){
        
    });



};