const userList = document.querySelector('#user-list');
const form = document.querySelector('#add-user-form');

//create element and render user
function renderUser(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let company = document.createElement('span');
    let email = document.createElement('span');
    let phone = document.createElement('span');
    let PS = document.createElement('span');
    let cross = document.createElement('div');


    li.setAttribute('data-id',doc.id);
    name.textContent = "Full Name : " + doc.data().name;
    company.textContent = "Company Name : " + doc.data().company;
    email.textContent = "Email Address : " + doc.data().email;
    phone.textContent = "Phone : " + doc.data().phone;
    PS.textContent = "Personal Statement : " + doc.data().ps;
    cross.textContent = 'x';


    li.appendChild(name);
    li.appendChild(company);
    li.appendChild(email);
    li.appendChild(phone);
    li.appendChild(PS);
    li.appendChild(cross);

    userList.appendChild(li);

    //delete data by id
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('user').doc(id).delete();
    });
}


//getting data 
// db.collection('user').orderBy('name').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//       renderUser(doc);
//     // console.log(doc.data())
//     });
// })


//saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('user').add({
           name : form.name.value,
           company : form.company.value,
           email : form.email.value,
           phone : form.phone.value,
           ps : form.ps.value 
    });
    form.name.value = "";
    form.company.value = "";
    form.email.value = "";
    form.phone.value = "";
    form.ps.value = "";
})


//real-time database listner
db.collection('user').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderUser(change.doc);
        }else if(change.type == 'removed'){
            let li = userList.querySelector('[data-id=' + change.doc.id + ']');
            userList.removeChild(li); 
        }        
        
    });
    
})
