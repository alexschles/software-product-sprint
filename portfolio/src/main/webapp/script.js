// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random fact to the page.
 */
function addRandomFact() {
  const facts =
      ['I am the first member of my direct family to pursue CS', 'I am a dual citizen: American and Brazilian', 'I enjoy exploring new places', 'I hope to make a positive impact on the lives of many people', 'I am passionate about the FinTech space'];

  // Pick a random fact.
  const fact = facts[Math.floor(Math.random() * facts.length)];

  // Add it to the page.
  const factContainer = document.getElementById('fact-container');
  factContainer.innerText = fact;
}


function getData() {
  fetch('/data').then(response => response.json()).then((data) => {
    
        const commentsElement = document.getElementById('comments-container');
        
        for (const comment of data) {
            if(comment.sentimentScore >= 0) {
                commentsElement.appendChild(createListElement(comment));
            }
        }
        
  });

}

function createListElement(comment) {
  const listElement = document.createElement('li');
  listElement.innerHTML = comment.text + "[Sentiment Score: " + comment.sentimentScore + "]";
  return listElement;
}

//check 
function isLoggedIn() {
    fetch('/login').then(function (response) {
	// The API call was successful!
	return response.text();
    }).then(function (text) {
        // This is the HTML from our response as a text string
        console.log(typeof text);
       // console.log(text === "In\n");

        var parameter;
        if(text == "In\n") { //the newline char is there bc that's what is produced by text response
            parameter = "In";
        }
        else {
            parameter = text; 
        }

        hideAndUnhideComments(status);

    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
}

function hideAndUnhideComments(response) {
    var x = document.getElementById("comments");
    if (response === "In") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
        var newParagraph = document.createElement('p');
        document.getElementById("commentsHeader").appendChild(newParagraph);
    }
}



