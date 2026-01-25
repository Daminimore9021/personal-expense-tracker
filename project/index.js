let menuicn = document.querySelector(".menuicn"); 
let nav = document.querySelector(".navcontainer"); 

menuicn.addEventListener("click", () => { 
	nav.classList.toggle("navclose"); 
})

function signIn() {
    document.getElementById('signIn').style.display = 'none';
    document.getElementById('signOut').style.display = 'block';
    window.location.href = 'main.html';
}

function signOut() {
    document.getElementById('signIn').style.display = 'block';
    document.getElementById('signOut').style.display = 'none';
    window.location.href = 'main.html';
}
