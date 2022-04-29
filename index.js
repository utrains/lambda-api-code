const api_root="https://lsu4b4x3q2.execute-api.us-east-1.amazonaws.com/register/"
function loadTable(){
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET",api_root + "users");
    xhttp.send();
    xhttp.onreadystatechange=function(){
        if(this.readyState == 4&&this.status==200){
            console.log(this.responseText);
            var trHTML='';
            const objects=JSON.parse(this.responseText);
            for(let object of objects["products"] ){
                trHTML+='<tr>';
                trHTML+='<td>'+object['id']+'</td>';
                trHTML+='<td><img width="50px" src="'+object['avatar']+'" class="avatar"></td>';
                trHTML+='<td>'+object['fname']+'</td>';
                trHTML+='<td>'+object['lname']+'</td>';
                trHTML+='<td>'+object['username']+'</td>';
                trHTML+='<td><button type="button" class="btn btn-outline-secondary"onclick="showUserEditBox('+object['id']+')">Edit</button>';
                trHTML+='<button type="button" class="btn btn-outline-danger" onclick="userDelete('+object['id']+')">Del</button></td>';
                trHTML+="</tr>";
              }
            document.getElementById("mytable").innerHTML=trHTML;
         }
     };
   }
loadTable();



function showUserCreateBox(){
    Swal .fire({
        title: 'Create user',
        html:'<input id="id" type="hidden">'+'<input id="fname" class="swal2-input"  placeholder="First">'+'<input id="lname" class="swal2-input" placeholder="Last">'+'<input id="username" class="swal2-input" placeholder="Username">'+'<input id="email" class="swal2-input"placeholder="Email">',
        focusConfirm: false,
        preConfirm: ()=>{
            userCreate();
        }
    })
}

function userCreate(){
    const fname=document.getElementById("fname").value;
    const lname=document.getElementById("lname").value;
    const username=document.getElementById("username").value;
    const email=document.getElementById("email").value;
    const id = (Math.floor(Math.random() * 10001)).toString();

    const xhttp = new XMLHttpRequest();
    const data= JSON.stringify({"fname": fname,"lname": lname,"username": username,"email": email,"avatar": "https://www.mecallapi.com/users/cat.png"})
    console.log(data);
    xhttp.open("POST",api_root + "user");
    xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({"id":id , "fname": fname,"lname": lname,"username": username,"email": email,"avatar": "https://www.mecallapi.com/users/cat.png"}));

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4&&this.status==200){
            const objects = JSON.parse(this.responseText);
            Swal .fire(objects['message']);
            loadTable();
         }
    };
}
function showUserEditBox(id){
    id=id.toString()
    console.log(id);

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET",api_root + "user" +"?id="+id);
    xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xhttp.send(JSON.stringify());
    xhttp.onreadystatechange = function(){
        if(this.readyState==4&&this.status==200){
            const objects=JSON.parse(this.responseText);
            console.log(objects)
            const user=objects;
            console.log(user);
            Swal .fire({
                title: 'Edit User',
                html:'<input id="id" type="hidden" value='+user['id']+'>'+'<input id="fname" class="swal2-input" placeholder="First" value="'+user['fname']+'">'+'<input id="lname" class="swal2-input" placeholder="Last" value="'+user['lname']+'">'+'<input id="username" class="swal2-input" placeholder="Username" value="'+user['username']+'">'+'<input id="email" class="swal2-input" placeholder="Email" value="'+user['email']+'">',
                focusConfirm: false,
                preConfirm: ()=>{
                    userEdit();
                }
            })
        }
     };
 }

function userEdit(){
    const id=document.getElementById("id").value;
    const fname=document.getElementById("fname").value;
    const lname=document.getElementById("lname").value;
    const username=document.getElementById("username").value;
    const email=document.getElementById("email").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT",api_root + "user");
    xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({"id": id,"fname": fname,"lname": lname,"username":username,"email": email,"avatar": "https://www.mecallapi.com/users/cat.png"}));
   xhttp.onreadystatechange = function(){
      if(this.readyState == 4&&this.status==200){
           const objects=JSON.parse(this.responseText);
           Swal .fire(objects['message']);
           loadTable();

      }
   };
}
function userDelete(id){
    id=id.toString()
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE",api_root + "user");
    xhttp.setRequestHeader("Content-Type","application/json; charset=UTF-8");
    xhttp.send(JSON.stringify({"id": id}));
    xhttp.onreadystatechange = function(){
    if(this.readyState==4){
        const objects = JSON.parse(this.responseText);
        Swal .fire(objects['message']);
        loadTable();
    }
  };
}
