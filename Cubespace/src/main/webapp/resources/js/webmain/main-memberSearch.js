

function openPop(){
    document.getElementById("modal").style.display = "block";

}
















        const memberSearch = document.getElementById("memberSearch");
        const  memberMySearch= document.getElementById("memberMySearch");

        memberMySearch.addEventListener("mouseover", () => {
            memberSearch.style.border = "none";
            memberSearch.style.borderBottom = "1px solid black";
            memberMySearch.style.border = "1px solid black";
            memberMySearch.style.borderBottom = "none";

            memberSearch.style.color = "black";
            memberSearch.style.fontWeight = "normal";
            memberMySearch.style.color = "var(--subColor)";
            memberMySearch.style.fontWeight = "bold";
            

        })
        memberMySearch.addEventListener("mouseout", () => {
            memberMySearch.style.border = "none";
            memberMySearch.style.borderBottom = "1px solid black";
            memberSearch.style.border = "1px solid black";
            memberSearch.style.borderBottom = "none";

            memberMySearch.style.color = "black";
            memberMySearch.style.fontWeight = "normal";
            memberSearch.style.color = "var(--subColor)";
            memberSearch.style.fontWeight = "bold";
        })