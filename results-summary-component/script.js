'use strict';

const resultSummary = document.getElementById('summary-items-list');

if(!resultSummary) {console.log("aye aye");}

async function loadResultSummaryData(){
    try{
        const response = await fetch('./data.json');

        if(!response.ok){
            throw new Error("There was an error fetching the data");
        } else{
            const data = await response.json();
            console.log(data);

            data.forEach(item => {
                const itemContainer = document.createElement('div');
                itemContainer.classList.add('summary-item');

                itemContainer.innerHTML = `
                <div class="result-category">
                    <img src="${item.icon}">
                    <span>${item.category}</span>
                </div>
                <div class="score"><span><strong>${item.score}</strong> / 100</span></div>
                `;
            
                resultSummary.appendChild(itemContainer);
            });
        }        

    }catch(error){
        console.error("Error loading data", error);
    }
}

loadResultSummaryData();