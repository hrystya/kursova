const headingList = document.querySelectorAll(".thumbnail");

// Get the modal
const modal = document.getElementById('myModal');

const modalHeader = document.querySelector(".modal-header h3");
const modalBody = document.querySelector(".modal-body");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

function showInfo() { 
    modalBody.textContent = this.children[1].children[1].textContent;
    modalHeader.textContent = this.children[1].children[0].textContent;
    modal.style.display = "block";
        
}
headingList.forEach( (element) => {
    element.addEventListener("click", showInfo.bind(element))
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}