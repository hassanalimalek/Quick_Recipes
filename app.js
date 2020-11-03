const list = document.querySelector('ul');
const form = document.querySelector('form')

// const recipe = document.querySelector('#recipe')


// Show data 
function add(snap,id){
  
    const html = `<div  class="single_recipe">
    <li data-id=${id} ><span>${snap.title}</span><i class="fas fa-chevron-circle-down"></i><i class="fas fa-trash-alt"></i></li>
    <div class="dropdown">
    <p>${snap.details}
        </p>
    </div>
    </div>`

    console.log(html);
    list.innerHTML+=html
    form.reset()
}

// remove data
function remove(id){
    const item = document.querySelectorAll('li')
    item.forEach(list_item=>{
        // console.log(list_item)
        if(list_item.getAttribute('data-id')==id){
            list_item.nextElementSibling.remove();
            list_item.remove();
            
          
        }
    })

}


// Get Data 
database.collection('my_recipes').onSnapshot(snapshot=>{
   console.log(snapshot.docChanges())

    snapshot.docChanges().forEach(change => {
         const doc = change.doc;
         if(change.type=='added'){
            add(doc.data(),doc.id);
         }
         else if (change.type=='removed'){
             remove(doc.id);
         }
    })
    });     



// Add Data
form.addEventListener('submit',(x)=>{
    x.preventDefault();
    console.log(form.recipe.value);
    console.log(form.recipe_details.value)
    const recipe_obj = {
        'title':form.recipe.value,
        'details':form.recipe_details.value
    }
    console.log(recipe_obj)
    database.collection('my_recipes').add(recipe_obj).then((snapshot)=>{
      console.log("Recipe added")
     }).catch(err=>{
         console.log(err);
     });
      
});

// Delete  and Show
list.addEventListener("click",(e)=>{ 
    
    if(e.target.className=='fas fa-trash-alt'){
        
       const id = e.target.parentElement.getAttribute('data-id');
       database.collection('my_recipes').doc(id).delete().then(()=>{
           console.log("Recipe deleted")
       })
    }
    else if (e.target.className=='fas fa-chevron-circle-down'){
       e.target.parentElement.nextElementSibling.classList.toggle("show");

    }
})