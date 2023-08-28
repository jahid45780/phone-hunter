const loadPhone = async (searchText,isShowAll) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}
    
    
    
    `);
   
    const data = await res.json();
    const phones = data.data;
   //  console.log(data.data);
   displayPhone (phones,isShowAll);

}


const displayPhone = (phones,isShowAll) =>{
 
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

 // display show all btn 15 them or 16
 const showAllContainer = document.getElementById('show-all-container')
 if(phones.length > 12 && !isShowAll){
  showAllContainer.classList.remove('hidden')
 }
 else{
  showAllContainer.classList.add('hidden')
 }

 console.log('is show all',isShowAll)

     // display only first phone 15  
    if(!isShowAll){
      phones = phones.slice(0,12);
    }

    
 console.log(phones);
 phones.forEach( phone => {

    console.log(phone)
   const phoneCard = document.createElement('div');
   phoneCard.classList = ` card w-70 p-2  bg-base-100 shadow-xl `;
   phoneCard.innerHTML= ` 
   
   <figure><img src=" ${phone.image} " alt="Shoes" /></figure>
   <div class="card-body">
     <h2 class="card-title"> ${phone.phone_name} </h2>
     <p>মোবাইল ফোন কম ব্যবহার করুন আপনি সুখী হবেন

     বিশ্বাস না হলে এটা শুরু করে দেখুন</p>
     <div class="card-actions justify-center">
       <button onclick=" handleShowDetails('${phone.slug}');
        show_details_modal.showModal()
       
       " class="btn btn-primary">Show Details</button>
  
      </div>
   </div>
   
   `
   phoneContainer.appendChild(phoneCard);

 })

  // hide loading  dots

  toggleLoadingDots(false);

} 


 // show details
 const handleShowDetails = async (id)=>{
   console.log(id)
   // load single phone data
const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`) 

const data =await res.json();


const phone = data.data;

showPhoneDetails(phone);
 }

  // show model 

  const showPhoneDetails = (phone) =>{
      console.log(phone.others)

      const phoneName = document.getElementById('show-details-phone-name') 
      phoneName.innerText = phone.name;
    show_details_modal.showModal()

   const showDetailsContainer = document.getElementById('show-details-container');
   showDetailsContainer.innerHTML = `
   
   <img src=" ${phone.image} " />
   <p> <span>Storage:</span> ${ phone.mainFeatures.storage } </p>
   <p> <span> GPS: </span> ${ phone.others.GPS }  </p>
   <p> <span> Bluetooth: </span> ${ phone.others.Bluetooth }  </p>
   
   
   `

  }


 // search btn

const handleSearch =(isShowAll) =>{
  toggleLoadingDots(true);
  const searchField = document.getElementById('search-field')
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText,isShowAll);
}

  /* // handle search recap
const handleSearch2 = () => {
  toggleLoadingDots(true);
  const searchField = document.getElementById('search-field2');
  const searchText = searchField.value;
  loadPhone(searchText);
}
*/

const toggleLoadingDots = (isLoading) => {
    const loadingDots = document.getElementById('loading-dots');
 //    loadingDots.classList.remove('hidden')
 if(isLoading){
  loadingDots.classList.remove('hidden')
 }  
 else{
  loadingDots.classList.add('hidden')
 }
};



 // handle show all
 const handleShowAll = ()=>{
  handleSearch(true)
 }


 //loadPhone();