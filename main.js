const orderedList = document.querySelector('.ol1');

const links = [
    {
        label: "Week01 notes",
        url: "week01/index.html"
    },
    {
        label: "Week02 notes",
        url: "week02/index.html"
    }
];

for (let link in links) {
    console.log(`${links[link].label}`)
    //create new elements
    let li = document.createElement('li');
    let a = document.createElement('a');

    a.innerHTML = links[link].label;
    a.href = links[link].url;
    a.target ='_blank';
    console.log(a);

    li.appendChild(a);
    console.log(li);

    orderedList.appendChild(li);
}