import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, onSnapshot , doc ,getDoc , deleteDoc} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCF2yyZWvuhI8zi6xjjVSeXWDSThFBBcjs",
  authDomain: "pollingapp-77439.firebaseapp.com",
  projectId: "pollingapp-77439",
  storageBucket: "pollingapp-77439.appspot.com",
  messagingSenderId: "806113223674",
  appId: "1:806113223674:web:dc53f6fb392cc34cf1ba43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
//for view create poll modal
const addpollBut = document.getElementById('openModal');
const modal = document.getElementById('createPollModal');
const closeModal = modal.getElementsByClassName('createPoll-modal-close')[0];
const modalContainer = modal.getElementsByClassName('createPoll-modal-container')[0];
const modalOverlay = modal.getElementsByClassName('createPoll-modal-overlay')[0];
addpollBut.addEventListener('click', () => {
  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.classList.add('modal-open');
    modalContainer.classList.add('modal-container-open');
  }, 50);
});
closeModal.addEventListener('click', () => {
  modal.classList.remove('modal-open');
  modalContainer.classList.remove('modal-container-open');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
});
modalOverlay.addEventListener('click', () => {
  modal.classList.remove('modal-open');
  modalContainer.classList.remove('modal-container-open');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
});
//---------------------------------------------------------------//
{/* <div class="card flex justify-center items-center bg-yellow-500/20 w-1/3 rounded-xl border-2 border-yellow-500 border-solid">
<button class="bg-yellow-500 text-white font-bold p-2  rounded-lg" >Create A New Poll</button>
</div>  */}
// for viewPollsModal
const viewModal = document.getElementById('myViewModal');
const viewCloseModal = viewModal.getElementsByClassName('view-Modal-close')[0];
const viewModalContainer = viewModal.getElementsByClassName('view-Modal-container')[0];
const viewModalOverlay = viewModal.getElementsByClassName('view-Modal-overlay')[0];

let openViewModal = () => {
  viewModal.classList.remove('hidden');
  setTimeout(() => {
    viewModal.classList.add('modal-open');
    viewModalContainer.classList.add('modal-container-open');
  }, 50);
}
viewCloseModal.addEventListener('click', () => {
  viewModal.classList.remove('modal-open');
  viewModalContainer.classList.remove('modal-container-open');
  setTimeout(() => {
    viewModal.classList.add('hidden');
  }, 300);
});
viewModalOverlay.addEventListener('click', () => {
  viewModal.classList.remove('modal-open');
  viewModalContainer.classList.remove('modal-container-open');
  setTimeout(() => {
   viewModal.classList.add('hidden');
  }, 300);
});
//-----------------------------------------------------------------------------------//
let viewPollsCard = () => {
  let cardContainer = document.getElementById(`cardContainer`)
  const q = query(collection(db, "polls"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    cardContainer.innerHTML = ""
    //const cities = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id)
      // cities.push(doc.data().pollTitle);
      let card = document.createElement(`div`)
      let docId = document.createElement(`span`)
      docId.textContent = doc.id
      let questionCont = document.createElement(`div`)
      let question = document.createElement(`span`)
      let buttonsCont = document.createElement(`div`)
      let viewPollBut = document.createElement(`button`)
      let DeletePollBut = document.createElement(`button`)
      let questiontxt = document.createTextNode(`Q : ${doc.data().pollTitle}`)
      let viewPollButtxt = document.createTextNode(`View`)
      let DeletePollButtxt = document.createTextNode(`Delete`)
      card.setAttribute(`class`,`card cardxs flex flex-col justify-between items-center bg-[#ffcc01] rounded-xl border-2 border-yellow-500 border-solid`)
      question.setAttribute(`class`,`text-white h-10/12 border-2 line-clamp-6 overflow-hidden break-all font-semibold`)
      viewPollBut.setAttribute(`class`,`bg-[#ffcc01] text-white border-2 font-bold p-1 sm:p-2 rounded-lg`)
      DeletePollBut.setAttribute(`class`,`bg-[#ffcc01] text-white border-2 font-bold p-1 sm:p-2 rounded-lg`)
      buttonsCont.setAttribute(`class`,`flex justify-around w-11/12 mb-2`)
      questionCont.setAttribute(`class`,`flex  w-11/12  h-3/4 `)
      viewPollBut.addEventListener(`click`, viewPollsCardData)
      viewPollBut.addEventListener(`click`, openViewModal)
      DeletePollBut.addEventListener(`click`, deletePoll)
      docId.setAttribute(`class`,`hidden`)
      question.appendChild(questiontxt)
      viewPollBut.appendChild(viewPollButtxt)
      DeletePollBut.appendChild(DeletePollButtxt)
      questionCont.appendChild(question)
      buttonsCont.append(viewPollBut,DeletePollBut)
      card.append(docId,questionCont,buttonsCont)
      cardContainer.appendChild(card)
    });
    //console.log("Current data in polls: ", doc.data().pollTitle);
  });
}



let viewPollsCardData = async (event)=>{
    event.preventDefault()
    let pollId = event.target.parentElement.previousSibling.previousSibling.textContent
    const docRef = doc(db, "polls", `${pollId}`);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().pollTitle);
let pollDataContainer = document.createElement(`div`)
      //let pollTitleDisp = document.createElement(`p`)
      let pollOption1Cont = document.createElement(`div`)
      let pollVoteRadio = document.createElement(`input`)
      let Option1 = document.createElement(`label`)
      Option1.textContent = docSnap.data().pollOption1
      let pollOption2Cont = document.createElement(`div`)
      let pollVote2Radio = document.createElement(`input`)
      let Option2 = document.createElement(`label`)
      Option2.textContent = docSnap.data().pollOption1
      let pollOption3Cont = document.createElement(`div`)
      let pollVote3Radio = document.createElement(`input`)
      let Option3 = document.createElement(`label`)
      Option3.textContent = docSnap.data().pollOption1 
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }  

document.addEventListener("DOMContentLoaded", viewPollsCard)
let pollTitleInp = document.getElementById(`pollTitle`)
let pollOption1 = document.getElementById(`pollOption1`)
let pollOption2 = document.getElementById(`pollOption2`)
let pollOption3 = document.getElementById(`pollOption3`)
let pollOption4 = document.getElementById(`pollOption4`)
let pollCreateBut = document.getElementById(`pollCreatedBut`)
pollCreateBut.addEventListener(`click`, async () => {
  // Add a new document in collection "cities"
  try {
    if (pollTitleInp.value != "" && pollOption1.value != "" && pollOption2.value != "" && pollOption3.value != "" && pollOption4.value != "") {
      const docRef = await addDoc(collection(db, "polls"), {
        pollTitle: pollTitleInp.value,
        pollOption1: pollOption1.value,
        pollVote1: 0,
        pollOption2: pollOption2.value,
        pollVote2: 0,
        pollOption3: pollOption3.value,
        pollVote3: 0,
        pollOption4: pollOption4.value,
        pollVote4: 0
      });
      console.log("Document written with ID: ", docRef.id);
      pollTitleInp.value = ""
      pollOption1.value = ""
      pollOption2.value = ""
      pollOption3.value = ""
      pollOption4.value = ""
      modal.classList.remove('modal-open');
      modalContainer.classList.remove('modal-container-open');
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 300);
    }
    else {
      alert("Error : Fill all the Blanks")
    }
  }
  catch (error) {
    console.log(error)
  }

})

let deletePoll = async (event) => {
  event.preventDefault()
  let pollId = event.target.parentElement.previousSibling.previousSibling.textContent
  console.log(event.target)
  await deleteDoc(doc(db, "polls", pollId));
}