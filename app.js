let myPromise = (user) => {
    let promise = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        let url = "https://api.github.com/users/" + user + "/repos";
        let data = {};
        request.open('GET', url);
        request.send();
        request.onreadystatechange = () => { 
            if(request.readyState === 4 && request.status === 200){
                if (request.response != null){
                    let response = JSON.parse(request.response);
                    let repos = [];
                    let list;
                    response.forEach((element, index) =>{
                        repos.push([element['name'], 
                                    element['description'],
                                    element['url']]);
                    });
                    resolve(repos);
                } else resolve('Oops no repositorie found!');           
            }else if (request.readyState === 4 && request.status !== 200)
                reject('Error : Invalid User');
        };
    });
    return promise;
};

let reposi = () => {
    let userRepo = document.getElementById('Text-User').value;
    
    myPromise(userRepo).then((message) => {
        message.forEach((element, index) => {
            $("tbody").append('<tr><td>' + message[index][0] + '</td><td>' + message[index][1] + '</td><td>' + message[index][2] + '</td></tr>');
        });
    }).catch((error) => {
        $('#form').append('<p>' + error + '</p>');
    });
};

$(document).ready(() => {
    let button = document.getElementById("btn-Submit");
    button.addEventListener('click', reposi);                 
});                       
